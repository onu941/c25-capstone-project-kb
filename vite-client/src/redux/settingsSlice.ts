import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  isAuthenticated: boolean;
  email: string | null;
};

function initialState(): AuthState {
  return {
    isAuthenticated: localStorage.getItem("token") !== null,
    email: "",
  };
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.email = null;
      localStorage.removeItem("token");
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
