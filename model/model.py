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
    genre_vectors[row['title']] = set(genres)

# Compute cosine similarity between movies based on genres
def cosine_similarity(movie1, movie2):
    intersection = len(genre_vectors[movie1] & genre_vectors[movie2])
    union = len(genre_vectors[movie1]) + len(genre_vectors[movie2]) - intersection
    return intersection / union

# Function to get recommendations for multiple movies
def get_combined_recommendations(movie_titles):
    combined_recommendations = set()
    for movie_title in movie_titles:
        similarities = [(title, cosine_similarity(movie_title, title)) for title in genre_vectors if title != movie_title]
        similarities.sort(key=lambda x: x[1], reverse=True)
        top_recommendations = [title for title, _ in similarities[:5]]
        combined_recommendations.update(top_recommendations)
    return combined_recommendations

# Example: Get recommendations for multiple movies
while True:
    movie_names = input("Enter movie titles (comma-separated): ")
    if movie_names.lower() == "exit":
        break
    else:
        movie_list = movie_names.split(',')
        recommendations = get_combined_recommendations(movie_list)
        print("Combined recommendations for the given movies:")
        for i, movie in enumerate(recommendations, start=1):
            print(f"{i}. {movie}")
