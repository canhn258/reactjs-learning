import { useReducer, useRef, useState, type RefObject } from "react";
import reducer from "./weekReducer";
import { getWeek } from "../../utils/date-wrangler";
import {
  FaCalendarCheck,
  FaCalendarDay,
  FaChevronCircleLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function WeekPicker(props: { date: Date }) {
  // Reducer: use an action to create a new state from the old
  // Initialization argument: the value pass to the initialization function
  // Initialization function: getWeek takes the date from props and returns an object with date, start, and end properties representing the current week
  const [week, dispatch] = useReducer(reducer, props.date, getWeek);

  // if we use the useRef hook to store the date text input value,
  // this component will be an uncontrolled component,
  // because the value of the input is not controlled by React state, but by the DOM element itself.
  // const textboxRef = useRef() as RefObject<HTMLInputElement>;
  const [dateText, setDateText] = useState("2026-03-17");

  const goToDate = () => {
    dispatch({
      type: "SET_DATE",
      payload: dateText,
    });
  };

  return (
    <div>
      <p className="date-picker">
        <button className="btn" onClick={() => dispatch({ type: "PREV_WEEK" })}>
          <FaChevronCircleLeft />
          <span>Prev</span>
        </button>

        <button className="btn" onClick={() => dispatch({ type: "TODAY" })}>
          <FaCalendarDay />
          <span>Today</span>
        </button>

        <span>
          <input
            type="text"
            placeholder="e.g. 2020-09-02"
            defaultValue="2026-03-17"
            value={dateText}
            onChange={(e) => setDateText(e.target.value)}
          />

          <button className="go btn" onClick={goToDate}>
            <FaCalendarCheck />
            <span>Go</span>
          </button>
        </span>

        <button className="btn" onClick={() => dispatch({ type: "NEXT_WEEK" })}>
          <span>Next</span>
          <FaChevronRight />
        </button>
      </p>
      <p>
        {week.start.toDateString()} - {week.end.toDateString()}
      </p>
    </div>
  );
}
