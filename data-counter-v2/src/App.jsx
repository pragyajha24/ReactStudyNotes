import { useState } from "react";

//Version 2
export default function App() {
  const [count, setCount] = useState(0);
  const [range, setRange] = useState(1);

  function countMinus() {
    setCount(function (c) {
      return c - range;
    });
  }

  function countPlus() {
    setCount(function (c) {
      return c + range;
    });
  }

  function handleReset() {
    setCount(0);
    setRange(1);
  }

  const date = new Date();
  date.setDate(date.getDate() + count);

  return (
    <div className="dataCounter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={range}
          onChange={(e) => setRange(Number(e.target.value))}
        />

        <span>Step : {range}</span>
      </div>

      <div className="counts">
        <button onClick={countMinus}>-</button>
        {/* <p>Count : {count}</p> */}
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />

        <button onClick={countPlus}>+</button>
      </div>

      <p>
        {count === 0
          ? `Today is `
          : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        <span>{date.toDateString()}</span>
      </p>

      {count !== 0 || range !== 1 ? (
        <div>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : null}
    </div>
  );
}

// Version 1
/*
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
 */
