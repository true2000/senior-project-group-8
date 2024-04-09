# senior-project-group-8


## Introduction:
This project aims to develop a content-based filtering approach for a movie recommendation system, focusing on utilizing movie attributes to address scenarios given by the user. The gathered attributes such as genre, rating, actors and more will come from a diverse dataset. Some feature vectors representing these attributes will allow for similarity computations between movies by using metrics like cosine similarity. From a search the top-N most related movies will be recommended. The frameworks that will be using for machine learning are PyTorch for the backend API it will be Flask, while for the frontend we will utilise React. 

## Technology Stack:

### Machine Learning:
As mentioned we will be using PyTorch to create the model for this project, the main reason that we decided to use it is it's easier to prototype a model quickly with multiple changes and provides an easy transition. Ontop of this it is has a lower skill floor to learning compared to other models that we considered such as Tensor Flow. 

### Frontend
For our frotend we are using React. React made this most sense as some of us have experience with React and it is the most commonly used framework for modern web apps. We lastly decided that we should use TypeScript as we are all most proficient in statically typed languages such as Java and this will allow less errors and nice developer tools such as code completion and syntax highlighting for errors.  
### Backend
 Early on into our discussions we determined that our project wasn't going to be a large scale one, so it made it a quick decision that we would use Flask as it doesn't need that strict of a project structure. Another big reason that we wanted to use Flask was that PyTorch is natively supported in Python, so it will be easier to access the model in our backend. 


 ## Contributors:
Luke Lambart, Ryan Nock, Devin Pattison, Paul Richnow

