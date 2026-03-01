import WeekPicker from "./WeekPicker";

export default function BookingsPage() {
  return (
    <main className="bookings-page">
      <h1>Bookings</h1>
      <WeekPicker date={new Date()} />
    </main>
  );
}
