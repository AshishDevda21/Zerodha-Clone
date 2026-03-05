import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect } from "react";
import "../dashboard.css";

const Home = () => {
  useEffect(() => {
   
    const previousTitle = document.title;
  
   
    const favicon = document.querySelector("link[rel='icon']");
    const previousFavicon = favicon?.href;
  
    
    document.title = "Kite Dashboard";
  
 
    if (favicon) {
      favicon.href = "/logo.png"; 
    }
  
  
    return () => {
      document.title = previousTitle;
      if (favicon) {
        favicon.href = previousFavicon;
      }
    };
  }, []);

  return (
    <div className="dashboard-app">
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <TopBar />
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default Home;
