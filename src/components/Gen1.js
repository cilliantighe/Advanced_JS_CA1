import React from "react";
import Pokemon from "./Pokemon";
import axios from "axios";

// Component that holds all the pokemon from generation 1
class Gen1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonList: [],
      pokemonData: [],
      types: [],
      loadTime: 0,
      searchTerm: "",
      searchType: ""
    };

    // Functions that handle any change or select on the component
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  /*
  While the api is being loaded from the server, a "loading" screen is displayed
  Getting a reference to the div that has the loading animate on it.
  The setTimeout function is used to hide the loading screen by applying a css
  class and reveal the content that was loaded from the api on the screen
  */
  componentDidMount() {
    // Reference to the div elements on the page
    const ld = document.getElementById("loadS");
    const content = document.getElementById("content");
    ld.className = "ldScreen";

    // Pulling data from the server
    axios
      .get("https://pokeapi.co/api/v2/generation/1/")
      .then(response => {
        this.setState({
          // Passing the data into the appropiate state variables
          pokemonList: response.data.pokemon_species,
          loadTime: response.data.pokemon_species.length
        });
        /* Another api is required for this app as the first call only gives the
        name and a url(which does not contain all the information required). A
        url is created using the name of the retrieved pokemon
        */
        // A loop is used to call for each pokemon in the array
        for (var i = 0; i < this.state.pokemonList.length; i++) {
          axios
            .get(
              `https://pokeapi.co/api/v2/pokemon/${
                this.state.pokemonList[i].name
              }/`
            )
            //Adding the data on each call to the variable
            .then(response => {
              this.setState({
                pokemonData: this.state.pokemonData.concat(response.data)
              });
            })
            .catch(error => {
              console.log(error);
            });
        }
        // This call is used to fetch all the 'types' of pokemon i.e. fire, ice
        axios
          .get("https://pokeapi.co/api/v2/type/")
          .then(response => {
            this.setState({
              types: response.data.results
            });
          })
          .catch(error => {
            console.log(error);
          });
        /*
           A loading screen while the data is being fetched. It's not 100% perfect
           but it gives the illusion
           */
        setTimeout(() => (ld.className += " hide"), this.state.loadTime * 30);
        setTimeout(
          () => (content.className = "container is-fluid fadeIn animated"),
          this.state.loadTime * 30
        );
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Function for handling the search input field
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  // Function for handling the search select field
  handleSelect(event) {
    const target = event.target;
    const value = target.options[target.selectedIndex].value;
    console.log(target.options[target.selectedIndex].value);
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    /*
    As react is asynchronous, the pokemon the nested axios request listed the
    pokemon in the wrong order. The function below lists them by id number
    */
    let sortedPokemon;
    sortedPokemon = this.state.pokemonData.sort((a, b) =>
      a.id > b.id ? 1 : -1
    );

    // This conditional statement checks whether an option has been selected
    if (this.state.searchType && this.state.searchType !== "select type")
      sortedPokemon = sortedPokemon.filter(poke =>
        poke["types"][0]["type"]["name"].startsWith(
          this.state.searchType.toLowerCase()
        )
      );

    // This conditional statement checks whether there is any text in the search
    if (this.state.searchTerm)
      sortedPokemon = sortedPokemon.filter(poke =>
        poke.name.startsWith(this.state.searchTerm.toLowerCase())
      );

    // Creates multiple pokemon components from the results
    const pokemonList = sortedPokemon.map(poke => {
      return (
        <Pokemon
          key={poke.id}
          id={poke.id}
          name={poke.name}
          images={poke.sprites}
          moves={poke.moves}
        />
      );
    });

    // Creates a list of options based off the amount of types
    let options = [];
    options.push(<option key={"select type"}>select type</option>);
    options.push(
      this.state.types.map(type => {
        return <option key={type.name}>{type.name}</option>;
      })
    );

    // Returning the grid of pokemon with a search bar and select option
    return (
      <div id="content" className="hide">
        <form>
          <div className="field is-grouped">
            <div className="navbar-item">
              <input
                className="input clearDefault"
                type="text"
                name="searchTerm"
                value={this.state.searchTerm}
                onChange={this.handleChange}
                placeholder="Search Pokemon Name... "
              />
            </div>
            <div className="navbar-item">
              <div className="select clearDefault">
                <select name="searchType" onChange={this.handleSelect}>
                  {options}
                </select>
              </div>
            </div>
          </div>
        </form>
        <div className="columns is-multiline">{pokemonList}</div>
      </div>
    );
  }
}

export default Gen1;
