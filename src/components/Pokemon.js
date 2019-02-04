import React from "react";
import axios from "axios";

// Pokemon for display page
class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: "", images: {} };
  }

  componentDidMount() {
    axios
      .get(this.props.url)
      .then(response => {
        this.setState({
          name: response.data.name,
          images: response.data.sprites
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="column is-1">
        <img src={this.state.images.front_default} />
        <h1 className="is-capitalized">{this.state.name}</h1>
        <figure className="image is-48x48" />
      </div>
    );
  }
}

export default Pokemon;
