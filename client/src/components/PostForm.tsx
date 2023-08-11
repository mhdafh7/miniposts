import { ErrorMessage, Field, Formik, Form, FormikHelpers } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../features/posts/postServices";
import { PostType } from "./PostCard";
import { AsyncThunkAction } from "@reduxjs/toolkit";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

type FormValues = {
  title: string;
  description: string;
};

type FormProps = {
  currentId: any;
  setCurrentId: Dispatch<SetStateAction<any>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type UserType = {
  result: { username: string; email: string; _id: string };
  token: string;
};
const PostForm = ({ currentId, setCurrentId, setModalOpen }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch() as Dispatch<
    | AsyncThunkAction<any, PostType, any>
    | AsyncThunkAction<any, { id: string; post: PostType }, any>
  >;
  const post = useSelector((state: any) =>
    currentId
      ? state.post.posts.find((item: PostType) => item._id === currentId)
      : null
  );

  const profileString = localStorage.getItem("profile");
  let user: UserType;
  if (profileString !== null) {
    user = JSON.parse(profileString);
  }

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    setIsSubmitting(true);
    if (!currentId) {
      dispatch(
        createPost({
          ...values,
          username: user.result.username,
        })
      );
      resetForm();
      setIsSubmitting(false);
      setModalOpen(false);
    } else {
      dispatch(
        updatePost({
          id: currentId,
          post: { ...values, username: user.result.username },
        })
      );
      setIsSubmitting(false);
      setCurrentId(null);
      resetForm();
      setModalOpen(false);
    }
  };
  const initialValues: FormValues = {
    title: post ? post.title : "",
    description: post ? post.description : "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form className="modal modal-bottom !visible !opacity-100 !pointer-events-auto sm:modal-middle backdrop-blur-md bg-black bg-opacity-30">
          <div className="modal-box">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              className="btn btn-sm btn-square absolute right-2 top-2"
            >
              ✕
            </button>
            <div className="form-control">
              <label htmlFor="title" className="label">
                Title
              </label>
              <Field
                id="title"
                name="title"
                placeholder="Enter a title"
                className="input input-bordered"
              />
              <p className="label-text-alt text-red-500 font-semibold mt-2">
                <ErrorMessage name="title" />
              </p>
            </div>
            <div className="form-control">
              <label htmlFor="description" className="label">
                Description
              </label>
              <Field
                id="description"
                name="description"
                placeholder="Enter a description"
                as="textarea"
                className="textarea textarea-bordered"
              />
              <p className="label-text-alt text-red-500 font-semibold mt-2">
                <ErrorMessage name="description" />
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !formik.isValid}
              className="btn btn-block btn-primary mt-3"
            >
              {!currentId ? "Add post" : "Edit post"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default PostForm;
