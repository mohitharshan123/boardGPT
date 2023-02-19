import routes from "@/routes";
import useAuthStore from "@/stores/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard: React.FC = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate(routes.account);
    }
  }, [localStorage]);

  return (
    <div>
      <Sidebar />
    </div>
  );
};

export default Dashboard;
