import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
// import { PacmanLoader } from 'react-spinners';
import {getSchedule, setCurrDay, 
        setCurrentItems, setNextDay, setPrevDay, 
        clearSearchResults} from '../../actions/scheduleActions';
import ScheduleItem from './ScheduleItem';
import Calendar from './Calendar';
import Search from './Search';
import formatDate from '../../utils/formatDate';
import { openToggle, closeToggle } from '../../utils/toggleSearchCalendar';
import hockeyFight from '../../images/hockey-fight-animated.gif';

const today = new Date();

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const DailySchedule = ({ schedule: { scheduleItems, currentItems, loading, currDay, nextDay, prevDay, searchResults}, 
    getSchedule, setCurrDay, setNextDay, setPrevDay, setCurrentItems, clearSearchResults }) => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        setCurrDay(today);
        setPrevDay(yesterday);
        setNextDay(tomorrow);
        getSchedule();
    }, [getSchedule, setCurrDay, setNextDay, setPrevDay]);

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        }
    }, [])
    
    
    const updateCurrentItems = (date) => {
        let items = scheduleItems.filter(item => item.start_date.startsWith(date) === true);
        setCurrentItems(items);
    }

    const incrementDays = (date) => {
        setPrevDay(new Date(date));
        setCurrDay(new Date(nextDay));
        setNextDay(new Date(date.setDate(date.getDate() + 2)));
    }

    const decrementDays = (date) => {
        setNextDay(new Date(currDay));
        setCurrDay(new Date(prevDay));
        setPrevDay(new Date(date.setDate(date.getDate() - 1)));
    }

    const Toggle = () => {
        return (
            <Fragment>
                <div className='toggle-container'>
                    <div id="toggleClose" className="toggle-close" onClick={closeToggle}>
                        <div className="hide-text">Hide Search &amp; Date Picker</div>
                    </div>
                    <div id="toggleOpen" className="toggle-open" onClick={openToggle}>
                        <div className="show-text">Show Search &amp; Date Picker</div>
                    </div>
                </div>
            </Fragment>
        )
    }

    return (
        <div className='main-container'>
            <div className='left-side' id="toggle-content">
                <div className='calendar'>
                    <Calendar 
                        updateCurrentItems={updateCurrentItems} 
                        closeToggle={closeToggle} 
                        toggle={width <= 550}
                    />
                </div>
                <div className='search'>
                    <Search 
                        clearSearchResults={clearSearchResults} 
                        closeToggle={closeToggle} 
                        toggle={width <= 550}
                    />
                </div>
            </div>
            {width <= 550 ? <Toggle /> : ''}
            {searchResults !== null ?
            <div className='schedule-items'>
                <h3 className='search-results'>Search Results</h3>
                {searchResults.length === 0 ? <h2 className='no-results'>No Search Results</h2> : searchResults.map(item => <ScheduleItem key={item.id} item={item} />)}
            </div>
            :
            <div className='schedule-items'>
                {currDay !== null && nextDay !== null ?
                <div className='schedule-nav'>
                    <div className=''>
                        <a href="!#" className='nav-link' onClick={() => {updateCurrentItems(formatDate(prevDay)); decrementDays(prevDay)}}>{prevDay !== null ? formatDate(prevDay) : ''}</a>
                    </div>
                    <div>
                        <div className="currentDay">{formatDate(currDay)}</div>
                    </div>
                    <div>
                        <a href="#!" className='nav-link' onClick={() => {updateCurrentItems(formatDate(nextDay)); incrementDays(currDay)}}>
                        {formatDate(nextDay)}</a></div>
                    </div>
                    : <p></p> }
                {loading ? <div className='spinner'><img src={hockeyFight} alt='Loading Data' /><p>Getting things ready....</p></div> :
                currentItems.length === 0 ? <h2 className='no-results'>Nothing on Schedule</h2> : currentItems.map(item => <ScheduleItem key={item.id} item={item} />)}
            </div>}
        </div>
        // <div className='spinner'><PacmanLoader color='blue' loading={loading} size={40} margin={10} /></div>?
    )
}

DailySchedule.propTypes = {
    schedule: PropTypes.object.isRequired,
    getSchedule: PropTypes.func.isRequired,
    setCurrentItems: PropTypes.func.isRequired,
    setCurrDay: PropTypes.func.isRequired,
    setNextDay: PropTypes.func.isRequired,
    setPrevDay: PropTypes.func.isRequired,
    clearSearchResults: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    schedule: state.schedule,
})

export default connect(mapStateToProps, { getSchedule, setCurrDay, setNextDay, setPrevDay,
                                          setCurrentItems, clearSearchResults })(DailySchedule);
