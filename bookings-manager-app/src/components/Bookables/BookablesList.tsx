import { Fragment, useState } from "react";
import { bookables, days, sessions } from "../../static.json";
import { FaArrowRight } from "react-icons/fa";

export default function BookablesList() {
  const [group, setGroup] = useState("Kit");
  const [bookableIndex, setBookableIndex] = useState(0);
  const [hasDetails, setHasDetails] = useState(false);

  const groups = [...new Set(bookables.map((b) => b.group))];
  const bookablesInGroup = bookables.filter((b) => b.group === group);

  // There's no need to call useState to store the selected bookable object itself,
  // because we can derive it from the bookableIndex already stored in state.
  const bookable = bookablesInGroup[bookableIndex];

  function nextBookable() {
    // pass a function to setBookableIndex to get the latest state value: (i) => (i + 1) % bookablesInGroup.length
    // use previous state value to calculate the next index, and wrap around using modulo operator
    setBookableIndex((i) => (i + 1) % bookablesInGroup.length);
  }

  function changeGroup(e: React.ChangeEvent<HTMLSelectElement>) {
    setGroup(e.target.value);
    setBookableIndex(0); // reset bookable index to 0 when group changes
  }

  return (
    <Fragment>
      <div>
        <select value={group} onChange={changeGroup}>
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

      {bookable && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>{bookable.title}</h2>
              <span className="controls">
                <label>
                  <input
                    type="checkbox"
                    checked={hasDetails}
                    onChange={() => setHasDetails((has) => !has)}
                  />
                  Show details
                </label>
              </span>
            </div>

            <p>{bookable.notes}</p>

            {hasDetails && (
              <div className="item-details">
                <h3>Availability</h3>
                <div className="bookable-availability">
                  <ul>
                    {bookable.days.sort().map((d) => (
                      <li key={d}>{days[d]}</li>
                    ))}
                  </ul>
                  <ul>
                    {bookable.sessions.sort().map((s) => (
                      <li key={s}>{sessions[s]}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
}
