import React from "react";

const ScheduleItem = ({ item }) => {
  return (
    <div
      className="schedule-item"
      style={{
        ...(item.text.includes("North Rink")
          ? northRinkStyles
          : item.text.includes("South Rink")
          ? southRinkStyles
          : meetingRoomStyles),
      }}
    >
      {item.text.replace("Ozaukee Ice Center:", "")}
      <br />
      {item.start_date.split(" ")[0]}
      <br />
      {item.st} to {item.et}
      <br />
      {item.usg}
      <br />
    </div>
  );
};

const southRinkStyles = {
  background: "darkgreen",
};

const northRinkStyles = {
  background: "darkblue",
};

const meetingRoomStyles = {
  background: "#262416",
};

export default ScheduleItem;
