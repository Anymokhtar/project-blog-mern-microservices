import Comment from "../models/Comment";
import Post from "../models/Post";

const createComment = async (req, res, next) => {
  try {
    const { desc, slug, parent, replyOnUser } = req.body;

    const post = await Post.findOne({ slug });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = new Comment({
      user: req.user._id,
      desc,
      post: post._id,
      parent,
      replyOnUser,
    });

    const savedComment = await newComment.save();
    return res.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { desc } = req.body;

    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the new desc is different before updating
    if (desc && desc !== comment.desc) {
      comment.desc = desc;
      const updatedComment = await comment.save();
      return res.json(updatedComment);
    }

    return res.json({ message: "Comment not modified" });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;

    const comment = await Comment.findByIdAndDelete(commentId);
    await Comment.deleteMany({ parent: commentId });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    return res.json({
      message: "Comment deleted successfully",
      deletedCommentId: commentId,
    });
  } catch (error) {
    next(error);
  }
};

export { createComment, updateComment, deleteComment };
