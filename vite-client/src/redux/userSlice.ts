import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  name: string;
  phone: string | number | null;
  email: string;
  is_admin: boolean;
  image_id: number;
  iat?: number;
  exp?: number;
}

function initialState(): UserState {
  return {
    name: "",
    phone: null,
    email: "",
    is_admin: false,
    image_id: 0,
  };
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state: UserState, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setPhone: (state: UserState, action: PayloadAction<string | number>) => {
      state.phone = action.payload;
    },
    setEmail: (state: UserState, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setIsAdmin: (state: UserState, action: PayloadAction<boolean>) => {
      state.is_admin = action.payload;
    },
    setImageId: (state: UserState, action: PayloadAction<number>) => {
      state.image_id = action.payload;
    },
  },
});

export const { setName, setPhone, setEmail, setIsAdmin, setImageId } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
