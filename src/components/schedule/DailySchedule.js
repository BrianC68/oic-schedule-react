import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import {
  getSchedule,
  setCurrDay,
  setCurrentItems,
  setNextDay,
  setPrevDay,
  clearSearchResults,
} from "../../store/schedule-actions";
import ScheduleItem from "./ScheduleItem";
import Calendar from "./Calendar";
import Search from "./Search";
import RinkFilters from "./RinkFilters";
import formatDate from "../../utils/formatDate";
import { openToggle, closeToggle } from "../../utils/toggleSearchCalendar";
import hockeyFight from "../../images/hockey-fight-animated.gif";

const today = new Date();

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const DailySchedule = () => {
  const dispatch = useDispatch();
  const schedule = useSelector((state) => state.schedule);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(setCurrDay(today));
    dispatch(setPrevDay(yesterday));
    dispatch(setNextDay(tomorrow));
    dispatch(getSchedule());
  }, [dispatch]);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const updateCurrentItems = (date) => {
    let items = schedule.scheduleItems.filter(
      (item) => item.start_date.startsWith(date) === true
    );

    if (!schedule.north) {
      items = items.filter((item) => item.text.search("North") === -1);
    }
    if (!schedule.south) {
      items = items.filter((item) => item.text.search("South") === -1);
    }
    dispatch(setCurrentItems(items));
  };

  const incrementDays = (date) => {
    const passedDate = new Date(date);
    dispatch(setPrevDay(new Date(passedDate)));
    dispatch(setCurrDay(new Date(schedule.nextDay)));
    dispatch(
      setNextDay(new Date(passedDate.setDate(passedDate.getDate() + 2)))
    ); // Current day plus 2 days
  };

  const decrementDays = (date) => {
    const passedDate = new Date(date);
    dispatch(setNextDay(new Date(schedule.currDay)));
    dispatch(setCurrDay(new Date(schedule.prevDay)));
    dispatch(
      setPrevDay(new Date(passedDate.setDate(passedDate.getDate() - 1)))
    ); // Previous day minus 1 day
  };

  const getErrorMessage = () => {
    // console.log(error);
    if (schedule.error === "Network Error") {
      return "Oops, looks like you don't have internet right now.  Try again later.";
    } else {
      return schedule.error;
    }
  };

  const Toggle = () => {
    return (
      <Fragment>
        <div className="toggle-container">
          <div id="toggleOpen" className="toggle-open" onClick={openToggle}>
            <div className="show-text">Open Search &amp; Date Picker</div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <div className="main-container" id="main">
      <div className="left-side" id="toggle-content">
        <div className="calendar">
          <Calendar
            updateCurrentItems={updateCurrentItems}
            closeToggle={closeToggle}
            toggle={width <= 550}
          />
        </div>
        <div className="search">
          <Search
            clearSearchResults={clearSearchResults}
            closeToggle={closeToggle}
            toggle={width <= 550}
          />
        </div>
        {schedule.searchResults === null && (
          <RinkFilters updateCurrentItems={updateCurrentItems} />
        )}
        {width <= 550 && (
          <div>
            <button
              href="!#"
              type="button"
              className="btn btn-blue btn-nav close-button"
              onClick={closeToggle}
            >
              Close
            </button>
          </div>
        )}
      </div>
      {width <= 550 ? <Toggle /> : ""}
      {schedule.searchResults !== null ? (
        <div className="schedule-items">
          <h3 className="search-results">Search Results</h3>
          {schedule.searchResults.length === 0 ? (
            <h2 className="no-results">No Search Results</h2>
          ) : (
            schedule.searchResults.map((item) => (
              <ScheduleItem key={item.id} item={item} />
            ))
          )}
        </div>
      ) : (
        /* else if searchResults === null, show schedule items */
        <div className="schedule-items">
          {
            schedule.currDay !== null && schedule.nextDay !== null ? (
              <div className="schedule-nav">
                <div className="">
                  <button
                    href="!#"
                    type="button"
                    className="btn btn-blue btn-nav"
                    onClick={() => {
                      updateCurrentItems(formatDate(schedule.prevDay));
                      decrementDays(schedule.prevDay);
                    }}
                  >
                    {formatDate(schedule.prevDay)}
                  </button>
                </div>
                <div>
                  <div className="currentDay">
                    {formatDate(schedule.currDay)}
                  </div>
                </div>
                <div>
                  <button
                    href="#!"
                    type="button"
                    className="btn btn-green btn-nav"
                    onClick={() => {
                      updateCurrentItems(formatDate(schedule.nextDay));
                      incrementDays(schedule.currDay);
                    }}
                  >
                    {formatDate(schedule.nextDay)}
                  </button>
                </div>
              </div>
            ) : (
              <p></p>
            ) /* Avoid errors with formatDate() if dates are null */
          }
          {schedule.loading ? (
            <div className="spinner">
              <img src={hockeyFight} alt="Loading Data" />
              <p>Massaging the data...</p>
            </div> /* if Loading true */
          ) : schedule.error !== null ? (
            <p className="no-results">
              {getErrorMessage()}
            </p> /* if there's an error display a message */
          ) : schedule.currentItems.length === 0 ? (
            <h2 className="no-results">
              Nothing on Schedule
            </h2> /* if schedule is empty that day */
          ) : (
            schedule.currentItems.map((item) => (
              <ScheduleItem key={item.id} item={item} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DailySchedule;
