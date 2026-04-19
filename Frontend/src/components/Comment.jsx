import { useState } from "react";
import { addComment } from "../services/discussionServices";

function Comment({ comment, allComments, discussionId, onUpdate }) {
  const [reply, setReply] = useState("");
  const [showReply, setShowReply] = useState(false);

  // find replies
  const replies = allComments.filter(
    (c) => String(c.parentId) === String(comment._id)
  );

  const handleReply = async () => {
    if (!reply.trim()) return;

    const updated = await addComment(discussionId, {
      text: reply,
      author: "You",
      parentId: comment._id,
    });

    onUpdate(updated);
    setReply("");
    setShowReply(false);
  };

  return (
    <div className="ml-4 mt-3">

      {/* Comment */}
      <div className="bg-gray-50 p-3 rounded text-sm">
        <span className="font-medium">{comment.author}:</span>{" "}
        {comment.text}

        <button
          onClick={() => setShowReply(!showReply)}
          className="ml-2 text-indigo-500 text-xs"
        >
          Reply
        </button>
      </div>

      {/* Reply input */}
      {showReply && (
        <div className="flex gap-2 mt-2">
          <input
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="border px-2 py-1 rounded text-sm"
            placeholder="Write a reply..."
          />
          <button
            onClick={handleReply}
            className="text-sm bg-indigo-500 text-white px-2 rounded"
          >
            Post
          </button>
        </div>
      )}

      {/* Replies (recursive) */}
      <div className="ml-4 border-l pl-3">
        {replies.map((r) => (
          <Comment
            key={r._id}
            comment={r}
            allComments={allComments}
            discussionId={discussionId}
            onUpdate={onUpdate}
          />
        ))}
      </div>

    </div>
  );
}

export default Comment;