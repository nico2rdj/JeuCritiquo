import React from "react";
import {
  Media,
  Card,
  CardImg,
  CardImgOverlay,
  CardBody,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import { Link } from "react-router-dom";

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
    <Card>
      <Link to={`/menu/${game.id}`}>
        <CardImg width="100%" src={game.image} alt={game.name} />
        <CardImgOverlay>
          <CardTitle>{game.name}</CardTitle>
        </CardImgOverlay>
        <CardBody>{game.description}</CardBody>
      </Link>
    </Card>
  );
}

const Menu = props => {
  const menu = props.games.map(game => {
    return (
      <div key={game.id} className="col-12 col-md-5 m-1">
        <RenderMenuItem game={game} />
        {/*}
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
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Menu</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Menu</h3>
          <hr />
        </div>
      </div>
      <div className="row">{menu}</div>
    </div>
  );
};

export default Menu;
