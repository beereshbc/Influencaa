import React from "react";
import Home from "./page/Home";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import Explore from "./page/Explore";
import Influncer from "./page/Influncer";
import Footer from "./components/Footer";
import Dashboard from "./page/Dashboard";
import PaymentFlow from "./page/PaymentFlow";
import Chat from "./page/Chat";
import History from "./page/History";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/explore/:id" element={<Influncer />} />
        <Route path="/chat/:chatId" element={<Chat />} />
        <Route path="/payment-flow/:orderId" element={<PaymentFlow />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
