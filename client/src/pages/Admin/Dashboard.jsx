import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
import {
  HiPhotograph,
  HiUpload,
  HiTrash,
  HiPencilAlt,
  HiX,
  HiCheck,
  HiLogout,
  HiVideoCamera,
  HiPlay,
  HiStar,
  HiUserGroup,
  HiChatAlt2,
} from "react-icons/hi";

const Dashboard = () => {
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://csphotography-backend.onrender.com';
  const [activeTab, setActiveTab] = useState("media");
  const [media, setMedia] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadType, setUploadType] = useState("image");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [thumbnailTime, setThumbnailTime] = useState({});

  const categories = [
    { value: "all", label: "All" },
    { value: "wedding", label: "Wedding" },
    { value: "portrait", label: "Portrait" },
    { value: "event", label: "Event" },
    { value: "nature", label: "Nature" },
    { value: "other", label: "Other" },
  ];

  const tabs = [
    { id: "media", label: "Media Gallery", icon: <HiPhotograph /> },
    { id: "testimonials", label: "Testimonials", icon: <HiChatAlt2 /> },
    { id: "team", label: "Team Members", icon: <HiUserGroup /> },
  ];

   const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const headers = { Authorization: `Bearer ${token}` };

      console.log(`🚀 Fetching ${activeTab} from:`, `${API_BASE_URL}/api/${activeTab}`);

      if (activeTab === "media") {
        const response = await axios.get(`${API_BASE_URL}/api/media`, { headers });
        setMedia(response.data.data);
      } else if (activeTab === "testimonials") {
        const response = await axios.get(`${API_BASE_URL}/api/testimonials`, { headers });
        setTestimonials(response.data.data);
      } else if (activeTab === "team") {
        const response = await axios.get(`${API_BASE_URL}/api/team`, { headers });
        setTeamMembers(response.data.data);
      }
    } catch (error) {
      console.error(`❌ Error fetching ${activeTab}:`, error);
      toast.error(`Failed to fetch ${activeTab}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchData();
  }, [activeTab]);


  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleMediaUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select files to upload");
      return;
    }

    setUploading(true);
    const token = localStorage.getItem("adminToken");

    try {
      if (uploadType === "video" && selectedFiles.length > 1) {
        toast.error("Please upload videos one at a time");
        setUploading(false);
        return;
      }

      if (selectedFiles.length === 1) {
        const formData = new FormData();
        const file = selectedFiles[0];

        formData.append(uploadType === "video" ? "video" : "image", file);
        formData.append("title", file.name.split(".")[0]);
        formData.append(
          "category",
          selectedCategory === "all" ? "other" : selectedCategory
        );

        console.log(`🚀 Uploading ${uploadType} to:`, `${API_BASE_URL}/api/media/${uploadType}`);

        await axios.post(`${API_BASE_URL}/api/media/${uploadType}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        const formData = new FormData();
        selectedFiles.forEach((file) => {
          formData.append("images", file);
        });
        formData.append(
          "category",
          selectedCategory === "all" ? "other" : selectedCategory
        );

        await axios.post(`${API_BASE_URL}/api/media/bulk`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      toast.success("Upload successful!");
      setSelectedFiles([]);
      fetchData();

      const fileInput = document.getElementById("file-upload");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Upload error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 413) {
        const limit = uploadType === "video" ? "50MB" : "10MB";
        toast.error(`File too large! Maximum size is ${limit}`);
      } else {
        toast.error("Upload failed. Please try again.");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleTestimonialSubmit = async () => {
    const formData = new FormData();
    const token = localStorage.getItem("adminToken");

    if (selectedFiles.length > 0) {
      formData.append("image", selectedFiles[0]);
    }

    Object.keys(editForm).forEach((key) => {
      if (editForm[key] !== undefined && key !== "image") {
        formData.append(key, editForm[key]);
      }
    });

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/testimonials/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Testimonial updated!");
      } else {
        await axios.post(`${API_BASE_URL}/api/testimonials`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Testimonial created!");
      }

      setEditForm({});
      setEditingId(null);
      setSelectedFiles([]);
      fetchData();
    } catch (error) {
      console.error("❌ Error saving testimonial:", error);
      toast.error("Failed to save testimonial");
    }
  };


  const handleTeamSubmit = async () => {
    const formData = new FormData();
    const token = localStorage.getItem("adminToken");

    if (selectedFiles.length > 0) {
      formData.append("image", selectedFiles[0]);
    }

    Object.keys(editForm).forEach((key) => {
      if (editForm[key] !== undefined && key !== "image") {
        if (key === "socialLinks") {
          formData.append(key, JSON.stringify(editForm[key]));
        } else {
          formData.append(key, editForm[key]);
        }
      }
    });

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/team/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Team member updated!");
      } else {
        await axios.post(`${API_BASE_URL}/api/team`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Team member created!");
      }

      setEditForm({});
      setEditingId(null);
      setSelectedFiles([]);
      fetchData();
    } catch (error) {
      console.error("❌ Error saving team member:", error);
      toast.error("Failed to save team member");
    }
  };



  const handleDelete = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(`${API_BASE_URL}/api/${type}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Deleted successfully");
      fetchData();
    } catch (error) {
      console.error("❌ Error deleting:", error);
      toast.error("Failed to delete");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditForm({
      title: item.title,
      category: item.category,
      description: item.description || "",
      featured: item.featured,
    });
    if (item.type === "video") {
      setThumbnailTime({ [item.id]: 1 });
    }
  };

  const handleEditTestimonial = (item) => {
    setEditingId(item.id);
    setEditForm({
      name: item.name,
      role: item.role,
      content: item.content,
      rating: item.rating,
      event: item.event || "",
      featured: item.featured,
    });
  };

  const handleEditTeam = (item) => {
    setEditingId(item.id);
    setEditForm({
      name: item.name,
      role: item.role,
      bio: item.bio || "",
      socialLinks: item.socialLinks || {},
    });
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(`${API_BASE_URL}/api/media/${id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Updated successfully");
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error("❌ Error updating:", error);
      toast.error("Failed to update");
    }
  };

  const handleThumbnailTime = async (id, time) => {
    try {
      const token = localStorage.getItem("adminToken");
      const item = media.find((m) => m.id === id);

      if (item && item.type === "video") {
        const urlParts = item.imageUrl.split("/");
        const cloudName = urlParts[urlParts.indexOf("res.cloudinary.com") + 1];

        const videoId = item.cloudinaryId;
        const newThumbnailUrl = `https://res.cloudinary.com/${cloudName}/video/upload/so_${time},w_400,h_400,c_fill,q_auto/${videoId}.jpg`;

        await axios.put(
          `${API_BASE_URL}/api/media/${id}`,
          { thumbnailUrl: newThumbnailUrl },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setMedia((prevMedia) =>
          prevMedia.map((m) =>
            m.id === id ? { ...m, thumbnailUrl: newThumbnailUrl } : m
          )
        );

        toast.success(`Thumbnail updated to ${time}s`);
      }
    } catch (error) {
      toast.error("Failed to update thumbnail");
      console.error("Thumbnail update error:", error);
    }
  };

  const handleThumbnailSliderChange = (id, value) => {
    setThumbnailTime((prev) => ({ ...prev, [id]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-100 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold text-white">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <HiLogout />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary-600 text-white"
                  : "bg-dark-200 text-gray-400 hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Media Tab */}
        {activeTab === "media" && (
          <>
            {/* Upload Section */}
            <div className="bg-dark-200 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-medium text-white mb-4">
                Upload Media
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                {/* Upload Type Toggle */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Type
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setUploadType("image")}
                      className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center gap-2 ${
                        uploadType === "image"
                          ? "bg-primary-600 text-white"
                          : "bg-dark-300 text-gray-400"
                      }`}
                    >
                      <HiPhotograph />
                      Image
                    </button>
                    <button
                      onClick={() => setUploadType("video")}
                      className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center gap-2 ${
                        uploadType === "video"
                          ? "bg-primary-600 text-white"
                          : "bg-dark-300 text-gray-400"
                      }`}
                    >
                      <HiVideoCamera />
                      Video
                    </button>
                  </div>
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  >
                    {categories
                      .filter((cat) => cat.value !== "all")
                      .map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                  </select>
                </div>

                {/* File Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select {uploadType === "video" ? "Video" : "Images"}
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    multiple={uploadType !== "video"}
                    accept={uploadType === "video" ? "video/*" : "image/*"}
                    onChange={handleFileSelect}
                    className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  />
                </div>

                {/* Upload Button */}
                <div className="flex items-end">
                  <button
                    onClick={handleMediaUpload}
                    disabled={uploading || selectedFiles.length === 0}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <HiUpload />
                        Upload{" "}
                        {selectedFiles.length > 0 &&
                          `(${selectedFiles.length})`}
                      </>
                    )}
                  </button>
                </div>
              </div>

              {selectedFiles.length > 0 && (
                <div className="text-sm text-gray-400">
                  Selected: {selectedFiles.map((f) => f.name).join(", ")}
                  <div className="text-xs text-gray-500 mt-1">
                    Max size:{" "}
                    {uploadType === "video"
                      ? "50MB per video"
                      : "10MB per image"}
                  </div>
                </div>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === cat.value
                      ? "bg-primary-600 text-white"
                      : "bg-dark-200 text-gray-400 hover:text-white"
                  }`}
                >
                  {cat.label} (
                  {cat.value === "all"
                    ? media.length
                    : media.filter((m) => m.category === cat.value).length}
                  )
                </button>
              ))}
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {(selectedCategory === "all"
                ? media
                : media.filter((item) => item.category === selectedCategory)
              ).map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  className="bg-dark-200 rounded-lg overflow-hidden group"
                >
                  <div className="aspect-square relative">
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Type Badge */}
                    {item.type === "video" && (
                      <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded-lg flex items-center gap-1">
                        <HiPlay className="text-white text-sm" />
                        <span className="text-white text-xs">Video</span>
                      </div>
                    )}

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
                      >
                        <HiPencilAlt />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, "media")}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                      >
                        <HiTrash />
                      </button>
                    </div>
                  </div>

                  {/* Edit Form */}
                  {editingId === item.id ? (
                    <div className="p-4 space-y-2">
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) =>
                          setEditForm({ ...editForm, title: e.target.value })
                        }
                        className="w-full bg-dark-300 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                        placeholder="Title"
                      />
                      <select
                        value={editForm.category}
                        onChange={(e) =>
                          setEditForm({ ...editForm, category: e.target.value })
                        }
                        className="w-full bg-dark-300 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                      >
                        {categories
                          .filter((cat) => cat.value !== "all")
                          .map((cat) => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                      </select>

                      {/* Video Thumbnail Selector */}
                      {item.type === "video" && (
                        <div className="space-y-2">
                          <label className="text-xs text-gray-400">
                            Thumbnail Time: {thumbnailTime[item.id] || 1}s
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="range"
                              min="0"
                              max="10"
                              step="0.5"
                              value={thumbnailTime[item.id] || 1}
                              onChange={(e) =>
                                handleThumbnailSliderChange(
                                  item.id,
                                  e.target.value
                                )
                              }
                              className="flex-1 h-2 bg-dark-300 rounded-lg appearance-none cursor-pointer slider"
                              style={{
                                background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${
                                  (thumbnailTime[item.id] || 1) * 10
                                }%, #374151 ${
                                  (thumbnailTime[item.id] || 1) * 10
                                }%, #374151 100%)`,
                              }}
                            />
                            <button
                              onClick={() =>
                                handleThumbnailTime(
                                  item.id,
                                  thumbnailTime[item.id] || 1
                                )
                              }
                              className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded text-xs"
                            >
                              Set
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(item.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm flex items-center justify-center gap-1"
                        >
                          <HiCheck className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-sm flex items-center justify-center gap-1"
                        >
                          <HiX className="w-4 h-4" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4">
                      <h3 className="text-white font-medium truncate">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-gray-400 text-sm capitalize">
                          {item.category}
                        </p>
                        <p className="text-gray-500 text-xs flex items-center gap-1">
                          {item.type === "video" ? (
                            <HiVideoCamera />
                          ) : (
                            <HiPhotograph />
                          )}
                          {item.type}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Testimonials Tab */}
        {activeTab === "testimonials" && (
          <>
            {/* Add/Edit Testimonial Form */}
            <div className="bg-dark-200 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-medium text-white mb-4">
                {editingId ? "Edit Testimonial" : "Add New Testimonial"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    placeholder="Client Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    value={editForm.role || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, role: e.target.value })
                    }
                    className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    placeholder="e.g., Bride, CEO"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Event
                  </label>
                  <input
                    type="text"
                    value={editForm.event || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, event: e.target.value })
                    }
                    className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    placeholder="e.g., Wedding Photography"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rating
                  </label>
                  <select
                    value={editForm.rating || 5}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        rating: parseInt(e.target.value),
                      })
                    }
                    className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  >
                    {[5, 4, 3, 2, 1].map((num) => (
                      <option key={num} value={num}>
                        {num} Stars
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Testimonial Content
                  </label>
                  <textarea
                    value={editForm.content || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, content: e.target.value })
                    }
                    className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    placeholder="Client testimonial..."
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Client Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleTestimonialSubmit}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    {editingId ? "Update" : "Add"} Testimonial
                  </button>
                  {editingId && (
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditForm({});
                        setSelectedFiles([]);
                      }}
                      className="ml-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-dark-200 rounded-lg p-6 relative group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {testimonial.imageUrl ? (
                      <img
                        src={testimonial.imageUrl}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center">
                        <span className="text-white text-xl">
                          {testimonial.name[0]}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-white font-medium">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {testimonial.role}
                      </p>
                      {testimonial.event && (
                        <p className="text-primary-400 text-xs mt-1">
                          {testimonial.event}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <HiStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-yellow-500 fill-current"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-300 text-sm line-clamp-3">
                    "{testimonial.content}"
                  </p>

                  {/* Action Buttons */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <button
                      onClick={() => handleEditTestimonial(testimonial)}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded"
                    >
                      <HiPencilAlt className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(testimonial.id, "testimonials")
                      }
                      className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Team Tab */}
        {activeTab === "team" && (
          <>
            {/* Add/Edit Team Member Form */}
            <div className="bg-dark-200 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-medium text-white mb-4">
                {editingId ? "Edit Team Member" : "Add New Team Member"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    placeholder="Team Member Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    value={editForm.role || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, role: e.target.value })
                    }
                    className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    placeholder="e.g., Lead Photographer"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bio
                  </label>
                  <input
                    type="text"
                    value={editForm.bio || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, bio: e.target.value })
                    }
                    className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white"
                    placeholder="Short bio..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={handleTeamSubmit}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    {editingId ? "Update" : "Add"} Team Member
                  </button>
                  {editingId && (
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditForm({});
                        setSelectedFiles([]);
                      }}
                      className="ml-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <motion.div
                  key={member.id}
                  className="bg-dark-200 rounded-lg overflow-hidden group relative"
                >
                  <div className="aspect-square relative">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                        <span className="text-white text-4xl">
                          {member.name[0]}
                        </span>
                      </div>
                    )}

                    {/* Action Buttons Overlay */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEditTeam(member)}
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
                      >
                        <HiPencilAlt />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id, "team")}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                      >
                        <HiTrash />
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-white font-medium text-lg">
                      {member.name}
                    </h3>
                    <p className="text-primary-400">{member.role}</p>
                    {member.bio && (
                      <p className="text-gray-400 text-sm mt-2">{member.bio}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {((activeTab === "media" && media.length === 0) ||
          (activeTab === "testimonials" && testimonials.length === 0) ||
          (activeTab === "team" && teamMembers.length === 0)) && (
          <div className="text-center py-12">
            <HiPhotograph className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">
              No {activeTab} yet. Add some to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
