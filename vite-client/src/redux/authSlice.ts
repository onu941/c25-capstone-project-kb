import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { JWT } from "../app/interface";
import jwtDecode from "jwt-decode";

export type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  user_id: string | number | null;
};

function initialState(): AuthState {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded: JWT = jwtDecode(token);

      return {
        isAuthenticated: token !== null,
        token: token,
        user_id: decoded.id,
      };
    }

    return {
      isAuthenticated: false,
      token: null,
      user_id: null,
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      token: null,
      user_id: null,
    };
  }
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: AuthState, action: PayloadAction<string>) => {
      try {
        state.token = action.payload;
        state.isAuthenticated = true;

        localStorage.setItem("token", action.payload);
        const token = localStorage.getItem("token");
        if (token) {
          const decoded: JWT = jwtDecode(token);
          localStorage.setItem("userId", JSON.stringify(decoded.id));
        }
      } catch (error) {
        console.log(error);
      }
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
