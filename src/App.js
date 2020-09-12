import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movies from './Movies.js';
import Shows from './Shows.js';
import NavBar from './NavBar.js';
import { genreList, translateName } from './translateGenre';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [selectedGenre, setSelectedGenre] = useState('ALL');
  const [type, setMediaType] = useState('ALL');

  let search = (e) => {
    setSearchTerm(e.target.value);
  };

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

  // GET BY GENRE
  function getByGenre(event) {
    event.preventDefault();
    setSelectedGenre(event.target.value);
    axios.get('/mov/byGenre', { params: { searchGenre: translateName(event.target.value) } }).then((data) => {
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
      <div className="app-container">
        <NavBar
          changeMediaType={changeMediaType}
          type={type}
          years={years}
          getByYear={getByYear}
          selectedYear={selectedYear}
          genres={genreList}
          getByGenre={getByGenre}
          selectedGenre={selectedGenre}
          search={search}
          movieLength={movies.length}
          showLength={shows.length}
        />

        {type === 'ALL' || type === 'Movies' ? <Movies data={movies} term={searchTerm} /> : <React.Fragment></React.Fragment>}
        {type === 'ALL' || type === 'TV' ? <Shows data={shows} term={searchTerm} /> : <React.Fragment></React.Fragment>}
      </div>
    </React.Fragment>
  );
}

export default App;
