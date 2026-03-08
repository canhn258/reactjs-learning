export default function reducer(
  state: {
    group: string;
    bookableIndex: number;
    bookables: any[];
    isLoading: boolean;
    error: Error;
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
    case "NEXT_BOOKABLE":
      const count = state.bookables.filter(
        (b) => b.group === state.group,
      ).length; // get the count of bookables in the current group

      return {
        ...state,
        bookableIndex: (state.bookableIndex + 1) % count, // increment bookable index and wrap around using modulus operator
      };
    case "FETCH_BOOKABLES_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: false,
        bookables: [], // clear bookables when starting to fetch
      };
    case "FETCH_BOOKABLES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        bookables: action.payload, // set bookables to the fetched data from action payload
      };
    case "FETCH_BOOKABLES_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload, // set error to the error object from action payload
      };
    default:
      return state;
  }
}
