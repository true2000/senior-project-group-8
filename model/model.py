import pandas as pd

# Create a DataFrame from the data
data = pd.read_csv("model/TMDB_movie_dataset_v11.csv", quotechar='"', skipinitialspace=True)
df = data[["id", "title", "vote_average", "vote_count", "genres"]]

# Preprocess genres by removing spaces and converting to lowercase
df['genres'] = df['genres'].astype(str).str.replace(' ', '').str.lower()

# Create a dictionary to store genre vectors for each movie
genre_vectors = {}
for idx, row in df.iterrows():
    genres = row['genres'].split(',')
    genre_vectors[row['id']] = set(genres)

# Compute cosine similarity between movies based on genres
def cosine_similarity(movie1, movie2):
    intersection = len(genre_vectors[movie1] & genre_vectors[movie2])
    union = len(genre_vectors[movie1]) + len(genre_vectors[movie2]) - intersection
    return intersection / union

# Function to get recommendations for multiple movies
def get_combined_recommendations(movie_ids):
    combined_recommendations = set()
    for movie_id in movie_ids:
        similarities = [(id, cosine_similarity(movie_id, id)) for id in genre_vectors if id != movie_id]
        similarities.sort(key=lambda x: x[1], reverse=True)
        top_recommendations = [id for id, _ in similarities[:10]]
        combined_recommendations.update(top_recommendations)
    return combined_recommendations

# Example: Get recommendations for multiple movies
while True:
    movie_ids = input("Enter movie ids (comma-separated): ")
    if movie_ids.lower() == "exit":
        break
    else:
        movie_ids_list = [int(id_str) for id_str in movie_ids.split(',')]
        recommendations = get_combined_recommendations(movie_ids_list)
        print("Combined recommendations for the given movies:")
        for i, movie in enumerate(recommendations, start=1):
            # Retrieve movie info from the original DataFrame
            movie_info = data[data['id'] == movie]
            print(f"{i}. {movie_info}")
            if i >= 10:
                break
