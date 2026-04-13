import MoodSidebar from "./sidebar/MoodSidebar";
import NavBar from "./Header/NavBar"
import { Outlet } from "react-router-dom";

function MainLayout({ children }) {
  return (
    <>
      <NavBar />
      <div className="flex h-screen">
        <div className="w-[80%]">
          <Outlet/>
        </div>
        <div className="w-[20%]">
          <MoodSidebar />
        </div>
      </div>
    </>
  );
}

export default MainLayout;