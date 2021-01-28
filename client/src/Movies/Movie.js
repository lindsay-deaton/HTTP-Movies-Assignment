import React, { useEffect, useState,  } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList, movieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const updateMovie = () => {
    push(`/update-movie/${params.id}`)
  }

  const deleteMovie = (id) => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res.data)
        const movies = [...movieList];
        setMovieList(movies.filter(movie => {
          return movie.id !== res.data ?
            //params.id is checking the url
            setMovieList(movie) : ""
        }))
          push('/movies')
      })
      .catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
<button onClick={updateMovie}>
        Update
      </button>
      <button onClick={deleteMovie}>
        Delete
      </button>
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      
    </div>
  );
}

export default Movie;
