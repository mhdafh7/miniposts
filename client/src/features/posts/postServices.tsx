import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/index';
import { PostType } from '../../components/PostCard';

export const getPosts = createAsyncThunk('posts/fetchAll', async () => {
  const { data } = await api.fetchPosts();
  return data;
});

export const createPost = createAsyncThunk('posts/create', async (post: PostType) => {
  const { data } = await api.createPost(post);
  return data;
});

export const updatePost = createAsyncThunk('posts/update', async ({ id, post }: { id: string, post: PostType }) => {
  const { data } = await api.updatePost(id, post);
  return data;
});

export const deletePost = createAsyncThunk('posts/delete', async (id: string) => {
  await api.deletePost(id);
  return id;
});
