import React from "react";

function Contact(props) {
  return (
    <div className="container">
      <div className="row row-content">
        <div className="col-12">
          <h3>Information sur notre localisation</h3>
        </div>
        <div className="col-12 col-sm-4 offset-sm-1">
          <h5>Notre addresse</h5>
          <address>
            21 jump street
            <br />
            Pasadena, Los Angeles
            <br />
            USA
            <br />
            <i className="fa fa-phone" />: +33 6 88 91 92 64
            <br />
            <i className="fa fa-fax" />: +852 8765 4321
            <br />
            <i className="fa fa-envelope" />:{" "}
            <a href="mailto:nicolas.martin0205@gmail.com">
              nicolas.martin0205@gmail.com
            </a>
          </address>
        </div>
        <div className="col-12 col-sm-6 offset-sm-1">
          <h5>Notre localisation</h5>
        </div>
        <div className="col-12 col-sm-11 offset-sm-1">
          <div className="btn-group" role="group">
            <a
              role="button"
              className="btn btn-primary"
              href="tel:+85212345678"
            >
              <i className="fa fa-phone" /> Call
            </a>
            <a role="button" className="btn btn-info">
              <i className="fa fa-skype" /> Skype
            </a>
            <a
              role="button"
              className="btn btn-success"
              href="mailto:nicolas.martin0205@gmail.com"
            >
              <i className="fa fa-envelope-o" /> Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
