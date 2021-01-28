import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateForm from "./Movies/UpdateForm";
import AddForm from "./Movies/AddForm"

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/update-movie/:id" render={
        props => {
          return (<UpdateForm {...props} setMovieList={setMovieList} movieList={movieList}
          />);
        }
      } />
      
        <Route path="/add-movie" render={
        props => {
          return (<AddForm {...props} setMovieList={setMovieList} 
          />);
        }
       } />
      <Route path="/movies/:id">
        <Movie
          addToSavedList={addToSavedList} setMovieList={setMovieList}
          movieList={movieList} />
      </Route>
    </>
  );
};

export default App;
