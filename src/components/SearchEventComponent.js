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

function RenderEvent({ event }) {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: "scale(0.5) translateY(-50%)"
      }}
    >
      <Media>
        <Media left href="#">
          <Media
            object
            data-src={baseUrl + "images/codeNames.png"}
            alt="Generic placeholder image"
          />
        </Media>
        <Media body>
          <Media heading>Media heading</Media>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
          scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in
          vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
          vulputate fringilla. Donec lacinia congue felis in faucibus.
        </Media>
      </Media>
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
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="/event">Evenements</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>s</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3 />
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 mt-1">
          <RenderEvent />
        </div>
      </div>
    </div>
  );
};

export default SearchEvent;
