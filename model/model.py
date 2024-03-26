# To install pytorch run the following type the following into a terminal
# pip install torch torchvision torchaudio
import torch
import torch.nn as nn

# To install pandas run the following command in the terminal
# pip install pandas
import pandas as pd
import numpy as np

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
    print("Enter a movie: try Star Wars (1977) or Liar Liar (1997)\n")
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
def torchModel():
    path = "model/TMDB_movie_dataset_v11.csv"
    data_frame = pd.read_csv(path)
    data_frame = data_frame[['id', 'title', 'vote_average', 'vote_count', 'genres']]
    print(data_frame.head())

    ratings = pd.DataFrame(data_frame.groupby('title')['vote_average'].mean())
    ratings['num_of_ratings'] = pd.DataFrame(data_frame.groupby('title')['vote_count'].mean())
    print(ratings.head())

    print(ratings.sort_values('vote_average', ascending = False).head(10))

    #moviemat = data_frame.pivot_table(index=['title'], values=['id','vote_average','vote_count', 'genres'], aggfunc='mean')
    moviemat = data_frame.pivot_table(index=['title'], values='vote_count', aggfunc='mean')
    interstellar_user_ratings = moviemat.loc['Interstellar', 'vote_count']
    print(interstellar_user_ratings.head())


    '''
    def recommend_movies(movie_title, num_recommendations=5):
        # Find the movie ID based on the title
        movie_id = data_frame.loc[data_frame['title'] == movie_title, 'id'].values[0]

        print(movie_id)

        # Calculate similarity scores with other movies
        similarity_scores = data_frame.corrwith(data_frame['id'])
        
        print(similarity_scores)

        # Sort movies by similarity
        similar_movies = similarity_scores.sort_values(ascending=False)

        print(similar_movies)

        # Exclude the input movie itself
        similar_movies = similar_movies.drop(movie_id)

        print(similar_movies)

        # Get top N recommendations
        recommended_movies = data_frame.loc[similar_movies.index][:num_recommendations]

        return recommended_movies[['title', 'vote_average', 'vote_count']]

    # Example usage
    user_input = input("Enter a movie title: ")
    recommendations = recommend_movies(user_input)
    print(recommendations)'''


example()   
#train()
#torchModel()