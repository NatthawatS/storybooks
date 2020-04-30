// Actions
const CHANGE_BOOKING = "booth-register/user/CHANGE_BOOKING";
const CLEAR_BOOKING = "ebs/user/CLEAR_BOOKING";
const initialState = {
  book: [],
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_BOOKING: {
      const { book } = action.payloads;
      return {
        ...state,
        book,
      };
    }
    case CLEAR_BOOKING:
      return [];
    default:
      return state;
  }
}

// Action Creators
export function changeSale(book) {
  return { type: CHANGE_BOOKING, payloads: { book } };
}

export function clearBooking() {
  return { type: CLEAR_BOOKING };
}
