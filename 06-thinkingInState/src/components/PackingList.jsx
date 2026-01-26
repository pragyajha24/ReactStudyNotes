import { useState } from "react";
import Item from "./Item.jsx";

export default function PackingList({ items, onDeleteItem,onToggleItem ,onClearList}) {

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
