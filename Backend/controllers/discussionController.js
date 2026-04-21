const Discussion = require("../models/Discussion");
const Notification = require("../models/Notification");
const User = require("../models/user");


// ================= GET ALL =================
exports.getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().sort({ createdAt: -1 });

    const userIds = new Set();
    discussions.forEach((discussion) => {
      if (discussion.authorId) userIds.add(String(discussion.authorId));
      discussion.comments?.forEach((comment) => {
        if (comment.authorId) userIds.add(String(comment.authorId));
      });
    });

    const users = userIds.size
      ? await User.find({ _id: { $in: Array.from(userIds) } }).select("name email")
      : [];

    const userMap = users.reduce((map, user) => {
      map[String(user._id)] = user.name || user.email;
      return map;
    }, {});

    const enriched = discussions.map((discussion) => {
      const discussionObj = discussion.toObject();
      discussionObj.author =
        userMap[String(discussion.authorId)] || discussion.author || discussion.authorId;

      discussionObj.comments = discussionObj.comments.map((comment) => ({
        ...comment,
        author:
          userMap[String(comment.authorId)] || comment.author || "Unknown User",
      }));

      return discussionObj;
    });

    res.json(enriched);
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
    const { userId } = req.body;

    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ error: "Discussion not found" });
    }

    if (String(discussion.authorId) !== String(userId)) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const deleted = await Discussion.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};


// ================= UPDATE =================
exports.updateDiscussion = async (req, res) => {
  try {
    const { title, description, tags, userId } = req.body;

    const discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      return res.status(404).json({ error: "Discussion not found" });
    }

    if (String(discussion.authorId) !== String(userId)) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updated = await Discussion.findByIdAndUpdate(
      req.params.id,
      { title, description, tags },
      { new: true }
    );

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

    const alreadyLiked = discussion.upvotedBy.some(
      (id) => String(id) === String(userId)
    );

    if (alreadyLiked) {
      // 🔻 UNLIKE
      discussion.upvotes = Math.max(0, discussion.upvotes - 1);
      discussion.upvotedBy = discussion.upvotedBy.filter(
        (id) => String(id) !== String(userId)
      );
    } else {
      // 🔺 LIKE
      discussion.upvotes += 1;
      discussion.upvotedBy.push(userId);

      // 🔥 NOTIFICATION (LIKE)
      const likeTarget = discussion.authorId || discussion.authorEmail || discussion.author;
      if (likeTarget && String(likeTarget) !== String(userId)) {
        await Notification.create({
          userId: likeTarget,
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
    const { text, author, authorEmail, authorId, parentId } = req.body;

    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) {
      return res.status(404).json({ error: "Not found" });
    }

    // 🔥 create new comment
    const newComment = {
      text,
      author,
      authorEmail,
      authorId,
      parentId: parentId || null,
    };

    discussion.comments.push(newComment);

    // 🔥 NOTIFICATION: COMMENT ON DISCUSSION
    const commentTarget = discussion.authorId || discussion.authorEmail || discussion.author;
    if (!parentId && commentTarget && String(commentTarget) !== String(authorId)) {
      await Notification.create({
        userId: commentTarget,
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

      const replyTarget =
        parentComment?.authorId || parentComment?.authorEmail || parentComment?.author;
      if (replyTarget && String(replyTarget) !== String(authorId)) {
        await Notification.create({
          userId: replyTarget,
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