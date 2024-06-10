// src/components/Footer.js
import React from 'react';

const Footer = () => {
    const navbarStyle = {
        backgroundColor: '#0E4174',
        color: '#DEEEFF'
      };
  return (
    <footer className="pt-4 pb-0 mt-4" style={navbarStyle}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3>DePaul University</h3>
            <br />
            <h6>
              1 E. Jackson Blvd.
              <br />
              Chicago, IL 60604
            </h6>
            <p>
              © 2001 - 2024 DePaul University. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
