import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';
import { 
  HiPhotograph, 
  HiUpload, 
  HiTrash, 
  HiPencilAlt,
  HiX,
  HiCheck,
  HiLogout,
  HiVideoCamera,
  HiPlay
} from 'react-icons/hi';

const Dashboard = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadType, setUploadType] = useState('image'); // 'image' or 'video'
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [thumbnailTime, setThumbnailTime] = useState({});

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'portrait', label: 'Portrait' },
    { value: 'event', label: 'Event' },
    { value: 'nature', label: 'Nature' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('/api/media', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMedia(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch media');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    setUploading(true);
    const token = localStorage.getItem('adminToken');

    try {
      if (uploadType === 'video' && selectedFiles.length > 1) {
        toast.error('Please upload videos one at a time');
        setUploading(false);
        return;
      }

      if (selectedFiles.length === 1) {
        // Single file upload
        const formData = new FormData();
        const file = selectedFiles[0];
        
        formData.append(uploadType === 'video' ? 'video' : 'image', file);
        formData.append('title', file.name.split('.')[0]);
        formData.append('category', selectedCategory === 'all' ? 'other' : selectedCategory);

        await axios.post(`/api/media/${uploadType}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        // Bulk upload (only for images)
        const formData = new FormData();
        selectedFiles.forEach(file => {
          formData.append('images', file);
        });
        formData.append('category', selectedCategory === 'all' ? 'other' : selectedCategory);

        await axios.post('/api/media/bulk', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      toast.success('Upload successful!');
      setSelectedFiles([]);
      fetchMedia();
      
      // Clear file input
      const fileInput = document.getElementById('file-upload');
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Upload error:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 413) {
        const limit = uploadType === 'video' ? '50MB' : '10MB';
        toast.error(`File too large! Maximum size is ${limit}`);
      } else {
        toast.error('Upload failed. Please try again.');
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/media/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Deleted successfully');
      setMedia(media.filter(item => item.id !== id));
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditForm({
      title: item.title,
      category: item.category,
      description: item.description || '',
      featured: item.featured
    });
    // Initialize thumbnail time to 1 second for videos
    if (item.type === 'video') {
      setThumbnailTime({ [item.id]: 1 });
    }
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`/api/media/${id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Updated successfully');
      setEditingId(null);
      fetchMedia();
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const handleThumbnailTime = async (id, time) => {
    try {
      const token = localStorage.getItem('adminToken');
      const item = media.find(m => m.id === id);
      
      if (item && item.type === 'video') {
        // Extract cloud name from the current image URL
        const urlParts = item.imageUrl.split('/');
        const cloudName = urlParts[urlParts.indexOf('res.cloudinary.com') + 1];
        
        // Update thumbnail URL with new timestamp
        const videoId = item.cloudinaryId;
        const newThumbnailUrl = `https://res.cloudinary.com/${cloudName}/video/upload/so_${time},w_400,h_400,c_fill,q_auto/${videoId}.jpg`;
        
        await axios.put(`/api/media/${id}`, 
          { thumbnailUrl: newThumbnailUrl }, 
          { headers: { Authorization: `Bearer ${token}` }}
        );
        
        // Update local state immediately for instant feedback
        setMedia(prevMedia => 
          prevMedia.map(m => 
            m.id === id ? { ...m, thumbnailUrl: newThumbnailUrl } : m
          )
        );
        
        toast.success(`Thumbnail updated to ${time}s`);
      }
    } catch (error) {
      toast.error('Failed to update thumbnail');
      console.error('Thumbnail update error:', error);
    }
  };

  const handleThumbnailSliderChange = (id, value) => {
    setThumbnailTime(prev => ({ ...prev, [id]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin';
  };

  const filteredMedia = selectedCategory === 'all' 
    ? media 
    : media.filter(item => item.category === selectedCategory);

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
            Media Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <HiLogout />
            Logout
          </button>
        </div>

        {/* Upload Section */}
        <div className="bg-dark-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-medium text-white mb-4">Upload Media</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Upload Type Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Type
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setUploadType('image')}
                  className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center gap-2 ${
                    uploadType === 'image' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-dark-300 text-gray-400'
                  }`}
                >
                  <HiPhotograph />
                  Image
                </button>
                <button
                  onClick={() => setUploadType('video')}
                  className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center gap-2 ${
                    uploadType === 'video' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-dark-300 text-gray-400'
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
                {categories.filter(cat => cat.value !== 'all').map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* File Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select {uploadType === 'video' ? 'Video' : 'Images'}
              </label>
              <input
                id="file-upload"
                type="file"
                multiple={uploadType !== 'video'}
                accept={uploadType === 'video' ? 'video/*' : 'image/*'}
                onChange={handleFileSelect}
                className="w-full bg-dark-300 border border-gray-600 rounded-lg px-4 py-2 text-white"
              />
            </div>

            {/* Upload Button */}
            <div className="flex items-end">
              <button
                onClick={handleUpload}
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
                    Upload {selectedFiles.length > 0 && `(${selectedFiles.length})`}
                  </>
                )}
              </button>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div className="text-sm text-gray-400">
              Selected: {selectedFiles.map(f => f.name).join(', ')}
              <div className="text-xs text-gray-500 mt-1">
                Max size: {uploadType === 'video' ? '50MB per video' : '10MB per image'}
              </div>
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedCategory === cat.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-200 text-gray-400 hover:text-white'
              }`}
            >
              {cat.label} ({cat.value === 'all' ? media.length : media.filter(m => m.category === cat.value).length})
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMedia.map((item) => (
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
                {item.type === 'video' && (
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
                    onClick={() => handleDelete(item.id)}
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
                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                    className="w-full bg-dark-300 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                    placeholder="Title"
                  />
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                    className="w-full bg-dark-300 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                  >
                    {categories.filter(cat => cat.value !== 'all').map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                  
                  {/* Video Thumbnail Selector */}
                  {item.type === 'video' && (
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
                          onChange={(e) => handleThumbnailSliderChange(item.id, e.target.value)}
                          className="flex-1 h-2 bg-dark-300 rounded-lg appearance-none cursor-pointer slider"
                          style={{
                            background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${(thumbnailTime[item.id] || 1) * 10}%, #374151 ${(thumbnailTime[item.id] || 1) * 10}%, #374151 100%)`
                          }}
                        />
                        <button
                          onClick={() => handleThumbnailTime(item.id, thumbnailTime[item.id] || 1)}
                          className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded text-xs"
                        >
                          Set
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">Drag slider to select thumbnail time (0-10 seconds)</p>
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
                  <h3 className="text-white font-medium truncate">{item.title}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-gray-400 text-sm capitalize">{item.category}</p>
                    <p className="text-gray-500 text-xs flex items-center gap-1">
                      {item.type === 'video' ? <HiVideoCamera /> : <HiPhotograph />}
                      {item.type}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {filteredMedia.length === 0 && (
          <div className="text-center py-12">
            <HiPhotograph className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No media in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;