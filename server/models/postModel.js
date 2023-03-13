import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  description: String,
  creator: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Posts = mongoose.model("Posts", postSchema);

export default Posts;
