import os
from flask_swagger_ui import get_swaggerui_blueprint
from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
import pandas as pd

from movie_dto import MovieDTO

app = Flask(__name__)
api = Api(app)
CORS(app)

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

filepath = filepath = r"/Users/lukelambert/Desktop/gData.csv.zip"
print(os.path.exists(filepath))  # This should print True if the file exists at the specified location
data = pd.read_csv(filepath, compression='zip', quotechar='"', skipinitialspace=True)


def initialize():
    filepath = "/Users/paulrichnow/Desktop/gData.csv.zip"
    data = pd.read_csv(filepath, compression='zip', quotechar='"', skipinitialspace=True)
    df = data[["id", "title", "vote_average", "vote_count", "genres"]]
    df['genres'] = df['genres'].astype(str).str.replace(' ', '').str.lower()
    genre_vectors = {}
    for idx, row in df.iterrows():
        genres = row['genres'].split(',')
        genre_vectors[row['id']] = set(genres)
    return genre_vectors


genre_vectors = initialize()


def cosine_similarity(movie1, movie2):
    intersection = len(genre_vectors[movie1] & genre_vectors[movie2])
    union = len(genre_vectors[movie1]) + len(genre_vectors[movie2]) - intersection
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

            return jsonify(detailed_recommendations)
        return {'message': 'No movie ids provided'}, 400


app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

api.add_resource(MovieList, '/movies')  # Adding the movies endpoint


class HelloWorld(Resource):
    def get(self):
        return {"message": "Hello, World!"}


api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run(debug=True)
