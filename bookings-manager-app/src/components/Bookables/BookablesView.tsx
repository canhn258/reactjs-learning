import { Fragment, useReducer } from "react";

import reducer from "./reducer";
import BookablesList from "./BookablesList";
import BookableDetails from "./BookableDetails";

const initialState = {
  group: "Rooms",
  bookableIndex: 0,
  bookables: [],
  isLoading: true,
  error: false,
};

export default function BookablesView() {
  // reducer: uses an action to create a new state from the old
  // initialState: the value of each property when component is first rendered
  // state: the current state object with properties group, bookableIndex, hasDetails, and bookables
  // dispatch: pass an action object to dispatch to update the state, with type and optional payload properties
  const [state, dispatch] = useReducer(reducer, initialState);

  // assign the state values to local variables
  const { group, bookableIndex, bookables } = state;
  const bookablesInGroup = bookables.filter((b) => b.group === group);

  // There's no need to call useState to store the selected bookable object itself,
  // because we can derive it from the bookableIndex already stored in state.
  const bookable = bookablesInGroup[bookableIndex];

  return (
    <Fragment>
      <BookablesList state={state} dispatch={dispatch} />
      <BookableDetails bookable={bookable} />
    </Fragment>
  );
}
