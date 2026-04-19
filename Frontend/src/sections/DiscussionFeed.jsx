import { useNavigate } from "react-router-dom";
import DiscussionCard from "../components/DiscussionCard";
import SearchBar from "../components/SearchBar";

function DiscussionFeed({ discussions, setDiscussions, onDelete, onUpvote, searchQuery,
  setSearchQuery}) {
  const navigate = useNavigate();

  console.log("Feed data:", discussions);
  console.log("onDelete:", onDelete);

  return (
    <div>

      <div className="flex justify-between items-center mb-4">

        <div>
          <h1 className="text-3xl font-bold">Discussion Forum</h1>
          <p className="text-gray-500 text-sm">
            Connect with peers and share knowledge
          </p>
        </div>

        {/* New Discussion Button */}
        <button
          onClick={() => navigate("/new-discussion")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl font-medium transition"
        >
          + New Discussion
        </button>

      </div>

      {/*Search Bar*/}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/*Discussions List*/}
      <div className="space-y-4 mt-4">

        {(!discussions || discussions.length === 0) ? (
          <p className="text-gray-500">No discussions yet.</p>
        ) : (
          discussions.map((d) => (
            <DiscussionCard
              key={d._id}
              data={d}
              onDelete={() => onDelete(d._id)}
              onUpvote={() => onUpvote(d._id)}
              onUpdate={(updated) =>
                setDiscussions((prev) =>
                  prev.map((item) =>
                    item._id === updated._id ? updated : item
                  )
                )
              }
            />
          ))
        )}

      </div>

    </div>
  );
}

export default DiscussionFeed;