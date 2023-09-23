import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  isAuthenticated: boolean;
  nickname: string | null;
  userId: number | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  nickname: null,
  userId: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ userId: number, nickname: string }>) => {
      console.log("action.payload:", action.payload);
      state.userId = action.payload.userId
      state.nickname = action.payload.nickname;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      console.log('User logged out');
      state.nickname = null;
      // AsyncStorage.removeItem('token')
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
