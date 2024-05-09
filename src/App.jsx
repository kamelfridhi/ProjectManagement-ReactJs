import React, { useState } from "react";
import "./App.css";
import AppRouter from "./routes/AppRouter.jsx";
import Sidebar from "./_shared/sidebar/Sidebar.jsx";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const isAndroidMobile = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    return /android/.test(userAgent) && /mobile/.test(userAgent);
  };

  return (
      <div>
        {isAndroidMobile() && (
            <button onClick={toggleSidebar}>Toggle Sidebar</button>
        )}

        {showSidebar && <Sidebar />}
        <AppRouter />
      </div>
  );
}

export default App;