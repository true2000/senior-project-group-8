# To install pandas run the following command in the terminal
# pip install pandas
import pandas as pd

# Insert the location of the data_set
file_path = "model/TMDB_movie_dataset_v11.csv"
dataset = pd.read_csv(file_path)

# Type out the data you want to find 
export_data = dataset[["id", "title","poster_path"]]
export_data.to_csv('utils\main_data.csv', sep=',', index=False, encoding='utf-8')