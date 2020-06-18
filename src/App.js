import React, { useState, useEffect, useForm } from 'react';
import axios from 'axios';
import Movies from './Movies.js';
import Shows from './Shows.js';

function App() {
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  let search = (e) => {
    setSearchTerm(e.target.value);
  };

  // REQUEST SEARCHED TV
  useEffect(() => {
    console.log(searchTerm);
    axios.get('/searchTV', { params: { searchTerm: searchTerm } }).then((data) => {
      console.log(data);
      setShows(data.data);
    });
  }, [searchTerm]);

  // REQUEST SEARCHED MOVIES
  useEffect(() => {
    console.log(searchTerm);
    axios.get('/searchMovies', { params: { searchTerm: searchTerm } }).then((data) => {
      console.log(data);
      setMovies(data.data);
    });
  }, [searchTerm]);

  // INITIAL MOVIE LIST REQUEST
  useEffect(() => {
    axios.get('/mov').then((data) => {
      // console.log(data);
      setMovies(data.data);
    });
  }, []);

  // INITIAL TV LIST REQUEST
  useEffect(() => {
    axios.get('/tv').then((data) => {
      // console.log(data);
      setShows(data.data);
    });
  }, []);

  return (
    <React.Fragment>
      <h1>Welcome To My Media</h1>
      <form>
        <div>
          <input type="text" name="search" onChange={search} />
        </div>
      </form>

      <Movies data={movies} />
      <Shows data={shows} />
    </React.Fragment>
  );
}

{
  /*

  //OLD METHOD THAT I USED TO DISPLAY ALL MOVIES

  <div>
        {movies.map((movie) => {
          return <div>{movie}</div>;
        })}
  </div> */
}

export default App;
