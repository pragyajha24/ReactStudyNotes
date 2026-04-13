import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.jsx'
// import './index.css'
import StarRating from "./StarRating";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} />
    {/* <StarRating maxRating={10} />

    <StarRating /> */}
  </React.StrictMode>,
);

// temporaily , commented css as star rating does not depend on it and, commented app so  dont have to create a  brand new react app to build this component"
