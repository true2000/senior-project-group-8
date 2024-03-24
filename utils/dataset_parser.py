import pandas as pd
import string
import os

# Load the dataset
#file_path = "/Users/lukelambert/Desktop/TMDB_movie_dataset_v11.csv"
dataset = pd.read_csv(file_path)

# Convert 'release_date' to datetime format to extract the year
dataset['release_date'] = pd.to_datetime(dataset['release_date'])
dataset['year'] = dataset['release_date'].dt.year

# Select only the desired columns: 'id', 'title', 'year', and 'poster_path'
export_data = dataset[["id", "title", "year", "poster_path"]]

# Define the path for the new CSV file to be saved on your desktop
#output_file_path = "/Users/lukelambert/Desktop/filtered_movie_dataset.csv"

# Export the data to a new CSV file
export_data.to_csv(output_file_path, index=False)
