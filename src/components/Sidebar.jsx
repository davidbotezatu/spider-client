import { useStateContext } from "../contexts/ContextProvider";
import { NavLink, useLocation } from "react-router-dom";
import { BiClipboard } from "react-icons/bi";
import { BsBugFill, BsKanbanFill } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";

import navControlImg from "../assets/control.png";
import spiderLogo from "../assets/spider.svg";

const Sidebar = () => {
  const { openSidebar, setOpenSidebar } = useStateContext();
  const location = useLocation();

  const hasProjectId = !!localStorage.getItem("project_id"); // Check if project_id is present

  const links = [
    { name: "Proiecte", icon: <BiClipboard size={24} />, path: "/proiecte" },
    ...(hasProjectId
      ? [
          {
            name: "Backlog",
            icon: <BsBugFill size={24} />,
            gap: true,
            path: "/tasks",
          },
          { name: "Kanban", icon: <BsKanbanFill size={24} />, path: "/kanban" },
        ]
      : []),
    {
      name: "Utilizatori",
      icon: <HiUserGroup size={24} />,
      gap: true,
      path: "/users",
    },
  ];

  return (
    <aside className="z-40">
      {/* Sidebar */}
      <div
        className={`${
          openSidebar ? "w-72" : "w-20"
        } relative h-screen bg-gray-200 p-5 pt-8 duration-300`}
      >
        {/* Buton inchis/deschis sidebar-ul */}
        <img
          src={navControlImg}
          className={`${
            !openSidebar && "rotate-180"
          } absolute -right-3 top-9 w-7 cursor-pointer rounded-full border-2 border-gray-200`}
          onClick={() => setOpenSidebar(!openSidebar)}
        />

        {/* Logo */}
        <div className="flex items-center gap-x-4">
          <img
            className={`${
              openSidebar && "rotate-[360deg]"
            } h-10 w-10 cursor-pointer duration-500`}
            src={spiderLogo}
            alt="Logo"
          />
          <h1
            className={`origin-left text-xl font-medium duration-300 ${
              !openSidebar && "scale-0"
            }`}
          >
            Spider
          </h1>
        </div>

        {/* Lista de link-uri */}
        <ul className="pt-6">
          {links.map((link, index) => (
            <NavLink key={index} to={link.path}>
              <li
                className={`${
                  link.gap ? "mt-9" : "mt-2"
                } flex cursor-pointer items-center gap-x-4 rounded-md p-2 text-sm hover:bg-cyan-500 ${
                  location.pathname === link.path ? "bg-cyan-400" : ""
                }`}
              >
                {link.icon}
                <span className={`${!openSidebar && "hidden"} font-semibold`}>
                  {link.name}
                </span>
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
