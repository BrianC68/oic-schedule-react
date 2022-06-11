import { createSlice } from "@reduxjs/toolkit";
import formatDate from "../utils/formatDate";

let today = new Date();
let currentDate = formatDate(today);

const scheduleSlice = createSlice({
  name: "schedule",
  initialState: {
    scheduleItems: [],
    currentItems: [],
    searchResults: null,
    loading: true,
    prevDay: null,
    currDay: null,
    nextDay: null,
    north: true,
    south: true,
    error: null,
  },
  reducers: {
    getSchedule(state, action) {
      state.scheduleItems = action.payload;
      state.currentItems = action.payload.filter(item => item.start_date.startsWith(currentDate) === true);
      state.loading = false;
      state.error = null;
    },
    setCurrentItems(state, action) {
      state.currentItems = action.payload;
    },
    setCurrDay(state, action) {
      state.currDay = action.payload;
    },
    setNextDay(state, action) {
      state.nextDay = action.payload;
    },
    setPrevDay(state, action) {
      state.prevDay = action.payload;
    },
    searchSchedule(state, action) {
      console.log(action.payload);
      state.searchResults = state.scheduleItems.filter(
        (item) =>
          item.text.toLowerCase().search(action.payload.toLowerCase()) !== -1
      );
    },
    clearSearchResults(state) {
      state.searchResults = null;
    },
    setNorth(state) {
      state.north = !state.north;
    },
    setSouth(state) {
      state.south = !state.south;
    },
    setError(state, action) {
      state.error = action.payload.message;
      state.loading = false;
    },
  }
});

export const scheduleActions = scheduleSlice.actions;

export default scheduleSlice;
