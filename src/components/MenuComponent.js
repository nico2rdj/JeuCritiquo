import React from "react";
import {
  Media,
  Card,
  CardImg,
  CardImgOverlay,
  CardBody,
  CardText,
  CardTitle
} from "reactstrap";

/*
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
  */

function RenderMenuItem({ game, onClick }) {
  return (
    <Card onClick={() => onClick(game.id)}>
      <CardImg width="100%" src={game.image} alt={game.name} />
      <CardImgOverlay>
        <CardTitle>{game.name}</CardTitle>
      </CardImgOverlay>
    </Card>
  );
}

const Menu = props => {
  const menu = props.games.map(game => {
    return (
      <div key={game.id} className="col-12 col-md-5 m-1">
        <RenderMenuItem game={game} onClick={props.onClick} />
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
      <div className="row"> </div>
    </div>
  );
};

export default Menu;
