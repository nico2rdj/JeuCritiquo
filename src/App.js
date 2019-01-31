import React, { Component } from "react";
import logo from "./logo.svg";
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "./components/MenuComponent";
import "./App.css";
import { GAMES } from "./shared/games";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: GAMES
    };
  }

  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Jeu Critiquo</NavbarBrand>
          </div>
        </Navbar>
        <Menu games={this.state.games} />
      </div>
    );
  }
}

export default App;
