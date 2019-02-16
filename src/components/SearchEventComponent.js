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

const imgStyle = {
  maxHeight: 200,
  maxWidth: 200,
  height: 200,
  width: 200,
  marginRight: "10px"
};

const borderBox = {
  border: "1px solid #dbdbdb",
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
  fontSize: "30px",
  marginLeft: "30px",
  fontWeight: "bold"
};

const verticalLine = {
  borderLeft: "1px solid #dbdbdb",
  height: "160px",
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

function RenderEvent({ event }) {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: "scale(0.5) translateY(-50%)"
      }}
    >
      <div className="row">
        <Media style={borderBox}>
          <Media left href="#">
            <div className="row">
              <span className="fa fa-5x fa-calendar black" style={calendar} />
            </div>
            <div className="row" style={date}>
              15/02
            </div>
          </Media>
          <div style={verticalLine} />
          <Media left href="#">
            <Media
              object
              src={baseUrl + event.image}
              style={imgStyle}
              alt={event.name}
            />
          </Media>
          <Media body style={{ marginLeft: "15px" }}>
            <div className="row">
              <Media left heading style={{ marginTop: "10px" }}>
                {event.name}
              </Media>
            </div>
            <div className="row mr-1" style={{ height: "80px" }}>
              {event.description}
            </div>
            <div className="row">
              <div className="col-1 mt-3">
                <span className="fa fa-3x fa-location-arrow black" />
              </div>
              <div className="col-2 mt-4">
                <h5>{event.city}</h5>
              </div>
              <div className="col-1 mt-3">
                <span
                  className="fa fa-3x fa-address-card black"
                  style={organiseStyle}
                />
              </div>
              <div className="col-3 mt-4">
                <h5 style={organiseStyle}>{event.author}</h5>
              </div>
              <div className="col-4 mt-4" style={peopleStyle}>
                21 personnes intéressées
              </div>

              <span
                className="fa fa-2x fa-users black mt-3 green"
                style={peopleStyle}
              />
            </div>
          </Media>
        </Media>
      </div>
    </FadeTransform>
  );
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

const SearchEvent = props => {
  const allEvents = props.events.events.map(event => {
    return (
      <div key={event.id} className="col-12 col-md-12">
        <RenderEvent event={event} />
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
        <div className="col-6">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              <Link to="/event">Evenements</Link>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>

        <div className="col-3 offset-3">
          <Link to="/creationevent">
            <Button
              onClick={() => {}}
              className="connexion ml-auto"
              style={organiserButtonStyle}
            >
              <h5 style={{ marginTop: "7px" }}>Organiser un événement</h5>
            </Button>
          </Link>
        </div>

        <div className="col-12">
          <h3 />

          <hr />
        </div>
      </div>
      <div className="row">{allEvents}</div>
    </div>
  );
};

export default SearchEvent;
