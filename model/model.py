# To install pytorch run the following type the following into a terminal
# pip3 install torch torchvision torchaudio
import torch
import pandas as pd

data_frame = pd.read_csv("model/TMDB_movie_dataset_v11.csv")
new_data_frame = data_frame[["release_date", "original_language","genres"]]
#data = torch.fr(new_data_frame)