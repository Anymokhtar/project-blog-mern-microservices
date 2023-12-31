import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    desc: { type: String, required: true, maxLength: 1000 }, // Example: Set a maximum length for the description
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    isVerified: { type: Boolean, default: false }, // Consider a more descriptive name
    parent: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
    replyOnUser: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// Virtual to handle replies
CommentSchema.virtual("replies", {
  ref: "Comment",
  localField: "_id",
  foreignField: "parent",
});

// Indexes for improved query performance if needed
CommentSchema.index({ post: 1, createdAt: 1 });

const Comment = model("Comment", CommentSchema);
export default Comment;
