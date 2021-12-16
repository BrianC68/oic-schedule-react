import React from 'react'
import PropTypes from 'prop-types';


const ScheduleItem = ({ item }) => {

    return (
        <div className='schedule-item' style={{...item.text.includes("North") ? northRinkStyles : item.text.includes("South") ? southRinkStyles : meetingRoomStyles}}>
            {item.text.replace("Ozaukee Ice Center:", "")}<br />
            {item.start_date.split(" ")[0]}<br />
            {item.st} to {item.et}<br />
            {item.usg}<br />
        </div>
    )
}

ScheduleItem.propTypes = {
    item: PropTypes.object.isRequired,
}

const southRinkStyles = {
    background: "darkgreen",
}

const northRinkStyles = {
    background: "darkblue",
}

const meetingRoomStyles = {
    background: "#262416"
}

export default ScheduleItem;
