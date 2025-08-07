import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import businessDetailslice from "./businessDetailslice";
import servicesSlice from "./servicesSlice";
import meetingsSlice from "./meetingsSlice";

const store = configureStore({
  reducer: {
    businessDetails: businessDetailslice,
    isLogin: loginSlice,
    services: servicesSlice,
    meetings: meetingsSlice,
    
  },
});

export default store;