/* 
1. component that display multiple stars and as we hover over them it displays the currently selected rating
2. when we click on star it gets fixed on that and we can also chnage the rating
3. We will develop this component in complete isolation , so we could reuse it anywhere
4. also make it flexible by allowing for different props , we will make it so that the user of the component can choose what number of stars they want to display 

*/

import { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

const textStyle = {
  lineHeight: "1",
  margin: "0",
};

{
  /* if someone used this component without specifing max rating property , so to solve this  case we will define default value of the property*/
}
// In JS whenever we destructure an object , we can set a default value
//here we are destructing the prop object
export default function StarRating({ maxRating = 5 }) {
  const [rating, setRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
  }

  return (
    <div style={containerStyle}>
      {/* dynamically generating the star elements instead of writing with hand , that's the only way we could have sometimes 5 stars or 10 stars or any other number*/}
      <div style={starContainerStyle}>
        {/*  creates a empty array with 5 elements that we can immediately loop over, by passing a function */}
        {/* i+1 as i is zero based (Array)  */}

        {Array.from({ length: maxRating }, (_, i) => (
          //<span>S{i+1}</span>
          <Star key={i} onRate={() => handleRating(i + 1)} />
        ))}
      </div>
      <p style={textStyle}> {rating || ""} </p>
    </div>
  );
}

const starStyle = {
  width: "48px",
  height: "48px",
  display: "block",
  cursor: "pointer",
};

// creating stars
//called this under star rating component
function Star({ onRate }) {
  return (
    <span role="button" style={starStyle} onClick={onRate}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="#000"
        stroke="#000"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </span>
  );
}
