from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse
import numpy as np
import pandas as pd
import difflib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",  # Add the origin of your React app here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # This allows requests from any origin (for development purposes)
    allow_methods=["*"],  # This allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # This allows all HTTP headers
    allow_credentials=True,  # This allows sending cookies and authentication headers
)

# Load data and perform pre-processing
movies_data = pd.read_csv('movies.csv')

selected_features = ['genres', 'keywords', 'tagline', 'cast', 'director']
for feature in selected_features:
    movies_data[feature] = movies_data[feature].fillna('')

combined_features = movies_data['genres']+' '+movies_data['keywords']+' '+movies_data['tagline']+' '+movies_data['cast']+' '+movies_data['director']

vectorizer = TfidfVectorizer()
feature_vectors = vectorizer.fit_transform(combined_features)

# Getting the similarity scores using cosine similarity
similarity = cosine_similarity(feature_vectors)

@app.get("/recommend/")
async def recommend_movie(movie_name: str = Query(..., description="Enter your favorite movie name")):
    list_of_all_titles = movies_data['title'].tolist()
    find_close_match = difflib.get_close_matches(movie_name, list_of_all_titles)
    
    if not find_close_match:
        return {"message": "No similar movie found."}
    
    close_match = find_close_match[0]
    index_of_the_movie = movies_data[movies_data.title == close_match]['index'].values[0]
    similarity_score = list(enumerate(similarity[index_of_the_movie]))
    sorted_similar_movies = sorted(similarity_score, key=lambda x: x[1], reverse=True)
    
    recommended_movies = []
    for movie in sorted_similar_movies:
        index = movie[0]
        title_from_index = movies_data[movies_data.index == index]['title'].values[0]
        recommended_movies.append(title_from_index)
        if len(recommended_movies) >= 25:
            break
    
    return JSONResponse(content={"recommended_movies": recommended_movies[1:]})
