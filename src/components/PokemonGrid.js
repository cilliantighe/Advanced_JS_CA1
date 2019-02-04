import React from "react";
import Pokemon from "./Pokemon";
import axios from "axios";

class PokemonGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pokemon: [] };
  }

  componentDidMount() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(response => {
        this.setState({ pokemon: response.data.results });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const pokemonList = this.state.pokemon.map(poke => (
      <Pokemon key={poke.name} name={poke.name} url={poke.url} />
    ));
    return <div className="columns is-multiline">{pokemonList}</div>;
  }
}

export default PokemonGrid;
