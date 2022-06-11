import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { scheduleActions } from "../../store/schedule-slice";

const Search = ({ closeToggle, toggle }) => {
  const dispatch = useDispatch();
  let [text, setText] = useState("");

  const onSubmit = (e) => {
    if (text === "") {
      alert("Please enter search term(s)!");
      return;
    } else if (text.toLowerCase().search("figure") !== -1) {
      text = "figure";
    }
    dispatch(scheduleActions.searchSchedule(text));
    setText("");
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="searchContainer">
      <p>Search Schedule</p>
      <input
        className="form-input"
        type="text"
        name="search"
        placeholder="Enter Search Term"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>
        <button
          type="button"
          href="!#"
          className="btn btn-blue"
          onClick={() => {
            onSubmit();
            toggle && closeToggle();
          }}
        >
          Search
        </button>
      </p>
      <p>
        <button
          type="button"
          href="!#"
          className="btn btn-green"
          onClick={() => {
            dispatch(scheduleActions.clearSearchResults());
            scrollToTop();
            toggle && closeToggle();
          }}
        >
          Clear Results
        </button>
      </p>
    </div>
  );
};

export default Search;
