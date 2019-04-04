import React, { useState } from "react";
import ReactDOM from "react-dom";
import suggestionsArray from "./suggestionsArray";
import Autocomplete from "./components/Autocomplete";
import "./styles.scss";

const App = () => {
  return (
    <div className="App">
      <div className="container my-5">
        <div className="form-group">
          <Autocomplete suggestionsArray={suggestionsArray} />
        </div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
