import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  FormGroup,
  Label,
  Col,
  Row
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, Form, Errors, actions } from "react-redux-form";

/* airbnb react dates lobrary check https://codeburst.io/using-a-datepicker-in-react-js-b67e970195fd */
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";

/* https://github.com/TeamWertarbyte/material-ui-time-picker */
import TimeInput from "material-ui-time-picker";

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;
const isNumber = val => !isNaN(Number(val));
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

/* simulate image upload */
class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: "", imagePreviewUrl: "" };
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log("handle uploading-", this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          style={{ height: "300px", width: "300px" }}
          src={imagePreviewUrl}
        />
      );
    } else {
      $imagePreview = (
        <div className="previewText">Please select an Image for Preview</div>
      );
    }

    return (
      <div className="previewComponent">
        <form onSubmit={e => this._handleSubmit(e)}>
          <label for="file" class="label-file">
            Choisir une image
          </label>
          <input
            className="fileInput"
            id="file"
            type="file"
            onChange={e => this._handleImageChange(e)}
          />
          {/*  
          <button
            className="submitButton"
            type="submit"
            onClick={e => this._handleSubmit(e)}
          >
            Upload Image
          </button>
          */}
        </form>
        <div>{$imagePreview}</div>
      </div>
    );
  }
}

class CreationEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: null,
      focused: null,
      time: "",
      file: "",
      imagePreviewUrl: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  handleTimeChange = time => this.setState({ time });

  handleDateChange(date) {
    this.setState({
      date: date
    });
  }

  handleSubmit(values) {
    console.log("l'état est : " + JSON.stringify(values));
    alert("l'état est : " + JSON.stringify(values));
    this.props.postEvent(values);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img
          style={{ height: "300px", width: "300px" }}
          src={imagePreviewUrl}
        />
      );
    } else {
      $imagePreview = (
        <div className="previewText">
          <Label htmlFor="file" md={12}>
            <div className="row">
              <label class="label-file">Choisir une image</label>
            </div>
            <span className="fa fa-upload fa-lg fa-2x" />
          </Label>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Contact</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Créer un événement</h3>
            <hr />
          </div>
        </div>

        <div className="row row-content">
          <div className="col-12 col-md-12">
            <Form model="event" onSubmit={values => this.handleSubmit(values)}>
              <div className="col-12">
                <h3>Informations générales</h3>
              </div>
              <Row className="form-group">
                <Label htmlFor="name" md={2}>
                  Nom de l'événement
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    placeholder="Nom de l'événement"
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
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less"
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="author" md={2}>
                  Organisateur
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Organisateur"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less"
                    }}
                  />
                </Col>
              </Row>
              <div className="col-12">
                <hr />
                <h3>Lieu</h3>
              </div>

              <Row className="form-group">
                <Label htmlFor="address" md={2}>
                  Adresse
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".address"
                    id="address"
                    name="address"
                    placeholder="Adresse"
                    className="form-control"
                    validators={{
                      required
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".address"
                    show="touched"
                    messages={{
                      required: "Required",
                      validEmail: "Invalid email"
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="city" md={2}>
                  Ville
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".city"
                    id="city"
                    name="city"
                    placeholder="Ville"
                    className="form-control"
                    validators={{
                      required
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".city"
                    show="touched"
                    messages={{
                      required: "Required",
                      validEmail: "Invalid email"
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="postalCode" md={2}>
                  Code postal
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".postalCode"
                    id="postalCode"
                    name="postalCode"
                    placeholder="Code postal"
                    className="form-control"
                    validators={{
                      required
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".postalCode"
                    show="touched"
                    messages={{
                      required: "Required",
                      validEmail: "Invalid email"
                    }}
                  />
                </Col>
              </Row>

              <hr />
              <div className="col-12">
                <h3>Date et heure</h3>
              </div>

              <Row className="form-group">
                <Label htmlFor="dateEvent" md={2}>
                  Date de l'événement
                </Label>
                <Col md={10}>
                  <SingleDatePicker
                    showClearDate={true}
                    customInputIcon={<span className="fa fa-calendar fa-lg" />}
                    inputIconPosition="before"
                    small={true}
                    block={false}
                    numberOfMonths={1}
                    date={this.state.date}
                    onDateChange={date => this.handleDateChange(date)}
                    focused={this.state.focused}
                    onFocusChange={({ focused }) => this.setState({ focused })}
                    openDirection="up"
                    hideKeyboardShortcutsPanel={true}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="startHour" md={2}>
                  Heure de début
                </Label>
                <Col md={10}>
                  <TimeInput
                    mode="24h"
                    cancelLabel="Annuler"
                    okLabel="Valider"
                    value={this.state.time}
                    onChange={time => this.handleTimeChange(time)}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="phone" md={2}>
                  Contact Tel.
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".phone"
                    id="phone"
                    name="phone"
                    placeholder="Tel. Number"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                      isNumber
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".phone"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 numbers",
                      maxLength: "Must be 15 numbers or less",
                      isNumber: "Must be a number"
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="file" md={2}>
                  <label class="label-file">
                    Choisir une image
                    <span className="fa fa-upload fa-lg fa-2x" />
                  </label>
                </Label>
                <Col md={10}>
                  <input
                    className="fileInput"
                    id="file"
                    type="file"
                    onChange={e => this._handleImageChange(e)}
                  />
                  <div>{$imagePreview}</div>
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="description" md={2}>
                  Votre description
                </Label>
                <Col md={10}>
                  <Control.textarea
                    model=".description"
                    id="description"
                    name="description"
                    rows="12"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary">
                    Envoyez
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreationEvent;
