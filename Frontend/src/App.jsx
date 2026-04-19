import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Forum from "./pages/Forum";
import NewDiscussion from "./pages/NewDiscussion";
import DiscussionDetail from "./pages/DiscussionDetail";

import {
  getDiscussions,
} from "./services/discussionServices";

function App() {
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    fetchDiscussions();
  }, []);

  const fetchDiscussions = async () => {
    const data = await getDiscussions();
    setDiscussions(data);
  };

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", Date.now().toString());
    }
  }, []);

  return (
    <MainLayout>
      <Routes>

        <Route
          path="/"
          element={
            <Forum
              discussions={discussions}
              setDiscussions={setDiscussions} 
              refreshDiscussions={fetchDiscussions} 
            />
          }
        />

        <Route
          path="/new-discussion"
          element={
            <NewDiscussion refreshDiscussions={fetchDiscussions} />
          }
        />

        <Route
          path="/discussion/:id"
          element={<DiscussionDetail />}
        />

      </Routes>
    </MainLayout>
  );
}

export default App;