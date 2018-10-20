// @flow

import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { Input } from "./components/Input";

const App = () => {
  return (
    <div className="App">
      <Input />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
