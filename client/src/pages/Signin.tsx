import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { signin } from "../actions/authActions";

export type SignInFormValues = {
  email: string;
  password: string;
};

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required").min(8).max(200),
});

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col items-center gap-5">
        <h2 className="text-3xl font-bold mb-6 underline">Sign in</h2>
        <div className="">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SignInSchema}
            onSubmit={(values: SignInFormValues) => {
              try {
                dispatch(signin(values, navigate));
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
                <button
                  type="submit"
                  disabled={isSubmitting || !formik.isValid}
                  className="btn btn-block btn-primary mt-3"
                >
                  Signin
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <h4 className="text-sm">
          Don&apos;t have an account?&nbsp;
          <span className="underline">
            <Link to={"/signup"}>Sign up.</Link>
          </span>
        </h4>
      </div>
    </div>
  );
};
export default Signin;
