import { createSlice } from "@reduxjs/toolkit";

const meetingsSlice = createSlice({
  name: "meetings",
  initialState: {
    meetingsList: [],
  },
  reducers: {
    setMeetings: (state, action) => {
      state.meetingsList = action.payload;
    },
    addMeeting: (state, action) => {
      state.meetingsList.push(action.payload);
    },
  },
});

export const { setMeetings, addMeeting } = meetingsSlice.actions;
export default meetingsSlice.reducer;