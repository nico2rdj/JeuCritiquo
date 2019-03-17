import React, { Component } from "react";
import Menu from "./MenuComponent";
import GameDetail from "./GamedetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutusComponent";
import SearchEvent from "./SearchEventComponent";
import CreationEvent from "./CreationEvent";
import Event from "./Event";
import SearchGame from "./SearchGameComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  postComment,
  postFeedback,
  postEvent,
  fetchGames,
  fetchComments,
  fetchPromos,
  fetchLeaders,
  fetchEvents,
  loginUser,
  logoutUser
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const mapStateToProps = state => {
  return {
    games: state.games,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    events: state.events,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => ({
  postComment: (gameId, rating, author, comment) =>
    dispatch(postComment(gameId, rating, author, comment)),
  postFeedback: (
    firstname,
    lastname,
    telnum,
    email,
    agree,
    contactType,
    message
  ) =>
    dispatch(
      postFeedback(
        firstname,
        lastname,
        telnum,
        email,
        agree,
        contactType,
        message
      )
    ),
  postEvent: (
    name,
    image,
    price,
    author,
    address,
    city,
    postalCode,
    dateEvent,
    startHour,
    endHour,
    description,
    phone
  ) =>
    dispatch(
      postEvent(
        name,
        price,
        author,
        address,
        image,
        city,
        dateEvent,
        startHour,
        endHour,
        postalCode,
        description,
        phone
      )
    ),
  fetchGames: () => {
    dispatch(fetchGames());
  },
  fetchEvents: () => {
    dispatch(fetchEvents());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  resetEventForm: () => {
    dispatch(actions.reset("event"));
  },
  fetchComments: () => {
    dispatch(fetchComments());
  },
  loginUser: creds => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchPromos: () => {
    dispatch(fetchPromos());
  },
  fetchLeaders: () => {
    dispatch(fetchLeaders());
  }
});

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchGames();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchEvents();
  }

  onGameSelect(gameId) {
    this.setState({ selectedGame: gameId });
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          game={this.props.games.games.filter(game => game.featured)[0]}
          gamesLoading={this.props.games.isLoading}
          gamesErrMess={this.props.games.errMess}
          promotion={
            this.props.promotions.promotions.filter(
              promotion => promotion.featured
            )[0]
          }
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={
            this.props.leaders.leaders.filter(leader => leader.featured)[0]
          }
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
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
            this.props.games.games.filter(
              game => game.id === parseInt(match.params.gameId, 10)
            )[0]
          }
          isLoading={this.props.games.isLoading}
          errMess={this.props.games.errMess}
          comments={this.props.comments.comments.filter(
            comment => comment.gameId === parseInt(match.params.gameId, 10)
          )}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      );
    };

    const EventWithId = ({ match }) => {
      return (
        <Event
          event={
            this.props.events.events.filter(
              event => event.id === parseInt(match.params.eventId, 10)
            )[0]
          }
          isLoading={this.props.events.isLoading}
          errMess={this.props.events.errMess}
        />
      );
    };

    const SearchWithText = ({ match }) => {
      return (
        <SearchGame
          games={this.props.games.games}
          search={match.params.searchText}
        />
      );
    };

    return (
      <div className="App">
        <Header
          auth={this.props.auth}
          loginUser={this.props.loginUser}
          logoutUser={this.props.logoutUser}
        />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch>
              <Route path="/home" component={HomePage} />
              <Route
                exact
                path="/menu"
                component={() => <Menu games={this.props.games} />}
              />

              <Route path="/menu/:gameId" component={GameWithId} />
              <Route path="/events/:eventId" component={EventWithId} />
              <Route path="/search/:searchText" component={SearchWithText} />
              <Route path="/games/:gameId" component={GameWithId} />

              <Route
                exact
                path="/contactus"
                component={() => (
                  <Contact
                    postFeedback={this.props.postFeedback}
                    resetFeedbackForm={this.props.resetFeedbackForm}
                  />
                )}
              />
              <Route exact path="/aboutus" component={AboutPage} />
              <Route
                exact
                path="/events"
                component={() => <SearchEvent events={this.props.events} />}
              />
              <Route
                exact
                path="/creationevent"
                component={() => (
                  <CreationEvent
                    events={this.props.events}
                    postEvent={this.props.postEvent}
                  />
                )}
              />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
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
