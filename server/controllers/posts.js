import express from "express";
import mongoose from "mongoose";

import PostModel from "../models/postModel.js";

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostModel.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostModel({
    ...post,
    username: req.body.username,
    createdAt: new Date().toISOString(),
  });
  
  try {
    await newPost.save()

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, username } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { title, description, username, _id: id };

  await PostModel.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostModel.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export default router;
