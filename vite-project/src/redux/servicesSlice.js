import { createSlice } from "@reduxjs/toolkit";

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    servicesList: [],
  },
  reducers: {
    setServices: (state, action) => {
      state.servicesList = action.payload;
    },
    addService: (state, action) => {
      state.servicesList.push(action.payload);
    },
    updateService: (state, action) => {
      const index = state.servicesList.findIndex(service => service.id === action.payload.id);
      if (index !== -1) {
        state.servicesList[index] = action.payload;
      }
    },
  },
});

export const { setServices, addService, updateService } = servicesSlice.actions;
export default servicesSlice.reducer;
