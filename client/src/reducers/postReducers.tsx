import { PostType } from "../components/PostCard";

export default (
  posts: PostType[] = [],
  action: { type: any; payload: PostType }
) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...posts, action.payload];
    case "UPDATE":
      return posts.map((post: PostType) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "DELETE":
      return posts.filter((post: PostType) => post._id !== action.payload._id);
    default:
      return posts;
  }
};
