import React from "react";
import { TPrayerList } from "../assist/types";
import { FaSun } from "react-icons/fa";

const PrayerListStill = ({ prayers }: TPrayerList) => {
  return (
    <div className="row" id="times">
      {prayers.map((prayer, index) => {
        const classes = ["col-sm-12", "col-md-4", "alert", "alert-light"];
        classes.push("col-lg-2", "text-muted");
        return (
          <div className={classes.join(" ")} key={index}>
            <div className="row">
              <h6 className="col-7 col-md-12 align-self-center ">
                {prayer.title}
              </h6>
              <div className="col-5 col-md-12">
                <h4>{prayer.time}</h4>
                {index !== 1 ? <small>{prayer.ago}</small> : <FaSun />}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PrayerListStill;
