import { useState } from "react";

import Logo from "./Logo.jsx"
import Form from "./Form.jsx";
import PackingList from "./PackingList.jsx";
import Item from "./Item.jsx";
import Stats from "./Stats.jsx";

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
if(!items.length) return;
    const confirm = window.confirm("Are you sure you want to delete all items?")

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







