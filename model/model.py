# To install pytorch run the following type the following into a terminal
# pip install torch torchvision torchaudio
import torch
# To install pandas run the following command in the terminal
# pip install pandas
import pandas as pd

def train(data):
    # useing the idea of collaborative filtering
    data_frame = pd.read_csv("model/TMDB_movie_dataset_v11.csv")
    new_data_frame = data_frame[["id", "title", "vote_average", "release_date", "original_language","genres"]]
    # Displays the number of movies
    ##print(new_data_frame.id.nunique())
    # Rounds the user vote_average to a whole number
    ##print(new_data_frame.vote_average.round(0).value_counts())
    for x in range (len(data)):
        print(str(data[x]))
        print(new_data_frame.loc[x, "title"])
        #print(data[x])

    ##print(torch.sort(torch.Tensor(new_data_frame.vote_average.values)))

input = ["Interstellar", "Harry Potter and the Prisoner of Azkaban"]
train(input)