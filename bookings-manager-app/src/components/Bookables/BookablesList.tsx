import { Fragment, useEffect, useRef, useState, type RefObject } from "react";
import { FaArrowRight } from "react-icons/fa";
import getData from "../../utils/api";
import Spinner from "../UI/Spinner";

export default function BookablesList({ bookable, setBookable }) {
  // 1. Variables
  // const { group, bookableIndex, bookables, isLoading, error } = state;

  const [bookables, setBookables] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const group = bookable?.group; // bookable && bookable.group
  const groups = [...new Set(bookables.map((b) => b.group))];
  const bookablesInGroup = bookables.filter((b) => b.group === group);

  const nextButtonRef = useRef() as RefObject<HTMLButtonElement>;

  // 2. Effects
  /*
  useEffect(() => {
    dispatch({ type: "FETCH_BOOKABLES_REQUEST" });

    getData("http://localhost:3001/bookables")
      .then((bookables) => {
        dispatch({ type: "FETCH_BOOKABLES_SUCCESS", payload: bookables });
      })
      .catch((error) => {
        dispatch({ type: "FETCH_BOOKABLES_ERROR", payload: error });
      });
  }, [dispatch]);
  */

  useEffect(() => {
    getData("http://localhost:3001/bookables")
      .then((bookables) => {
        setBookable(bookables[0]);
        setBookables(bookables);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, [setBookable]);

  // 3. Event handler functions
  function nextBookable() {
    // pass a function to setBookableIndex to get the latest state value: (i) => (i + 1) % bookablesInGroup.length
    // use previous state value to calculate the next index, and wrap around using modulo operator
    // setBookableIndex((i) => (i + 1) % bookablesInGroup.length);

    // dispatch an action that doesn't need a payload
    // dispatch({ type: "NEXT_BOOKABLE" });

    const i = bookablesInGroup.indexOf(bookable);
    const nextIndex = (i + 1) % bookablesInGroup.length;
    const nextBookable = bookablesInGroup[nextIndex];
    setBookable(nextBookable);
  }

  function changeGroup(e: React.ChangeEvent<HTMLSelectElement>) {
    // dispatch({ type: "SET_GROUP", payload: e.target.value });

    const bookablesInSelectedGroup = bookables.filter(
      (b) => b.group === e.target.value,
    );
    setBookable(bookablesInSelectedGroup[0]);
  }

  // function changeBookable(selectedIndex: number) {
  //   dispatch({ type: "SET_BOOKABLE", payload: selectedIndex });
  //   nextButtonRef.current?.focus();
  // }

  function changeBookable(selectedBookable) {
    setBookable(selectedBookable);
    nextButtonRef.current?.focus();
  }

  // 4. Conditional rendering
  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return (
      <p>
        <Spinner />
        Loading bookables...
      </p>
    );
  }

  // 5. Final rendering
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
          {bookablesInGroup.map((btnBookable) => (
            <li
              key={btnBookable.id}
              className={
                btnBookable.id === bookable.id ? "selected" : undefined
              }
            >
              <button
                className="btn"
                onClick={() => changeBookable(btnBookable)}
              >
                {btnBookable.title}
              </button>
            </li>
          ))}
        </ul>
        <p>
          <button
            className="btn"
            autoFocus
            onClick={nextBookable}
            ref={nextButtonRef}
          >
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>
    </Fragment>
  );
}
