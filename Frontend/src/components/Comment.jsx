import { useState } from "react";
import { addComment } from "../services/discussionServices";

function Comment({
  comment,
  allComments,
  discussionId,
  onUpdate,
  depth = 0,
}) {
  const [reply, setReply] = useState("");
  const [showReply, setShowReply] = useState(false);

  const replies = allComments.filter(
    (c) => c.parentId === comment._id
  );

  const handleReply = async () => {
    if (!reply.trim()) return;

    const updated = await addComment(discussionId, {
      text: reply,
      author: localStorage.getItem("username"),
      authorEmail: localStorage.getItem("email"),
      authorId: localStorage.getItem("userId"),
      parentId: comment._id,
    });

    onUpdate(updated);
    setReply("");
    setShowReply(false);
  };

  return (
    <div
      className={`flex gap-3 ${
        depth > 0 ? "ml-6 border-l pl-4 border-gray-200" : ""
      }`}
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
        {comment.author?.[0] || "U"}
      </div>

      <div className="flex-1">

        {/* Comment Card */}
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition">

          {/* Header */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-gray-800">
              {comment.author || "Unknown"}
            </span>
          </div>

          {/* Text */}
          <p className="text-gray-700 mt-1 text-sm leading-relaxed">
            {comment.text}
          </p>

          {/* Actions */}
          <div className="flex gap-4 mt-2 text-xs text-gray-500">
            <button
              onClick={() => setShowReply(!showReply)}
              className="hover:text-indigo-600 font-medium"
            >
              Reply
            </button>
          </div>
        </div>

        {/* Reply Box */}
        {showReply && (
          <div className="mt-3 flex gap-2">
            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write a reply..."
              className="flex-1 border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button
              onClick={handleReply}
              className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm"
            >
              Post
            </button>
          </div>
        )}

        {/* Replies */}
        <div className="mt-3 space-y-3">
          {replies.map((r) => (
            <Comment
              key={r._id}
              comment={r}
              allComments={allComments}
              discussionId={discussionId}
              onUpdate={onUpdate}
              depth={depth + 1}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default Comment;