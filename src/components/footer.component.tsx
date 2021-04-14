import React from "react";

const Footer = () => (
  <div className="footer">
    <nav>
      <ol className="breadcrumb justify-content-center">
        <li className="breadcrumb-item active">&copy; 2021</li>
        <li className="breadcrumb-item">
          <a href="https://www.nam.az">Nam.az</a>
        </li>

        <li className="breadcrumb-item">
          <a
            href="https://www.quran.az"
            rel=" noopener noreferrer"
            target="_blank"
          >
            Quran.az
          </a>
        </li>
        <li className="breadcrumb-item active">
          <small className="disabled">
            Namaz Vaxtları: <u>islamicfinder.com</u>
          </small>
        </li>
      </ol>
    </nav>
  </div>
);

export default Footer;
