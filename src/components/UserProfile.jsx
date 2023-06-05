import React, { useEffect } from "react";

import Logout from "./buttons/Logout";
import ChangePassword from "./buttons/ChangePassword";

import { useStateContext } from "../contexts/ContextProvider";

const UserProfile = React.forwardRef((props, ref) => {
  const { toggleUserProfile } = useStateContext();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        // Call the toggleUserProfile function to close the dropdown
        toggleUserProfile();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [toggleUserProfile]);

  return (
    <div
      ref={ref}
      className="right-15 absolute top-10 z-20 w-96 rounded-lg bg-white p-8 dark:bg-[#42464D]"
    >
      <div className="flex items-center justify-center">
        <p className="text-lg font-semibold dark:text-gray-200">
          Profil Utilizator
        </p>
      </div>
      <div className="border-color border-b-1 mt-6 flex items-center gap-5 pb-6">
        <img
          className="h-24 w-24 rounded-full"
          src={localStorage.getItem("user_avatar")}
          alt="avatar"
        />
        <div>
          <p className="text-xl font-semibold dark:text-gray-200">
            {`${localStorage.getItem("user_nume")} ${localStorage.getItem(
              "user_prenume"
            )}`}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {localStorage.getItem("user_rol")}
          </p>
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            {localStorage.getItem("user_email")}
          </p>
        </div>
      </div>
      <div>
        <ChangePassword />
      </div>
      <div className="mt-5">
        <Logout />
      </div>
    </div>
  );
});

export default UserProfile;
