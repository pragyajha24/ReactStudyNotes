import { useEffect, useState } from "react";

// Currency Converter Exercise - Lecture -158
export default function App() {
  const [amount, setAmount] = useState(1);

  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");

  const [isLoading, setisLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        setisLoading(true);
        const res = await fetch(
          `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
        );

        const data = await res.json();
        console.log(data);
        setisLoading(false);
      }

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
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
        <option value="CAD">CAD</option>
      </select>

      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="INR">INR</option>
        <option value="CAD">CAD</option>
      </select>
      <p>OUTPUT</p>
    </div>
  );
}
