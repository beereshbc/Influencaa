import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const AppContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppProvider = ({ children }) => {
  const [clientToken, setClientToken] = useState(false);
  // localStorage.getItem("clientToken")
  //   ? localStorage.getItem("clientToken")
  const navigate = useNavigate();

  const value = {
    axios,
    navigate,
    clientToken,
    setClientToken,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
