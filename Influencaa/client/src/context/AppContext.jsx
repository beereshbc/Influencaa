import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// NOTE: Assuming 'toast' utility (e.g., from react-toastify) is available globally or imported here.
// import { toast } from 'react-toastify';

const AppContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [clientToken, setClientToken] = useState(
    localStorage.getItem("clientToken")
      ? localStorage.getItem("clientToken")
      : ""
  );

  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [orders, setOrders] = useState([]); // --- Payment Logic (Integrated) 💳 ---
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const initPay = async (order) => {
    const isLoaded = await loadRazorpay();

    if (!isLoaded || !window.Razorpay) {
      console.error("Razorpay SDK failed to load");
      alert("Payment system failed to load. Check internet or ad blockers.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: Number(order.amount),
      currency: order.currency,
      name: "Campaign Payment",
      description: "Secure Order Booking",
      order_id: order.id,
      receipt: order.receipt,

      handler: async (response) => {
        try {
          const { data } = await axios.post(
            "/api/client/verifyRazorpay",
            response,
            {
              headers: {
                Authorization: `Bearer ${clientToken}`,
              },
            }
          );

          if (data.success) {
            fetchOrders();
            navigate("/dashboard");
          } else {
            alert("Payment verification failed");
          }
        } catch (error) {
          console.error("Razorpay verification error:", error);
          alert("Payment verification error");
        }
      },

      theme: {
        color: "#0f172a",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const orderRazorpay = async (orderId) => {
    try {
      const { data } = await axios.post(
        `/api/client/payment-razorpay`,
        { orderId },
        {
          headers: {
            Authorization: `Bearer ${clientToken}`,
          },
        }
      );
      if (data.success) {
        initPay(data.order);
        console.log(data.order);
      } else {
        // toast.error(data.message || "Failed to initiate Razorpay order.");
      }
    } catch (error) {
      console.error("Razorpay initiation error:", error); // toast.error( //   error?.response?.data?.message || //     error.message || //     "Payment initiation failed." // );
    }
  }; // ------------------------------------
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("/api/client/orders", {
        headers: {
          Authorization: `Bearer ${clientToken}`,
        },
      });

      if (response.data.success) {
        // 💡 FIX: Keep the original status if present, otherwise default to 'pending'
        // to correctly align with your backend schema and dashboard logic.
        const processedOrders = (response.data.orders || []).map((order) => ({
          ...order,
          totalAmount: order.totalAmount || order.serviceDetails?.amount || 0,
          status: order.status || "pending", // Use 'pending' or whatever initial state the BE uses
        }));
        setOrders(processedOrders);
        console.log(processedOrders);
      } else {
        setError(response.data.message || "Failed to fetch orders.");
      }
    } catch (err) {
      console.error("Fetch orders error:", err);
      setError(
        err.response?.data?.message || "Unable to fetch orders. Please log in."
      );
    } finally {
      setLoading(false);
    }
  };

  const transformCampaignsToInfluencers = (rawCampaigns) => {
    const groupedInfluencers = {};

    rawCampaigns.forEach((campaign) => {
      const sellerInfo = campaign.seller || campaign.sellerId;

      if (!sellerInfo) {
        console.warn(
          "Skipping campaign due to missing seller information (seller/sellerId):",
          campaign
        );
        return;
      }

      const sellerId = sellerInfo._id || sellerInfo;
      const platformKey = campaign.platform;

      if (!groupedInfluencers[sellerId]) {
        groupedInfluencers[sellerId] = {
          id: sellerId,
          name:
            sellerInfo.fullName ||
            campaign.username ||
            `Influencer ${sellerId.substring(0, 4)}`,
          niche: sellerInfo.niche || "General",
          audience: parseInt(campaign.followers) || 0,
          rating: sellerInfo.rating || 4.5,
          engagement: parseFloat(campaign.engagementRate) || 0,
          thumbnail: sellerInfo.thumbnail || "https://via.placeholder.com/150",

          bio: sellerInfo.bio || "",
          responseTime: sellerInfo.responseTime || "N/A",
          location: sellerInfo.location || "Global",
          email: sellerInfo.email || "N/A",
          phone: sellerInfo.phone || "N/A",
          languages: sellerInfo.languages || [],
          totalReviews: sellerInfo.totalReviews || 0,
          coverImage:
            sellerInfo.coverImage ||
            "https://via.placeholder.com/1400x320?text=Influencer+Cover",

          platforms: {},
        };
      }

      const serviceMap = {};
      campaign.services.forEach((service, index) => {
        if (index < 3) {
          serviceMap[`I${index + 1}`] = {
            service: service.serviceType,
            amount: service.amount,
            timeline: service.timeline,
            revisions: service.revisions,
            description: service.description,
            deliverables: service.deliverables,
            requirements: service.requirements,
          };
        }
      });

      groupedInfluencers[sellerId].platforms[platformKey] = {
        username: campaign.username,
        followers: parseInt(campaign.followers) || 0,
        engagementRate: parseFloat(campaign.engagementRate) || 0,
        services: serviceMap,
      };

      const currentFollowers = parseInt(campaign.followers) || 0;
      const currentEngagement = parseFloat(campaign.engagementRate) || 0;

      if (currentFollowers > groupedInfluencers[sellerId].audience) {
        groupedInfluencers[sellerId].audience = currentFollowers;
      }
      if (currentEngagement > groupedInfluencers[sellerId].engagement) {
        groupedInfluencers[sellerId].engagement = currentEngagement;
      }
    });

    return Object.values(groupedInfluencers);
  };

  const fetchInfluencers = async () => {
    setLoading(true);
    setError(null);

    let isMounted = true;

    try {
      const response = await axios.get("/api/client/influencers", {
        headers: {
          Authorization: `Bearer ${clientToken}`,
        },
      });

      if (response.data.success) {
        if (isMounted) {
          const transformedData = transformCampaignsToInfluencers(
            response.data.data
          );
          setInfluencers(transformedData);
        }
      } else {
        if (isMounted) {
          setError(response.data.message || "Something went wrong.");
        }
      }
    } catch (err) {
      console.error("Fetch influencers error:", err);
      if (isMounted) {
        setError("Unable to fetch influencers. Please try again later.");
      }
    } finally {
      if (isMounted) setLoading(false);
    }

    return () => {
      // Cleanup
      isMounted = false;
    };
  };

  const value = {
    axios,
    navigate,
    clientToken,
    setClientToken,
    influencers,
    setInfluencers,
    loading,
    setLoading,
    error,
    setError,
    fetchInfluencers,
    orders,
    fetchOrders, // Expose the payment initiator function
    orderRazorpay,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
