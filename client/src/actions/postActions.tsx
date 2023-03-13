import * as api from "../api/index";
import { PostType } from "../components/PostCard";

export const getPosts =
  () => async (dispatch: (arg0: { type: any; payload: any }) => void) => {
    try {
      const { data } = await api.fetchPosts();

      dispatch({ type: "FETCH_ALL", payload: data });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

export const createPost =
  (post: PostType) =>
  async (dispatch: (arg0: { type: any; payload: any }) => void) => {
    try {
      const { data } = await api.createPost(post);

      dispatch({ type: "CREATE", payload: data });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

export const updatePost =
  (id: string, post: PostType) =>
  async (dispatch: (arg0: { type: any; payload: any }) => void) => {
    try {
      const { data } = await api.updatePost(id, post);

      dispatch({ type: "UPDATE", payload: data });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

export const deletePost =
  (id: string) =>
  async (dispatch: (arg0: { type: any; payload: any }) => void) => {
    try {
      await api.deletePost(id);

      dispatch({ type: "DELETE", payload: id });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };
