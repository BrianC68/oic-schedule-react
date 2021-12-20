import axios from "axios";
import formatDate from "../utils/formatDate";
import {
    GET_SCHEDULE,
    SET_CURRENT_ITEMS,
    SET_CURR_DAY,
    SET_NEXT_DAY,
    SET_PREV_DAY,
    SEARCH_SCHEDULE,
    CLEAR_SEARCH_RESULTS,
    SET_NORTH,
    SET_SOUTH,
    ERROR,
} from '../actions/types';

export const getSchedule = () => async dispatch => {
    // Get schedule for the next four weeks
    var today = new Date();
    var futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 120);

    var startDate = formatDate(today);
    var endDate = formatDate(futureDate);
    const jsonDataPullURL = `https://ozaukeeicecenter.schedulewerks.com/public/ajax/swCalGet?tid=-1&from=${startDate}&to=${endDate}&Complex=-1`

    try {
        const res = await axios.get(jsonDataPullURL);
        dispatch({
            type: GET_SCHEDULE,
            payload: res.data
        })
    } catch (err) {
        console.log(err);
        dispatch({
            type: ERROR,
            payload: err,
        });
    }
};

export const setCurrDay = (date) => {
    return {
        type: SET_CURR_DAY,
        payload: date,
    }
};

export const setNextDay = (date) => {
    return {
        type: SET_NEXT_DAY,
        payload: date,
    }
};

export const setPrevDay = (date) => {
    return {
        type: SET_PREV_DAY,
        payload: date,
    }
};

export const setCurrentItems = (items) => {
    return {
        type: SET_CURRENT_ITEMS,
        payload: items,
    }
}

export const searchSchedule = (text) => {
    return {
        type: SEARCH_SCHEDULE,
        payload: text,
    }
}

export const clearSearchResults = () => {
    return {
        type: CLEAR_SEARCH_RESULTS,
    }
}

export const setNorth = () => {
    return {
        type: SET_NORTH,
    }
}

export const setSouth = () => {
    return {
        type: SET_SOUTH,
    }
}
