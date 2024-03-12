from flask import Flask, request
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint


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

# Example movie data
movies = [
    MovieDTO(
        name="Inception",
        image="/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="Interstellar",
        image="/pbrkL804c8yAv3zBZR4QPEafpAR.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="The Dark Knight",
        image="/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="Avatar",
        image="/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="The Avengers",
        image="/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="Deadpool",
        image="/en971MEXui9diirXlogOrPKmsEn.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="Avengers: Infinity War",
        image="/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="Fight Club",
        image="/hZkgoQYus5vegHoetLkCJzb17zJ.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="Guardians of the Galaxy",
        image="/uLtVbjvS1O7gXL8lUOwsFOH4man.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="Pulp Fiction",
        image="/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="Forrest Gump",
        image="/qdIMHd4sEfJSckfVJfKQvisL02a.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="Harry Potter and the Philosopher's Stone",
        image="/hziiv14OpD73u9gAak4XDDfBKa2.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="Iron Man",
        image="/cyecB7godJ6kNHGONFjUyVN9OX5.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="Django Unchained",
        image="/5Lbm0gpFDRAPIV1Cth6ln9iL1ou.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="The Shawshank Redemption",
        image="/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="Avengers: Endgame",
        image="/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="Titanic",
        image="/rzdPqYx7Um4FUZeD8wpXqjAUcEm.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="Joker",
        image="/hO7KbdvGOtDdeg0W4Y5nKEHeDDh.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="The Lord of the Rings: The Fellowship of the Ring",
        image="/x2RS3uTcsJJ9IfjNPcgDmukoEcQ.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="The Lord of the Rings: The Return of the King",
        image="/2u7zbn8EudG6kLlBzUYqP8RyFU4.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="Shutter Island",
        image="/2nqsOT2AqPkTW81bWaLRtjgjqVM.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="The Wolf of Wall Street",
        image="/63y4XSVTZ7mRzAzkqwi3o0ajDZZ.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="Avengers: Age of Ultron",
        image="/6YwkGolwdOMNpbTOmLjoehlVWs5.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="Captain America: Civil War",
        image="/wdwcOBMkt3zmPQuEMxB3FUtMio2.jpg"  # Placeholder image URL
    ),
    MovieDTO(
        name="The Dark Knight Rises",
        image="/c3OHQncTAnKFhdOTX7D3LTW6son.jpg"  # Placeholder image URL
    ),
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


app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

api.add_resource(MovieList, '/movies')  # Adding the movies endpoint

class HelloWorld(Resource):
    def get(self):
        return {"message": "Hello, World!"}

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run(debug=True)
