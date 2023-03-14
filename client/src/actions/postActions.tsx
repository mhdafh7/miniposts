import { Dispatch } from "redux";
import * as api from "../api/index";
import { PostType } from "../components/PostCard";

export const getPosts = (): any => async (dispatch: Dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};

export const createPost =
  (post: PostType): any =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.createPost(post);

      dispatch({ type: "CREATE", payload: data });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

export const updatePost =
  (id: string, post: PostType): any =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await api.updatePost(id, post);

      dispatch({ type: "UPDATE", payload: data });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

export const deletePost =
  (_id: string): any =>
  async (dispatch: Dispatch) => {
    try {
      await api.deletePost(_id);

      dispatch({ type: "DELETE", payload: _id });
    } catch (error) {
      // if (error instanceof Error) console.error(error.message);
      console.error(error)
    }
  };
