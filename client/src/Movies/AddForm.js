import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const AddForm = props => {
  const { push } = useHistory();
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams();
  const { setMovieList, movieList } = props;

  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };

  const handleSubmit = e => {
    //addMovies on the list
    const multiStars = movie.stars.split(', ')
    const movieToAdd = {
      ...movie,
      title: movie.title,
      director: movie.director,
      metascore: movie.metascore,
      stars: multiStars,
    }
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies`, movieToAdd)
      .then(res => {
        console.log(res)
        setMovieList(res.data)
        push("/");
      })
      .catch(err=>{
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
          pattern=" 0+.[0-9][1-9][0-9]$"
        />

        <input
          type="text"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={movie.stars}
        />

        <button className="md-button form-button">Add</button>
      </form>
    </div>
  );
};

export default AddForm;