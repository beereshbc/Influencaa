import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import {
  User,
  MapPin,
  Globe,
  Mail,
  Phone,
  Edit3,
  Save,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Facebook,
  CheckCircle,
  Plus,
  Loader2,
  BarChart2,
  Users,
  LayoutGrid,
  AlertCircle,
  Camera,
  RefreshCw,
  Clock,
  Star,
  Zap,
  Image as ImageIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext";

// Removed uploadImageToCloudinary mock function since the backend handles upload now

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const { influencerToken, axios } = useAppContext();

  // State for file objects
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  // Refs for triggering file inputs
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();

    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    if (status === "success") {
      toast.success("Platform connected successfully!", { icon: "🔗" });
      // Use replaceState to clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (status === "error") {
      toast.error("Connection failed. Please try again.");
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get("/api/influencer/profile", {
        headers: { Authorization: `Bearer ${influencerToken}` },
      });

      if (data.success) {
        setProfile(data.data);
        setFormData(data.data);
        console.log(data.data);
      }
    } catch (error) {
      console.log(error);

      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  // 🌟 CORRECTED handleUpdate Function 🌟
  const handleUpdate = async () => {
    const toastId = toast.loading("Saving changes...");

    try {
      const payload = new FormData();

      // 1. Append all non-file fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "thumbnail" || key === "coverImage") return;

        // Handle arrays (like languages) by appending each item separately
        // This is crucial for how multipart/form-data arrays are received on the backend
        if (key === "languages") {
          const languagesArray = Array.isArray(value)
            ? value
            : typeof value === "string" && value.length > 0
            ? value.split(",").map((s) => s.trim())
            : []; // Ensure it's an array for proper iteration

          languagesArray.forEach((item) => payload.append("languages[]", item));
        } else if (value !== null && value !== undefined) {
          payload.append(key, value);
        }
      });

      // 2. Append files if present
      if (avatarFile) payload.append("thumbnail", avatarFile);
      if (coverFile) payload.append("coverImage", coverFile);

      const { data } = await axios.post("/api/influencer/profile", payload, {
        headers: {
          Authorization: `Bearer ${influencerToken}`,
          "Content-Type": "multipart/form-data", // Essential for FormData
        },
      });

      if (!data.success) throw new Error(data.message);

      // After successful update, fetch the new profile to update UI states
      await fetchProfile();
      setIsEditing(false); // Exit editing mode
      setAvatarFile(null); // Clear temporary file states
      setCoverFile(null);
      toast.success("Profile updated successfully", { id: toastId });
    } catch (error) {
      console.error("Update error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Profile update failed", {
        id: toastId,
      });
    }
  };

  const handleFileChange = (e, fileSetter) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      fileSetter(file);

      // Instant visual preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const previewUrl = e.target.result;
        if (fileSetter === setAvatarFile) {
          setFormData((prev) => ({ ...prev, thumbnail: previewUrl }));
        } else if (fileSetter === setCoverFile) {
          setFormData((prev) => ({ ...prev, coverImage: previewUrl }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateCompletion = () => {
    if (!profile) return 0;
    const fields = [
      "fullName",
      "bio",
      "location",
      "niche",
      "phone",
      "thumbnail",
      "coverImage",
    ];
    const filled = fields.filter(
      (f) => profile[f] && profile[f].length > 0
    ).length;
    const platforms = profile.connectedPlatforms?.length > 0 ? 1 : 0;
    return Math.round(((filled + platforms) / (fields.length + 1)) * 100);
  };

  const getConnection = (key) =>
    profile?.connectedPlatforms?.find((c) => c.platform === key);

  const PLATFORMS = [
    {
      key: "instagram",
      icon: Instagram,
      color: "text-pink-600",
      bg: "bg-pink-50",
      label: "Instagram",
    },
    {
      key: "youtube",
      icon: Youtube,
      color: "text-red-600",
      bg: "bg-red-50",
      label: "YouTube",
    },
    {
      key: "facebook",
      icon: Facebook,
      color: "text-blue-600",
      bg: "bg-blue-50",
      label: "Facebook",
    },
    {
      key: "linkedin",
      icon: Linkedin,
      color: "text-blue-700",
      bg: "bg-blue-50",
      label: "LinkedIn",
    },
    {
      key: "twitter",
      icon: Twitter,
      color: "text-sky-500",
      bg: "bg-sky-50",
      label: "Twitter",
    },
  ];

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-orange-50/30 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        <p className="text-orange-600 font-medium animate-pulse">
          Loading your profile...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50/50 pt-24 pb-12 font-outfit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Hidden File Inputs */}
        <input
          type="file"
          ref={avatarInputRef}
          className="hidden"
          accept="image/*"
          name="thumbnail"
          onChange={(e) => handleFileChange(e, setAvatarFile)}
        />
        <input
          type="file"
          ref={coverInputRef}
          className="hidden"
          accept="image/*"
          name="coverImage"
          onChange={(e) => handleFileChange(e, setCoverFile)}
        />

        {/* 1. HERO SECTION */}
        <div className="bg-white rounded-3xl shadow-xl shadow-orange-100/50 border border-white overflow-hidden relative group">
          {/* Cover Image Area */}
          <div className="h-64 relative bg-gray-100">
            {formData.coverImage ? (
              <img
                src={formData.coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-orange-400 via-red-400 to-pink-500 opacity-90" />
            )}

            {isEditing && (
              <div className="absolute top-4 left-4">
                <button
                  className="flex items-center px-4 py-2 bg-black/50 backdrop-blur-md text-white rounded-xl hover:bg-black/70 transition-all"
                  onClick={() => coverInputRef.current.click()}
                >
                  <ImageIcon className="w-4 h-4 mr-2" /> Change Cover
                </button>
              </div>
            )}

            {/* Profile Strength Widget */}
            <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-3 text-white flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <span className="absolute text-[10px] font-bold">
                  {calculateCompletion()}%
                </span>
                <svg className="transform -rotate-90 w-10 h-10">
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-white/30"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-white"
                    strokeDasharray={100}
                    strokeDashoffset={100 - calculateCompletion()}
                  />
                </svg>
              </div>
              <div className="text-xs font-medium">
                <p className="opacity-90">Profile Strength</p>
              </div>
            </div>
          </div>

          <div className="px-8 pb-8">
            <div className="relative flex flex-col md:flex-row items-end -mt-20 mb-6">
              {/* Avatar */}
              <div className="relative group/avatar">
                <div className="w-40 h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white relative">
                  <img
                    src={
                      formData.thumbnail ||
                      `https://ui-avatars.com/api/?name=${profile?.fullName}&background=random`
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  {isEditing && (
                    <div
                      className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm"
                      onClick={() => avatarInputRef.current.click()}
                    >
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
                <div
                  className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-sm"
                  title="Online"
                ></div>
              </div>

              {/* Name & Basic Info */}
              <div className="md:ml-8 mb-2 flex-1 mt-4 md:mt-0 flex flex-col md:flex-row justify-between items-end">
                <div className="w-full md:w-auto">
                  {isEditing ? (
                    <input
                      className="text-4xl font-bold text-gray-900 font-brasika tracking-wide mb-2 bg-gray-50 border border-gray-200 rounded-lg px-2 w-full"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  ) : (
                    <h1 className="text-4xl font-bold text-gray-900 font-brasika tracking-wide mb-2">
                      {profile?.fullName}
                    </h1>
                  )}
                  <div className="flex flex-wrap items-center gap-3 text-gray-600 font-medium">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm border border-orange-100">
                      <LayoutGrid className="w-3.5 h-3.5" />{" "}
                      {profile?.niche || "Creator"}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-100">
                      <MapPin className="w-3.5 h-3.5" />{" "}
                      {profile?.location || "Global"}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 mt-4 md:mt-0">
                  <button
                    onClick={() =>
                      isEditing ? handleUpdate() : setIsEditing(true)
                    }
                    className={`flex items-center px-6 py-3 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 ${
                      isEditing
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 shadow-green-200"
                        : "bg-gradient-to-r from-orange-500 to-red-500 shadow-orange-200"
                    }`}
                  >
                    {isEditing ? (
                      <>
                        <Save className="w-4 h-4 mr-2" /> Save Changes
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-8 border-b border-gray-200 mt-8">
              {["overview", "stats"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 text-sm font-bold uppercase tracking-wide transition-all relative ${
                    activeTab === tab
                      ? "text-orange-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. CONTENT AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {/* Bio Card */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
                    <h3 className="text-xl font-bold text-gray-900 font-brasika mb-4 relative z-10">
                      About Me
                    </h3>
                    {isEditing ? (
                      <textarea
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 h-40 transition-all resize-none"
                        value={formData.bio}
                        onChange={(e) =>
                          setFormData({ ...formData, bio: e.target.value })
                        }
                        placeholder="Tell brands about your content..."
                      />
                    ) : (
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line relative z-10">
                        {profile?.bio || "No bio added yet."}
                      </p>
                    )}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatMiniBox
                      icon={Star}
                      label="Rating"
                      value={
                        profile?.rating ? profile.rating.toFixed(1) : "N/A"
                      }
                      color="text-yellow-500"
                      bg="bg-yellow-50"
                    />
                    <StatMiniBox
                      icon={CheckCircle}
                      label="Reviews"
                      value={profile?.totalReviews || 0}
                      color="text-purple-500"
                      bg="bg-purple-50"
                    />

                    {/* Editable Fields for Response/Delivery Time */}
                    <DetailItem
                      label="Response Time"
                      icon={Clock}
                      value={formData.responseTime}
                      isEditing={isEditing}
                      onChange={(v) =>
                        setFormData({ ...formData, responseTime: v })
                      }
                    />
                    <DetailItem
                      label="Delivery Time"
                      icon={Zap}
                      value={formData.deliveryTime}
                      isEditing={isEditing}
                      onChange={(v) =>
                        setFormData({ ...formData, deliveryTime: v })
                      }
                    />
                  </div>

                  {/* Details Form */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    <h3 className="text-xl font-bold text-gray-900 font-brasika mb-6">
                      Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <DetailItem
                        label="Email"
                        icon={Mail}
                        value={profile?.email}
                      />
                      <DetailItem
                        label="Phone"
                        icon={Phone}
                        value={formData.phone}
                        isEditing={isEditing}
                        onChange={(v) => setFormData({ ...formData, phone: v })}
                      />
                      <DetailItem
                        label="Niche"
                        icon={LayoutGrid}
                        value={formData.niche}
                        isEditing={isEditing}
                        onChange={(v) => setFormData({ ...formData, niche: v })}
                      />
                      <DetailItem
                        label="Location"
                        icon={MapPin}
                        value={formData.location}
                        isEditing={isEditing}
                        onChange={(v) =>
                          setFormData({ ...formData, location: v })
                        }
                      />
                      <div className="col-span-1 md:col-span-2">
                        <DetailItem
                          label="Languages"
                          icon={Globe}
                          value={formData.languages?.join(", ")}
                          displayValue={profile?.languages?.join(", ")}
                          isEditing={isEditing}
                          onChange={(v) =>
                            setFormData({
                              ...formData,
                              languages: v.split(",").map((s) => s.trim()),
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "stats" && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-gray-900 font-brasika">
                      Real-Time Analytics
                    </h3>
                    <span className="text-xs text-gray-400 flex items-center bg-gray-100 px-2 py-1 rounded-lg">
                      <RefreshCw className="w-3 h-3 mr-1" /> Updated{" "}
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <StatBigBox
                      icon={Users}
                      label="Total Audience"
                      value={((profile?.audience || 0) / 1000).toFixed(1) + "K"}
                      trend="+5.2%"
                      color="text-orange-500"
                      bg="bg-orange-50"
                    />
                    <StatBigBox
                      icon={BarChart2}
                      label="Avg Engagement"
                      value={(profile?.engagement || 0) + "%"}
                      trend="+1.2%"
                      color="text-green-500"
                      bg="bg-green-50"
                    />
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-700 text-sm uppercase tracking-wider mb-4">
                      Platform Breakdown
                    </h4>
                    {profile?.connectedPlatforms?.map((conn) => (
                      <div
                        key={conn._id}
                        className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-orange-200 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shadow-sm ${
                              conn.platform === "instagram"
                                ? "bg-pink-50 text-pink-600"
                                : conn.platform === "youtube"
                                ? "bg-red-50 text-red-600"
                                : "bg-blue-50 text-blue-600"
                            }`}
                          >
                            {conn.platform === "instagram" ? (
                              <Instagram size={20} />
                            ) : conn.platform === "youtube" ? (
                              <Youtube size={20} />
                            ) : (
                              <Globe size={20} />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 capitalize">
                              {conn.platform}
                            </p>
                            <p className="text-xs text-gray-500 font-mono">
                              @{conn.username}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 text-lg">
                            {conn.followers}
                          </p>
                          <p className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full inline-block mt-1">
                            {conn.engagementRate}% Eng.
                          </p>
                        </div>
                      </div>
                    ))}
                    {(!profile?.connectedPlatforms ||
                      profile.connectedPlatforms.length === 0) && (
                      <div className="text-center p-8 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        No platforms connected yet.
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Platform Connections */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 font-brasika mb-6 flex items-center gap-2">
                Connect Accounts{" "}
                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              </h3>
              <div className="space-y-4">
                {PLATFORMS.map((p) => {
                  const conn = getConnection(p.key);
                  return (
                    <div
                      key={p.key}
                      className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 group ${
                        conn
                          ? `border-transparent bg-gradient-to-br ${p.bg} to-white shadow-sm`
                          : `border-gray-100 hover:border-orange-200 bg-white`
                      }`}
                    >
                      <div className="p-4 relative z-10">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2.5 rounded-xl ${
                                conn ? "bg-white shadow-sm" : "bg-gray-50"
                              } ${p.color} transition-colors`}
                            >
                              <p.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <span
                                className={`block font-bold text-sm ${
                                  conn ? "text-gray-900" : "text-gray-600"
                                }`}
                              >
                                {p.label}
                              </span>
                              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                                {conn ? "Connected" : "Not Linked"}
                              </span>
                            </div>
                          </div>
                          {!conn && (
                            <button
                              onClick={() => connectPlatform(p.key)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-50 text-orange-500 hover:bg-orange-500 hover:text-white transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          )}
                          {conn && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                        {conn ? (
                          <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="bg-white/60 p-2 rounded-lg">
                              <p className="text-[10px] uppercase text-gray-400 font-bold">
                                Followers
                              </p>
                              <p className="font-bold text-gray-900">
                                {conn.followers}
                              </p>
                            </div>
                            <div className="bg-white/60 p-2 rounded-lg">
                              <p className="text-[10px] uppercase text-gray-400 font-bold">
                                Eng. Rate
                              </p>
                              <p className="font-bold text-green-600">
                                {conn.engagementRate}%
                              </p>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => connectPlatform(p.key)}
                            className="w-full py-2 mt-2 text-xs font-bold text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            Link Account
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUBCOMPONENTS ---

const StatBigBox = ({ icon: Icon, label, value, trend, color, bg }) => (
  <div
    className={`p-6 rounded-2xl border-2 border-transparent hover:border-gray-100 ${bg} transition-all duration-300 group`}
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-white shadow-sm ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-xs font-bold px-2 py-1 bg-white/60 rounded-full text-gray-600">
        {trend}
      </span>
    </div>
    <h4 className="text-3xl font-extrabold text-gray-900 mb-1 group-hover:scale-105 transition-transform origin-left">
      {value}
    </h4>
    <p className="text-sm font-medium text-gray-500">{label}</p>
  </div>
);

const StatMiniBox = ({ icon: Icon, label, value, color, bg }) => (
  <div
    className={`p-4 rounded-xl border border-transparent hover:border-gray-100 ${bg} text-center transition-all`}
  >
    <div className={`${color} mb-1 flex justify-center`}>
      <Icon className="w-5 h-5" />
    </div>
    <div className="text-lg font-bold text-gray-900">{value}</div>
    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
      {label}
    </div>
  </div>
);

const DetailItem = ({
  label,
  icon: Icon,
  value,
  displayValue,
  isEditing,
  onChange,
}) => (
  <div className="group">
    <div className="flex items-center gap-2 mb-2 text-gray-400">
      <Icon className="w-3.5 h-3.5" />
      <label className="text-xs font-bold uppercase tracking-wider">
        {label}
      </label>
    </div>
    {isEditing && onChange ? (
      <input
        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all font-medium text-gray-900"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <div className="px-4 py-3 bg-gray-50/50 rounded-xl border border-transparent group-hover:border-gray-100 transition-colors">
        <span className="font-medium text-gray-700 truncate block">
          {displayValue || value || "N/A"}
        </span>
      </div>
    )}
  </div>
);

export default Profile;
