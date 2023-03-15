import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../features/posts/postServices";
import { UserType } from "./PostForm";

export type PostType = {
  _id?: string;
  username: string;
  title: string;
  description: string;
  createdAt?: string;
};
type PostProps = PostType & {
  setCurrentId: Dispatch<SetStateAction<string | null>>;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};
const Post = ({
  _id,
  username,
  title,
  description,
  createdAt,
  setCurrentId,
  modalOpen,
  setModalOpen,
}: PostProps) => {
  const dispatch = useDispatch() as Dispatch<
    AsyncThunkAction<string, string, any>
  >;
  const user: UserType = JSON.parse(localStorage.getItem("profile") as string);

  return (
    <article className="card w-96 bg-neutral-content shadow-xl transition-all hover:shadow-2xl hover:bg-neutral-focus hover:text-base-100 cursor-pointer">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-start items-center">
          <p className="opacity-60">post by @{username}</p>
          {user.result.username === username ||
          user.result.username === "mhdafh" ? (
            <>
              <button
                className="btn btn-error btn-square transition-colors hover:bg-red-500"
                onClick={() => dispatch(deletePost(_id as string))}
              >
                <TrashIcon className="w-5 h-5" />
              </button>
              <button
                className="btn btn-info btn-square transition-colors hover:bg-cyan-500"
                onClick={() => {
                  setCurrentId(_id as string);
                  setModalOpen(true);
                }}
              >
                <PencilSquareIcon className="w-5 h-5" />
              </button>
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
};
export default Post;
