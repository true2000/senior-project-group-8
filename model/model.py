import pandas as pd
 
# Create a DataFrame from the data
data =  pd.read_csv("model/TMDB_movie_dataset_v11.csv", quotechar='"', skipinitialspace=True)
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
 
# Function to get recommendations
def get_recommendations(movie_title):
    similarities = [(title, cosine_similarity(movie_title, title)) for title in genre_vectors if title != movie_title]
    similarities.sort(key=lambda x: x[1], reverse=True)
    return [title for title, _ in similarities[:5]]
 
# Example: Get recommendations for a movie
while True:
    movie_name = input("Enter a movie: ")
    if movie_name=="exit":
        break
    else:
        recommendations = get_recommendations(movie_name)
        print("Recommended movies for '"+ movie_name +"':")
        i = 1
        for movie in recommendations:
            print(i, movie)
            i += 1
   
 