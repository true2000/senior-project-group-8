import pandas as pd
import os

# Load the dataset
file_path = "/Users/lukelambert/Desktop/TMDB_movie_dataset_v11.csv"
dataset = pd.read_csv(file_path)


# Filter out adult movies
dataset = dataset[dataset['adult'] == False]

# Define the path for the new CSV file to be saved on your desktop
output_file_path = "/Users/lukelambert/Desktop/non_adult_movie_dataset.csv"

# Save the filtered data to a CSV file
dataset.to_csv(output_file_path, index=False, encoding='utf-8')
