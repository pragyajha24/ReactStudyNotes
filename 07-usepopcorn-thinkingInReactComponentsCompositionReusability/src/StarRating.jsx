/* 
1. component that display multiple stars and as we hover over them it displays the currently selected rating
2. when we click on star it gets fixed on that and we can also chnage the rating
3. We will develop this component in complete isolation , so we could reuse it anywhere
4. also make it flexible by allowing for different props , we will make it so that the user of the component can choose what number of stars they want to display 

*/



export default function StarRating(){
    return (
        <div>
        {   /* dynamically generating the star elements instead of writing with hand , that's the only way we could have sometimes 5 stars or 10 stars or any other number*/}
        <div>
        {/* creates a empty array with 5 elements that we can immediately loop over, by passing a function */}
        {/* i+1 as i is zero based (Array)  */}
        {Array.from({length:5}, (_,i) => <span>S{i+1} </span>)}
         </div>
        <p>10 </p>
         </div>
    )
}