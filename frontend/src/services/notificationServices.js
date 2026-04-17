const API = "http://localhost:5000/api/notifications";

export const getNotifications = async (userId) => {
  const res = await fetch(`${API}/${userId}`);
  return res.json();
};

export const markAsRead = async (id) => {
  await fetch(`${API}/${id}/read`, {
    method: "PATCH",
  });
};
