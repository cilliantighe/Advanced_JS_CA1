import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pokedex: [], pokemon: [] };
  }
  componentDidMount() {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/")
      .then(response => {
        this.setState({ pokedex: response.data.results });
        for (var i = 0; i < this.state.pokedex.length; i++) {
          axios
            .get(this.state.pokedex[i].url)
            .then(response => {
              this.setState({
                pokemon: this.state.pokemon.concat(response.data)
              });
              console.log(this.state.pokemon);
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const pokedexList = this.state.pokemon.map(p => <div><h1>{p.name}</h1><img src={p.sprites.front_default} /></div>);
    return <div>{pokedexList}</div>;
  }
}

ReactDOM.render(<Pokemon />, document.getElementById("root"));
