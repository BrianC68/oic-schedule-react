import React from 'react';
import { connect } from 'react-redux';
import Switch from 'react-switch';
import PropTypes from 'prop-types';
import { setNorth, setSouth } from '../../actions/scheduleActions';
import formatDate from '../../utils/formatDate';

const RinkFilters = ({ north, south, currDay, setNorth, setSouth, updateCurrentItems }) => {
    return (
        <div className='checkboxes'>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <label htmlFor='north'>North Rink</label>&nbsp;
                {/* <input id='north' type='checkbox' name='north' checked={north} onChange={() => setNorth()} /> */}
                <Switch id='north' onChange={() => setNorth()} checked={north} height={20} width={52} handleDiameter={18} onColor='#00008b' />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <label htmlFor='south'>South Rink</label>&nbsp;
                {/* <input id='south' type='checkbox' name='south' checked={south} onChange={() => setSouth()} /> */}
                <Switch id='north' onChange={() => setSouth()} checked={south} height={20} width={52} handleDiameter={18} onColor='#006400' />
            </div>
            <div>
                <a href='!#' className='btn btn-dark btn-nav btn-update' onClick={() => updateCurrentItems(formatDate(currDay))}>Update</a>
            </div>
        </div>
    )
}

RinkFilters.propTypes = {
    updateCurrentItems: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    north: state.schedule.north,
    south: state.schedule.south,
    currDay: state.schedule.currDay,
})

export default connect(mapStateToProps, { setNorth, setSouth })(RinkFilters);
