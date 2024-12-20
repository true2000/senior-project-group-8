import os
from flask_swagger_ui import get_swaggerui_blueprint
from flask import Flask, request, jsonify, make_response
from flask_restful import Api, Resource
from flask_cors import CORS
import pandas as pd
from flask_caching import Cache

app = Flask(__name__)
api = Api(app)
CORS(app)

# Configure cache
app.config['CACHE_TYPE'] = 'simple'  # Consider using 'redis' or 'filesystem' for production environments
cache = Cache(app)

# Swagger UI configuration
SWAGGER_URL = '/swagger'  # URL for exposing Swagger UI (without trailing '/')
API_URL = '/static/swagger.yml'  # URL for exposing the Swagger specification
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={  # Swagger UI config overrides
        'app_name': "Movie API"
    },
)

# Set the data directory using an environment variable, defaulting to '/data'
MOVIE_DATA_DIR = os.getenv("MOVIE_DATA_DIR", "./data")

# Set the filepath using the data directory
filepath = os.path.join(MOVIE_DATA_DIR, 'gData.csv')

# Load the data from the CSV file
def load_data():
    print(f"Attempting to load data from: {filepath}")  # Debugging statement
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"Data file not found at {filepath}")
    data = pd.read_csv(filepath, quotechar='"', skipinitialspace=True)
    print("Data loaded successfully!")  # Confirm successful loading
    return data

# ensure that data loading and processing are cached effectively
@cache.cached(timeout=31536000, key_prefix='genre_vectors') # Cache datafile for one year.
def initialize():
    data = load_data()
    df = data[["id", "title", "vote_average", "vote_count", "genres"]]
    df.loc[: , 'genres'] = df['genres'].astype(str).str.replace(' ', '').str.lower()
    genre_vectors = {}
    for idx, row in df.iterrows():
        genres = row['genres'].split(',')
        genre_vectors[row['id']] = set(genres)
    print("Genre vectors initialized!")  # Confirm successful initialization
    return genre_vectors

# Use the cached genre vectors throughout the application
genre_vectors = initialize()


def cosine_similarity(movie1, movie2):
    intersection = len(genre_vectors[movie1] & genre_vectors[movie2])
    union = len(genre_vectors[movie1]) + len(genre_vectors[movie2]) - intersection
    if union == 0:
        return 0  # Avoid division by zero
    return intersection / union


def get_combined_recommendations(movie_ids, genre_vectors):
    combined_recommendations = set()
    for movie_id in movie_ids:
        # Filter out movies that are part of the input movie_ids
        filtered_genre_vectors = [id for id in genre_vectors if id != movie_id]

        similarities = [(id, cosine_similarity(movie_id, id)) for id in filtered_genre_vectors]
        similarities.sort(key=lambda x: x[1], reverse=True)
        top_recommendations = [id for id, _ in similarities[:12]]
        combined_recommendations.update(top_recommendations)
    return combined_recommendations


# end point is /movies
class MovieList(Resource):
    def get(self):
        movie_ids = request.args.get('ids')
        data = load_data()  # Load the data here instead of globally
        if movie_ids:
            movie_ids_list = [int(id_str) for id_str in movie_ids.split(',')]
            recommendations = get_combined_recommendations(movie_ids_list, genre_vectors)
            detailed_recommendations = []

            print("Combined recommendations for the given movies:")
            for i, movie in enumerate(recommendations, start=1):
                movie_info = data[data['id'] == movie]
                if not movie_info.empty:
                    detailed_info = movie_info.to_dict(orient='records')[0]
                    # Ensure no NaN values are present; replace with 'N/A' if necessary
                    detailed_info = {k: (v if v == v else "N/A") for k, v in detailed_info.items()}
                else:
                    detailed_info = {}

                detailed_recommendations.append(detailed_info)
                print(f"{i}. {detailed_info}")  # Printing each recommended movie's details
                if i >= 12:
                    break

            # Create the response object and set Cache-Control header
            response = make_response(jsonify(detailed_recommendations))
            response.headers['Cache-Control'] = 'public, max-age=31536000'  # Cache for 1 year
            response.headers['Vary'] = 'Accept, Cookie, ids'
            return response
        
        return {'message': 'No movie ids provided'}, 400


app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

api.add_resource(MovieList, '/movies')  # Adding the movies endpoint


class HelloWorld(Resource):
    def get(self):
        response = make_response({"message": "Hello, World!"})
        response.headers['Cache-Control'] = 'public, max-age=31536000'
        return response


api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)