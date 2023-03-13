import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { signup } from "../actions/authActions";
import passwordValidation from "../lib/passwordValidation";

export type SignUpFormValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: passwordValidation,
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col items-center gap-5">
        <h2 className="text-3xl mb-5 font-bold underline">Create an account</h2>

        <div className="">
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={(values: SignUpFormValues) => {
              try {
                dispatch(signup(values, navigate));
                console.log(values);
              } catch (error) {
                let errorMessage = "error.unknown";
                if (typeof error === "string") {
                  errorMessage = error.toUpperCase();
                } else if (error instanceof Error) {
                  errorMessage = error.message;
                }
                //   toast.error(`Sign up error! ${errorMessage}`, {
                //     position: toast.POSITION.BOTTOM_CENTER,
                //     // autoClose: 3500,
                //     closeOnClick: true,
                //   });
                console.error(errorMessage);
              }
            }}
          >
            {(formik) => (
              <Form className="">
                <div className="form-control">
                  <label className="label" htmlFor="username">
                    Username
                  </label>
                  <Field
                    type="username"
                    name="username"
                    id="username"
                    className="input input-bordered"
                  />
                  <p className="label-text-alt text-red-500 font-semibold mt-2">
                    <ErrorMessage name="username" />
                  </p>
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="email">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="input input-bordered"
                  />
                  <p className="label-text-alt text-red-500 font-semibold mt-2">
                    <ErrorMessage name="email" />
                  </p>
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="password">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="input input-bordered"
                  />
                  <p className="label-text-alt text-red-500 font-semibold mt-2">
                    <ErrorMessage name="password" />
                  </p>
                </div>
                <div className="form-control">
                  <label className="label" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="input input-bordered"
                  />
                  <p className="label-text-alt text-red-500 font-semibold mt-2">
                    <ErrorMessage name="confirmPassword" />
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || !formik.isValid}
                  className="btn btn-block btn-primary mt-3"
                >
                  Signup
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <h4 className="text-sm">
          Already have an account?&nbsp;
          <span className="underline">
            <Link to={"/signin"}>Signin.</Link>
          </span>
        </h4>
      </div>
    </div>
  );
};
export default Signup;
