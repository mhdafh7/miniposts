import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

export type PostType = {
  _id?: string;
  creator: string;
  title: string;
  description: string;
  createdAt?: string;
};
const Post = ({ title, description, creator }: PostType) => {
  return (
    <article className="card w-96 bg-base-100 shadow-xl transition-shadow hover:shadow-2xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-start items-center">
          <p className="text-neutral opacity-60">post by @{creator}</p>
          <button className="btn btn-error">
            <TrashIcon className="w-5 h-5" />
          </button>
          <button className="btn btn-info">
            <PencilSquareIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </article>
  );
};
export default Post;
