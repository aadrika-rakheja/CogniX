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
    await deleteDiscussion(id);
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
    <div className="grid grid-cols-12 gap-6">

      {/* Sidebar */}
      <div className="col-span-3">
        <FilterSidebar
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
      </div>

      {/* Feed */}
      <div className="col-span-6">
        <DiscussionFeed
          discussions={filteredDiscussions}
          setDiscussions={setDiscussions}
          onDelete={handleDelete}
          onUpvote={handleUpvote}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

    </div>
  );
}

export default Forum;