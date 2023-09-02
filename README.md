# Get-Recced

Not being able to decide what movie to watch was kind of frustrating. Sometimes I wanted to watch something breezy, or sometimes I might want to watch something serious, or something to beat-up the blues, and so on. This indecisiveness led me to take matters into my own hands. 😼

Get Recced! is a movie recommendation website that I built using Python (ML), ReactJS, CSS and all the works. It takes in the title of a movie from the user and using Cosine Similarity, an ML algorithm, recommends 24 similar movies that might pique your interest.
The ML algo uses the 'movies.csv' file which contains data of multiple movies, and accordingly initializes a similarity score for every movie by vectorizing every detail. This score is then used to generate a list of similar movies, which I retrieve using the magic of APIs. 🥸

Here's how the project looks like:

![Get Recced HAHA](https://github.com/maangaipuncture/Get-Recced/blob/main/GETRECCED!!%20-%20Made%20with%20Clipchamp.gif)

Before doing this project, I always wondered how Machine Learning was integrated into everyday software; but now I know. 
I was able to design my own API using FastAPI, and tested it using PostmanAPI. It was fun watching your work actually be put to good use.

In the future, I _might_ implement more features. User profiles, downloadable lists, better algorithms and all that jazz.



## Installation

1. Clone or download the repository.
2. Install the required dependencies by running `npm install` in the project directory. 
3. Start the application using `npm start` command.

## Usage

- Obtain an API Key from TMDb's website and replace wherever mentioned in App.jsx
- Open two seperate terminals.
- On terminal 1, run the frontend ReactJS server using `npm start`.
- On terminal 2, run the ML Python API server using `python -m uvicorn main:test --reload`.
- Access the application in your web browser at `http://localhost:3000`.

## Contributions

Contributions are welcome! If you would like to contribute to this project, feel free to submit a pull request. Please make sure to follow the existing code style and guidelines.

## License

This project is licensed under the [MIT License](LICENSE). You are free to modify and use the code as per the terms and conditions of the license.
