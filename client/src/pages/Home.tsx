import { PlusIcon } from "@heroicons/react/24/solid";
import Header from "../components/Header";
import PostCard, { PostType } from "../components/PostCard";
import PostForm from "../components/PostForm";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getPosts } from "../actions/postActions";

const Home = () => {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile") as string);

  useEffect(() => {
    if (user) dispatch(getPosts());
  }, [currentId, dispatch]);

  const posts: PostType[] = useSelector(
    (state: { posts: PostType[] }) => state.posts
  );

  return (
    <main className="mt-24 items-center">
      <Header />
      <h3 className="font-black underline text-2xl text-center">All posts</h3>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 576: 1, 768: 2, 1166: 3 }}
        className="h-full w-full py-12"
      >
        <Masonry gutter="10px" className="[&>*]:items-center">
          {posts.map(({ title, description, username, _id }: PostType) => (
            <PostCard
              _id={_id}
              title={title}
              description={description}
              username={username}
              key={_id}
              setCurrentId={setCurrentId}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {/* Modal abd FAB */}
      <input type="checkbox" id="post-modal" className="modal-toggle" />
      <PostForm currentId={currentId} setCurrentId={setCurrentId} />
      <div className="w-full flex justify-center fixed bottom-10">
        <label
          htmlFor="post-modal"
          className="btn btn-wide btn-accent shadow-md transition-all hover:shadow-xl"
        >
          <PlusIcon className="w-4 h-4 mr-3 pointer-events-none" />
          New Post
        </label>
      </div>
    </main>
  );
};
export default Home;
