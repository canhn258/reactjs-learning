export default function reducer(
  state: {
    group: string;
    bookableIndex: number;
    hasDetails: boolean;
    bookables: any[];
  },
  action: { type: string; payload?: any },
) {
  switch (action.type) {
    case "SET_GROUP":
      return {
        ...state, // spread the existing state to keep other properties unchanged
        group: action.payload, // update group to the new value from action payload
        bookableIndex: 0, // reset bookable index to 0 when group changes
      };
    case "SET_BOOKABLE":
      return {
        ...state,
        bookableIndex: action.payload,
      };
    case "TOGGLE_HAS_DETAILS":
      return {
        ...state,
        hasDetails: !state.hasDetails,
      };
    case "NEXT_BOOKABLE":
      const count = state.bookables.filter(
        (b) => b.group === state.group,
      ).length; // get the count of bookables in the current group

      return {
        ...state,
        bookableIndex: (state.bookableIndex + 1) % count, // increment bookable index and wrap around using modulus operator
      };
    default:
      return state;
  }
}
