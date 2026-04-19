import { useNavigate } from "react-router-dom";
import { BellIcon } from "@heroicons/react/24/outline";
import NotificationBell from "./NotificationBell";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">CogniX</h1>

      <div className="flex items-center gap-6">
        <button onClick={() => navigate("/forum")} className="hover:text-indigo-500 transition">Forum</button>
        <NotificationBell />
      </div>
    </nav>
  );
}

export default Navbar;