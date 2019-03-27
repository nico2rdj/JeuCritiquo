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
  ModalBody,
  Pagination,
  PaginationItem,
  PaginationLink
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

function RenderGame({ game }) {
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
              <div className="col-9">
                <Media left heading style={{ marginTop: "10px" }}>
                  {game.name}
                </Media>
              </div>
              <div className="col-3">
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
            <div className="row mr-1" style={{ height: "80px" }}>
              <div className="col-10">{game.description}</div>
            </div>
            <div className="row">
              <div className="col-2 mt-3">
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
              <div className="col-3 mt-3">
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

              <div className="col-3 mt-3">
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

              <div className="col-2 mt-3">
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
          </Media>
        </Media>
      </div>
    </FadeTransform>
  );
}

const SearchGame_ = props => {
  const allEvents = props.games.map(game => {
    var gameId = "/games/".concat(game._id);
    return (
      <div key={game._id} className="col-12 col-md-12">
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

//export default SearchGame;

class SearchGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: this.props.games,
      currentPage: 1,
      gamesPerPage: 1
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
      Math.ceil(this.state.games.length / this.state.gamesPerPage)
    )
      this.setState({
        currentPage: this.state.currentPage + 1
      });
  }

  render() {
    const { games, currentPage, gamesPerPage } = this.state;

    // Logic for displaying games
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = this.props.games.slice(
      indexOfFirstGame,
      indexOfLastGame
    );

    const renderGames = () => {
      return <SearchGame_ games={currentGames} search={this.props.search} />;
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(games.length / gamesPerPage); i++) {
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
        <SearchGame_ games={currentGames} search={this.props.search} />

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

export default SearchGame;
