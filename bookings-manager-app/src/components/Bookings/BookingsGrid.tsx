import { useMemo, useState } from "react";
import { getGrid } from "./grid-builder";

export default function BookingsGrid({ week, bookable, booking, setBooking }) {
  // week - The current week object containing the date, start, and end properties representing the selected week.
  // bookable - The currently selected bookable item (e.g., a room or resource) for which the bookings are being displayed.
  // booking - The currently selected booking, which can be used to display details or perform actions related to that booking.
  // setBooking - A function to update the selected booking state, allowing the component to change the current booking when a user interacts with the grid.

  // 1. Variables
  // Handle the state for the bookings data
  const [bookings, setBookings] = useState(null);
  // Handle the state for error state
  const [error, setError] = useState(false);

  /*
  Event: Initial render - Render with: Blank grid
  Event: Data fetching - Render with: Blank grid + loading spinner
  Event: Data fetched successfully - Render with: Grid filled with bookings data
  Event: Data fetching error - Render with: Blank grid + error message
  Event: Booking selected - Render with: Grid with selected booking highlighted + booking details displayed

  We don't want to regenerate the underlying grid data on each re-render, because it can be expensive to compute. 
  Instead, we can use the useMemo hook to memoize the grid data and only regenerate it when the bookable or week changes.

  By wrapping getGrid in useMemo, we ask React to store the generated grid lookup 
  and to call getGrid again only if the bookable or start date changes.
  */
  const { grid, sessions, dates } = useMemo(
    () => (bookable ? getGrid(bookable, week.start) : {}),
    [bookable, week.start], // Regenerate the grid when the bookable or week changes
  );

  // 2. Effects
  // 3. UI helper
  // 4. UI

  return (
    <div className="bookings-grid placeholder">
      <h3>Bookings Grid</h3>
      <p>{bookable?.title}</p>
      <p>{week.date.toISOString()}</p>
    </div>
  );
}
