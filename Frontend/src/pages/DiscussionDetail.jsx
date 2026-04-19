import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDiscussions, addComment } from "../services/discussionServices";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Comment from "../components/Comment";

function DiscussionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [discussion, setDiscussion] = useState(null);
  const [comment, setComment] = useState("");

  // Load discussion
  useEffect(() => {
    const fetchDiscussion = async () => {
      const data = await getDiscussions();
      const found = data.find((d) => d._id === id);
      setDiscussion(found);
    };

    fetchDiscussion();
  }, [id]);

  // Add top-level comment
  const handleComment = async () => {
    if (!comment.trim()) return;

    const updated = await addComment(id, {
      text: comment,
      author: "You",
      parentId: null, // 🔥 top-level comment
    });

    setDiscussion(updated);
    setComment("");
  };

  if (!discussion) return <p className="text-center mt-10">Loading...</p>;

  // 🔥 Only top-level comments
  const rootComments =
    discussion.comments?.filter((c) => !c.parentId) || [];

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow border border-gray-200">

      {/* Back */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-600 mb-4 hover:text-black"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Back
      </button>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900">
        {discussion.title}
      </h1>

      {/* Description */}
      <p className="text-gray-600 mt-2">
        {discussion.description}
      </p>

      {/* Tags */}
      <div className="flex gap-2 mt-3 flex-wrap">
        {discussion.tags?.map((tag, i) => (
          <span
            key={i}
            className="bg-gray-100 px-3 py-1 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Comments */}
      <div className="mt-6">

        <h2 className="font-semibold mb-3">
          Comments ({discussion.comments?.length || 0})
        </h2>

        {/* Add Comment */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            onClick={handleComment}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            Post
          </button>
        </div>

        {/* Threaded Comments */}
        <div className="space-y-3">

          {rootComments.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            rootComments.map((c) => (
              <Comment
                key={c._id}
                comment={c}
                allComments={discussion.comments}
                discussionId={discussion._id}
                onUpdate={setDiscussion}
              />
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default DiscussionDetail;