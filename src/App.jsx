import React from "react";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import ResetPassword from "./pages/ResetPassword";
import { Routes, Route } from "react-router-dom";
import { Proiecte, Tasks, Kanban, Users } from "./pages";
import { Navbar, Sidebar } from "./components";
import { useStateContext } from "./contexts/ContextProvider";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  const { isValidToken } = useStateContext();

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 flex">
      {isValidToken && <Sidebar />}

      <div className="flex w-full flex-grow flex-col">
        {isValidToken && <Navbar />}
        <main className="h-full bg-gray-100 p-10">
          {/* Routes */}
          <Routes>
            {isValidToken || <Route path="/login" element={<Login />} />}
            <Route path="/resetpass" element={<ResetPassword />} />
            <Route element={<PrivateRoute />}>
              <Route path="*" element={<Proiecte />} />
              <Route path="/" element={<Kanban />} />
              <Route path="/proiecte" element={<Proiecte />} exact />
              <Route path="/changepass" element={<ChangePassword />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/users" element={<Users />} />
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
