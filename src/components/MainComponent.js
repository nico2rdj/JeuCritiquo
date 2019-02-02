import React, { Component } from "react";
import Menu from "./MenuComponent";
import GameDetail from "./GamedetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
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
        <Header />
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
        <Footer />
      </div>
    );
  }
}

export default Main;
