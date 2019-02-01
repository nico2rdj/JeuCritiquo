import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Menu from "./MenuComponent";
import GameDetail from "./GamedetailComponent";
import { GAMES } from "../shared/games";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: GAMES,
      selectedGame: null
    };
  }

  onGameSelect(gameId) {
    this.setState({ selectedGame: gameId });
  }

  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Jeu Critiquo</NavbarBrand>
          </div>
        </Navbar>
        <Menu
          games={this.state.games}
          onClick={gameId => this.onGameSelect(gameId)}
        />
        <GameDetail
          game={
            this.state.games.filter(
              game => game.id === this.state.selectedGame
            )[0]
          }
        />
      </div>
    );
  }
}

export default Main;
