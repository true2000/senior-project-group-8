import os
import pandas as pd

# Define the path for the input CSV file
file_path = "/Users/lukelambert/Desktop/gData.csv"

# Load the data from CSV file
df = pd.read_csv(file_path)

# Filter movies with more than 5000 vote count
filtered_df = df[df['vote_count'] > 5000]

# Define the genres of interest
genres = ["Action", "Adventure", "Drama", "Horror", "Science Fiction", "Crime", "Family"]

# Define the output folder path and create it if it doesn't exist
output_folder = "movies"
os.makedirs(output_folder, exist_ok=True)

# Process each genre
for genre in genres:
    # Filter the DataFrame to find movies where the first listed genre is the current genre
    genre_df = filtered_df[filtered_df['genres'].apply(lambda x: x.split(',')[0] == genre)]

    # Find the top 50 movies with the highest vote average in this genre
    top_movies = genre_df.nlargest(50, 'vote_average')

    # Define the path for the output CSV file within the 'movies' folder
    genre_file_path = os.path.join(output_folder, f"{genre}_top_50_movies.csv")

    # Save these top 50 movies into a CSV file
    top_movies.to_csv(genre_file_path, index=False)

print("CSV files created successfully for each genre with the top 50 movies!")