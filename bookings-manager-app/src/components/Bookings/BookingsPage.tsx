import { useState } from "react";
import BookablesList from "../Bookables/BookablesList";
import Bookings from "./Bookings";

export default function BookingsPage() {
  // Manage the selected bookable with the useState hook
  // and pass it down to the BookablesList and Bookings components.
  const [bookable, setBookable] = useState(null);

  return (
    <main className="bookings-page">
      <BookablesList bookable={bookable} setBookable={setBookable} />
      <Bookings bookable={bookable} />
    </main>
  );
}
