import React, { Component } from "react";
import Menu from "./MenuComponent";
import GameDetail from "./GamedetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutusComponent";

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

    const AboutPage = () => {
      return <About leaders={this.state.leaders} />;
    };

    const GameWithId = ({ match }) => {
      return (
        <GameDetail
          game={
            this.state.games.filter(
              game => game.id === parseInt(match.params.gameId, 10)
            )[0]
          }
          comments={this.state.comments.filter(
            comment => comment.gameId === parseInt(match.params.gameId, 10)
          )}
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
          <Route path="/menu/:gameId" component={GameWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Route exact path="/aboutus" component={AboutPage} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
