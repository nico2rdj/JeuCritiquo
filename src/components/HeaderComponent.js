import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Jumbotron,
  Nav,
  NavLink,
  NavbarToggler,
  Collapse,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Label,
  TabContent,
  TabPane,
  Card,
  CardTitle,
  CardText,
  Row,
  Col
} from "reactstrap";
import { Link, Redirect, Switch } from "react-router-dom";
import classnames from "classnames";

const tabStyle = {
  width: "50%",
  textAlign: "center"
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
      redirect: false,
      isModalSignupOpen: false,
      activeTab: "1"
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleModalSignup = this.toggleModalSignup.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  toggleNav() {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  toggleModalSignup() {
    this.setState({ isModalSignupOpen: !this.state.isModalSignupOpen });
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      var searchText = "/search/".concat(this.search.value);

      return <Redirect to={searchText} />;
    }
  };

  handleLogin(event) {
    /* on agit directement sur le dom */
    this.toggleModal();
    alert(
      "Pseudo: " +
        this.username.value +
        " Mot de passe: " +
        this.password.value +
        " Se souvenir: " +
        this.remember.checked
    );
    this.props.loginUser({
      username: this.username.value,
      password: this.password.value
    });

    event.preventDefault();
  }

  handleSignup(event) {
    /* on agit directement sur le dom */
    this.toggleModalSignup();
    alert(
      "Pseudo: " +
        this.newUsername.value +
        " Mot de passe: " +
        this.newPassword.value +
        " Se souvenir: " +
        this.newRemember.checked
    );
    this.props.signupUser({
      username: this.newUsername.value,
      password: this.newPassword.value
    });

    event.preventDefault();
  }

  handleLogout() {
    this.props.logoutUser();
  }

  handleSearch(event) {
    /* on agit directement sur le dom */
    //this.toggleModal();
    alert("Recherche: " + this.search.value);
    this.setRedirect();

    event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <Navbar color="faded" light expand="md">
          <NavbarToggler onClick={this.toggleNav} />
          <NavbarBrand className="ml-auto mt-3" href="/">
            <img
              src="assets/images/JeuCritiquo_v0.png"
              height="90"
              width="280"
              alt="Jeu Critiquo"
            />
          </NavbarBrand>

          <div>{this.renderRedirect()}</div>

          <div className="col-3">
            <Form onSubmit={this.handleSearch}>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <Button value="submit" type="submit">
                    <span className="fa fa-search fa-lg" />
                  </Button>
                </InputGroupAddon>
                <Input
                  type="text"
                  name="text"
                  placeholder="Rechercher un jeu de société"
                  innerRef={input => (this.search = input)}
                />
              </InputGroup>
            </Form>
          </div>

          <Collapse isOpen={this.state.isNavOpen} navbar>
            <Nav navbar className="ml-auto">
              <NavItem>
                <NavLink className="nav-link" to="/home">
                  <span className="fa fa-home fa-lg" /> <h4>Acceuil</h4>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/contactus">
                  <span className="fa fa-address-card black fa-lg" />
                  <h4>Nous contacter</h4>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/aboutus">
                  <span className="fa fa-info fa-lg" /> <h4>A propos</h4>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/menu">
                  <span className="fa fa-globe fa-lg" /> <h4>Explorer</h4>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/events">
                  <span className="fa fa-users fa-lg" /> <h4>Evenements</h4>
                </NavLink>
              </NavItem>
            </Nav>
            <Nav navbar className="ml-auto">
              <NavItem>
                {!this.props.auth.isAuthenticated ? (
                  <Button onClick={this.toggleModal} className="connexion">
                    <h5 style={{ marginTop: 8 }}>Connexion</h5>
                  </Button>
                ) : (
                  <div>
                    <div className="navbar-text mr-3">
                      {this.props.auth.user.username}
                    </div>
                    <Button outline onClick={this.handleLogout}>
                      <span className="fa fa-sign-out fa-lg" /> Logout
                      {this.props.auth.isFetching ? (
                        <span className="fa fa-spinner fa-pulse fa-fw" />
                      ) : null}
                    </Button>
                  </div>
                )}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        {/*
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Jeu Critiquo </h1>
                <p> La plus grande communauté de jeu de société de France ! </p>
              </div>
            </div>
          </div>
        </Jumbotron>
        */}
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          {/*
          <ModalHeader toggle={this.toggleModal}>Connexion</ModalHeader>
          <ModalHeader toggle={this.toggleModalSignup}>S'inscrire</ModalHeader>
          */}
          <ModalBody style={{ padding: "0px" }}>
            {/*              sign up        */}

            <Modal
              isOpen={this.state.isModalSignupOpen}
              toggle={this.toggleModalSignup}
            >
              <ModalHeader toggle={this.isModalSignupOpen}>
                Inscription
              </ModalHeader>
              <ModalBody>
                <Form onSubmit={this.handleSignup}>
                  <FormGroup>
                    <Label htmlFor="username">Pseudo</Label>
                    <Input
                      type="text"
                      id="username"
                      name="username"
                      innerRef={input => (this.username = input)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      innerRef={input => (this.password = input)}
                    />
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        name="remember"
                        innerRef={input => (this.remember = input)}
                      />
                      Se souvenir
                    </Label>
                  </FormGroup>
                  <Button type="submit" value="submit" color="primary">
                    S'inscrire
                  </Button>
                </Form>
              </ModalBody>
            </Modal>

            {/* end sign up */}
            {/*
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Pseudo</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={input => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={input => (this.password = input)}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="remember"
                    innerRef={input => (this.remember = input)}
                  />
                  Se souvenir
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Se connecter
              </Button>
            </Form>
            */}
            <Nav tabs>
              <NavItem style={tabStyle}>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1"
                  })}
                  onClick={() => {
                    this.toggleTab("1");
                  }}
                >
                  Connexion
                </NavLink>
              </NavItem>
              <NavItem style={tabStyle}>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2"
                  })}
                  onClick={() => {
                    this.toggleTab("2");
                  }}
                >
                  Inscription
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent
              activeTab={this.state.activeTab}
              style={{ padding: "1em" }}
            >
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <h4>Connexion</h4>
                  </Col>
                </Row>
                <Form onSubmit={this.handleLogin}>
                  <FormGroup>
                    <Label htmlFor="username">Pseudo</Label>
                    <Input
                      type="text"
                      id="username"
                      name="username"
                      innerRef={input => (this.username = input)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      innerRef={input => (this.password = input)}
                    />
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        name="remember"
                        innerRef={input => (this.remember = input)}
                      />
                      Se souvenir
                    </Label>
                  </FormGroup>
                  <Button type="submit" value="submit" color="primary">
                    Se connecter
                  </Button>
                </Form>
              </TabPane>
              <TabPane tabId="2">
                <Form onSubmit={this.handleSignup}>
                  <FormGroup>
                    <Label htmlFor="username">Pseudo</Label>
                    <Input
                      type="text"
                      id="username"
                      name="username"
                      innerRef={input => (this.newUsername = input)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      innerRef={input => (this.newPassword = input)}
                    />
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        name="remember"
                        innerRef={input => (this.newRemember = input)}
                      />
                      Se souvenir
                    </Label>
                  </FormGroup>
                  <Button type="submit" value="submit" color="primary">
                    S'inscrire
                  </Button>
                </Form>
              </TabPane>
            </TabContent>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Header;
