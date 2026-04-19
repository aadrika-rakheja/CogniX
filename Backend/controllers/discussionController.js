const Discussion = require("../models/Discussion");
const Notification = require("../models/Notification");


// ================= GET ALL =================
exports.getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().sort({ createdAt: -1 });
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ================= CREATE =================
exports.createDiscussion = async (req, res) => {
  try {
    const newDiscussion = new Discussion(req.body);
    await newDiscussion.save();

    res.status(201).json(newDiscussion);
  } catch (error) {
    console.error("CREATE ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};


// ================= DELETE =================
exports.deleteDiscussion = async (req, res) => {
  try {
    const deleted = await Discussion.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Discussion not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};


// ================= UPDATE =================
exports.updateDiscussion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    const updated = await Discussion.findByIdAndUpdate(
      req.params.id,
      { title, description, tags },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Discussion not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("UPDATE ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};


// ================= UPVOTE =================
exports.upvoteDiscussion = async (req, res) => {
  try {
    const userId = String(req.body.userId);

    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ error: "Not found" });
    }

    discussion.upvotedBy = discussion.upvotedBy || [];

    const alreadyLiked = discussion.upvotedBy.includes(userId);

    if (alreadyLiked) {
      // 🔻 UNLIKE
      discussion.upvotes = Math.max(0, discussion.upvotes - 1);
      discussion.upvotedBy = discussion.upvotedBy.filter(
        (id) => id !== userId
      );
    } else {
      // 🔺 LIKE
      discussion.upvotes += 1;
      discussion.upvotedBy.push(userId);

      // 🔥 NOTIFICATION (LIKE)
      if (discussion.author && discussion.author !== userId) {
        await Notification.create({
          userId: discussion.author,
          type: "like",
          message: "Someone liked your discussion",
          discussionId: discussion._id,
        });
      }
    }

    await discussion.save();

    res.json(discussion);
  } catch (error) {
    console.error("UPVOTE ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};


// ================= ADD COMMENT / REPLY =================
exports.addComment = async (req, res) => {
  try {
    const { text, author, parentId } = req.body;

    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ error: "Not found" });
    }

    // 🔥 create new comment
    const newComment = {
      text,
      author,
      parentId: parentId || null,
    };

    discussion.comments.push(newComment);

    // 🔥 NOTIFICATION: COMMENT ON DISCUSSION
    if (!parentId && discussion.author !== author) {
      await Notification.create({
        userId: discussion.author,
        type: "comment",
        message: "Someone commented on your discussion",
        discussionId: discussion._id,
      });
    }

    // 🔥 NOTIFICATION: REPLY TO COMMENT
    if (parentId) {
      const parentComment = discussion.comments.find(
        (c) => String(c._id) === String(parentId)
      );

      if (parentComment && parentComment.author !== author) {
        await Notification.create({
          userId: parentComment.author,
          type: "reply",
          message: "Someone replied to your comment",
          discussionId: discussion._id,
        });
      }
    }

    await discussion.save();

    res.json(discussion);
  } catch (error) {
    console.error("COMMENT ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};