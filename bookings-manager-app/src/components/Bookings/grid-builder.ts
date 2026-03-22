import { addDays, shortISO } from "../../utils/date-wrangler";
import { sessions as sessionNames } from "../../static.json";

export function getGrid(bookable, startDate) {
  const dates = bookable.days
    .sort()
    .map((day) => shortISO(addDays(startDate, day)));

  const sessions = bookable.sessions.map((session) => sessionNames[session]);

  const grid = {};

  sessions.forEach((session) => {
    grid[session] = {};

    dates.forEach(
      (date) =>
        (grid[session][date] = {
          session,
          date,
          bookableId: bookable.id,
          title: "",
        }),
    );
  });

  return {
    grid,
    dates,
    sessions,
  };
}

export function transformBookings(bookingsArray) {
  return bookingsArray.reduce((bookings, booking) => {
    const { session, date } = booking;

    if (!bookings[session]) {
      bookings[session] = {};
    }

    bookings[session][date] = booking;

    return bookings;
  }, {});
}

/*
grid["Breakfast"]["2020-08-03"]

{
  "session": "Breakfast",
  "date": "2020-08-03",
  "bookableId": 4,
  "title": ""
}

{
  "sessions": ["Breakfast", "Morning", "Lunch", "Afternoon", "Evening"],
  "days": [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}

bookable
{
  "id": 1,
  "group": "Rooms",
  "title": "Meeting Room",
  "notes": "The one with the big table and interactive screen.", 
  "sessions": [1, 2, 3],
  "days": [1, 2, 3, 4, 5]
}

bookings["Morning"]["2020-06-24"]
{
  "id": 1,
  "session": "Morning",
  "date": "2020-06-24",
  "title": "Movie Pitch!",
  "bookableId": 1,
  "bookerId": 2
}

*/
