import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Switch from "react-switch";
import { setNorth, setSouth } from "../../store/schedule-actions";
import formatDate from "../../utils/formatDate";

const RinkFilters = (updateCurrentItems) => {
  const dispatch = useDispatch();
  const schedule = useSelector((state) => state.schedule);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="checkboxes">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <label htmlFor="north">North Rink</label>&nbsp;
        <Switch
          id="north"
          onChange={() => dispatch(setNorth())}
          checked={schedule.north}
          height={20}
          width={52}
          handleDiameter={18}
          onColor="#00008b"
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label htmlFor="south">South Rink</label>&nbsp;
        <Switch
          id="south"
          onChange={() => dispatch(setSouth())}
          checked={schedule.south}
          height={20}
          width={52}
          handleDiameter={18}
          onColor="#006400"
        />
      </div>
      <div>
        <button
          type="button"
          href="!#"
          className="btn btn-dark btn-nav btn-update"
          onClick={() => {
            updateCurrentItems(formatDate(schedule.currDay));
            scrollToTop();
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default RinkFilters;
