import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform } from "react-animation-components";
import moment from "moment";

function RenderImage({ item, isLoading, errMess }) {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  } else
    return (
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)"
        }}
      >
        <Card style={{ border: "0px" }}>
          <CardImg
            src={baseUrl + item.image}
            alt={item.name}
            height="400"
            width="200"
            style={{ border: "0px" }}
          />
        </Card>
      </FadeTransform>
    );
}

var months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre"
];
const organiserButtonStyle = {
  backgroundColor: "#D80027",
  borderRadius: "5px",
  marginTop: "8px",
  border: "0px"
};

const organiseStyle = {
  backgroundColor: "#009999",
  fontSize: "12px",
  border: "0px",
  fontWeight: "bold"
};

const peopleStyle = {
  color: "green"
};

function RenderCard({ event, isLoading, errMess }) {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  } else
    return (
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)"
        }}
      >
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-2">
                <span className="fa fa-calendar fa-lg fa-2x" />
              </div>
              <div className="col-md-8">
                {moment(event.dateEvent).format("DD")}{" "}
                {months[moment(event.dateEvent).month()]}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-2">
                <span className="fa fa-location-arrow fa-lg fa-2x" />
              </div>
              <div className="col-md-8">{event.city}</div>
            </div>
          </div>
        </div>
        <div
          className="row"
          style={{
            marginTop: "30px",
            fontWeight: "bold",
            fontSize: "22px",
            marginLeft: "4px"
          }}
        >
          {event.name}
        </div>
        <div
          className="row"
          style={{
            marginTop: "30px",
            fontWeight: "bold",
            fontSize: "18px",
            marginLeft: "4px"
          }}
        >
          <span className="fa fa-2x fa-address-card black" />
          <div style={{ marginLeft: "10px", marginTop: "5px" }}>
            {event.author}
          </div>
        </div>
        <div
          className="row"
          style={{
            marginTop: "30px",
            fontWeight: "bold",
            fontSize: "18px",
            marginLeft: "4px"
          }}
        >
          <span className="fa fas fa-2x fa-clock-o black" />
          <div style={{ marginLeft: "10px", marginTop: "5px" }}>
            {moment(event.startHour).format("HH:mm")}
          </div>
        </div>
        <div
          className="row"
          style={{
            marginTop: "30px",
            fontWeight: "bold",
            fontSize: "18px",
            marginLeft: "4px"
          }}
        >
          <div style={{ marginTop: "5px" }}>
            <Button
              onClick={() => {}}
              className="connexion ml-auto"
              style={organiseStyle}
            >
              <span
                className="fa fa-comments fa-2x white"
                style={{
                  marginTop: "0px",
                  marginRight: "0px",
                  fontWeight: "bold"
                }}
              >
                &nbsp; Envoyez un message
              </span>
            </Button>
          </div>
        </div>
        <div
          className="row"
          style={{
            marginTop: "30px",
            fontWeight: "bold",
            fontSize: "18px",
            marginLeft: "4px"
          }}
        >
          <div
            className="col-md-3"
            style={{ paddingLeft: "0px", marginTop: "5px" }}
          >
            Gratuit
          </div>
          <div className="col-md-6 mt-1">21 personnes intéressées</div>

          <div className="col-md-3">
            <span className="fa fa-2x fa-user-secret black" />
          </div>
        </div>
      </FadeTransform>
    );
}
function Event(props) {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md-5 m-1">
          <RenderImage
            item={props.event}
            isLoading={props.isLoading}
            errMess={props.errMess}
          />
        </div>
        <div className="col-12 col-md-6">
          <RenderCard
            event={props.event}
            isLoading={props.isLoading}
            errMess={props.errMess}
          />
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            <h5>Description</h5>
          </div>
          <div className="row">
            <p>{props.event ? props.event.description : " "}</p>
          </div>
        </div>
        <div className="col-md-5 offset-1">
          <div className="row">
            <h5>Adresse</h5>
          </div>
          <div className="row">
            <p>{props.event ? props.event.address : " "}</p>
          </div>
          <div className="row">
            <p>{props.event ? props.event.postalCode : " "}</p>

            <p style={{ marginLeft: "10px" }}>
              {props.event ? props.event.city : " "}
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <h5>Commentaires</h5>
      </div>
    </div>
  );
}

export default Event;
