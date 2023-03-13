import { PlusIcon } from "@heroicons/react/24/solid";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Home = () => {
  return (
    <main className="mt-24 items-center">
      <Header />
      <h3 className="font-black underline text-2xl text-center">All posts</h3>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 576: 1, 768: 2, 1166: 3 }}
        className="h-full w-full"
      >
        <Masonry gutter="10px" className="[&>*]:items-center">
          <PostCard
            title="Title here"
            description="Helllllo there"
            creator="Me"
          />
          <PostCard
            title="Title here"
            description="Helllllo there"
            creator="Me"
          />
          <PostCard
            title="Title here"
            description="Helllllo there"
            creator="Me"
          />
          <PostCard
            title="Title here"
            description="Helllllo there"
            creator="Me"
          />
          <PostCard
            title="Title here"
            description="Helllllo there"
            creator="Me"
          />
          <PostCard
            title="Title here"
            description="Helllllo there"
            creator="Me"
          />
        </Masonry>
      </ResponsiveMasonry>
      {/* Modal abd FAB */}
      <input type="checkbox" id="post-modal" className="modal-toggle" />
      <PostForm currentId={undefined} setCurrentId={undefined} />
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
