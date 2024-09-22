import { createSlice } from "@reduxjs/toolkit";

export const adminLoginSlice = createSlice({
  name: "adminLogin",
  initialState: {
    adminLoggedIn: false,
    admin: null,
  },
  reducers: {
    switchAdminLoginState: (state) => {
      state.AdminLoggedIn = !state.loggedIn;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
      console.log(action.payload)
    },
  },
});

// Action creators are generated for each case reducer function
export const { switchAdminLoginState,setAdmin } = adminLoginSlice.actions;

export default adminLoginSlice.reducer;
