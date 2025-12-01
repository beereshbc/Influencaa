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
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import PaymentFlowStatusPage from "./components/PaymentFlowStatusPage";

const App = () => {
  const { clientToken } = useAppContext();

  return (
    <div>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />

        {clientToken ? (
          <>
            <Route path="/explore" element={<Explore />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/explore/:id" element={<Influncer />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route
              path="/payment-status/:orderId"
              element={<PaymentFlowStatusPage />}
            />
            <Route path="/payment-flow/:orderId" element={<PaymentFlow />} />
          </>
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
