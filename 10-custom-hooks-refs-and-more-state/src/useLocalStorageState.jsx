import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key],
  );

  return [value, setValue];
}

/* 
1> is there a specific reason that we return the array [value , setValue] , and not an obj {value ,setValue} since we'll be destructring them anyway?
ans - 1. If a hook returns an array ([x]), then you are able to name the variables yourself.
If a hook returns an object ({x}), then you must use the same variables names as returned by the hook itself.
These are the two rules that you should keep in mind. If I consider the example of the useState hook, then it returns us an array with the first value being the piece of state and the second value being the updater function or what we call as the state updating function.

2> whenEver setWatched() is called what actually runs is setValue which in tuen changes the value of Value state variable and effect runs causing a rerender and value of watched is also updated with that..
ans - 2. Absolutely. When you schedule a state change by invoking the updater value with the value that you want to update the piece of state with, then it causes a re-render of the component. This re-render is necessary because it is only because of that the new value will be reflected in the UI. You are right in your interpretation about the useState.

3> so watched and set watched are not actually state variables but act like one because the process happening in the point i said above??
ans - 3. See the watched is definitely a piece of state but setWatched is not. setWatcher is the corresponding state updating function or the update function that you can call. This updater function is the one that is needed to cause a change in the piece of state which is watched.

*/
