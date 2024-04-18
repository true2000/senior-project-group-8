from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
import pandas as pd

from movie_dto import MovieDTO

app = Flask(__name__)
api = Api(app)
CORS(app)

# Swagger UI configuration
SWAGGER_URL = '/swagger'  # URL for exposing Swagger UI (without trailing '/')
API_URL = '/static/swagger.yml'  # URL for exposing the Swagger specification

swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={  # Swagger UI config overrides
        'app_name': "Movie API"
    },
)


def initialize():
    filepath = "/Users/paulrichnow/Desktop/gData.csv.zip"
    data = pd.read_csv(filepath, compression='zip', quotechar='"', skipinitialspace=True)
    df = data[["id", "title", "vote_average", "vote_count", "genres"]]
    df['genres'] = df['genres'].astype(str).str.replace(' ', '').str.lower()
    genre_vectors = {}
    for idx, row in df.iterrows():
        genres = row['genres'].split(',')
        genre_vectors[row['id']] = set(genres)
    return df, genre_vectors


df, genre_vectors = initialize()


def cosine_similarity(genre_vectors, movie1, movie2):
    intersection = len(genre_vectors[movie1] & genre_vectors[movie2])
    union = len(genre_vectors[movie1]) + len(genre_vectors[movie2]) - intersection
    return intersection / union


def get_combined_recommendations(df, genre_vectors, movie_ids):
    combined_recommendations = set()
    for movie_id in movie_ids:
        similarities = [(id, cosine_similarity(genre_vectors, movie_id, id)) for id in genre_vectors if id != movie_id]
        similarities.sort(key=lambda x: x[1], reverse=True)
        top_recommendations = [id for id, _ in similarities[:10]]
        combined_recommendations.update(top_recommendations)
    recommended_movies = df[df['id'].isin(combined_recommendations)].head(10)
    return recommended_movies


# end point is /movies
class MovieList(Resource):
    def get(self):
        movie_ids = request.args.get('ids')
        if movie_ids:
            movie_ids_list = list(map(int, movie_ids.split(',')))
            recommendations = get_combined_recommendations(df, genre_vectors, movie_ids_list)
            print(recommendations)
            return jsonify(recommendations.to_dict(orient='records'))
        return {'message': 'No movie ids provided'}, 400


app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

api.add_resource(MovieList, '/movies')  # Adding the movies endpoint


class HelloWorld(Resource):
    def get(self):
        return {"message": "Hello, World!"}


api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run(debug=True)
