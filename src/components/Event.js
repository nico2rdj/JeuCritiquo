import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform } from "react-animation-components";

function RenderCard({ item, isLoading, errMess }) {
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
        <Card>
          <CardImg
            src={baseUrl + item.image}
            alt={item.name}
            height="500"
            width="200"
          />
        </Card>
      </FadeTransform>
    );
}
function Event(props) {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md-5 m-1">
          <RenderCard
            item={props.event}
            isLoading={props.isLoading}
            errMess={props.errMess}
          />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderCard
            item={props.event}
            isLoading={props.isLoading}
            errMess={props.errMess}
          />
        </div>
      </div>
    </div>
  );
}

export default Event;
