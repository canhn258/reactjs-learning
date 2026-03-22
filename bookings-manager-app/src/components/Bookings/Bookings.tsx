import { useReducer, useState } from "react";
import { getWeek } from "../../utils/date-wrangler";

import WeekPicker from "./WeekPicker";

import weekReducer from "./weekReducer";
import BookingDetails from "./BookingDetails";
import BookingsGrid from "./BookingsGrid";

export default function Bookings({ bookable }) {
  // Manage the shared state for the selected week with the useReducer hook and pass it down to the
  // weekReducer - Reducer: a reducer function that uses an action to create a new state from the old
  // new Date() - Initialization argument: the value pass to the initialization function
  // getWeek - Initialization function: takes the date from props and returns an object with date, start, and end properties representing the current week
  const [week, dispatch] = useReducer(weekReducer, new Date(), getWeek);

  // Manage the shared state for the selected booking with the useState hook and pass it down to the BookingsGrid and BookingDetails components.
  const [booking, setBooking] = useState(null);
  
  return (
    <div className="bookings">
      <div>
        <WeekPicker dispatch={dispatch} />
        <BookingsGrid
          week={week}
          bookable={bookable}
          booking={booking}
          setBooking={setBooking}
        />
      </div>

      <BookingDetails booking={booking} bookable={bookable} />
    </div>
  );
}
