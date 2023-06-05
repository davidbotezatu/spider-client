import React from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

const ChangePassword = () => {
  const { toggleUserProfile } = useStateContext();

  return (
    <Link to="/changepass">
      <div
        className="flex cursor-pointer gap-5 rounded p-4 hover:bg-cyan-500 dark:hover:bg-[#42464D]"
        onClick={toggleUserProfile}
      >
        <button type="button" className="rounded-lg bg-cyan-400 p-3 text-xl">
          <RiLockPasswordFill />
        </button>

        <div>
          <p className="font-semibold dark:text-gray-200">Schimbă parola</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Schimbare parolă utilizator
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ChangePassword;
