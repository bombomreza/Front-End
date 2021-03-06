const INITIAL_STATE = {
  cart: [],
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_CART":
      return {
        cart: action.payload,
      };
    default:
      return state;
  }
};
