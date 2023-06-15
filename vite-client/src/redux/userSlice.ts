import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  settings: string;
}

function initialState(): UserState {
  try {
    const settings = localStorage.getItem("settings");
    if (settings) {
      return {
        settings: settings,
      };
    }
    return {
      settings: "bookings",
    };
  } catch (error) {
    return {
      settings: "bookings",
    };
  }
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    settings: (state: UserState, action: PayloadAction<string>) => {
      try {
        state.settings = action.payload;
        localStorage.setItem("settings", action.payload);
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export const { settings } = userSlice.actions;
export const userReducer = userSlice.reducer;
