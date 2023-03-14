import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  description: String,
  username: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostModel = mongoose.model("Posts", postSchema);

export default PostModel;
