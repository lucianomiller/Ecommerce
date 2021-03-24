const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)")
  .matches;

const initialState = {
  darkMode: prefersDarkMode
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        darkMode: !state.darkMode
      };

    default:
      return state;
  }
}

export default reducer;
