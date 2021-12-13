import React from 'react'
import PropTypes from 'prop-types';


const ScheduleItem = ({ item }) => {

    return (
        <div className='schedule-item' style={{...item.text.includes("North") ? northRinkStyles : southRinkStyles }}>
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

// const cardStyles = {
//     padding: 10,
//     margin: 10,
//     // width: "100%",
//     color: 'beige',
//     marginRight: "auto",
//     marginLeft: "auto",
//     marginTop: 10,
//     marginBottom: 10,
// }

const southRinkStyles = {
    background: "darkgreen",
}

const northRinkStyles = {
    background: "darkblue",
}

export default ScheduleItem;
