import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Campaigns from "./pages/Campaigns";
import AllOrders from "./pages/AllOrders";
import Earnings from "./pages/Earnings";
import Analytics from "./pages/Analytics";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import Profile from "./pages/Profile";

const App = () => {
  const { influencerToken } = useAppContext();
  return (
    <div>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {influencerToken ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/influencer/campaigns" element={<Campaigns />} />
            <Route path="/influencer/orders" element={<AllOrders />} />
            <Route path="/influencer/earnings" element={<Earnings />} />
            <Route path="/influencer/profile" element={<Profile />} />
          </>
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
