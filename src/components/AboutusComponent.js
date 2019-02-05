import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  Media
} from "reactstrap";
import { Link } from "react-router-dom";

function About(props) {
  const leaders = props.leaders.map(leader => {
    return <p>Mr {leader.name}</p>;
  });

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>A propos</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>A propos</h3>
          <hr />
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12 col-md-6">
          <h2>Notre histoire</h2>
          <p>Tout est partie d'un malentendu comme d'hab !</p>
          <p>
            Nous essayons de vous proposez la meilleure expérience possible
            basée sur la <em>CCU</em>.
          </p>
        </div>
        <div className="col-12 col-md-5">
          <Card>
            <CardHeader className="bg-primary text-white">Nos dates</CardHeader>
            <CardBody>
              <dl className="row p-1">
                <dt className="col-6">Commencement</dt>
                <dd className="col-6"> 26 Janv. 2019</dd>
                <dt className="col-6">Actionnaire</dt>
                <dd className="col-6">Nicow</dd>
                <dt className="col-6">Benef</dt>
                <dd className="col-6">€0</dd>
                <dt className="col-6">Employé</dt>
                <dd className="col-6">1</dd>
              </dl>
            </CardBody>
          </Card>
        </div>
        <div className="col-12">
          <Card>
            <CardBody className="bg-faded">
              <blockquote className="blockquote">
                <p className="mb-0">Qui vivra verra.</p>
                <footer className="blockquote-footer">
                  Yogi Berra,
                  <cite title="Source Title">
                    The Wit and Wisdom of Yogi Berra, P. Pepe, Diversion Books,
                    2014
                  </cite>
                </footer>
              </blockquote>
            </CardBody>
          </Card>
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h2>Membres</h2>
        </div>
        <div className="col-12">
          <Media list>{leaders}</Media>
        </div>
      </div>
    </div>
  );
}

export default About;
