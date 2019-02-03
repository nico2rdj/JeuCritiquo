import React, { Component } from "react";
import Menu from "./MenuComponent";
import GameDetail from "./GamedetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";

/* import db */
import { GAMES } from "../shared/games";
import { COMMENTS } from "../shared/comments";
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";

import { Switch, Route, Redirect } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: GAMES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS
    };
  }

  onGameSelect(gameId) {
    this.setState({ selectedGame: gameId });
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          game={this.state.games.filter(game => game.featured)[0]}
          promotion={
            this.state.promotions.filter(promotion => promotion.featured)[0]
          }
          leader={this.state.leaders.filter(leader => leader.featured)[0]}
        />
      );
    };

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/menu"
            component={() => <Menu games={this.state.games} />}
          />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
