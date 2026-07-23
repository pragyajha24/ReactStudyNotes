import { useState } from "react";

export default function App() {
  return <Counter />;
}

function Counter() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  const date = new Date();
  date.setDate(date.getDate() + count);

  function stepMinus() {
    setStep(function (s) {
      return s - 1;
    });
  }

  function stepPlus() {
    setStep(function (s) {
      return s + 1;
    });
  }

  function countMinus() {
    setCount(function (c) {
      return c - step;
    });
  }

  function countPlus() {
    setCount(function (c) {
      return c + step;
    });
  }

  function handleReset() {
    setStep(1);
    setCount(0);
  }

  return (
    <div className="dataCounter">
      <div className="steps">
        <button onClick={stepMinus}> - </button>
        <p> Steps : {step} </p>
        <button onClick={stepPlus}> + </button>
      </div>

      <div className="counts">
        <button onClick={countMinus}> - </button>
        <p>Count : {count} </p>
        <button onClick={countPlus}> + </button>
      </div>

      <p>
        <span>
          {" "}
          {count === 0
            ? `Today is `
            : count > 0
              ? `${count} days from today is `
              : `${Math.abs(count)} days ago was `}{" "}
        </span>
        <span> {date.toDateString()} </span>
      </p>

      <button className="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
