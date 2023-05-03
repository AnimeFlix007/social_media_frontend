import { ToastContainer } from "react-toastify";
import "./App.css";
import Router from "./router/router";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, theme } from "./theme/Theme";

function App() {
  const { darkMode } = useSelector((store) => store.mode);
  return (
    <body className={darkMode ? "dark" : ""}>
      <ThemeProvider theme={darkMode ? darkTheme : theme}>
        <CssBaseline />
        <div className="App">
          <ToastContainer />
          <Router />
        </div>
      </ThemeProvider>
    </body>
  );
}

export default App;
