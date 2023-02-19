import { useState } from "react";
import Welcome from "../../assets/Welcome";
import Login from "./Login";
import Register from "./Register";

const Account: React.FC = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-full h-screen justify-center items-center">
        {isRegister ? (
          <Register showLogin={() => setIsRegister(false)} />
        ) : (
          <Login showRegister={() => setIsRegister(true)} />
        )}
      </div>
      <div className="flex flex-col bg-primary w-full h-screen items-center p-10">
        <Welcome />
        <div className="flex flex-col space-y-2 mt-20 items-start mr-auto ml-28">
          <span className="text-white text-4xl">Welcome to board</span>
          <span className="text-gray-200 font-extralight text-sm">
            Powered by GPT3
          </span>
        </div>
      </div>
    </div>
  );
};

export default Account;
