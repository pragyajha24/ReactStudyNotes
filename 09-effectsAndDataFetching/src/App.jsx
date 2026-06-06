// Lecture 140 - 158

import { useEffect, useState } from "react";

// api key
const KEY = "d2062652";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchMovies() {
      setIsLoading(true);

      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&s=harry Potter`,
      );

      const data = await res.json();

      setMovies(data.Search);

      setIsLoading(false);
    }

    fetchMovies();
  }, []);

  return (
    <>
      <NavBar>
        <Logo />
        <SearchInput />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>{isLoading ? <Loader /> : <MovieList movies={movies} />}</Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading ..</p>;
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchInput() {
  const [query, setQuery] = useState("");

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong>
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "-" : "+"}
      </button>

      {isOpen1 && children}
    </div>
  );
}

/*
function ListBox({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "-" : "+"}
      </button>

      {isOpen1 &&  children }
    </div>
  );
}
*/

function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies?.map(function (movie) {
        return <Movie movie={movie} key={movie.imdbID} />;
      })}
    </ul>
  );
}

function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

const average = function (arr) {
  return arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
};

/*
function WatchedBox() {
  const [isOpen2, setIsOpen2] = useState(true);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "-" : "+"}
      </button>

      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />

          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  );
}
*/

function WatchedSummary({ watched }) {
  const avgImdbRating = average(
    watched.map(function (movie) {
      return movie.imdbRating;
    }),
  );

  const avgUserRating = average(
    watched.map(function (movie) {
      return movie.userRating;
    }),
  );

  const avgRuntime = average(
    watched.map(function (movie) {
      return movie.runtime;
    }),
  );

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length}</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime}</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map(function (movie) {
        return <WatchedMovie movie={movie} key={movie.imdbID} />;
      })}
    </ul>
  );
}

function WatchedMovie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>

      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime}</span>
        </p>
      </div>
    </li>
  );
}
