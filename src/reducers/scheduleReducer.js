import {
    GET_SCHEDULE,
    SET_CURRENT_ITEMS,
    SET_CURR_DAY,
    SET_NEXT_DAY,
    SET_PREV_DAY,
    SEARCH_SCHEDULE,
    CLEAR_SEARCH_RESULTS,
    SET_NORTH,
    SET_SOUTH
} from '../actions/types';
import formatDate from '../utils/formatDate';

const initialState = {
    scheduleItems: [],
    currentItems: [],
    searchResults: null,
    loading: true,
    prevDay: null,
    currDay: null,
    nextDay: null,
    north: true,
    south: true,
}

let today = new Date();
let currentDate = formatDate(today);

const schedule = (state = initialState, action) => {
    switch(action.type) {
        case GET_SCHEDULE:
            return {
                ...state,
                scheduleItems: action.payload,
                currentItems: action.payload.filter(item => item.start_date.startsWith(currentDate) === true),
                loading: false,
            }
        case SET_CURRENT_ITEMS:
            return {
                ...state,
                currentItems: action.payload,
            }
        case SET_CURR_DAY:
            return {
                ...state,
                currDay: action.payload,
            }
        case SET_NEXT_DAY:
            return {
                ...state,
                nextDay: action.payload,
            }
        case SET_PREV_DAY:
            return {
                ...state,
                prevDay: action.payload,
            }
        case SEARCH_SCHEDULE:
            return {
                ...state,
                searchResults: state.scheduleItems.filter(item => item.text.toLowerCase().search(action.payload.toLowerCase()) !== -1),
            }
        case CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: null,
            }
        case SET_NORTH:
            return {
                ...state,
                north: !state.north,
            }
        case SET_SOUTH:
            return {
                ...state,
                south: !state.south,
            }
        default:
            return {
                ...state,
            }
    }
}

export default schedule;
