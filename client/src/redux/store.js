import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import adminLoginReducer from "./adminLoginSlice";

export default configureStore({
  reducer: {
    loginReducer,
    adminLoginReducer,
  },
});
