import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  phoneNumber: string | null;
  ownerName: string | null;
  shopName: string | null;
  token: string | null;
  data: {
    id?: string;
    phoneNumber?: string;
    name?: string;
    isVerified?: boolean;
  } | null;
}

const initialState: UserState = {
  phoneNumber: null,
  ownerName: null,
  shopName: null,
  token: null,
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (
      state,
      action: PayloadAction<{ phoneNumber: string; ownerName: string; shopName: string }>
    ) => {
      state.phoneNumber = action.payload.phoneNumber;
      state.ownerName = action.payload.ownerName;
      state.shopName = action.payload.shopName;
    },
    logoutUser: (state) => {
      state.phoneNumber = null;
      state.ownerName = null;
      state.shopName = null;
      state.token = null;
      state.data = null;
    },
    setUserToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserState["data"]>) => {
      state.data = action.payload;
    },
  },
});

export const { registerUser, logoutUser, setUserToken, setUserData } = userSlice.actions;
export default userSlice.reducer;
