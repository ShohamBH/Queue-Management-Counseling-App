import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "isLogin",
  initialState: {
    value: JSON.parse(sessionStorage.getItem('isLogin')) || false, // קרא את המצב מה-sessionStorage
    isConnect: sessionStorage.getItem('isConnect') || "user", // קרא את מצב ההתחברות
  },
  reducers: {
    login: (state) => {
      state.value = true;
      state.isConnect = "admin";
      // שמור ב-sessionStorage אחרי התחברות
      sessionStorage.setItem('isLogin', true);
      sessionStorage.setItem('isConnect', "admin");
    },
    logout: (state) => {
      state.value = false;
      state.isConnect = "user";
      // מחיקת הנתונים מ-sessionStorage אחרי התנתקות
      sessionStorage.removeItem('isLogin');
      sessionStorage.removeItem('isConnect');
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
