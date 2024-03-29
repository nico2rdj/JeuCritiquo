import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <div className="footer">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-4 offset-1 col-sm-2">
            <h5>Liens utiles</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/home">Acceuil</Link>
              </li>
              <li>
                <Link to="/about">A propos</Link>
              </li>
              <li>
                <Link to="/menu">Menu</Link>
              </li>
              <li>
                <Link to="/contactus">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="col-7 col-sm-5">
            <h5>Notre adresse</h5>
            <address>
              21 jump street
              <br />
              Pasadena, Los Angeles
              <br />
              Bordeaux
              <br />
              <i className="fa fa-phone fa-lg" />: +33 6 88 91 92 64
              <br />
              <i className="fa fa-fax fa-lg" />: +852 8765 4321
              <br />
              <i className="fa fa-envelope fa-lg" />:{" "}
              <a href="mailto:nicolas.martin0205@gmail.com">
                nicolas.martin0205@gmail.com
              </a>
            </address>
          </div>
          <div className="col-12 col-sm-4 align-self-center">
            <div className="text-center">
              <a
                className="btn btn-social-icon btn-google"
                href="http://google.com/+"
              >
                <i className="fa fa-google-plus" />
              </a>
              <a
                className="btn btn-social-icon btn-facebook"
                href="http://www.facebook.com/profile.php?id="
              >
                <i className="fa fa-facebook" />
              </a>
              <a
                className="btn btn-social-icon btn-linkedin"
                href="http://www.linkedin.com/in/"
              >
                <i className="fa fa-linkedin" />
              </a>
              <a
                className="btn btn-social-icon btn-twitter"
                href="http://twitter.com/"
              >
                <i className="fa fa-twitter" />
              </a>
              <a
                className="btn btn-social-icon btn-google"
                href="http://youtube.com/"
              >
                <i className="fa fa-youtube" />
              </a>
              <a className="btn btn-social-icon" href="mailto:">
                <i className="fa fa-envelope-o" />
              </a>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-auto">
            <p>© Copyright 2019 Helios Corporation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
