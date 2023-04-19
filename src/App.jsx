import { ToastContainer } from "react-toastify";
import "./App.css";
import Router from "./router/router";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function App() {
  const { darkMode } = useSelector((store) => store.mode);
  return (
    <body className={darkMode ? "dark" : ""}>
      <div className="App">
        <ToastContainer />
        <Router />
      </div>
    </body>
  );
}

export default App;
