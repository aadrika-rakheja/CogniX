const API_URL = "http://localhost:5000/api/discussions";

export const getDiscussions = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();

  if (!Array.isArray(data)) {
    console.error("Expected array, got:", data);
    return [];
  }

  return data;
};

export const createDiscussion = async (discussion) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(discussion),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Create failed:", data);
    throw new Error(data.error || "Failed to create discussion");
  }

  return data;
};

export const updateDiscussion = async (id, updatedData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  return res.json();
};

export const deleteDiscussion = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};

export const upvoteDiscussion = async (id) => {
  const userId = localStorage.getItem("userId");

  const res = await fetch(`${API_URL}/${id}/upvote`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  return res.json();
};

export const addComment = async (id, commentData) => {
  const res = await fetch(`${API_URL}/${id}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });

  return res.json();
};