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

  function handleClearList(){

    const confirm = window.confirm("Are you sure you want to elete all items?")

     if(confirm)  setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleClearList}  />
      <Stats  items={items}/>
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

function PackingList({ items, onDeleteItem,onToggleItem ,onClearList}) {


  // for sorting options,created state and action for each state value
  const [sortBy,setSortBy] = useState("input");

  let sortedItems;

  if(sortBy === 'input') sortedItems = items; 

  if(sortBy === 'description') sortedItems = items.slice().sort(function(a,b){
    return a.description.localeCompare(b.description);
  })

  if(sortBy === 'packed') sortedItems = items.slice().sort(function(a,b){
    return Number(a.packed) - Number(b.packed);
  })

  

  return (
    <div className="list">
      <ul>
        {sortedItems.map(function (item) {
          return <Item item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id} />;
        })}
      </ul>

      {/* sorting items based on select criteria */}
      <div className="actions">

      <select value={sortBy}  onChange={e => setSortBy(e.target.value)}>
      <option  value="input">Sort by input order</option>
      <option  value="description">Sort by description</option>
      <option  value="packed">Sort by packed status</option>
      </select>

      <button  className="button" onClick = {onClearList}>Clear List</button>
      </div>
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

function Stats({items }) {

  if(!items.length) return <p className="stats"> <em>Start adding some items to your packing list </em></p>

  const numItems = items.length;
  const numPacked = items.filter(function(item){
                         return item.packed === true;
                                         }).length;
   const percentage = Math.round(numPacked / numItems * 100);                                      

  return (
    <footer className="stats">
      <em>
        {percentage === 100 ? 'You got everything! Ready to go ': 
        `👜 You have ${numItems} items on your lists, and you already packed ${numPacked} (${percentage}%)` }
      </em>
    </footer>
  );
}
