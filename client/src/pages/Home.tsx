import { PlusIcon } from "@heroicons/react/24/solid";
import Header from "../components/Header";
import PostCard, { PostType } from "../components/PostCard";
import PostForm from "../components/PostForm";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, Dispatch } from "react";
import { getPosts } from "../features/posts/postServices";
import { AsyncThunkAction } from "@reduxjs/toolkit";

const Home = () => {
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch() as Dispatch<AsyncThunkAction<any, void, any>>;
  const user = JSON.parse(localStorage.getItem("profile") as string);

  useEffect(() => {
    if (user) dispatch(getPosts());
  }, [currentId, dispatch]);

  const posts = useSelector(
    (state: { post: { posts: PostType[] } }) => state.post.posts
  );
  console.log(posts);

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
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {/* Modal abd FAB */}
      {modalOpen ? (
        <PostForm
          currentId={currentId}
          setCurrentId={setCurrentId}
          setModalOpen={setModalOpen}
        />
      ) : null}
      <div className="w-full flex justify-center fixed bottom-10">
        <button
          onClick={() => {
            setModalOpen(true);
          }}
          className="btn btn-wide btn-accent shadow-md transition-all hover:shadow-xl"
        >
          <PlusIcon className="w-4 h-4 mr-3 pointer-events-none" />
          New Post
        </button>
      </div>
    </main>
  );
};
export default Home;
