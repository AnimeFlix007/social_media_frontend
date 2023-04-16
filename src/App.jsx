import "./App.css";
import Router from "./router/router";

function App() {
  return (
    <>
      <input type="checkbox" name="theme" id="theme" />
      <div className="App">
        <Router />
      </div>
    </>
  );
}

export default App;
