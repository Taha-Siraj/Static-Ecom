export const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      return { ...state, isLogin: true, user: action.payload, loading: false };
    }
    case "USER_LOGOUT": {
      return { ...state, isLogin: false, user: null, cartCount: 0, loading: false };
    }
    case "SET_CART_COUNT": {
      return { ...state, cartCount: action.payload };
    }
    case "SET_LOADING": {
      return { ...state, loading: action.payload };
    }
    default: {
      return state;
    }
  }
};
