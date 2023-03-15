import { createSlice } from "@reduxjs/toolkit";
import { signin, signup } from "./authServices";

type AuthState = {
  authData: any;
  loading: boolean;
  errors: any;
};
const initialState: AuthState = {
  authData: null,
  loading: false,
  errors: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.authData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, { payload }) => {
        state.authData = payload;
        state.loading = false;
      })
      .addCase(signin.rejected, (state, { error }) => {
        state.errors = error.message;
        state.loading = false;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.authData = payload;
        state.loading = false;
      })
      .addCase(signup.rejected, (state, { error }) => {
        state.errors = error.message;
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
