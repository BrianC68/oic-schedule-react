import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';
import {getSchedule, setCurrDay, 
        setCurrentItems, setNextDay, setPrevDay, 
        clearSearchResults} from '../../actions/scheduleActions';
import ScheduleItem from './ScheduleItem';
import Calendar from './Calendar';
import Search from './Search';
import RinkFilters from './RinkFilters';
import formatDate from '../../utils/formatDate';
import { openToggle, closeToggle } from '../../utils/toggleSearchCalendar';
import hockeyFight from '../../images/hockey-fight-animated.gif';

const today = new Date();

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const DailySchedule = ({ schedule: { scheduleItems, currentItems, loading, currDay, nextDay,
     prevDay, searchResults, north, south, error}, getSchedule, setCurrDay, setNextDay, setPrevDay, 
     setCurrentItems, clearSearchResults }) => {
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
    }, []);
    
    // if (width > 550) {
    //     document.getElementById('toggle-content').style.top = '129px';
    // } 

    const updateCurrentItems = (date) => {
        let items = scheduleItems.filter(item => item.start_date.startsWith(date) === true);

        if (!north) {
            items = items.filter(item => item.text.search('North') === -1)
        }
        if (!south) {
            items = items.filter(item => item.text.search('South') === -1)
        }
        setCurrentItems(items);
    }

    const incrementDays = (date) => {
        setPrevDay(new Date(date));
        setCurrDay(new Date(nextDay));
        setNextDay(new Date(date.setDate(date.getDate() + 2))); // Current day plus 2 days
    }

    const decrementDays = (date) => {
        setNextDay(new Date(currDay));
        setCurrDay(new Date(prevDay));
        setPrevDay(new Date(date.setDate(date.getDate() - 1))); // Previous day minus 1 day
    }

    const getErrorMessage = () => {
        console.log(error)
        if (error === 'Network Error') {
            return 'Oops, looks like you don\'t have internet right now.  Try again later.'
        } else {
            return error;
        }
    }

    const Toggle = () => {
        return (
            <Fragment>
                <div className='toggle-container'>
                    <div id="toggleOpen" className="toggle-open" onClick={openToggle}>
                        <div className="show-text">Open Search &amp; Date Picker</div>
                    </div>
                </div>
            </Fragment>
        )
    }

    return (
        <div className='main-container' id="main">
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
                {searchResults === null &&
                <RinkFilters updateCurrentItems={updateCurrentItems} />}
                { width <= 550 &&
                <div>
                    <buttona href='!#' type='button' className='btn btn-blue btn-nav close-button' onClick={closeToggle}>Close</buttona>
                </div>}
            </div>
            {width <= 550 ? <Toggle /> : ''}
            {searchResults !== null ?
            <div className='schedule-items'>
                <h3 className='search-results'>Search Results</h3>
                {searchResults.length === 0 ? <h2 className='no-results'>No Search Results</h2> : searchResults.map(item => <ScheduleItem key={item.id} item={item} />)}
            </div>
            : /* else if searchResults === null, show schedule items */
            <div className='schedule-items'>
                {currDay !== null && nextDay !== null ?
                <div className='schedule-nav'>
                    <div className=''>
                        <button href="!#" type='button' className='btn btn-blue btn-nav' onClick={() => {updateCurrentItems(formatDate(prevDay)); decrementDays(prevDay)}}>
                            {formatDate(prevDay)}</button>
                    </div>
                    <div>
                        <div className="currentDay">{formatDate(currDay)}</div>
                    </div>
                    <div>
                        <button href="#!" type='button' className='btn btn-green btn-nav' onClick={() => {updateCurrentItems(formatDate(nextDay)); incrementDays(currDay)}}>
                            {formatDate(nextDay)}</button></div>
                    </div>
                    : <p></p> /* Avoid errors with formatDate() if dates are null */ }
                {loading ? <div className='spinner'><img src={hockeyFight} alt='Loading Data' /><p>Massaging the data...</p></div> : /* if Loading true */
                error !== null ? <p className='no-results'>{getErrorMessage()}</p> : /* if there's an error display a message */
                currentItems.length === 0 ? <h2 className='no-results'>Nothing on Schedule</h2> : /* if schedule is empty that day */
                currentItems.map(item => <ScheduleItem key={item.id} item={item} />)}
            </div>}
        </div>
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
