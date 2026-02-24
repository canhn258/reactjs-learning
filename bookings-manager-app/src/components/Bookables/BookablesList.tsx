import { useState } from "react";
import { bookables } from "../../static.json";

export default function BookablesList() {
  const group = "Rooms";
  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const [bookableIndex, setBookableIndex] = useState(1);

  return (
    <ul className="bookables items-list-nav">
      {bookablesInGroup.map((bookable, index) => (
        <li
          key={bookable.id}
          className={index === bookableIndex ? "selected" : undefined}
        >
          <button className="btn" onClick={() => setBookableIndex(index)}>
            {bookable.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
