import PostCategories from "../models/PostCategories";
import Post from "../models/Post";

const createPostCategory = async (req, res, next) => {
  try {
    const { title } = req.body;

    const postCategory = await PostCategories.findOne({ title });

    if (postCategory) {
      // Category already exists
      return res.status(400).json({ error: "Category is already created!" });
    }

    const newPostCategory = new PostCategories({
      title,
    });

    const savedPostCategory = await newPostCategory.save();

    return res.status(201).json({ category: savedPostCategory });
  } catch (error) {
    next(error);
  }
};

const getAllPostCategories = async (req, res, next) => {
  try {
    const postCategories = await PostCategories.find({});

    return res.json({ categories: postCategories });
  } catch (error) {
    next(error);
  }
};

const updatePostCategory = async (req, res, next) => {
  try {
    const { title } = req.body;

    const postCategory = await PostCategories.findByIdAndUpdate(
      req.params.postCategoryId,
      {
        title,
      },
      {
        new: true,
      }
    );

    if (!postCategory) {
      // Category not found
      return res.status(404).json({ error: "Category was not found" });
    }

    return res.json({ category: postCategory });
  } catch (error) {
    next(error);
  }
};

const deletePostCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.postCategoryId;

    await Post.updateMany(
      { categories: { $in: [categoryId] } },
      { $pull: { categories: categoryId } }
    );

    await PostCategories.deleteOne({ _id: categoryId });

    res.json({ message: "Post category is successfully deleted!" });
  } catch (error) {
    next(error);
  }
};

export {
  createPostCategory,
  getAllPostCategories,
  updatePostCategory,
  deletePostCategory,
};
