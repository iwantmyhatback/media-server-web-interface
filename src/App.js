import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movies from './Movies.js';
import Shows from './Shows.js';
import NavBar from './NavBar/NavBar.js';
import { genreList, translateName } from './TranslationFunctions/translateGenre';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [selectedGenre, setSelectedGenre] = useState('ALL');
  const [type, setMediaType] = useState('Movies');

  let search = (e) => {
    setSearchTerm(e.target.value);
  };

  // MOVIE LIST REQUEST
  useEffect(() => {
    console.log('running');
    axios.get('/mov', { params: { searchYear: selectedYear, searchGenre: translateName(selectedGenre) } }).then((data) => {
      setMovies(data.data);
    });
  }, [selectedYear, selectedGenre]);

  // INITIAL TV LIST REQUEST
  useEffect(() => {
    axios.get('/tv', { params: { searchGenre: translateName(selectedGenre) } }).then((data) => {
      setShows(data.data);
    });
  }, [selectedGenre]);

  // INITIAL YEARS LIST
  useEffect(() => {
    axios.get('/mov/yrs').then((data) => {
      setYears(data.data);
      return data.data;
    });
  }, []);

  // SET SELECTED YEAR ON CHANGE
  function handleYearChange(event) {
    event.preventDefault();
    setSelectedYear(event.target.value);
  }

  // SET SELECTED GENRE ON CHANGE
  function handleGenreChange(event) {
    event.preventDefault();
    setSelectedGenre(event.target.value);
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
          handleYearChange={handleYearChange}
          selectedYear={selectedYear}
          genres={genreList}
          handleGenreChange={handleGenreChange}
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
