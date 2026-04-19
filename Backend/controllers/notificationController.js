const Notification = require("../models/Notification");
const mongoose = require("mongoose");

// GET notifications
exports.getNotifications = async (req, res) => {
  try {
    const paramUserId = req.params.userId;
    const { userId: queryUserId, username, email } = req.query;

    const lookupValues = [paramUserId, queryUserId, username, email].filter(
      (value) => value && value !== ""
    );

    const conditions = lookupValues.map((value) => ({ userId: value }));

    const objectIdCandidates = [paramUserId, queryUserId].filter((value) =>
      mongoose.Types.ObjectId.isValid(value)
    );
    objectIdCandidates.forEach((value) => {
      conditions.push({ userId: new mongoose.Types.ObjectId(value) });
    });

    const query = conditions.length ? { $or: conditions } : {};
    const notifications = await Notification.find(query).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// MARK AS READ
exports.markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, {
      isRead: true,
    });

    res.json({ message: "Marked as read" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE NOTIFICATION
exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};