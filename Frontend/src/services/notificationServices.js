const API = "http://localhost:2424/api/notifications";

export const getNotifications = async (userId, username, email) => {
  const queryParts = [];
  if (userId) queryParts.push(`userId=${encodeURIComponent(userId)}`);
  if (username) queryParts.push(`username=${encodeURIComponent(username)}`);
  if (email) queryParts.push(`email=${encodeURIComponent(email)}`);
  const query = queryParts.length ? `?${queryParts.join("&")}` : "";
  const url = email ? `${API}/${encodeURIComponent(email)}${query}` : `${API}/${userId}${query}`;
  const res = await fetch(url);
  return res.json();
};

export const markAsRead = async (id) => {
  await fetch(`${API}/${id}/read`, {
    method: "PATCH",
  });
};

export const deleteNotification = async (id) => {
  const response = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Failed to delete notification: ${response.status}`);
  }
  return response.json();
};
