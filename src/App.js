import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Gen1 from "./components/Gen1";
import Gen2 from "./components/Gen2";

/*
Displays the navigation bar for the page as well as the appropiate routes to
each 'page'
*/
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <nav className="navbar is-fixed-top">
            <div className="navbar-item">
              <h1>Pokédex</h1>
            </div>
            <div className="navbar-menu">
              <div className="navbar-start">
                <Link className="navbar-item" to="/">
                  Generation 1
                </Link>
                <Link className="navbar-item" to="/gen2">
                  Generation 2
                </Link>
              </div>
            </div>
          </nav>
          <Route exact path="/" component={Gen1} />
          <Route exact path="/gen2" component={Gen2} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
