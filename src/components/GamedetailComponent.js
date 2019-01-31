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

class GameDetail extends Component {
  constructor(props) {
    super(props);
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

  renderComments(game) {
    if (game != null) {
      const comments = game.comments;

      return (
        <div>
          <h4>
            <strong>Comments</strong>
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

  render() {
    return (
      <div className="row">
        <div className="col-12 col-md-5 mt-1">
          {this.renderGame(this.props.game)}
        </div>
        <div className="col-12 col-md-5 mt-1">
          {this.renderComments(this.props.game)}
        </div>
      </div>
    );
  }
}

export default GameDetail;
