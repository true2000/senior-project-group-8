from flask import Flask, request, jsonify
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


#end point is /movies
class MovieList(Resource):
        def get(self):
            # Fetch movie IDs from query parameter 'ids'
            movie_ids = request.args.get('ids', '')
            movie_ids_list = movie_ids.split(',') if movie_ids else []
            print(movie_ids_list)
            # Respond with the movie IDs and a message
            return jsonify(movie_ids_list)


app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

api.add_resource(MovieList, '/movies')  # Adding the movies endpoint

class HelloWorld(Resource):
    def get(self):
        return {"message": "Hello, World!"}

api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run(debug=True)
