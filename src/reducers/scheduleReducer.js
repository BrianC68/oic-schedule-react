import {
    GET_TODAYS_SCHEDULE,
    GET_SCHEDULE,
} from '../actions/types';

const initialState = {
    todaysSchedule: null,
    schedule: null,
}

const schedule = (state = initialState, action) => {
    switch(action.type) {
        case GET_TODAYS_SCHEDULE:
            return {
                ...state,
                todaysSchedule: action.payload
            }
        case GET_SCHEDULE:
            return {
                ...state,
                schedule: action.payload
            }
        default:
            return {
                ...state,
            }
    }
}

export default schedule;
