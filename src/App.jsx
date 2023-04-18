import { ToastContainer } from "react-toastify";
import "./App.css";
import Router from "./router/router";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <input type="checkbox" name="theme" id="theme" />
      <div className="App">
        <ToastContainer />
        <Router />
      </div>
    </>
  );
}

export default App;
