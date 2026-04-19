import { useNavigate } from "react-router-dom";
import { BellIcon } from "@heroicons/react/24/outline";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">CogniX</h1>

      <div className="flex items-center gap-6">
        <button onClick={() => navigate("/")} className="hover:text-indigo-500 transition">Forum</button>
        <button className="relative hover:text-gray-300">

          <BellIcon className="h-6 w-6" />

          {/* Notification badge */}
          <span className="absolute -top-1 -right-2 bg-red-500 text-xs px-1 rounded-full">
            3
          </span>

        </button>
      </div>
    </nav>
  );
}

export default Navbar;