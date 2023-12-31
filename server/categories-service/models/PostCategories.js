import { Schema, model } from "mongoose";

const PostCategoriesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 255, // Example: Set a maximum length for the title
      // Add more validation as needed
    },
  },
  {
    timestamps: true,
    // Example: Add an index on the title field for faster queries
    indexes: [{ name: "title_index", fields: { title: 1 } }],
  }
);

const PostCategories = model("PostCategories", PostCategoriesSchema);

export default PostCategories;
