import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loggedIn: false,
    user: null,
  },
  reducers: {
    switchLoginState: (state) => {
      state.loggedIn = !state.loggedIn;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      console.log(action.payload)
    },
  },
});

// Action creators are generated for each case reducer function
export const { switchLoginState,setUser } = loginSlice.actions;

export default loginSlice.reducer;
