import { useState } from "react";
import "./index.css";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  // adding new items to the state
  function handleAddItems(item) {
    setItems(function (items) {
      return [...items, item];
    });
  }

  function handleDeleteItem(id) {
    // console.log(id);
    setItems(function (items) {
      return items.filter(function (item) {
        return item.id !== id;
      });
    });
  }

  function handleToggleItem(id) {
    setItems(function (items) {
      return items.map(function (item) {
        return item.id === id ? { ...item, packed: !item.packed } : item;
      });
    });
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem}  />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1> 🏝️ Far Away 👜 </h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // //moving this state to parent component
  // const [items, setItems] = useState([]);

  // // adding new items to the state
  // function handleAddItems(item) {
  //   setItems(function (items) {
  //     return [...items, item];
  //   });
  // }

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    // handleAddItems(newItem);
    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip ?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, function (_, i) {
          return i + 1;
        }).map(function (num) {
          return (
            <option value={num} key={num}>
              {" "}
              {num}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem,onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map(function (item) {
          return <Item item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id} />;
        })}
      </ul>
    </div>
  );
}

// item is the destructed  prop name
//function Item({item}){}
function Item({ item, onDeleteItem,onToggleItem}) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => {onToggleItem(item.id)}} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}{" "}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>
        {" "}
        👜 You have X items on your lists, and you already packed X (X%){" "}
      </em>
    </footer>
  );
}
