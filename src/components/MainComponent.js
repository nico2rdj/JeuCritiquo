import React, { Component } from "react";
import Menu from "./MenuComponent";
import GameDetail from "./GamedetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutusComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addComment } from "../redux/ActionCreators";

const mapStateToProps = state => {
  return {
    games: state.games,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
};

const mapDispatchToProps = dispatch => ({
  addComment: (gameId, rating, author, comment) =>
    dispatch(addComment(gameId, rating, author, comment))
});

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onGameSelect(gameId) {
    this.setState({ selectedGame: gameId });
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          game={this.props.games.filter(game => game.featured)[0]}
          promotion={
            this.props.promotions.filter(promotion => promotion.featured)[0]
          }
          leader={this.props.leaders.filter(leader => leader.featured)[0]}
        />
      );
    };

    const AboutPage = () => {
      return <About leaders={this.props.leaders} />;
    };

    const GameWithId = ({ match }) => {
      return (
        <GameDetail
          game={
            this.props.games.filter(
              game => game.id === parseInt(match.params.gameId, 10)
            )[0]
          }
          comments={this.props.comments.filter(
            comment => comment.gameId === parseInt(match.params.gameId, 10)
          )}
          addComment={this.props.addComment}
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
            component={() => <Menu games={this.props.games} />}
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);
