import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AppContext = createContext();

axios.defaults.baseURL =
  import.meta.env.VITE_BASE_URL || "http://localhost:5000";

axios.defaults.withCredentials = true;

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [influencerToken, setInfluencerToken] = useState(
    () => localStorage.getItem("influencerToken") || null
  );
  const [influencer, setInfluencer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get("/api/influencer/orders", {
        headers: {
          Authorization: `Bearer ${influencerToken}`,
        },
      });

      if (response.data.success) {
        setOrders(response.data.orders || []);
        console.log(response.data.orders);
      } else {
        toast.error(response.data.message || "Failed to fetch orders.");
      }
    } catch (err) {
      console.error("Fetch orders error:", err);
      toast.error(
        err.response?.data?.message || "Unable to fetch orders. Please log in."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (influencerToken) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${influencerToken}`;
      localStorage.setItem("influencerToken", influencerToken);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("influencerToken");
      setInfluencer(null);
    }

    setIsLoading(false);
  }, [influencerToken]);

  const logout = () => {
    setInfluencerToken(null);
    setInfluencer(null);
    localStorage.removeItem("influencerToken");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const value = {
    axios,
    navigate,
    influencerToken,
    setInfluencerToken,
    influencer, // Global state
    setInfluencer, // Function to update global state (used by Profile page)
    logout,
    isLoading,
    fetchOrders,
    orders,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
