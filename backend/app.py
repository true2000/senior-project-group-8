from flask import Flask, request
from flask_restful import Api, Resource
from flask_cors import CORS

from movie_dto import MovieDTO

app = Flask(__name__)
api = Api(app)
CORS(app)

# Example movie data
movies = [
    MovieDTO(
        name="Inception",
        director="Christopher Nolan",
        image="https://example.com/inception.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="Interstellar",
        director="Christopher Nolan",
        image="https://example.com/interstellar.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="The Matrix",
        director="Lana Wachowski, Lilly Wachowski",
        image="https://example.com/thematrix.jpg"  # Placeholder image URL
    )
]

#end point is /movies
#with /movies?prefix="whatever" a parameter can be passed
class MovieList(Resource):
    def get(self):
        # Optional query parameter
        prefix = request.args.get('prefix', '')

        # Convert each MovieDTO object to a dict
        movies_list = [movie.to_dict() for movie in movies]

        # Prepend the prefix to the response, if provided
        response = {"movies": movies_list}
        if prefix:
            response = {f"{prefix}_movies": movies_list}

        return response

api.add_resource(MovieList, '/movies')  # Adding the movies endpoint

class HelloWorld(Resource):
    def get(self):
        return {"message": "Hello, World!"}

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run(debug=True)
