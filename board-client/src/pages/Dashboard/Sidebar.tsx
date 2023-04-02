import React from "react";
import { SiFlipboard } from "react-icons/si";
import { BiLogOut } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import Logo from "@/assets/Logo";
import { logout } from "@/apis/account";
import { useNavigate } from "react-router-dom";
import routes from "@/routes";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(routes.account);
  };

  return (
    <div className="min-h-screen flex flex-row bg-gray-100">
      <div className="flex flex-col w-56 bg-white overflow-hidden shadow-md">
        <div className="flex items-center justify-center h-20 shadow-sm p-20">
          <Logo />
        </div>
        <ul className="flex flex-col py-4">
          <li>
            <a
              onClick={() => navigate(routes.dashboard.index)}
              className="flex cursor-pointer flex-row items-center h-12  text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <SiFlipboard />
              </span>
              <span className="text-sm font-medium">Board</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => navigate(routes.dashboard.settings)}
              className="flex flex-row items-center cursor-pointer h-12  text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <FiSettings />
              </span>
              <span className="text-sm font-medium">Settings</span>
            </a>
          </li>
          <li>
            <a
              onClick={handleLogout}
              className="flex flex-row items-center h-12 cursor-pointer  text-gray-500 hover:text-gray-800"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <BiLogOut />
              </span>
              <span className="text-sm font-medium">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
