# To install pytorch run the following type the following into a terminal
# pip install torch torchvision torchaudio
import torch
# To install pandas run the following command in the terminal
# pip install pandas
import pandas as pd

# Example progarm with userInput

def example():
    column_names = ['user_id', 'item_id', 'rating', 'timestamp']
    path = 'https://media.geeksforgeeks.org/wp-content/uploads/file.tsv'
    # useing the idea of collaborative filtering
    data_frame = pd.read_csv(path, sep='\t', names=column_names)
    data_frame.head()
    movie_titles = pd.read_csv('https://media.geeksforgeeks.org/wp-content/uploads/Movie_Id_Titles.csv') 
    movie_titles.head()
    data = pd.merge(data_frame, movie_titles, on='item_id') 
    data.head()
    data.groupby('title')['rating'].mean().sort_values(ascending=False).head()
    data.groupby('title')['rating'].count().sort_values(ascending=False).head()
    ratings = pd.DataFrame(data.groupby('title')['rating'].mean())
    ratings['num of ratings'] = pd.DataFrame(data.groupby('title')['rating'].count())
    ratings.head
    moviemat = data.pivot_table(index ='user_id', 
              columns ='title', values ='rating') 
    moviemat.head() 
    ratings.sort_values('num of ratings', ascending = False).head(10)
    print("Enter a movie:\n")
    userInput = input()
    movie_user_ratings = moviemat[userInput] 
    print(movie_user_ratings.head())

    # analysing correlation with similar movies 
    similar_to_movie = moviemat.corrwith(movie_user_ratings) 
    corr_movie = pd.DataFrame(similar_to_movie, columns =['Correlation']) 
    corr_movie.dropna(inplace = True) 
    print(corr_movie.head())

    # Similar movies to user selection
    corr_movie.sort_values('Correlation', ascending = False).head(10) 
    corr_movie = corr_movie.join(ratings['num of ratings']) 
    
    corr_movie.head() 
    
    print(corr_movie[corr_movie['num of ratings']>100].sort_values('Correlation', ascending = False).head())

def train():
    path = "model/TMDB_movie_dataset_v11.csv"
    data_frame = pd.read_csv(path)
    print(data_frame.head())

    print(data_frame.groupby('title')['vote_average'].mean().sort_values(ascending=False).head())
    print(data_frame.groupby('title')['vote_average'].count().sort_values(ascending=False).head())

    # creating dataframe with 'rating' count values 
    ratings = pd.DataFrame(data_frame.groupby('title')['vote_average'].mean())  
    ratings['num of ratings'] = pd.DataFrame(data_frame.groupby('title')['vote_average'].count()) 
    print(ratings.head())

    # Sorting values according to  
    # the 'num of rating column'
    # running into issue with negative dimensions
    print(ratings['num of ratings'].to_numpy())
    moviemat = data_frame.pivot_table(index ='id', 
                columns='title', values = 'vote_count') 
    
    moviemat.head()
    
    print(ratings.sort_values('num of ratings', ascending = False).head(10))

    interstellar_user_ratings = moviemat['Interstellar'] 
    
    print(interstellar_user_ratings.head())

example()   
#train()