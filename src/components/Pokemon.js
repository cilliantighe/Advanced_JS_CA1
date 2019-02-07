import React from "react";

// Component that is used for creating every individual pokemon
class Pokemon extends React.Component {
  // Assigning props that were passed from the parent into the state variables
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: this.props.name,
      move: "",
      images: this.props.images,
      animate: false,
      detail: false
    };

    // Functions that are called when the mouse is over component
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  // Function for onMouseOver
  onMouseOver() {
    this.setState({
      animate: true
    });
  }

  // Function for onMouseOut
  onMouseOut() {
    this.setState({
      animate: false,
      detail: true
    });
  }

  render() {
    /*
    The moves that were passed by the parent are now being mapped into a list
    that holds only the name. Each pokemon's move list varies in size. For the
    purpose of the application I'm only going to display one move.
    */
    let moveList = "";
    moveList = this.props.moves.map(move => {
      return move.move;
    });

    // Adds the first move from the array to the variable
    this.state.move = moveList[0].name;

    /*
    The image will animate when the mouse is hovering over it. A small card,
    detailing some information about the pokemon also appears. The animation was
    provided by the animate class "https://daneden.github.io/animate.css/"
    */
    return (
      <div className="column is-1">
        <img
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          className={
            this.state.animate === true
              ? "centerImage bounce animated"
              : "centerImage"
          }
          src={this.state.images.front_default}
          alt={this.state.name}
        />
        <div className={this.state.animate === true ? "cardInfo card" : "hide"}>
          <div className="card-content">
            <p className="has-text-dark">
              <span className="has-text-weight-semibold">Pokédex Entry: </span>{" "}
              {this.props.id}
            </p>
            <p className="has-text-dark is-capitalized">
              <span className="has-text-weight-semibold">Name: </span>{" "}
              {this.props.name}
            </p>
            <p className="has-text-dark is-capitalized">
              <span className="has-text-weight-semibold">Move: </span>{" "}
              {this.state.move.replace(/[^a-zA-Z ]/g, "")}
            </p>
          </div>
        </div>
        <h3 className="is-capitalized has-text-dark has-text-centered  ">
          #{this.state.id}
        </h3>
        <h2 className="is-capitalized has-text-dark has-text-weight-semibold has-text-centered  ">
          {this.state.name}
        </h2>
        <figure className="image is-48x48" />
      </div>
    );
  }
}

export default Pokemon;
