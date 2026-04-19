import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getNotifications,
  markAsRead,
  deleteNotification,
} from "../services/notificationServices";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [isPollingPaused, setIsPollingPaused] = useState(false);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");

  // 🔥 Load notifications
  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      if (isPollingPaused) return; // Skip fetch if paused
      const data = await getNotifications(userId, username, email);
      setNotifications(Array.isArray(data) ? data : []);
    };

    load();

    // 🔥 Poll for new notifications every 5 seconds
    const interval = setInterval(load, 5000);

    return () => clearInterval(interval);
  }, [userId, isPollingPaused]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // 🔥 MARK AS READ
  const handleMarkAsRead = async (e, n) => {
    e.stopPropagation();
    try {
      setIsPollingPaused(true); // Pause polling
      await markAsRead(n._id);
      setNotifications((prev) =>
        prev.map((item) =>
          item._id === n._id ? { ...item, isRead: true } : item
        )
      );
      
      // Resume polling after 3 seconds
      setTimeout(() => setIsPollingPaused(false), 3000);
    } catch (error) {
      console.error("Mark as read failed:", error.message);
      setIsPollingPaused(false); // Resume on error
    }
  };

  // 🔥 DELETE NOTIFICATION
  const handleDelete = async (e, n) => {
    e.stopPropagation();
    try {
      console.log("Deleting notification:", n._id);
      setIsPollingPaused(true); // Pause polling
      await deleteNotification(n._id);
      console.log("Delete successful, filtering from UI");
      setNotifications((prev) => prev.filter((item) => item._id !== n._id));
      
      // Resume polling after 4 seconds
      setTimeout(() => setIsPollingPaused(false), 4000);
    } catch (error) {
      console.error("Delete failed:", error.message);
      setIsPollingPaused(false); // Resume on error
    }
  };

  // 🔥 CLICK HANDLER (IMPORTANT)
  const handleClick = async (n) => {
    try {
      setIsPollingPaused(true); // Pause polling
      
      // 1. Mark as read in backend
      await markAsRead(n._id);

      // 2. Update UI instantly
      setNotifications((prev) =>
        prev.map((item) =>
          item._id === n._id ? { ...item, isRead: true } : item
        )
      );

      // 3. Close dropdown
      setOpen(false);

      // 4. Navigate to discussion
      navigate(`/discussion/${n.discussionId}`);
      
      // Resume polling after navigation
      setTimeout(() => setIsPollingPaused(false), 3000);
    } catch (error) {
      console.error("Notification click failed:", error.message);
      setIsPollingPaused(false); // Resume on error
    }
  };

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
      >
        <span className="material-symbols-outlined text-[22px] text-gray-700">
          notifications
        </span>

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* 🔥 Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-xl p-3 w-72 border z-50">

          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 text-center text-gray-500">

              <span className="material-symbols-outlined text-3xl mb-2 text-gray-400">
                notifications_off
              </span>

              {/* Text */}
              <p className="text-sm font-medium">No notifications yet</p>
              <p className="text-xs text-gray-400 mt-1">
                You're all caught up 🎉
              </p>

            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`p-3 rounded mb-2 text-sm transition flex justify-between items-start gap-2 ${
                  n.isRead
                    ? "bg-gray-100"
                    : "bg-indigo-50 hover:bg-indigo-100"
                }`}
              >
                <div
                  onClick={() => handleClick(n)}
                  className="cursor-pointer flex-1"
                >
                  {n.message}
                </div>
                <div className="flex gap-1">
                  {!n.isRead && (
                    <button
                      onClick={(e) => handleMarkAsRead(e, n)}
                      className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded"
                      title="Mark as read"
                    >
                      ✓
                    </button>
                  )}
                  <button
                    onClick={(e) => handleDelete(e, n)}
                    className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    title="Delete"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}

        </div>
      )}

    </div>
  );
}

export default NotificationBell;