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

function RenderGame({ game }) {
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

function RenderComments({ comments }) {
  if (comments != null) {
    return (
      <div>
        <h4>
          <strong>Commentaires</strong>
        </h4>
        {comments.map(comment => (
          <div key={comment.id}>
            <p>{comment.comment}</p>
            <p>
              --{comment.author},
              {new Intl.DateTimeFormat("en-us", {
                year: "numeric",
                month: "short",
                day: "2-digit"
              }).format(new Date(Date.parse(comment.date)))}
            </p>
          </div>
        ))}
      </div>
    );
  } else {
    return <div />;
  }
}

const GameDetail = props => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.game.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.game.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 mt-1">
          <RenderGame game={props.game} />
        </div>
        <div className="col-12 col-md-5 mt-1">
          <RenderComments comments={props.comments} />
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
