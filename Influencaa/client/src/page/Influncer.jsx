import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Users,
  TrendingUp,
  Clock,
  MapPin,
  Mail,
  Phone,
  Globe,
  CheckCircle,
  Instagram,
  Youtube,
  Facebook,
  Linkedin,
  Twitter,
  Calendar,
  FileText,
  Shield,
  X,
  Loader,
} from "lucide-react";
import RelInfluncers from "../components/RelInfluncers";
import { useAppContext } from "../context/AppContext";

const Influencer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    influencers,
    loading,
    fetchInfluencers,
    axios, // Get axios from context
    clientToken, // Get clientToken from context
  } = useAppContext();

  const [influencer, setInfluencer] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedService, setSelectedService] = useState("I1");
  const [activeTab, setActiveTab] = useState("services");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState(null); // For handling real submission error messages // Order form state

  const [orderForm, setOrderForm] = useState({
    brandName: "",
    contactPerson: "",
    email: "",
    phone: "",
    campaignBrief: "",
    budget: "",
    timeline: "",
    specialRequirements: "",
    targetAudience: "",
    campaignGoals: "",
    contentGuidelines: "",
  });

  const socialPlatforms = {
    instagram: { icon: Instagram, color: "bg-pink-500", label: "Instagram" },
    youtube: { icon: Youtube, color: "bg-red-500", label: "YouTube" },
    facebook: { icon: Facebook, color: "bg-blue-600", label: "Facebook" },
    linkedin: { icon: Linkedin, color: "bg-blue-800", label: "LinkedIn" },
    twitter: { icon: Twitter, color: "bg-sky-500", label: "Twitter" },
  };

  useEffect(() => {
    fetchInfluencers();
  }, []);

  useEffect(() => {
    // Only proceed if data is not currently loading and the list has items
    if (!loading && influencers.length > 0) {
      // Find the influencer using the ID from the URL params (which matches inf.id/sellerId)
      const foundInfluencer = influencers.find((inf) => inf.id === id);

      if (foundInfluencer) {
        setInfluencer({
          // Assign the found data, providing fallbacks for potentially missing fields
          ...foundInfluencer,
          bio:
            foundInfluencer.bio ||
            "This influencer has not provided a biography yet.",
          totalReviews: foundInfluencer.totalReviews || 0,
          responseTime: foundInfluencer.responseTime || "1 hour",
          location: foundInfluencer.location || "Global",
          phone: foundInfluencer.phone || "N/A",
          email: foundInfluencer.email || "N/A",
          languages: foundInfluencer.languages || [],
          coverImage:
            foundInfluencer.coverImage ||
            "https://via.placeholder.com/1400x320?text=Influencer+Cover",
        }); // Set default platform to the first available platform

        const platformKeys = Object.keys(foundInfluencer.platforms);
        if (platformKeys.length > 0) {
          setSelectedPlatform(platformKeys[0]);
        }
      }
    }
  }, [id, influencers, loading]); // Calculate current platform and service based on state

  const currentPlatform = selectedPlatform
    ? influencer?.platforms[selectedPlatform]
    : null;
  const currentService = currentPlatform?.services[selectedService]; // Effect to update order form fields when service changes or modal opens

  useEffect(() => {
    if (showOrderModal && influencer && currentService) {
      setOrderForm((prev) => ({
        ...prev, // NOTE: Budget in form is currency string, totalAmount in payload should be number
        budget: `₹${(currentService.amount || 0).toLocaleString()}`,
        timeline: currentService.timeline || "3 Days",
      }));
    }
  }, [showOrderModal, influencer, selectedService, currentService]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // 🎯 FIX: INTEGRATE REAL SUBMISSION LOGIC
  // =========================================================
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null); // Clear previous errors

    if (!currentService || !influencer) {
      setSubmissionError("Service or Influencer data is missing.");
      setIsSubmitting(false);
      return;
    }

    // Prepare data structure exactly matching the Mongoose schema
    try {
      const orderPayload = {
        influencerId: influencer.id,
        influencerName: influencer.name,
        platform: selectedPlatform,
        service: selectedService,

        // Service Details
        serviceDetails: {
          service: currentService.service,
          amount: currentService.amount,
          timeline: currentService.timeline || "3 Days",
          revisions: currentService.revisions || 0,
          description: currentService.description || "",
          deliverables: currentService.deliverables || [],
          requirements: currentService.requirements || [],
        },

        // Order Form Details (Client-provided info)
        orderDetails: {
          brandName: orderForm.brandName,
          contactPerson: orderForm.contactPerson,
          email: orderForm.email,
          phone: orderForm.phone,
          campaignBrief: orderForm.campaignBrief, // Pass the raw amount, not the formatted currency string
          budget: orderForm.budget,
          timeline: orderForm.timeline,
          specialRequirements: orderForm.specialRequirements,
          targetAudience: orderForm.targetAudience,
          campaignGoals: orderForm.campaignGoals,
          contentGuidelines: orderForm.contentGuidelines,
        },

        totalAmount: currentService.amount,
      }; // Use axios for API submission

      const response = await axios.post("/api/client/orders", orderPayload, {
        headers: {
          Authorization: `Bearer ${clientToken}`,
        },
      });

      if (response.data.success) {
        setOrderSuccess(true);
        setTimeout(() => {
          setShowOrderModal(false);
          setOrderSuccess(false);
          navigate("/dashboard");
        }, 2000);
      } else {
        setSubmissionError(
          response.data.message ||
            "Order submission failed due to server error."
        );
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setSubmissionError(
        error.response?.data?.message ||
          "Network error. Please check your connection."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  // =========================================================

  const resetOrderForm = () => {
    setOrderForm({
      brandName: "",
      contactPerson: "",
      email: "",
      phone: "",
      campaignBrief: "",
      budget: "",
      timeline: "",
      specialRequirements: "",
      targetAudience: "",
      campaignGoals: "",
      contentGuidelines: "",
    });
  };

  const handleModalClose = () => {
    setShowOrderModal(false);
    setOrderSuccess(false);
    setSubmissionError(null);
    resetOrderForm();
  }; // --- Loading States and Error Handling ---

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
         
        <div className="text-center">
             
          <Loader className="w-8 h-8 animate-spin text-orange-500 mx-auto mb-4" />
             
          <h2 className="text-2xl font-bold text-gray-900">
                        Loading Influencer Data...    
          </h2>
           
        </div>
      </div>
    );
  } // Check if data has loaded, but the specific influencer wasn't found

  if (!influencer) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
         
        <div className="text-center">
             
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Influencer Not Found 😞    
          </h2>
             
          <p className="text-gray-600 mb-6">
                        The profile with ID: **{id}** could not be located.    
          </p>
             
          <button
            onClick={() => navigate("/explore")}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
                        Back to Explore    
          </button>
           
        </div>
      </div>
    );
  } // Get available platforms for this influencer

  const availablePlatforms = Object.keys(influencer.platforms);

  return (
    <div className="min-h-screen pt-20">
            {/* Header with Back Button */}
      <div className="bg-white shadow-sm border-b">
         
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             
          <div className="flex items-center justify-between h-16">
                 
            <button
              onClick={() => navigate("/explore")}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
                            <ArrowLeft className="w-5 h-5 mr-2" />             
              Back to Explore      
            </button>
                 
            <div className="flex items-center space-x-4">
                     
              <div className="flex items-center bg-orange-50 px-3 py-2 rounded-lg">
                         
                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" /> 
                       
                <span className="font-semibold text-gray-900">
                                    {influencer.rating}         
                </span>
                         
                <span className="text-gray-600 ml-1">
                                    ({influencer.totalReviews} reviews)        
                   
                </span>
                       
              </div>
                   
            </div>
               
          </div>
           
        </div>
      </div>
            {/* Cover Image & Basic Info */}
      <div className="relative">
         
        <div className="relative h-80 bg-gray-200 overflow-hidden">
             
          <img
            src={influencer.coverImage}
            alt={influencer.name}
            className="w-full h-full object-cover"
          />
             <div className="absolute inset-0 bg-black bg-opacity-30"></div>   
                {/* Gradient Overlay */}   
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    {/* Profile Info Overlay */}   
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                 
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     
              <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6">
                         
                <img
                  src={influencer.thumbnail}
                  alt={influencer.name}
                  className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl object-cover border-4 border-white shadow-2xl"
                />
                         
                <div className="flex-1 text-white">
                             
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2 drop-shadow-lg">
                                        {influencer.name}           
                  </h1>
                             
                  <p className="text-lg text-orange-300 font-semibold mb-3 drop-shadow">
                                        {influencer.niche}           
                  </p>
                             
                  <p className="text-white/90 text-lg leading-relaxed max-w-3xl drop-shadow">
                                        {influencer.bio}           
                  </p>
                             
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-sm">
                    <div className="flex items-center text-white/90">
                                            <Users className="w-4 h-4 mr-2" /> 
                                   
                      {influencer.audience >= 1000000
                        ? `${(influencer.audience / 1000000).toFixed(1)}M`
                        : influencer.audience >= 1000
                        ? `${(influencer.audience / 1000).toFixed(0)}K`
                        : influencer.audience.toLocaleString()}
                                            followers              
                    </div>
                    <div className="flex items-center text-white/90">
                                     
                      <TrendingUp className="w-4 h-4 mr-2" />                   
                        {influencer.engagement}% engagement              
                    </div>
                    <div className="flex items-center text-white/90">
                                            <Clock className="w-4 h-4 mr-2" /> 
                                          {influencer.responseTime} response    
                               
                    </div>
                    <div className="flex items-center text-white/90">
                                            <MapPin className="w-4 h-4 mr-2" /> 
                                          {influencer.location}                 
                       
                    </div>
                               
                  </div>
                           
                </div>
                       
              </div>
                   
            </div>
               
          </div>
           
        </div>
      </div>
            {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}   
          <div className="lg:col-span-1 space-y-6">
                        {/* Contact Info */}     
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                     
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Contact Information        
              </h3>
                     
              <div className="space-y-3">
                         
                <div className="flex items-center text-gray-600">
                             
                  <Mail className="w-4 h-4 mr-3 flex-shrink-0" />               
                   
                  <span className="text-sm break-words">
                                        {influencer.email}           
                  </span>
                           
                </div>
                         
                <div className="flex items-center text-gray-600">
                             
                  <Phone className="w-4 h-4 mr-3 flex-shrink-0" />             
                      <span className="text-sm">{influencer.phone}</span>       
                   
                </div>
                         
                <div className="flex items-center text-gray-600">
                             
                  <Globe className="w-4 h-4 mr-3 flex-shrink-0" />             
                     
                  <span className="text-sm">
                                 {(influencer.languages || []).join(", ")}     
                         
                  </span>
                           
                </div>
                       
              </div>
                   
            </div>
                        {/* Platform Stats */}     
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                     
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Available Platforms        
              </h3>
                     
              <div className="space-y-4">
                         
                {availablePlatforms.map((key) => {
                  const platform = influencer.platforms[key];
                  const PlatformIcon = socialPlatforms[key].icon;
                  return (
                    <div
                      key={key}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPlatform === key
                          ? "border-orange-500 bg-orange-50 shadow-md"
                          : "border-gray-200 hover:border-orange-300 hover:shadow-sm"
                      }`}
                      onClick={() => setSelectedPlatform(key)}
                    >
                                     
                      <div className="flex items-center justify-between mb-3">
                                         
                        <div className="flex items-center">
                                             
                          <PlatformIcon className="w-6 h-6 mr-3" />             
                               
                          <span className="font-medium text-gray-900">
                                                 {socialPlatforms[key].label}   
                                                 
                          </span>
                                           
                        </div>
                                         
                        {platform.verification && (
                          <CheckCircle className="w-5 h-5 text-blue-500" />
                        )}
                                       
                      </div>
                                     
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                         
                        <div className="flex flex-col">
                                             
                          <span className="font-semibold">Followers</span>     
                                              <span>{platform.followers}</span> 
                                         
                        </div>
                                         
                        <div className="flex flex-col">
                                             
                          <span className="font-semibold">Engagement</span>     
                                       <span>{platform.engagementRate}%</span> 
                                         
                        </div>
                                       
                      </div>
                                   
                    </div>
                  );
                })}
                       
              </div>
                   
            </div>
               
          </div>
                    {/* Main Content Area */}   
          <div className="lg:col-span-3">
                        {/* Navigation Tabs */}     
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
                     
              <div className="flex space-x-8 border-b border-gray-200">
                         
                <button
                  onClick={() => setActiveTab("services")}
                  className={`pb-4 px-1 font-medium transition-colors relative ${
                    activeTab === "services"
                      ? "text-orange-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                                    Services & Pricing            
                  {activeTab === "services" && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"
                      layoutId="activeTab"
                    />
                  )}
                           
                </button>
                         
                <button
                  onClick={() => setActiveTab("portfolio")}
                  className={`pb-4 px-1 font-medium transition-colors relative ${
                    activeTab === "portfolio"
                      ? "text-orange-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                                    Portfolio            
                  {activeTab === "portfolio" && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"
                      layoutId="activeTab"
                    />
                  )}
                           
                </button>
                         
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`pb-4 px-1 font-medium transition-colors relative ${
                    activeTab === "reviews"
                      ? "text-orange-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                                    Reviews & Ratings            
                  {activeTab === "reviews" && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"
                      layoutId="activeTab"
                    />
                  )}
                           
                </button>
                       
              </div>
                   
            </div>
                        {/* Services Content */}     
            {activeTab === "services" &&
              selectedPlatform &&
              currentPlatform && (
                <div className="space-y-6">
                                    {/* Platform Header */}           
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
                                     
                      <div className="flex items-center">
                                         
                        {(() => {
                          const Icon = socialPlatforms[selectedPlatform].icon;
                          return <Icon className="w-10 h-10 mr-4" />;
                        })()}
                                         
                        <div>
                                             
                          <h2 className="text-2xl font-bold text-gray-900">
                                                 
                            {socialPlatforms[selectedPlatform].label} Services  
                                             
                          </h2>
                                             
                          <p className="text-gray-600">
                                                        @
                            {currentPlatform.username} •                        
                                {currentPlatform.followers} followers          
                                     
                          </p>
                                           
                        </div>
                                       
                      </div>
                                     
                      <div className="text-center lg:text-right">
                                         
                        <div className="text-sm text-gray-600 font-medium">
                                                    Engagement Rate            
                               
                        </div>
                                         
                        <div className="text-2xl font-bold text-green-600">
                                             {currentPlatform.engagementRate}%  
                                               
                        </div>
                                       
                      </div>
                                   
                    </div>
                               
                  </div>
                                    {/* Service Tiers */}           
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {["I1", "I2", "I3"].map((serviceKey) => {
                      const service = currentPlatform.services[serviceKey];
                      if (!service) return null;

                      const isSelected = selectedService === serviceKey;
                      return (
                        <motion.div
                          key={serviceKey}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            isSelected
                              ? "border-orange-500 bg-orange-50 shadow-md"
                              : "border-gray-200 hover:border-orange-300 hover:shadow-sm"
                          }`}
                          onClick={() => setSelectedService(serviceKey)}
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.2 }}
                        >
                                             
                          <div className="text-center mb-4">
                                                 
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                                            {service.name}     
                                             
                            </h3>
                                                 
                            <div className="text-3xl font-bold text-orange-600 mb-2">
                                                            ₹
                              {service.amount.toLocaleString()}                 
                                 
                            </div>
                                                 
                            <p className="text-gray-600 text-sm">
                                                     {service.description}     
                                             
                            </p>
                                               
                          </div>
                                             
                          <div className="space-y-2">
                                                 
                            {/* Safely access deliverables */}                 
                               
                            {(service.deliverables || [])
                              .slice(0, 3)
                              .map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center text-sm text-gray-600"
                                >
                                                             
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                                             
                                  <span className="break-words">{item}</span>   
                                                       
                                </div>
                              ))}
                                                 
                            {/* Safely check array length for "more items" */} 
                                               
                            {(service.deliverables || []).length > 3 && (
                              <div className="text-sm text-gray-500 text-center pt-2">
                                                                +
                                {(service.deliverables.length || 0) - 3} more  
                                                              items            
                                           
                              </div>
                            )}
                                               
                          </div>
                                           
                        </motion.div>
                      );
                    })}
                               
                  </div>
                                    {/* Service Details */}           
                  {currentService && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
                    >
                                     
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                         {/* Left Column - Service Details */} 
                                             
                        <div>
                                             
                          <h3 className="text-xl font-bold text-gray-900 mb-4">
                                                        Service Details        
                                       
                          </h3>
                                             
                          <div className="space-y-6">
                                                 
                            <div>
                                                     
                              <h4 className="font-semibold text-gray-900 mb-3 text-lg">
                                                                Description    
                                                   
                              </h4>
                                                     
                              <p className="text-gray-600 leading-relaxed">
                                                         
                                {currentService.description}                   
                                   
                              </p>
                                                   
                            </div>
                                                 
                            <div>
                                                     
                              <h4 className="font-semibold text-gray-900 mb-3 text-lg">
                                                                Deliverables    
                                                   
                              </h4>
                                                     
                              <div className="space-y-3">
                                                         
                                {/* Safely access deliverables for full list */}
                                                         
                                {(currentService.deliverables || []).map(
                                  (item, index) => (
                                    <div
                                      key={index}
                                      className="flex items-start text-gray-600"
                                    >
                                                                     
                                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                                     
                                      <span className="break-words">
                                                                         {item} 
                                                                           
                                      </span>
                                                                   
                                    </div>
                                  )
                                )}
                                                       
                              </div>
                                                   
                            </div>
                                               
                          </div>
                                           
                        </div>
                                         
                        {/* Right Column - Order Information */}               
                         
                        <div>
                                             
                          <h3 className="text-xl font-bold text-gray-900 mb-4">
                                                        Order Information      
                                         
                          </h3>
                                             
                          <div className="space-y-4">
                                                 
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                     
                              <div className="flex items-center justify-between mb-2">
                                                         
                                <span className="font-semibold text-gray-900">
                                                                    Timeline    
                                                       
                                </span>
                                                         
                                <Clock className="w-5 h-5 text-gray-600" />     
                                                 
                              </div>
                                                     
                              <p className="text-gray-600 font-medium">
                                                         
                                {currentService.timeline}                       
                              </p>
                                                   
                            </div>
                                                 
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                     
                              <div className="flex items-center justify-between mb-2">
                                                         
                                <span className="font-semibold text-gray-900">
                                                                    Revisions  
                                                         
                                </span>
                                                         
                                <FileText className="w-5 h-5 text-gray-600" /> 
                                                     
                              </div>
                                                     
                              <p className="text-gray-600 font-medium">
                                                         
                                {currentService.revisions} included            
                                           
                              </p>
                                                   
                            </div>
                                                 
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                     
                              <div className="flex items-center justify-between mb-2">
                                                         
                                <span className="font-semibold text-gray-900">
                                                                    Requirements
                                                           
                                </span>
                                                         
                                <Shield className="w-5 h-5 text-gray-600" />   
                                                   
                              </div>
                                                     
                              <div className="space-y-2">
                                                         
                                {/* Safely access requirements */}             
                                           
                                {(currentService.requirements || []).map(
                                  (req, index) => (
                                    <p
                                      key={index}
                                      className="text-gray-600 text-sm"
                                    >
                                                                            •
                                      {req}                             
                                    </p>
                                  )
                                )}
                                                       
                              </div>
                                                   
                            </div>
                                                        {/* Order Button */}   
                                             
                            <motion.button
                              onClick={() => setShowOrderModal(true)}
                              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                                                            Place Order - ₹    
                                                 
                              {currentService.amount.toLocaleString()}         
                                         
                            </motion.button>
                                                 
                            <div className="flex items-center justify-center text-sm text-gray-500">
                                                     
                              <Calendar className="w-4 h-4 mr-2" />             
                                              Delivery in
                              {currentService.timeline}                         
                               
                            </div>
                                               
                          </div>
                                           
                        </div>
                                       
                      </div>
                                   
                    </motion.div>
                  )}
                           
                </div>
              )}
                        {/* No Platform Selected State */}     
            {activeTab === "services" && !selectedPlatform && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                         
                <div className="text-gray-400 mb-4">
                                    <Users className="w-16 h-16 mx-auto" />     
                     
                </div>
                         
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                    Select a Platform          
                </h3>
                         
                <p className="text-gray-500">
                                    Choose a platform from the sidebar to view
                  available services          
                </p>
                       
              </div>
            )}
                 
            {/* Portfolio and Reviews Tabs (No changes needed, placeholders work with influencer.name check) */}
                 
            {activeTab === "portfolio" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                         
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Portfolio          
                </h2>
                         
                <div className="text-center text-gray-500 py-12">
                             
                  <div className="text-xl mb-3">Portfolio Coming Soon</div>     
                       
                  <p className="text-gray-600 max-w-md mx-auto">
                                        {influencer.name} is currently working
                    on showcasing their                     best work here.
                    Check back soon to see their amazing content                
                        portfolio!            
                  </p>
                           
                </div>
                       
              </div>
            )}
                 
            {activeTab === "reviews" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                         
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Reviews & Ratings          
                </h2>
                         
                <div className="text-center py-8">
                             
                  <div className="flex justify-center items-center mb-6">
                    <Star className="w-16 h-16 text-yellow-400 fill-current" /> 
                               
                    <div className="ml-4 text-left">
                                     
                      <div className="text-4xl font-bold text-gray-900">
                                                {influencer.rating}/5          
                             
                      </div>
                                     
                      <div className="text-gray-600">
                                                Based on
                        {influencer.totalReviews} reviews                
                      </div>
                                   
                    </div>
                               
                  </div>
                             
                  <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                                        {influencer.name} maintains excellent
                    service quality with                     prompt deliveries
                    and professional collaborations. Brands                    
                    consistently praise their attention to detail and creative  
                                      approach.            
                  </p>
                           
                </div>
                       
              </div>
            )}
               
          </div>
           
        </div>
      </div>
            {/* Order Modal */}
      <AnimatePresence>
         
        {showOrderModal && currentService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
                 
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
                     
              {orderSuccess ? (
                <div className="p-8 text-center">
                             
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-8 h-8 text-white" />             
                       
                  </motion.div>
                             
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        Order Placed Successfully!              
                       
                  </h3>
                             
                  <p className="text-gray-600 mb-6">
                                        Your order has been submitted to
                    {influencer.name}. You will                     receive a
                    confirmation email shortly.            
                  </p>
                             
                  <button
                    onClick={handleModalClose}
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                                        Close            
                  </button>
                           
                </div>
              ) : (
                <form onSubmit={handlePlaceOrder}>
                                    {/* Modal Header */}           
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                                     
                      <h2 className="text-2xl font-bold text-gray-900">
                                                Place Order                    
                         
                      </h2>
                                     
                      <p className="text-gray-600">
                                                {influencer.name} -
                        {currentService.name}               
                      </p>
                                   
                    </div>
                    <button
                      type="button"
                      onClick={handleModalClose}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                                            <X className="w-6 h-6" />           
                       
                    </button>
                               
                  </div>
                                    {/* Modal Body */}           
                  <div className="p-6 space-y-6">
                                        {/* Order Summary */}             
                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                                     
                      <h3 className="font-semibold text-gray-900 mb-3">
                                                Order Summary                  
                           
                      </h3>
                                     
                      <div className="grid grid-cols-2 gap-4 text-sm">
                                         
                        <div>
                                             
                          <span className="text-gray-600">Service:</span>       
                                     
                          <p className="font-medium">{currentService.name}</p> 
                                         
                        </div>
                                         
                        <div>
                                             
                          <span className="text-gray-600">Platform:</span>     
                                       
                          <p className="font-medium">
                                                 
                            {socialPlatforms[selectedPlatform].label}           
                                   
                          </p>
                                           
                        </div>
                                         
                        <div>
                                             
                          <span className="text-gray-600">Amount:</span>       
                                     
                          <p className="font-medium text-orange-600">
                                                        ₹
                            {currentService.amount.toLocaleString()}           
                                   
                          </p>
                                           
                        </div>
                                         
                        <div>
                                             
                          <span className="text-gray-600">Timeline:</span>     
                                       
                          <p className="font-medium">
                                                 {currentService.timeline}     
                                         
                          </p>
                                           
                        </div>
                                       
                      </div>
                                   
                    </div>
                                        {/* Contact Information */}             
                    <div className="space-y-4">
                                     
                      <h3 className="font-semibold text-gray-900">
                                                Contact Information            
                           
                      </h3>
                                     
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                         
                        <div>
                                             
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Brand Name *            
                                   
                          </label>
                                             
                          <input
                            type="text"
                            name="brandName"
                            value={orderForm.brandName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                                           
                        </div>
                                         
                        <div>
                                             
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Contact Person *        
                                       
                          </label>
                                             
                          <input
                            type="text"
                            name="contactPerson"
                            value={orderForm.contactPerson}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                                           
                        </div>
                                         
                        <div>
                                             
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Email *                
                               
                          </label>
                                             
                          <input
                            type="email"
                            name="email"
                            value={orderForm.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                                           
                        </div>
                                         
                        <div>
                                             
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Phone *                
                               
                          </label>
                                             
                          <input
                            type="tel"
                            name="phone"
                            value={orderForm.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                                           
                        </div>
                                       
                      </div>
                                   
                    </div>
                                        {/* Campaign Details */}               
                       
                    <div className="space-y-4">
                                     
                      <h3 className="font-semibold text-gray-900">
                                                Campaign Details                
                      </h3>
                                     
                      <div>
                                         
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Campaign Brief *            
                               
                        </label>
                                         
                        <textarea
                          name="campaignBrief"
                          value={orderForm.campaignBrief}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Describe your campaign goals, target audience, and key messaging..."
                        />
                                       
                      </div>
                                     
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                         
                        <div>
                                             
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Target Audience        
                                       
                          </label>
                                             
                          <input
                            type="text"
                            name="targetAudience"
                            value={orderForm.targetAudience}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="e.g., Age 18-35, Urban Professionals"
                          />
                                           
                        </div>
                                         
                        <div>
                                             
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Campaign Goals          
                                     
                          </label>
                                             
                          <input
                            type="text"
                            name="campaignGoals"
                            value={orderForm.campaignGoals}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="e.g., Brand Awareness, Sales, Engagement"
                          />
                                           
                        </div>
                                       
                      </div>
                                     
                      <div>
                                         
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Content Guidelines          
                                 
                        </label>
                                         
                        <textarea
                          name="contentGuidelines"
                          value={orderForm.contentGuidelines}
                          onChange={handleInputChange}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Any specific do's and don'ts for the content..."
                        />
                                       
                      </div>
                                     
                      <div>
                                         
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Special Requirements        
                                   
                        </label>
                                         
                        <textarea
                          name="specialRequirements"
                          value={orderForm.specialRequirements}
                          onChange={handleInputChange}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="Any additional requirements or notes..."
                        />
                                       
                      </div>
                                   
                    </div>
                               
                  </div>
                                    {/* Modal Footer */}           
                  <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                    <div>
                                     
                      <p className="text-sm text-gray-600">
                                                Total Amount:                  
                        <span className="font-semibold text-orange-600 text-lg">
                                                    ₹
                          {currentService.amount.toLocaleString()}             
                             
                        </span>
                                       
                      </p>
                                   
                    </div>
                    <div className="flex space-x-3">
                                     
                      <button
                        type="button"
                        onClick={handleModalClose}
                        className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                                                Cancel                
                      </button>
                                     
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                      >
                                         
                        {isSubmitting ? (
                          <>
                                                 
                            <Loader className="w-4 h-4 animate-spin mr-2" />   
                                                    Processing...              
                                 
                          </>
                        ) : (
                          `Place Order - ₹${currentService.amount.toLocaleString()}`
                        )}
                                       
                      </button>
                                   
                    </div>
                               
                  </div>
                           
                </form>
              )}
                   
            </motion.div>
               
          </motion.div>
        )}
      </AnimatePresence>
            {/* Related Influencers Section */}
      <AnimatePresence>
         
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-gray-50 to-orange-50 py-16"
        >
             
          {/* Ensure influencer is not null before accessing its properties */} 
           
          {influencer && (
            <RelInfluncers niche={influencer.niche} Iid={influencer.id} />
          )}
           
        </motion.section>
      </AnimatePresence>
         
    </div>
  );
};

export default Influencer;
