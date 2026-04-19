import {
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateDiscussion } from "../services/discussionServices";

function DiscussionCard({ data, onDelete, onUpvote, onUpdate }) {
  if (!data) return null;

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const liked = data.upvotedBy?.includes(userId);

  // 🔥 Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(data.title);
  const [editedDescription, setEditedDescription] = useState(data.description);

  // 🔥 Save edit
  const handleEdit = async (e) => {
    e.stopPropagation();

    try {
      const updated = await updateDiscussion(data._id, {
        title: editedTitle,
        description: editedDescription,
        tags: data.tags,
      });

      onUpdate(updated);
      setIsEditing(false);
    } catch (error) {
      console.error("Edit failed:", error.message);
    }
  };

  // 🔥 Cancel edit
  const handleCancel = (e) => {
    e.stopPropagation();
    setIsEditing(false);
    setEditedTitle(data.title);
    setEditedDescription(data.description);
  };

  return (
    <div
      onClick={() => {
        if (!isEditing) {
          navigate(`/discussion/${data._id}`);
        }
      }}
      className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex gap-4 hover:shadow-md transition cursor-pointer"
    >

      {/* LEFT: Upvote */}
      <div className="flex flex-col items-center">

        <button
          onClick={(e) => {
            e.stopPropagation();
            onUpvote();
          }}
          className={`transition ${
            liked
              ? "text-indigo-600 scale-110"
              : "text-gray-400 hover:text-indigo-500"
          }`}
        >
          <HandThumbUpIcon className="w-6 h-6" />
        </button>

        <span className="text-sm font-semibold mt-1">
          {data.upvotes || 0}
        </span>

      </div>

      {/* RIGHT: Content */}
      <div className="flex-1">

        {/* 🔥 Title + Description */}
        {isEditing ? (
          <div
            className="space-y-2"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full border px-2 py-1 rounded text-sm"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full border px-2 py-1 rounded text-sm"
            />
          </div>
        ) : (
          <>
            <h2 className="font-semibold text-lg text-gray-900">
              {data.title}
            </h2>

            <p className="text-gray-600 mt-1 text-sm line-clamp-2">
              {data.description}
            </p>
          </>
        )}

        {/* Tags */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {data.tags?.map((tag, i) => (
            <span
              key={i}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 mt-4 text-xs text-gray-500 flex-wrap">

          <div className="flex items-center gap-1">
            <UserCircleIcon className="w-4 h-4" />
            <span>{data.author || "Anonymous"}</span>
          </div>

          <span>•</span>

          <span>
            {data.createdAt
              ? new Date(data.createdAt).toLocaleString()
              : "Just now"}
          </span>

          <span>•</span>

          <div className="flex items-center gap-1">
            <ChatBubbleLeftIcon className="w-4 h-4" />
            <span>{data.comments?.length || 0} comments</span>
          </div>

        </div>

      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex flex-col gap-2">

        {isEditing ? (
          <>
            <button
              onClick={handleEdit}
              className="text-green-500 text-xs hover:underline"
            >
              Save
            </button>

            <button
              onClick={handleCancel}
              className="text-gray-500 text-xs hover:underline"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="text-blue-500 text-xs hover:underline"
          >
            Edit
          </button>
        )}

        {/* Delete */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-red-400 hover:text-red-600 text-xs"
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default DiscussionCard;