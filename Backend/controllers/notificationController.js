const Notification = require("../models/Notification");

// GET notifications
exports.getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 });

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