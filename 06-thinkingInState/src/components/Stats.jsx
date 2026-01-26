export default function Stats({items }) {

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
