import { useState } from "react";
import { bookables } from "../../static.json";
import { FaArrowRight } from "react-icons/fa";

export default function BookablesList() {
  const [group, setGroup] = useState("Kit");
  const [bookableIndex, setBookableIndex] = useState(0);
  
  const groups = [...new Set(bookables.map((b) => b.group))];
  const bookablesInGroup = bookables.filter((b) => b.group === group);

  function nextBookable() {
    // pass a function to setBookableIndex to get the latest state value: (i) => (i + 1) % bookablesInGroup.length
    // use previous state value to calculate the next index, and wrap around using modulo operator
    setBookableIndex((i) => (i + 1) % bookablesInGroup.length);
  }

  return (
    <div>
      <select value={group} onChange={(e) => setGroup(e.target.value)}>
        {groups.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

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
      <p>
        <button className="btn" autoFocus onClick={nextBookable}>
          <FaArrowRight />
          <span>Next</span>
        </button>
      </p>
    </div>
  );
}
