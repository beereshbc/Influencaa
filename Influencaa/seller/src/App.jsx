import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Campaigns from "./pages/Campaigns";
import AllOrders from "./pages/AllOrders";
import Earnings from "./pages/Earnings";
import Analytics from "./pages/Analytics";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/influencer/campaigns" element={<Campaigns />} />
        <Route path="/influencer/orders" element={<AllOrders />} />
        <Route path="/influencer/earnings" element={<Earnings />} />
        <Route path="/influencer/analytics" element={<Analytics />} />
      </Routes>
    </div>
  );
};

export default App;
