import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim

# Load the dataset
data = pd.read_csv("model/TMDB_movie_dataset_v11.csv", quotechar='"', skipinitialspace=True)

# Preprocess genres by removing spaces and converting to lowercase
data['genres'] = data['genres'].astype(str).str.replace(' ', '').str.lower()

# Filter out movies with empty genres
data = data[data['genres'] != '']

# Create a dictionary to store genre vectors for each movie
genre_vectors = {}
for idx, row in data.iterrows():
    genres = row['genres'].split(',')
    genre_vectors[row['id']] = set(genres)

# Define a simple neural network for genre similarity
class GenreSimilarityModel(nn.Module):
    def __init__(self, num_genres):
        super(GenreSimilarityModel, self).__init__()
        self.embedding = nn.Embedding(num_genres, 10)
        self.fc = nn.Linear(10, 1)

    def forward(self, movie_ids):
        genre_embeddings = self.embedding(movie_ids)
        genre_similarity_scores = self.fc(genre_embeddings)
        return genre_similarity_scores

# Create a PyTorch model
num_genres = len(genre_vectors)
model = GenreSimilarityModel(num_genres)

# Define loss function and optimizer
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Convert movie IDs to PyTorch tensors
movie_ids_tensor = torch.tensor(list(genre_vectors.keys()), dtype=torch.long)

# Training loop (you can adjust the number of epochs and batch size)
for epoch in range(1):
    optimizer.zero_grad()
    genre_similarity_scores = model(movie_ids_tensor)
    loss = criterion(genre_similarity_scores, torch.ones_like(genre_similarity_scores))
    loss.backward()
    optimizer.step()
    print(f"Epoch {epoch+1}, Loss: {loss.item()}")

# Save the trained model
torch.save(model.state_dict(), "genre_similarity_model.pth")
print("Model saved as genre_similarity_model.pth")

# Load the saved model
loaded_model = GenreSimilarityModel(num_genres)
loaded_model.load_state_dict(torch.load("genre_similarity_model.pth"))
loaded_model.eval()

# Get recommendations for multiple movies using the loaded model
def get_combined_recommendations(movie_ids, genre_vectors, model):
    combined_recommendations = set()
    for movie_id in movie_ids:
        filtered_genre_vectors = [id for id in genre_vectors if id != movie_id]
        genre_similarity_scores = model(torch.tensor(filtered_genre_vectors, dtype=torch.long))
        _, top_recommendations = torch.topk(genre_similarity_scores, 10)
        combined_recommendations.update(top_recommendations.tolist())
    return combined_recommendations

# Example: Get recommendations for multiple movies
while True:
    movie_ids = input("Enter movie ids (comma-separated): ")
    if movie_ids.lower() == "exit":
        break
    else:
        movie_ids_list = [int(id_str) for id_str in movie_ids.split(',')]
        recommendations = get_combined_recommendations(movie_ids_list, genre_vectors, loaded_model)
        print("Combined recommendations for the given movies:")
        for i, movie in enumerate(recommendations, start=1):
            movie_info = data[data['id'] == movie]
            print(f"{i}. {movie_info['title'].values[0]}")
            if i >= 10:
                break
