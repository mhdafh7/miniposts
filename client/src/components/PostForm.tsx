import { ErrorMessage, Field, Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../actions/postActions";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

type FormValues = {
  title: string;
  description: string;
};

const handleSubmit = async (values: FormValues) => {};

type FormProps = {
  currentId: any;
  setCurrentId: any;
};
const PostForm = ({ currentId, setCurrentId }: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const post = useSelector((state: any) =>
    currentId
      ? state.posts.find((message: { _id: any }) => message._id === currentId)
      : null
  );
  const profileString = localStorage.getItem("profile");
  if (profileString !== null) {
    const user = JSON.parse(profileString);
  }

  return (
    <Formik
      initialValues={{ creator: "", title: "", description: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <label
              htmlFor="post-modal"
              className="btn btn-sm btn-square absolute right-2 top-2"
            >
              ✕
            </label>
            <div className="form-control">
              <label htmlFor="title" className="label">
                Title:
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
                Description:
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
              Submit
            </button>
          </div>
          {/* <button
            type="submit"
            disabled={isSubmitting || !formik.isValid}
            className={
              isSubmitting || !formik.isValid
                ? "btn btn-block btn-loading"
                : "btn btn-block btn-accent"
            }
          >
            Submit
          </button> */}
        </Form>
      )}
    </Formik>
  );
};
export default PostForm;
