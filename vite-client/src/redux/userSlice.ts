import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  settings: string;
  bookingsTab: string;
}

function initialState(): UserState {
  try {
    const settings = localStorage.getItem("settings");
    const bookingsTab = localStorage.getItem("bookingsTab");
    if (settings && !bookingsTab) {
      return {
        settings: settings,
        bookingsTab: "partygoer",
      };
    } else if (!settings && bookingsTab) {
      return {
        settings: "bookings",
        bookingsTab: bookingsTab,
      };
    } else if (settings && bookingsTab) {
      return {
        settings: settings,
        bookingsTab: bookingsTab,
      };
    }
    return {
      settings: "bookings",
      bookingsTab: "partygoer",
    };
  } catch (error) {
    return {
      settings: "bookings",
      bookingsTab: "partygoer",
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
    bookingsTab: (state: UserState, action: PayloadAction<string>) => {
      try {
        state.bookingsTab = action.payload;
        localStorage.setItem("bookingsTab", action.payload);
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export const { settings, bookingsTab } = userSlice.actions;
export const userReducer = userSlice.reducer;
