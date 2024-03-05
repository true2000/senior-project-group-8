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

# Directory to save the split files
#save_dir = "/Users/lukelambert/Desktop/letter"
os.makedirs(save_dir, exist_ok=True)

# Loop through each letter of the alphabet
for letter in string.ascii_uppercase:
    # Filter the data for titles starting with the current letter
    filtered_data = export_data[export_data['title'].str.startswith(letter, na=False)]

    # Define the export path for the current letter
    export_path = os.path.join(save_dir, f"{letter}.csv")

    # Save the filtered data to a CSV file
    filtered_data.to_csv(export_path, sep=',', index=False, encoding='utf-8')
