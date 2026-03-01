import { useReducer } from "react";
import reducer from "./weekReducer";
import { getWeek } from "../../utils/date-wrangler";
import {
  FaCalendarDay,
  FaChevronCircleLeft,
  FaChevronRight,
} from "react-icons/fa";

export default function WeekPicker(props: { date: Date }) {
  // Reducer: use an action to create a new state from the old
  // Initialization argument: the value pass to the initialization function
  // Initialization function: getWeek takes the date from props and returns an object with date, start, and end properties representing the current week
  const [week, dispatch] = useReducer(reducer, props.date, getWeek);

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
