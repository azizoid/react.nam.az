import React from "react";
import { TPrayerList } from "../assist/types";
import Prayer from "./prayer.component";

const PrayerList = ({ prayers, currentPrayer }: TPrayerList) => {
  return (
    <div className="row" id="times">
      {prayers.map((prayer, index) => {
        const classes = ["col-12", "col-md-4", "alert"];
        let isCur = false;

        if (index === 1) {
          if (index === currentPrayer) {
            classes.push("col-lg-2");
          } else {
            classes.push("text-muted", "col-lg-1");
          }
        } else {
          if (index === currentPrayer) {
            isCur = true;
            classes.push("alert-success", "col-lg-3");
          } else {
            classes.push("col-lg-2");
          }
        }

        return (
          <Prayer
            classes={classes.join(" ")}
            prayer={prayer}
            current={isCur}
            index={index}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default PrayerList;
