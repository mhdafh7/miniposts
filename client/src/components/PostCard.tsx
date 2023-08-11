import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction, useState } from "react";
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
  const [isHovering, setIsHovering] = useState(false);

  return (
    <article
      className="card w-96 shadow-xl transition-all hover:shadow-2xl hover:bg-neutral-focus cursor-pointer border-2 border-current"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-start items-center relative">
          <p className="opacity-60">post by @{username}</p>
          {user.result.username === username && isHovering ? (
            <span className="absolute bottom-1 right-0 flex gap-2">
              <button
                className="btn btn-error btn-square transition-all hover:bg-red-500"
                onClick={() => dispatch(deletePost(_id as string))}
              >
                <TrashIcon className="w-5 h-5" />
              </button>
              <button
                className="btn btn-info btn-square transition-all hover:bg-cyan-500"
                onClick={() => {
                  setCurrentId(_id as string);
                  setModalOpen(true);
                }}
              >
                <PencilSquareIcon className="w-5 h-5" />
              </button>
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
};
export default Post;
