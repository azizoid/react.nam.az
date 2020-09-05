import React from "react";
import { TPrayerList } from "../assist/types";

import Prayer from "./prayer.component";

const PrayerListStill = ({ prayers }: TPrayerList) => (
  <div className="row" id="times">
    {prayers.map((prayer, index) => {
      const classes = [
        "col-sm-12",
        "col-md-4",
        "alert",
        "alert-light",
        "col-lg-2",
        "text-muted",
      ];
      return (
        <Prayer
          classes={classes.join(" ")}
          prayer={prayer}
          current={false}
          index={index}
          key={index}
        />
      );
    })}
  </div>
);

export default PrayerListStill;
