import { ToastContainer } from "react-toastify";
import Main from "pages/Main";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <Main />
  </>
);

export default App;
