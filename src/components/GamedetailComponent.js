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
  BreadcrumbItem,
  Navbar,
  Nav,
  Button,
  Col,
  Row,
  Label,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

const imgStyle = {
  maxHeight: 500,
  maxWidth: 500,
  height: 400,
  width: 300,
  marginRight: "10px"
};

const borderBox = {
  border: "0px solid #dbdbdb",
  borderRadius: "5px",
  marginBottom: "10px",
  width: "100%"
};

const calendar = {
  color: "black",
  marginTop: "40px",
  marginLeft: "50px",
  marginRight: "50px"
};

const date = {
  color: "black",
  fontSize: "22px",
  marginLeft: "17px",
  marginRight: "auto",
  marginTop: "15px",
  fontWeight: "bold",
  textAlign: "center"
};

const verticalLine = {
  borderLeft: "1px solid #dbdbdb",
  height: "300px",
  marginTop: "20px"
};

const peopleStyle = {
  color: "green"
};

const organiseStyle = {
  color: "#009999"
};

const organiserButtonStyle = {
  backgroundColor: "#D80027",
  borderRadius: "5px",
  marginTop: "8px",
  border: "0px"
};

function RenderGameD({ game }) {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: "scale(0.5) translateY(-50%)"
      }}
    >
      <div className="row">
        <Media style={borderBox}>
          <div style={verticalLine} />
          <Media left href="#">
            <Media
              object
              src={baseUrl + game.image}
              style={imgStyle}
              alt={game.name}
            />
          </Media>
          <Media body style={{ marginLeft: "15px" }}>
            <div className="row">
              <div className="col-md-3">
                <div className="row">
                  <div className="col-6">
                    <Media left heading style={{ marginTop: "10px" }}>
                      {game.name}
                    </Media>
                  </div>
                </div>

                <div className="row mt-4">
                  <span className="fa fas fa-2x fa-clock-o black" />
                  <span
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#f2f2f2"
                    }}
                  >
                    {game.playingTime} minutes
                  </span>
                </div>
                <div className="row mt-4">
                  <div style={{ marginRight: "auto" }}>
                    <span className="fa fas fa-2x fa-users black" />
                    <span
                      style={{
                        marginLeft: "10px",
                        backgroundColor: "#f2f2f2"
                      }}
                    >
                      {game.playerMin} - {game.playerMax} joueurs
                    </span>
                  </div>
                </div>

                <div className="row mt-4">
                  <div style={{ marginRight: "auto" }}>
                    <span className="fa fas fa-2x fa-puzzle-piece black" />
                    <span
                      style={{
                        marginLeft: "10px",
                        backgroundColor: "#f2f2f2"
                      }}
                    >
                      {game.category}
                    </span>
                  </div>
                </div>

                <div className="row mt-4">
                  <span className="fa fa-2x fa-universal-access black" />
                  <span
                    style={{
                      marginLeft: "10px",
                      backgroundColor: "#f2f2f2"
                    }}
                  >
                    +{game.ageMin} ans
                  </span>
                </div>
              </div>
              <div style={verticalLine} />

              <div className="col-md-5" style={{ marginTop: "12px" }} />
              <div className="col-md-3">
                <span
                  style={{ marginLeft: "20px", color: "#F5C518" }}
                  className="fa fas fa-2x fa-star mt-3"
                />
                <span
                  style={{
                    marginLeft: "20px",
                    fontSize: "25px",
                    fontWeight: "bold"
                  }}
                >
                  {game.rating}{" "}
                  <span
                    style={{
                      marginLeft: "2px",
                      fontSize: "15px",
                      color: "grey"
                    }}
                  >
                    / 10
                  </span>
                </span>
              </div>
            </div>
          </Media>
        </Media>
      </div>
    </FadeTransform>
  );
}

const SearchGame = props => {
  const allEvents = props.games.map(game => {
    var gameId = "/games/".concat(game.id);
    return (
      <div key={game.id} className="col-12 col-md-12">
        <Link to={gameId} style={{ textDecoration: "none", color: "black" }}>
          <RenderGame game={game} />
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
        </Link>
      </div>
    );
  });
};

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(
      this.props.gameId,
      values.rating,
      values.name,
      values.comment
    );
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    return (
      <React.Fragment>
        <Button className="mb-4" onClick={this.toggleModal} outline>
          <span className="fa fa-pencil fa-lg" /> Poster un commentaire
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            Poster un commentaire
          </ModalHeader>
          <ModalBody>
            <div className="row row-content">
              <div className="col-12 col-md-9">
                <LocalForm onSubmit={values => this.handleSubmit(values)}>
                  <Row>
                    <Label htmlFor="rating" md={2}>
                      {" "}
                      Note{" "}
                    </Label>
                  </Row>
                  <Row className="form-group">
                    <Col md={12}>
                      <Control.select
                        model=".rating"
                        id="rating"
                        name="rating"
                        className="form-control"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </Control.select>
                    </Col>
                  </Row>
                  <Row>
                    <Label htmlFor="name" md={10}>
                      {" "}
                      Votre nom{" "}
                    </Label>
                  </Row>
                  <Row className="form-group">
                    <Col md={12}>
                      <Control.text
                        model=".name"
                        id="name"
                        name="name"
                        placeholder="Nom"
                        className="form-control"
                        validators={{
                          required,
                          minLength: minLength(3),
                          maxLength: maxLength(15)
                        }}
                      />
                      <Errors
                        className="text-danger"
                        model=".name"
                        show="touched"
                        messages={{
                          required: "Required",
                          minLength: "Must be greater than 3 characters",
                          maxLength: "Must be 15 characters or less"
                        }}
                      />
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Label htmlFor="comment" md={2}>
                      {" "}
                      Votre commentaire{" "}
                    </Label>
                  </Row>
                  <Row>
                    <Col md={10}>
                      <Control.textarea
                        model=".comment"
                        id="comment"
                        name="comment"
                        rows="12"
                        className="form-control"
                      />
                    </Col>
                  </Row>

                  <Row className="form-group">
                    <Col className="mt-4">
                      <Button type="submit" color="primary">
                        Poster
                      </Button>
                    </Col>
                  </Row>
                </LocalForm>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

function RenderGame({ game }) {
  if (game != null) {
    return (
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)"
        }}
      >
        <Card>
          <CardImg width="100%" src={baseUrl + game.image} alt={game.name} />
          <CardBody>
            <CardTitle>{game.name}</CardTitle>
            <CardText>{game.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    );
  } else {
    return <div />;
  }
}

function RenderComments({ comments, postComment, gameId }) {
  if (comments != null) {
    return (
      <div>
        <h4>
          <strong>Commentaires</strong>
        </h4>
        <Stagger in>
          {comments.map(comment => (
            <Fade in>
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
            </Fade>
          ))}
        </Stagger>
        <CommentForm postComment={postComment} gameId={gameId} />
      </div>
    );
  } else {
    return <div />;
  }
}

const GameDetail = props => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else {
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
          <div className="col-12 col-md-12 mt-1">
            <RenderGameD game={props.game} />
          </div>
        </div>
        <div className="row">
          <h5>Description</h5>
          <p>{props.game.description}</p>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 mt-1">
            <RenderComments
              comments={props.comments}
              postComment={props.postComment}
              gameId={props.game.id}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default GameDetail;
