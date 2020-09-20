import React from "react";
import { TLocation } from "../assist/types";
import {
  MdNavigateBefore as FaChevronLeft,
  MdNavigateNext as FaChevronRight,
} from "react-icons/md";

import Clock from "./clock.component";

const Location = ({ location, tarix, hijri, dd, changeDd }: TLocation) => (
  <div className="d-flex align-items-center justify-content-center">
    <button
      className="btn btn-link"
      style={{ fontSize: "3em", color: "#6cb2eb" }}
      onClick={() => changeDd(dd - 1)}
    >
      <FaChevronLeft />
    </button>
    <div className="text-center col-md-5" id="location">
      <h1 className="nowis d-none d-md-block">
        <Clock />
      </h1>
      <h1>{location}</h1>
      <small>{tarix}</small>
      <br />
      <small>{hijri}</small>
    </div>
    <button
      className="btn btn-link"
      style={{ fontSize: "3em", color: "#6cb2eb" }}
      onClick={() => changeDd(dd + 1)}
    >
      <FaChevronRight />
    </button>
  </div>
);

export default Location;
