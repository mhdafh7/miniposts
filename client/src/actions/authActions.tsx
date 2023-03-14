import { NavigateFunction } from "react-router";
import { Dispatch } from "redux";
import * as api from "../api/index";
import { SignInFormValues } from "../pages/Signin";
import { SignUpFormValues } from "../pages/Signup";

export const signin =
  (formData: SignInFormValues, router: NavigateFunction): any =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.signIn(formData);

      dispatch({ type: "AUTH", data });

      router("/");
    } catch (error) {
      console.error(error);
    }
  };

export const signup =
  (formData: SignUpFormValues, router: NavigateFunction): any =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.signUp(formData);

      dispatch({ type: "AUTH", data });

      router("/");
    } catch (error) {
      console.error(error);
    }
  };
