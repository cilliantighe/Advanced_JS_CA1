import React from "react";
import ReactDOM from "react-dom";
import PokemonGrid from "./components/PokemonGrid";

ReactDOM.render(
  <div>
    <div className="container is-fluid">
      <PokemonGrid />
    </div>
  </div>,
  document.getElementById("root")
);
