import React, { useState, useEffect, useForm } from 'react';
import axios from 'axios';
import Movies from './Movies.js';
import Shows from './Shows.js';
import Years from './Years.js';
import Types from './Types.js';

function App() {
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [type, setMediaType] = useState('ALL');

  // const [clicked, clickExpand] = useState(false);

  // let search = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // // REQUEST SEARCHED TV
  // useEffect(() => {
  //   console.log(searchTerm);
  //   axios.get('/searchTV', { params: { searchTerm: searchTerm } }).then((data) => {
  //     console.log(data);
  //     setShows(data.data);
  //   });
  // }, [searchTerm]);

  // // REQUEST SEARCHED MOVIES
  // useEffect(() => {
  //   console.log(searchTerm);
  //   axios.get('/searchMovies', { params: { searchTerm: searchTerm } }).then((data) => {
  //     console.log(data);
  //     setMovies(data.data);
  //   });
  // }, [searchTerm]);

  // INITIAL MOVIE LIST REQUEST
  useEffect(() => {
    axios.get('/mov').then((data) => {
      setMovies(data.data);
      return data.data;
    });
  }, []);

  // INITIAL TV LIST REQUEST
  useEffect(() => {
    axios.get('/tv').then((data) => {
      setShows(data.data);
    });
  }, []);

  // INITIAL YEARS LIST
  useEffect(() => {
    axios.get('/mov/yrs').then((data) => {
      setYears(data.data);
      return data.data;
    });
  }, []);

  // GET BY YEAR
  function getByYear(event) {
    event.preventDefault();
    setSelectedYear(event.target.value);
    axios.get('/mov/byYr', { params: { searchYear: event.target.value } }).then((data) => {
      setMovies(data.data);
    });
  }

  // CHOOSE MEDIA TYPE
  function changeMediaType(event) {
    event.preventDefault();
    setMediaType(event.target.value);
  }

  return (
    <React.Fragment>
      <div className="CONTAINER">
        <h1>Welcome To Tristan's Fabulous Film Factory</h1>
        <Types change={changeMediaType} selected={type} />
        {type === 'ALL' || type === 'Movies' ? <Years years={years} change={getByYear} selected={selectedYear} /> : <React.Fragment></React.Fragment>}

        {/* <form>
        <div>
          <input type="text" name="search" onChange={search} />
        </div>
      </form> */}

        {type === 'ALL' || type === 'Movies' ? <Movies data={movies} /> : <React.Fragment></React.Fragment>}
        {type === 'ALL' || type === 'TV' ? <Shows data={shows} /> : <React.Fragment></React.Fragment>}
      </div>
    </React.Fragment>
  );
}

export default App;
