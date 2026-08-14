import { useReducer } from "react";

function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };

    case "inc":
      return { ...state, count: state.count + state.step };

    case "setCount":
      return { ...state, count: action.payload };

    case "setStep":
      return { ...state, step: action.payload };

    case "reset":
      return { count: 0, step: 1 };

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  const date = new Date();
  date.setDate(date.getDate() + count);

  function dec() {
    dispatch({ type: "dec" });
  }

  function inc() {
    dispatch({ type: "inc" });
  }

  function handleReset() {
    dispatch({ type: "reset" });
  }

  function defineCount(e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  }

  function defineStep(e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  }

  return (
    <div className="dataCounter counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />

        <span>Step : {step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>

        <input type="text" value={count} onChange={defineCount} />

        <button onClick={inc}>+</button>
      </div>

      <p>
        {count === 0
          ? `Today is `
          : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        <span>{date.toDateString()}</span>
      </p>

      {count !== 0 || step !== 1 ? (
        <div>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : null}
    </div>
  );
}
