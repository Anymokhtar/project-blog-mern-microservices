import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    caption: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    body: { type: Object, required: true },
    photo: { type: String, required: true }, // Consider making this required if a photo is essential for each post
    user: { type: Schema.Types.ObjectId, ref: "User" },
    tags: { type: [String], required: true }, // Consider making this required if having at least one tag is essential
    categories: [{ type: Schema.Types.ObjectId, ref: "PostCategories" }],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});


PostSchema.index({ user: 1, createdAt: 1 });

const Post = model("Post", PostSchema);
export default Post;
