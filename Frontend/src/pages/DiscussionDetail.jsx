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

  useEffect(() => {
    const fetchDiscussion = async () => {
      const data = await getDiscussions();
      const found = data.find((d) => d._id === id);
      setDiscussion(found);
    };
    fetchDiscussion();
  }, [id]);

  const handleComment = async () => {
    if (!comment.trim()) return;

    const updated = await addComment(id, {
      text: comment,
      author: localStorage.getItem("username"),
      authorEmail: localStorage.getItem("email"),
      authorId: localStorage.getItem("userId"),
      parentId: null,
    });

    setDiscussion(updated);
    setComment("");
  };

  if (!discussion) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  const rootComments =
    discussion.comments?.filter((c) => !c.parentId) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-8 gap-8 px-4">

        {/* MAIN */}
        <div className="col-span-7 ml-4">

          {/* Back */}
          <button
            onClick={() => navigate("/forum")}
            className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 mb-6 transition"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Back to Forum</span>
          </button>

          {/* Discussion */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">
              {discussion.title}
            </h1>

            <p className="text-gray-600 mt-3 leading-relaxed">
              {discussion.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {discussion.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* COMMENTS */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              💬 {discussion.comments?.length || 0} Comments
            </h2>

            {/* Add Comment */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm mb-6">
              <div className="flex gap-3">

                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                  {localStorage.getItem("username")?.[0] || "U"}
                </div>

                {/* Input */}
                <div className="flex-1">
                  <textarea
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  />

                  <div className="flex justify-end mt-2">
                    <button
                      onClick={handleComment}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comment List */}
            <div className="space-y-4">
              {rootComments.length === 0 ? (
                <div className="text-center text-gray-500 py-10 border rounded-xl bg-white">
                  No comments yet. Start the conversation 🚀
                </div>
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

        {/* RIGHT PANEL */}
        <div className="col-span-5">
          {/* Your MoodDetection component */}
        </div>

      </div>
    </div>
  );
}

export default DiscussionDetail;