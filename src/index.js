import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const mapId = process.env.REACT_APP_MAP_ID;

const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=marker&map_ids=${mapId}@loading=async`;
script.async = true;
document.body.appendChild(script);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
