import { Children, useState } from "react";

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {


  // lifting the state
 const [bill, setBill] = useState("");
   const [tip, setTip] = useState(0);

  return (
    <div>
      <h1>Tip calculator</h1>
      <Bill  bill={bill} setBill={setBill} />
      <Tip tip={tip} setTip={setTip} >
        <p>How did you like the service ?</p>
      </Tip>

      <Tip tip={tip} setTip={setTip}>
        <p>How did your friend like the service ? </p>{" "}
      </Tip>

      <TotalBill bill={bill} tip={tip} />

      <Reset />
    </div>
  );
}

function Bill({bill,setBill}) {
  // const [bill, setBill] = useState("");

  return (
    <div>
      <p>How much was the bill ?</p>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>
    </div>
  );
}

function Tip({ children,tip ,setTip}) {
  // const [tip, setTip] = useState(0);

  return (
    <div>
      {children}

      <select value={tip} onChange={(e) => setTip(Number(e.target.value))}>
        <option value={0}>Dissatisfied(0%)</option>
        <option value={5}>It was okay(5%)</option>
        <option value={10}>It was good(10%)</option>
        <option value={20}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function TotalBill({bill,tip}) {
  return (
    <div>
      <h2>
      You pay({bill} + ${tip})
      
      </h2>
    </div>
  );
}

function Reset(){
  return (
    <button>
    Reset
    </button>
  )
}



