import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTodaysSchedule } from '../../actions/scheduleActions';

const TodaysSchedule = ({ todaysSchedule, getTodaysSchedule }) => {
    useEffect(() => {
        getTodaysSchedule();
    }, [getTodaysSchedule]);

    return (
        <div>
            <h2>Todays Schedule Here</h2>
            {/* {todaysSchedule} */}
        </div>
    )
}

TodaysSchedule.propTypes = {
    getTodaysSchedule: PropTypes.func.isRequired,
    todaysSchedule: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    todaysSchedule: state.todaysSchedule,
});

export default connect(mapStateToProps, {getTodaysSchedule })(TodaysSchedule);
