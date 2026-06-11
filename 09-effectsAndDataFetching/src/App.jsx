// Lecture 140 - 158

import { useEffect, useState } from "react";
import StarRating from "./StarRating";

// api key
const KEY = "d2062652";

export default function App() {
  //state of input field- search movies
  const [query, setQuery] = useState("");

  const [movies, setMovies] = useState([]);

  //state for watched movie - watchedsummary
  const [watched, setWatched] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  //state for selected movie and displaying movie details
  const [selectedId, setSelectedId] = useState(null);

  //handler for movie component for showing movie details
  function handleSelectMovie(id) {
    // setSelectedId(id);
    /* functionality - if clicked on current movie i.e. current id close the detail component , 
    so can close detail movie either by arrow button or by clicking on selected movie */
    setSelectedId(function (selectedId) {
      return id === selectedId ? null : id;
    });
  }

  //handler to close the movie detail
  function handleCloseMovie() {
    setSelectedId(null);
  }

  //handler for adding new movie item in watched array with existing movie item
  function handleAddWatched(movie) {
    setWatched(function (watched) {
      return [...watched, movie];
    });
  }


  //handler to delete movies from movies list
  //filter() goes through every movie in array one by one,
  //  will compare the id and delete whose matches
  function handleDeleteWatched(id){
    setWatched(function(watched){
      return watched.filter(function(movie){
        return  movie.imdbID !== id
      })
    })
  }

  // to fetch movie data from api
  useEffect(
    function () {

      //cleaning up data fetching
      //native browser api - Abort controller for cleanup function
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);

          //resetting the error state
          setError("");

          //connecting abort controller with fetch function,
          //pass in a second argument where we define the object with signal property
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal:controller.signal}
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          console.error(err.message);

          // ignoring the error from abort
          if(err.name !== "AbortError")

          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      // when no query set movie to empty error and no error on screen
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();


      //cleanup function
      //each time there is new re-render our controller will abort the current fetch request
      //cancel the current request each time new request comes
      return function(){
        controller.abort();
      }
    },
    [query],
  );

  return (
    <>
      <NavBar>
        <Logo />
        <SearchInput query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        {/* <Box>
        {isLoading ? <Loader /> : <MovieList movies={movies} />}
        </Box> */}

        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        {/* conditionally rendering using ternary operator the component if there is a selectedId */}
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function ErrorMessage({ message }) {
  return <p className="error">⛔ {message}</p>;
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

function SearchInput({ query, setQuery }) {
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

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map(function (movie) {
        return (
          <Movie
            movie={movie}
            onSelectMovie={onSelectMovie}
            key={movie.imdbID}
          />
        );
      })}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
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

// component that will be displayed if there is selectedId
//component to display movie details
function MovieDetails({ selectedId, onCloseMovie, onAddWatched,watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // state for user rating - star rating
  const [userRating, setUserRating] = useState("");

  // checking if the watched array of object includes the array
  //  object that is currently selected.
    const isWatched = watched.map(movie => movie.imdbID).includes(selectedId)

    //deriving userrating from watched array
    const watchedUserRating = watched.find(function(movie){
      return movie.imdbID === selectedId;
    })?.userRating
    

  console.log(isWatched)

  //destructing data out of this movie- choosing our own variable name
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,   
    Director: director,
    Genre: genre,
  } = movie;

  // console.log(title, year, genre);

 

  function handleAdd() {
    //  this one will eventually call that function that we pass
    // in <MovieDetails /> as a prop - onAddWatched

    //creating new watched movie object
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    //new movie object passed as argument
    onAddWatched(newWatchedMovie);

    onCloseMovie();
  }

  // to fetch movie details based on id parameter
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
        );

        const data = await res.json();
        console.log(data);
        setMovie(data);

        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId],
  );

  // for changing the page title - in browser tab
   useEffect(function(){
    if(!title) return;
    document.title = `Movie | ${title}`

    // doing cleanup function
    return function(){
      document.title="usePopcorn";
      // cleanup effect also run for movie we selected before- on re-rendered
      //it remembers the name of previous movie because of closures
      console.log(`Clean up effect for movie ${title}`)
    }
  },[title]) 

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">

            { !isWatched ? (
             <>
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
              />

              {/* button to select the movie to add to watched summary list */}
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add to the list
                </button>
              )} 
            </> 
            ) : (
              <p>You rated this movie <strong>{watchedUserRating}</strong> 
              <span>⭐️ </span>
               </p> 
            )}
          </div>

            <p>
              {" "}
              <em>{plot}</em>{" "}
            </p>
            <p>Staring {actors}</p>
            <p>Directed by {director} </p>
          </section>
        </>
      )}
    </div>
  );
}

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
      return isNaN(movie.runtime) ? 0 : movie.runtime;
    }),
  );

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched,onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map(function (movie) {
        return <WatchedMovie movie={movie}  onDeleteWatched={onDeleteWatched} key={movie.imdbID} />;
      })}
    </ul>
  );
}

function WatchedMovie({ movie,onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>

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
          <span>{movie.runtime} min</span>
        </p>

        <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>
        X
        </button>
      </div>
    </li>
  );
}
