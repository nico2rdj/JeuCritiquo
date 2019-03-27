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
import moment from "moment";

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

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
  fontSize: "22px",
  marginLeft: "17px",
  marginRight: "auto",
  marginTop: "15px",
  fontWeight: "bold",
  textAlign: "center"
};

const verticalLine = {
  borderLeft: "1px solid #dbdbdb",
  height: "160px",
  marginTop: "20px"
};

const peopleStyle = {
  //color: "green"
};

const organiseStyle = {
  //color: "#009999"
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
              {moment(event.dateEvent).format("DD-MM-YYYY")}
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
                <span className="fa fa-2x fa-location-arrow black" />
              </div>
              <div className="col-2 mt-4">
                <h5
                  style={{
                    backgroundColor: "#f2f2f2"
                  }}
                >
                  {event.city}
                </h5>
              </div>
              <div className="col-1 mt-3">
                <span
                  className="fa fa-2x fa-address-card black"
                  style={organiseStyle}
                />
              </div>
              <div className="col-3 mt-4">
                <h5
                  style={{
                    backgroundColor: "#f2f2f2"
                  }}
                >
                  {event.author}
                </h5>
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

const SearchEvent_ = props => {
  const allEvents = props.events.map(event => {
    var eventId = "/events/".concat(event._id);
    return (
      <div key={event._id} className="col-12 col-md-12">
        <Link to={eventId} style={{ textDecoration: "none", color: "black" }}>
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
        </Link>
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

//export default SearchEvent;

class SearchEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.events.events,
      currentPage: 1,
      eventsPerPage: 6
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleClickForward = this.handleClickForward.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  handleClickBack(event) {
    if (this.state.currentPage > 1)
      this.setState({
        currentPage: this.state.currentPage - 1
      });
  }

  handleClickForward(event) {
    if (
      this.state.currentPage <
      Math.ceil(this.state.events.length / this.state.eventsPerPage)
    )
      this.setState({
        currentPage: this.state.currentPage + 1
      });
  }

  render() {
    const { events, currentPage, eventsPerPage } = this.state;

    // Logic for displaying games
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = this.state.events.slice(
      indexOfFirstEvent,
      indexOfLastEvent
    );

    const renderEvents = () => {
      return <SearchEvent_ events={currentEvents} search={this.props.search} />;
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(events.length / eventsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <Button
          style={{ margin: "5px" }}
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </Button>
      );
    });

    return (
      <div>
        <SearchEvent_ events={currentEvents} search={this.props.search} />

        <ul style={{ textAlign: "center" }}>
          <Button style={{ margin: "5px" }} onClick={this.handleClickBack}>
            <span className="fa fa-arrow-left fa-lg" />
          </Button>
          {renderPageNumbers}
          <Button style={{ margin: "5px" }} onClick={this.handleClickForward}>
            <span className="fa fa-arrow-right fa-lg" />
          </Button>
        </ul>
      </div>
    );
  }
}

export default SearchEvent;
