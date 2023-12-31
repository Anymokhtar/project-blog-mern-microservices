import Post from "../models/Post";
import { uploadPicture } from "../middleware/uploadPictureMiddleware";
import Comment from "../models/Comment";
import { fileRemover } from "../utils/fileRemover";
import { v4 as uuidv4 } from "uuid";

const createPost = async (req, res, next) => {
  try {
    const post = new Post({
      title: "sample title",
      caption: "sample caption",
      slug: uuidv4(),
      body: {
        type: "doc",
        content: [],
      },
      photo: "",
      user: req.user._id,
    });

    const createdPost = await post.save();
    return res.json(createdPost);
  } catch (error) {
    next(error);
  }
};

const handleUpdatePostData = async (post, data) => {
  const { title, caption, slug, body, tags, categories } = JSON.parse(data);
  post.title = title || post.title;
  post.caption = caption || post.caption;
  post.slug = slug || post.slug;
  post.body = body || post.body;
  post.tags = tags || post.tags;
  post.categories = categories || post.categories;
  return await post.save();
};

const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({ error: "Post was not found" });
    }

    const upload = uploadPicture.single("postPicture");

    upload(req, res, async function (err) {
      if (err) {
        return next(new Error("An unknown error occurred when uploading " + err.message));
      }

      // Every thing went well
      const filename = post.photo;
      if (filename) {
        fileRemover(filename);
      }

      post.photo = req.file ? req.file.filename : "";
      const updatedPost = await handleUpdatePostData(post, req.body.document);
      return res.json(updatedPost);
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({ error: "Post was not found" });
    }

    await Comment.deleteMany({ post: post._id });

    return res.json({
      message: "Post is successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

// Rest of your code remains the same

export { createPost, updatePost, deletePost, getPost, getAllPosts };
