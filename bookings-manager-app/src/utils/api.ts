import { shortISO } from "./date-wrangler";

export default function getData(url: string) {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${res.status} ${res.statusText}`,
      );
    }
    return res.json();
  });
}

export function getBookings(
  bookableId: string,
  startDate: Date,
  endDate: Date,
) {
  const start = shortISO(startDate);
  const end = shortISO(endDate);
  const rootUrl = "http://localhost:3001/bookings";
  const query = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;
  return getData(`${rootUrl}?${query}`);
}
