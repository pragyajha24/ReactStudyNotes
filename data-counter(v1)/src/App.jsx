import React, { useState } from "react";
import reactDom from "react-dom/client";
 import "./index.css";

export default function App() {
  return (
    <>
      <Counter />
    </>
  );
}

function Counter() {
 
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

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

  return (
    <div className="dataCounter">
      <div className="steps">
        <button onClick={stepMinus}>-</button>
        <p>Step : {step}</p>
        <button onClick={stepPlus}>+</button>
      </div>

      <div className="counts">
        <button onClick={countMinus}>-</button>
        <p>Count : {count}</p>
        <button onClick={countPlus}>+</button>
      </div>

      <p>
      <span> {count === 0 ? 'Today is ' : count > 0 ? `${count} days from today is ` : `${Math.abs(count)} days ago was `} </span>
      <span>
        {date.toDateString()}
        </span>
      </p>
    </div>
  );
}
