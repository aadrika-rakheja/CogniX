import { useState } from "react";
import FilterSidebar from "../components/FilterSidebar";
import DiscussionFeed from "../sections/DiscussionFeed";
import { deleteDiscussion } from "../services/discussionServices";
import { upvoteDiscussion } from "../services/discussionServices";

function Forum({ discussions, setDiscussions, refreshDiscussions }) {
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // 🔥 Delete handler (moved here)
  const handleDelete = async (id) => {
    const userId = localStorage.getItem("userId");
    await deleteDiscussion(id, userId);
    refreshDiscussions();
  };

  // 🔥 Upvote (frontend toggle)
  const handleUpvote = async (id) => {
    try {
      const updated = await upvoteDiscussion(id); // ✅ get updated doc

      setDiscussions((prev) =>
        prev.map((d) =>
          d._id === id ? updated : d   // ✅ replace with backend result
        )
      );
    } catch (error) {
      console.error("Upvote failed:", error.message);
    }
  };

  // 🔍 Filter logic
  const filteredDiscussions = discussions.filter((d) => {
    const matchesTag =
      selectedTag === "All" || (d.tags || []).includes(selectedTag);

    const matchesSearch =
      (d.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.description || "").toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTag && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      
      {/* Centered Container */}
      <div className="w-full max-w-7xl px-6 py-8">

        <div className="grid grid-cols-12 gap-8 items-start">

          {/* Sidebar */}
          <div className="col-span-4">
            <FilterSidebar
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
            />
          </div>

          {/* Feed */}
          <div className="col-span-7">
            <DiscussionFeed
              discussions={filteredDiscussions}
              setDiscussions={setDiscussions}
              onDelete={handleDelete}
              onUpvote={handleUpvote}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          {/* Right Panel (OPTIONAL — your mood widget area) */}
          <div className="col-span-3">
            {/* Put your MoodDetection or side widget here */}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Forum;