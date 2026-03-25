import { useState } from "react";

export default function FormSplitBill() {
  const [bill, setBill] = useState("");
  const [expense, setExpense] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  return (
    <form className="form-split-bill">
      {/* <h2>SPLIT A BILL WITH SARAH</h2> */}

      <label>💰 Bill value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧍‍♀️ Your expense</label>
      <input
        type="number"
        value={expense}
        onChange={(e) => setExpense(Number(e.target.value))}
      />

      <label>👫 Sarah's expense:</label>
      <p> {bill - expense} </p>

      <label>🤑 Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">Friend</option>
      </select>

      <button>Split bill</button>
    </form>
  );
}
