import unittest
from flask_testing import TestCase

# Import your Flask app
from app import app

class TestMovieAPI(TestCase):
    def create_app(self):
        app.config['TESTING'] = True
        return app

    def test_no_null_values(self):
        # Assuming your endpoint to get movie recommendations is '/movies' and takes IDs as 'ids'
        response = self.client.get('/movies?ids=440')
        data = response.get_json()
        # Check for no None values in the response data
        all_non_null = all(item is not None for movie in data for item in movie.values())
        self.assertTrue(all_non_null, "Found null values in the response")

    def test_12_movies_returned(self):
        response = self.client.get('/movies?ids=440')
        data = response.get_json()
        # Check exactly 10 movies are returned
        self.assertEqual(len(data), 12, "Number of movies returned is not 10")

    def test_input_movie_not_in_recommendations(self):
        movie_id = 440
        response = self.client.get(f'/movies?ids={movie_id}')
        data = response.get_json()
        # Check the input movie ID is not in the recommendations
        movie_ids = [movie['id'] for movie in data if 'id' in movie]
        self.assertNotIn(movie_id, movie_ids, "Input movie ID is in the recommendations")

if __name__ == '__main__':
    unittest.main()
