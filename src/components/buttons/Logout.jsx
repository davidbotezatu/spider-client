import React from "react";
import axios from "axios";
import API_BASE_URL from "../../assets/ApiConfig";
import { useStateContext } from "../../contexts/ContextProvider";

const Logout = () => {
  const { toggleUserProfile, logout } = useStateContext();

  const handleLogout = async () => {
    toggleUserProfile(); // Close the user profile dropdown
    const res = await axios.get(`${API_BASE_URL}/api/auth`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });

    if (res.status === 200) {
      logout();
      console.log("Logout success");
    }
  };

  return (
    <button
      className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
