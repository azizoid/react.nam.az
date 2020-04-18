import React from "react";
import { FaSun } from "react-icons/fa";

const PrayerListStill = ({ prayers }) => {
  return (
    <div className="row" id="times">
      {prayers.map((prayer, index) => {
        const classes = ["col-sm-12", "col-md-4", "alert", "alert-light"];
        // switch (index) {
        //   case 0:
        //     classes.push("col-lg-3");
        //     break;
        //   case 1:
        //     classes.push("col-lg-1 text-muted");
        //     break;
        //   default:
        //     classes.push("col-lg-2");
        // }
        classes.push("col-lg-2", "text-muted");
        return (
          <div className={classes.join(" ")} key={index}>
            <h6>{prayer.title}</h6>
            <h3>{prayer.time}</h3>
            <small>
              {prayer.rakat !== 0 ? prayer.rakat + " rükət" : <FaSun />}
            </small>
          </div>
        );
      })}
    </div>
  );
};

export default PrayerListStill;