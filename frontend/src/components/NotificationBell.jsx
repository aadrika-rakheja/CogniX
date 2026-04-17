import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getNotifications,
  markAsRead,
} from "../services/notificationServices";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // 🔥 Load notifications
  useEffect(() => {
    const load = async () => {
      const data = await getNotifications(userId);
      setNotifications(data);
    };

    load();
  }, [userId]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // 🔥 CLICK HANDLER (IMPORTANT)
  const handleClick = async (n) => {
    try {
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
    } catch (error) {
      console.error("Notification click failed:", error.message);
    }
  };

  return (
    <div className="relative">

      {/* 🔔 Bell */}
      <button
        onClick={() => setOpen(!open)}
        className="relative text-xl"
      >
        🔔

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
            <p className="text-sm text-gray-500">
              No notifications
            </p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                onClick={() => handleClick(n)}
                className={`p-2 rounded cursor-pointer text-sm transition ${
                  n.isRead
                    ? "bg-gray-100"
                    : "bg-indigo-50 hover:bg-indigo-100"
                }`}
              >
                {n.message}
              </div>
            ))
          )}

        </div>
      )}

    </div>
  );
}

export default NotificationBell;