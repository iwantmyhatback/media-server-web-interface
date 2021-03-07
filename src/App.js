import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import axios from 'axios';
import Movies from './Movies.js';
import Shows from './Shows.js';
import NavBar from './NavBar/NavBar.js';
import Editor from './Editor/Editor.js';
import { genreList, translateName } from './TranslationFunctions/translateGenre';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [selectedGenre, setSelectedGenre] = useState('ALL');
  const [selectedSeen, setSelectedSeen] = useState('{true,false}');
  const [selectedSort, setSelectedSort] = useState({ col: 'year', dir: 'DESC' });
  const [type, setMediaType] = useState('Movies');
  const [showHide, setShowHide] = useState(true);
  const [editingTitle, setEditingTitle] = useState({});

  let search = (e) => {
    setSearchTerm(e.target.value);
  };

  // EXTERNAL REQUESTS //////////
  // MOVIE LIST REQUEST
  useEffect(() => {
    axios
      .get('/mov', {
        params: {
          searchSeen: selectedSeen,
          searchYear: selectedYear,
          searchGenre: translateName(selectedGenre),
          sortColumn: selectedSort.col,
          sortDirection: selectedSort.dir,
        },
      })
      .then((data) => {
        setMovies(data.data);
      });
  }, [selectedYear, selectedGenre, selectedSeen, selectedSort, showHide]);

  // TELEVISION LIST REQUEST
  useEffect(() => {
    axios.get('/tv', { params: { searchGenre: translateName(selectedGenre) } }).then((data) => {
      setShows(data.data);
    });
  }, [selectedGenre]);

  // INITIAL YEARS LIST REQUEST (POPULATE DROPDOWN)
  useEffect(() => {
    axios.get('/mov/yrs').then((data) => {
      setYears(data.data);
      return data.data;
    });
  }, []);

  // CHANGE HANDLERS //////////
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

  // SET SELECTED SEEN STATUS ON CHANGE
  function handleSeenChange(event) {
    event.preventDefault();
    setSelectedSeen(event.target.value);
  }

  // SET SELECTED SORT ON CHANGE
  function handleSortChange(event) {
    event.preventDefault();
    let sortArr = event.target.value.split('.');
    setSelectedSort({ col: sortArr[0], dir: sortArr[1] });
  }

  // SET SELECTED MEDIA TYPE ON CHANGE
  function handleMediaTypeChange(event) {
    event.preventDefault();
    setMediaType(event.target.value);
  }

  // SET MAIN CONTENT TO SHOWN OR HIDDEN ON CHANGE
  function handleShowHideChange(event) {
    event.preventDefault();
    // console.log(event.target.value);

    axios.get('/edit', { params: JSON.parse(event.target.value) }).then((data) => {
      // console.log(data);
      setEditingTitle(data.data);
      setShowHide(false);
    });
  }

  return (
    <React.Fragment>
      <div className="app-container">
        <NavBar
          type={type}
          handleMediaTypeChange={handleMediaTypeChange}
          years={years}
          handleYearChange={handleYearChange}
          selectedYear={selectedYear}
          genres={genreList}
          handleGenreChange={handleGenreChange}
          selectedGenre={selectedGenre}
          selectedSeen={selectedSeen}
          handleSeenChange={handleSeenChange}
          selectedSort={`${selectedSort.col}.${selectedSort.dir}`}
          handleSortChange={handleSortChange}
          search={search}
          movieLength={movies.length}
          showLength={shows.length}
        />

        <React.Fragment>
          {showHide ? (
            <div className="showHide">
              {type === 'ALL' || type === 'Movies' ? <Movies data={movies} term={searchTerm} showHide={handleShowHideChange} /> : <React.Fragment />}
              {type === 'ALL' || type === 'TV' ? <Shows data={shows} term={searchTerm} /> : <React.Fragment />}
            </div>
          ) : (
            <Editor data={editingTitle} term={searchTerm} done={setShowHide} />
          )}
        </React.Fragment>
      </div>
    </React.Fragment>
  );
}

export default App;
