import pandas as pd

# Create a DataFrame from the data
data = pd.read_csv("/Users/lukelambert/Desktop/gData.csv", quotechar='"', skipinitialspace=True)
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
def get_combined_recommendations(movie_ids, genre_vectors):
    combined_recommendations = set()
    for movie_id in movie_ids:
        # Filter out movies that are part of the input movie_ids
        filtered_genre_vectors = [id for id in genre_vectors if id != movie_id]

        similarities = [(id, cosine_similarity(movie_id, id)) for id in filtered_genre_vectors]
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
        recommendations = get_combined_recommendations(movie_ids_list, genre_vectors)
        print("Combined recommendations for the given movies:")
        for i, movie in enumerate(recommendations, start=1):
            # Retrieve movie info from the original DataFrame
            movie_info = data[data['id'] == movie]
            print(f"{i}. {movie_info}")
            if i >= 10:
                break
