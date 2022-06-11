import axios from "axios";

import { scheduleActions } from "./schedule-slice";
import formatDate from "../utils/formatDate";

export const getSchedule = () => {
  return async (dispatch) => {
    // console.log('getSchedule ran!')
    // const fetchSchedule = () => async dispatch => {
    // Get schedule for the next four weeks
    var today = new Date();
    var futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 120);

    var startDate = formatDate(today);
    var endDate = formatDate(futureDate);
    const jsonDataPullURL = `https://ozaukeeicecenter.schedulewerks.com/public/ajax/swCalGet?tid=-1&from=${startDate}&to=${endDate}&Complex=-1`;

    try {
      const res = await axios.get(jsonDataPullURL);
      dispatch(
        scheduleActions.getSchedule(res.data)
      );
    } catch (err) {
      // console.log(err);
      dispatch(
        scheduleActions.setError(err)
      );
    }
  };
  // }
};

export const setCurrDay = (date) => {
  return (dispatch) => {
    dispatch(
      scheduleActions.setCurrDay(date.toDateString())
    );
  };
};

export const setNextDay = (date) => {
  return (dispatch) => {
    dispatch(
      scheduleActions.setNextDay(date.toDateString())
    );
  };
};

export const setPrevDay = (date) => {
  return (dispatch) => {
    dispatch(
      scheduleActions.setPrevDay(date.toDateString())
    );
  };
};

export const setCurrentItems = (items) => {
  return (dispatch) => {
    dispatch(
      scheduleActions.setCurrentItems(items)
    );
  };
};

export const clearSearchResults = () => {
  return (dispatch) => {
    dispatch(scheduleActions.clearSearchResults());
  };
};

export const setNorth = () => {
  return (dispatch) => {
    dispatch(scheduleActions.setNorth());
  };
};

export const setSouth = () => {
  return (dispatch) => {
    dispatch(scheduleActions.setSouth());
  };
};
