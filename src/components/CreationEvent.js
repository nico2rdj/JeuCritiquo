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

import { baseUrl } from "../shared/baseUrl";

/* file upload */
import axios from "axios";
import path from "path";

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
/* https://codepen.io/hartzis/pen/VvNGZP */
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

const organiserButtonStyle = {
  backgroundColor: "#D80027",
  borderRadius: "5px",
  marginTop: "8px",
  border: "0px",
  fontWeight: "bold",
  height: "60px",
  fontSize: "20px"
};

const retourButtonStyle = {
  backgroundColor: "white",
  color: "black",
  borderRadius: "5px",
  marginLeft: "8px",
  border: "0px",
  height: "40px",
  fontSize: "20px"
};

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

  /* handle image upload */
  handleUploadImage = e => this.setState({ file: e.target.files[0] });

  handleTimeChange = time => this.setState({ time });

  handleDateChange = date =>
    this.setState({
      date: date
    });

  clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }

  handleSubmit(values) {
    var t_values = this.clone(values);
    t_values.dateEvent = this.state.date;
    t_values.startHour = this.state.time;

    console.log("l'état est : " + JSON.stringify(values));
    alert("l'état est : " + JSON.stringify(t_values));

    /* push l'image sur le serveur */
    const formData = new FormData();
    formData.append("myImage", this.state.file);
    const bearer = "Bearer " + localStorage.getItem("token");

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: bearer
      },
      credentials: "same-origin"
    };
    axios
      .post(baseUrl + "imageUpload", formData, config)
      .then(response => {
        alert("The file is successfully uploaded");
        t_values.image = response.filename;
      })
      .catch(error => {
        alert("pas bon..." + error);
      });

    this.props.postEvent(t_values);
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
            <input
              className="fileInput"
              id="file"
              type="file"
              onChange={e => this._handleImageChange(e)}
            />

            <span
              className="fa fa-upload fa-lg fa-2x"
              style={{ marginTop: "100px" }}
            />
            <div className="row">
              <label htmlFor="file" className="label-file">
                Cliquez pour ajouter une image
              </label>
            </div>
          </Label>
        </div>
      );
    }

    return (
      <div>
        <div className="row">
          <div style={{ marginLeft: "10px" }}>
            <Button
              tag={Link}
              to="/event"
              color="primary"
              style={retourButtonStyle}
            >
              <span
                className="fa fa-arrow-circle-left fa-lg"
                style={{ marginRight: "5px", marginTop: "40px" }}
              />
              Revenir à la recherche d'événements
            </Button>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12" style={{ textAlign: "center" }}>
              <h3>
                <span
                  className="fa fa-plus-square fa-lg"
                  style={{
                    marginRight: "5px",
                    marginTop: "40px",
                    color: "black"
                  }}
                />
                Créer un événement
              </h3>
              <hr />
            </div>
          </div>

          <div className="row row-content">
            <div className="col-12 col-md-12">
              <Form
                model="event"
                onSubmit={values => this.handleSubmit(values)}
              >
                <Row>
                  <Col md={6}>
                    <h3>Informations générales</h3>
                    <div className="space" />
                    <Row className="form-group">
                      <Col md={7}>
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
                      <Col md={7}>
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

                    <Row>
                      <Col md={8}>
                        <hr />
                      </Col>
                    </Row>
                    <h3>Lieu</h3>
                    <div className="space" />
                    <Row />

                    <Row className="form-group">
                      <Col md={7}>
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
                      <Col md={4}>
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
                      <Col md={3}>
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

                    <Row>
                      <Col md={8}>
                        <hr />
                      </Col>
                    </Row>

                    <h3>Date et heure</h3>
                    <div className="space" />

                    <Row className="form-group">
                      <Label
                        htmlFor="dateEvent"
                        md={5}
                        style={{ color: "#797979" }}
                      >
                        Date de l'événement
                      </Label>
                      <Col md={6}>
                        <SingleDatePicker
                          showClearDate={true}
                          placeholder="Date"
                          customInputIcon={
                            <span className="fa fa-calendar fa-lg" />
                          }
                          inputIconPosition="before"
                          small={true}
                          block={false}
                          numberOfMonths={1}
                          date={this.state.date}
                          onDateChange={date => this.handleDateChange(date)}
                          focused={this.state.focused}
                          onFocusChange={({ focused }) =>
                            this.setState({ focused })
                          }
                          openDirection="up"
                          hideKeyboardShortcutsPanel={true}
                        />
                      </Col>
                    </Row>

                    <Row className="form-group">
                      <Label
                        htmlFor="startHour"
                        md={5}
                        style={{ color: "#797979" }}
                      >
                        Heure de début
                      </Label>
                      <Col md={5}>
                        <TimeInput
                          mode="24h"
                          cancelLabel="Annuler"
                          okLabel="Valider"
                          value={this.state.time}
                          onChange={time => this.handleTimeChange(time)}
                        />
                      </Col>
                    </Row>

                    {/*
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
                */}
                  </Col>
                  <Col md={6}>
                    <h3>Image principal de l'événement</h3>
                    <Row className="form-group">
                      <Col offset={2} md={8}>
                        <div>{$imagePreview}</div>
                      </Col>
                    </Row>
                    <h3>Description</h3>
                    <Row className="form-group">
                      <Col md={12}>
                        <Control.textarea
                          model=".description"
                          id="description"
                          name="description"
                          rows="12"
                          className="form-control"
                          placeholder="Rédiger une description de l'événement"
                        />
                      </Col>
                    </Row>
                    <Row className="form-group">
                      <Col md={{ size: 5, offset: 7 }}>
                        <Button
                          type="submit"
                          color="primary"
                          style={organiserButtonStyle}
                        >
                          Créer l'événement
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreationEvent;
