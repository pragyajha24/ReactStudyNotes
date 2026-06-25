import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";

// api key
const KEY = "d2062652";

export default function App() {
  //state of input field- search movies
  const [query, setQuery] = useState("");

  //state for watched movie - watchedsummary
  // const [watched, setWatched] = useState([]);

  //state for selected movie and displaying movie details
  const [selectedId, setSelectedId] = useState(null);

  // to fetch movie data from api
  //useMovies custom  hook
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  // SECOND STEP of storing data in local storage -
  //  read data back in application as soon as component mounts
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

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

    /*
    STORING DATA IN LOCAL STORAGE THROUGH EVENT HANDLER
    1. LOCAL STORAGE - through stroing the data in local storage each time a new movie is added
    2.key is watched the data we want to store
    3. value is the actual data- we built a new array based on the watched(current state) plus the new movie
    */
    //localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  //handler to delete movies from movies list
  //filter() goes through every movie in array one by one,
  //  will compare the id and delete whose matches
  function handleDeleteWatched(id) {
    setWatched(function (watched) {
      return watched.filter(function (movie) {
        return movie.imdbID !== id;
      });
    });
  }

  /* useEffect for STORING DATA IN LOCAL STORAGE */
  /*  FIRST STEP - updating the local storage as watched state gets updated*/
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched],
  );

  return (
    <>
      <NavBar>
        <Logo />
        <SearchInput query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
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
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
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
  const inputEl = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputEl.current) return;

        if (e.code === "Enter") {
          inputEl.current.focus();
          setQuery("");
        }
      }

      document.addEventListener("keydown", callback);

      //clean up function
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [setQuery],
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
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

// component that will be displayed if there is selectedId
//component to display movie details
function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // state for user rating - star rating
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating],
  );

  // checking if the watched array of object includes the array
  //  object that is currently selected.
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  //deriving userrating from watched array
  const watchedUserRating = watched.find(function (movie) {
    return movie.imdbID === selectedId;
  })?.userRating;

  // console.log(isWatched);

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
      countRatingDecision: countRef.current,
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
        //  console.log(data);
        setMovie(data);

        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId],
  );

  // for changing the page title - in browser tab
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      // doing cleanup function
      return function () {
        document.title = "usePopcorn";
        // cleanup effect also run for movie we selected before- on re-rendered
        //it remembers the name of previous movie because of closures
        console.log(`Clean up effect for movie ${title}`);
      };
    },
    [title],
  );

  // keypress function
  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseMovie();
          console.log("CLOSING");
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseMovie],
  );

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
              {!isWatched ? (
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
                <p>
                  You rated this movie <strong>{watchedUserRating}</strong>
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

function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map(function (movie) {
        return (
          <WatchedMovie
            movie={movie}
            onDeleteWatched={onDeleteWatched}
            key={movie.imdbID}
          />
        );
      })}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
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

        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
