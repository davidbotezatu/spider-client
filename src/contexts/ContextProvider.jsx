import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../assets/ApiConfig";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  let navigate = useNavigate();

  //culori pentru kanban board
  const statusColors = {
    1: "border-red-500",
    2: "border-yellow-500",
    3: "border-green-500",
    4: "border-amber-500",
    5: "border-lime-500",
    6: "border-blue-500",
  };

  //Sidebar
  const [openSidebar, setOpenSidebar] = useState(true);

  //User profile
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleUserProfile = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  //Paginare
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //Autentificare
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [isValidToken, setIsValidToken] = useState(false);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
    navigate("/");
  };

  const logout = () => {
    navigate("/login");
    setAccessToken(null);
    localStorage.clear();
    window.location.reload(false);
  };

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await axios.post(
          `${API_BASE_URL}/api/validate-token`,
          localStorage.getItem("accessToken"),
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        res.status === 200 ? setIsValidToken(true) : setIsValidToken(false);
      } catch (err) {
        console.error(err);
      }
    };
    if (accessToken) {
      validateToken();
    }
  }, [accessToken]);

  return (
    <StateContext.Provider
      value={{
        openSidebar,
        setOpenSidebar,
        isDropdownOpen,
        toggleUserProfile,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        login,
        logout,
        isValidToken,
        statusColors,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
