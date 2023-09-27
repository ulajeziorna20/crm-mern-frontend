import AppRoutes from "./routes/AppRoutes";
import "./App.css";

import { useState } from "react";
import axios from "axios";
import AppNav from "./components/AppNav";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  axios.defaults.headers.common["Authorization"] = (token ? token : "");

  return (
    <div className="App">
      <AppNav token={token} />
      <AppRoutes token={token} setToken={setToken} />
    </div>
  );
};

export default App;
