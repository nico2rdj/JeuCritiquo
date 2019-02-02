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

function RenderComments({ game }) {
  if (game != null) {
    const comments = game.comments;

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
    <div className="row">
      <div className="col-12 col-md-5 mt-1">
        <RenderGame game={props.game} />
      </div>
      <div className="col-12 col-md-5 mt-1">
        <RenderComments game={props.game} />
      </div>
    </div>
  );
};

export default GameDetail;
