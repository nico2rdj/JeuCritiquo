import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Jumbotron,
  Nav,
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
  Label
} from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleNav() {
    this.setState({ isNavOpen: !this.state.isNavOpen });
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

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

          <div className="col-3">
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <Button>
                  <span className="fa fa-search fa-lg" />
                </Button>
              </InputGroupAddon>
              <Input placeholder="Rechercher un jeu de société" />
            </InputGroup>
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
                <Button onClick={this.toggleModal} className="connexion">
                  <h5 style={{ marginTop: 8 }}>Connexion</h5>
                </Button>
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
          <ModalHeader toggle={this.toggleModal}>Connexion</ModalHeader>
          <ModalBody>
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
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Header;
