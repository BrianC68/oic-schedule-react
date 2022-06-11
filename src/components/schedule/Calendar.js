import React, { useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import {
  setCurrDay,
  setPrevDay,
  setNextDay,
  clearSearchResults,
} from "../../store/schedule-actions";
import formatDate from "../../utils/formatDate";

const Calendar = ({
  updateCurrentItems,
  closeToggle,
  toggle,
}) => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.schedule.searchResults);
  const [searchDate, setSearchDate] = useState(new Date());

  const goToDate = (date) => {
    if (searchResults !== null) {
      dispatch(clearSearchResults());
    }
    updateCurrentItems(formatDate(date));
    dispatch(setCurrDay(new Date(date)));
    dispatch(setPrevDay(new Date(date.setDate(date.getDate() - 1))));
    dispatch(setNextDay(new Date(date.setDate(date.getDate() + 2))));
    setSearchDate(date.setDate(date.getDate() - 1));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const ButtonInput = forwardRef(({ value, onClick }, ref) => (
    <button type="button" className="btn btn-dark" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  return (
    <div>
      Go To Date{" "}
      <DatePicker
        selected={searchDate}
        onChange={(calDate) => {
          goToDate(calDate);
          toggle && closeToggle();
        }}
        customInput={<ButtonInput />}
        minDate={new Date()}
        popperPlacement="top"
      />
    </div>
  );
};

export default Calendar;
