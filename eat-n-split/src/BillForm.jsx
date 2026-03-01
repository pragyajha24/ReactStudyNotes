export default function BillForm() {
  return (
    <form className="form-split-bill">
      <h1>SPLIT A BILL WITH SARAH</h1>
      <label>💰 Bill value</label>
      <input type="number" />

      <label>🧍‍♀️ Your expense</label>
      <input type="number" />

      <label>👫 Sarah's expense:</label>
      <input type="number" />

      <label>🤑 Who is paying the bill?</label>
      <select>
        <option>You</option>
        <option>Friend</option>
      </select>

      <button>Split bill</button>
    </form>
  );
}
