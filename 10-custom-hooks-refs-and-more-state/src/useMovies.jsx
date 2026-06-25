import { useState, useEffect } from "react";

// api key
const KEY = "d2062652";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.();

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
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal },
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();

          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          // console.error(err.message);

          // ignoring the error from abort
          if (err.name !== "Abort Error") setError(err.message);
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

      //when we search for another movie,we want to close the previous movie details
      //so before fetching the movie close the details
      // handleCloseMovie();

      fetchMovies();

      //cleanup function
      //each time there is new re-render our controller will abort the current fetch request
      //cancel the current request each time new request comes
      return function () {
        controller.abort();
      };
    },
    [query],
  );

  return { movies, error, isLoading };
}
