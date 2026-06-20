import { useEffect, useState } from "react";

// Currency Converter Exercise - Lecture -158
export default function App() {
  //state for input field
  const [amount, setAmount] = useState(1);

  //state for select - from currency
  const [fromCurrency, setFromCurrency] = useState("USD");

  //state for select -to currency
  const [toCurrency, setToCurrency] = useState("INR");

  //state to show the output on UI
  const [converted, setConverted] = useState("");

  //state for loading
  const [isLoading, setisLoading] = useState(false);

  //use effect state for fetching data from api
  useEffect(
    function () {
      async function convert() {
        setisLoading(true);
        const res = await fetch(
          `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
        );

        const data = await res.json();
        // console.log(data);
        console.log(data.rates[toCurrency]);

        setConverted(data.rates[toCurrency]);

        setisLoading(false);
      }

      /* both currencies can't be same ,so if user has selected both currencies same
      then putting a condition which will prevent convert() from running */
      if (fromCurrency == toCurrency) return setConverted(amount);
      convert();
    },
    [amount, fromCurrency, toCurrency],
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
        <option value="CAD">CAD</option>
      </select>

      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
        <option value="CAD">CAD</option>
      </select>
      <p>
        {converted} {toCurrency}
      </p>
    </div>
  );
}

/* 
isLoading state is used in disabled prop of select elements
, when fetching begins it will disable those and we can not change its value.

*/
