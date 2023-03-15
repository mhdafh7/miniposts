import { AnyAction, createAsyncThunk } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router";
import { SignInFormValues } from "../../pages/Signin";
import { SignUpFormValues } from "../../pages/Signup";
import * as api from "../../api/index";

export type SignInPayload = {
  formData: SignInFormValues;
  navigate: NavigateFunction;
};
export type SignUpPayload = {
  formData: SignUpFormValues;
  navigate: NavigateFunction;
};

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ formData, navigate }: SignInPayload) => {
    const response = await api.signIn(formData);
    localStorage.setItem("profile", JSON.stringify(response.data));
    navigate("/");
    return response.data;
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ formData, navigate }: SignUpPayload) => {
    const response = await api.signUp(formData);
    localStorage.setItem("profile", JSON.stringify(response.data));
    navigate("/");
    return response.data;
  }
);
