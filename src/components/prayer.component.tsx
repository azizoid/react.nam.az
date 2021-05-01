import { TPrayerContainer } from "../assist/types";
import { MdBrightness7 } from "react-icons/md";

const Prayer = ({ prayer, classes, current, index }: TPrayerContainer) => (
  <div className={classes}>
    <div className="row">
      <h6 className="col-7 col-md-12 align-self-center">{prayer.title}</h6>

      <div className="col-5 col-md-12">
        <h4>{prayer.time}</h4>

        {!current ? (
          index !== 1 ? (
            <small>{prayer.ago}</small>
          ) : (
            <MdBrightness7 style={{ color: "#f6993f" }} />
          )
        ) : (
          <div className="col-12 text-center">
            <span className="badge bg-warning text-dark">
              Zaman varkən <br />
              Namazını qıl
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default Prayer;
