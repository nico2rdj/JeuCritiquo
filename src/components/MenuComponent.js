import React, { Component } from "react";
import {
  Media,
  Card,
  CardImg,
  CardImgOverlay,
  CardBody,
  CardText,
  CardTitle
} from "reactstrap";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGame: null
    };
  }

  onGameSelect(game) {
    this.setState({ selectedGame: game });
  }

  renderGame(game) {
    if (game != null) {
      return (
        <Card>
          <CardImg width="100%" src={game.image} alt={game.name} />
          <CardBody>
            <CardTitle>{game.name}</CardTitle>
            <CardText>{game.description}</CardText>
          </CardBody>
        </Card>
      );
    } else {
      return <div />;
    }
  }

  render() {
    const menu = this.props.games.map(game => {
      return (
        <div key={game.id} className="col-12 col-md-5 m-1">
          <Card onClick={() => this.onGameSelect(game)}>
            <CardImg width="100%" src={game.image} alt={game.name} />
            <CardImgOverlay>
              <CardTitle>{game.name}</CardTitle>
            </CardImgOverlay>
          </Card>

          {/*
          <Media tag="li">
            <Media left middle>
              <Media object src={game.image} alt={game.name} />
            </Media>
            <Media body className="ml-5">
              <Media heading>{game.name}</Media>
              <p>{game.description}</p>
            </Media>
          </Media>
        */}
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">{menu}</div>
        <div className="row">{this.renderGame(this.state.selectedGame)}</div>
      </div>
    );
  }
}

export default Menu;
