import { TPrayerList } from "../assist/types";

import { MdBrightness7 } from "react-icons/md";

const PrayerListStill = ({ prayers }: TPrayerList) => (
  <div className="row" id="times">
    {prayers.map((prayer, index) => {
      return (
        <div className="col-sm-12 col-md-4 alert alert-light text-muted">
          <div className="row">
            <h6 className="col-7 col-md-12 align-self-center">{prayer.title}</h6>

            <div className="col-5 col-md-12">
              <h4>{prayer.time}</h4>

              {index === 1 ? (
                  <MdBrightness7  />
                ) : (
                 "" 
                )}
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

export default PrayerListStill;
