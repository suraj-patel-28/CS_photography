import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  HiCamera,
  HiLightningBolt,
  HiHeart,
  HiSparkles,
  HiCheckCircle,
} from "react-icons/hi";
import axios from "axios";
import "react-lazy-load-image-component/src/effects/blur.css";

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDefaultTeam = useCallback(() => [
    {
      id: 1,
      name: "Robo",
      role: "Photographer",
      imageUrl:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80",
      bio: "AI-powered photography assistant",
    },
  ], []);

  const fetchTeamMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://csphotography-backend.onrender.com';
      
      console.log('Fetching team members from:', `${API_BASE_URL}/api/team`);
      
      const response = await axios.get(`${API_BASE_URL}/api/team`, {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('API Response:', response.data);
      
      // More flexible response handling
      let teamData = [];
      
      if (response.data) {
        // Try different possible response structures
        if (Array.isArray(response.data)) {
          teamData = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          teamData = response.data.data;
        } else if (response.data.team && Array.isArray(response.data.team)) {
          teamData = response.data.team;
        } else if (response.data.members && Array.isArray(response.data.members)) {
          teamData = response.data.members;
        }
      }
      
      console.log('Processed team data:', teamData);
      
      if (teamData.length > 0) {
        // Validate that each team member has required fields
        const validTeamData = teamData.filter(member => 
          member && (member.name || member.title) // At least name or title should exist
        );
        
        if (validTeamData.length > 0) {
          setTeamMembers(validTeamData);
          console.log('Using API team data');
        } else {
          console.log('API data exists but no valid team members found, using default');
          setTeamMembers(getDefaultTeam());
        }
      } else {
        console.log('No team data in API response, using default');
        setTeamMembers(getDefaultTeam());
      }
      
    } catch (error) {
      console.error("Error fetching team members:", error);
      setError(error.message);
      
      // Only use default team if there's an actual error
      console.log('API call failed, using default team');
      setTeamMembers(getDefaultTeam());
    } finally {
      setLoading(false);
    }
  }, [getDefaultTeam]);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  const values = [
    {
      icon: <HiCamera />,
      title: "Creative Excellence",
      description:
        "We push creative boundaries to deliver unique and stunning visuals.",
    },
    {
      icon: <HiLightningBolt />,
      title: "Professional Service",
      description: "Timely delivery and professional conduct in every project.",
    },
    {
      icon: <HiHeart />,
      title: "Passionate Team",
      description: "Our love for photography shows in every shot we take.",
    },
    {
      icon: <HiSparkles />,
      title: "Attention to Detail",
      description: "Every detail matters in creating the perfect photograph.",
    },
  ];

  return (
    <main className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LazyLoadImage
            src="https://images.unsplash.com/photo-1614108831136-a6bba175a08e?w=800&q=80"
            alt="About hero"
            effect="blur"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              About <span className="text-primary-400">CSphotography</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              We're a team of passionate photographers and videographers
              dedicated to telling your story through captivating visuals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Our Story Begins With{" "}
                <span className="text-primary-400">Passion</span>
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2014, CSphotography emerged from a simple belief:
                  every moment deserves to be captured with artistry and
                  authenticity. What started as a small studio has grown into a
                  full-service photography and videography company.
                </p>
                <p>
                  Over the years, we've had the privilege of documenting
                  hundreds of weddings, corporate events, and personal
                  milestones. Each project has taught us that behind every
                  photograph is a unique story waiting to be told.
                </p>
                <p>
                  Today, our team combines technical expertise with creative
                  vision to deliver images and videos that not only capture
                  moments but evoke emotions and preserve memories for
                  generations to come.
                </p>
              </div>

              {/* Achievements */}
              <div className="mt-8 space-y-3">
                {[
                  "Award-winning photography team",
                  "Published in major wedding magazines",
                  "Certified professional photographers",
                  "State-of-the-art equipment and techniques",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <HiCheckCircle className="text-primary-400 text-xl flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <LazyLoadImage
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80"
                alt="Our studio"
                effect="blur"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary-500/20 rounded-2xl blur-3xl" />
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-purple-500/20 rounded-2xl blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Our Core <span className="text-primary-400">Values</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              These principles guide everything we do and ensure we deliver
              exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-dark-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Meet Our <span className="text-primary-400">Team</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The creative minds behind every stunning photograph and video
            </p>
            
            {/* Debug info - remove in production */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg text-left text-sm">
                <p className="text-yellow-400">Debug Info:</p>
                <p className="text-gray-300">Team members count: {teamMembers.length}</p>
                <p className="text-gray-300">Loading: {loading ? 'Yes' : 'No'}</p>
                {error && <p className="text-red-400">Error: {error}</p>}
                <p className="text-gray-300">API URL: {process.env.REACT_APP_API_URL || 'https://csphotography-backend.onrender.com'}</p>
              </div>
            )}
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-800 h-80 rounded-2xl mb-4"></div>
                  <div className="h-6 bg-gray-800 rounded mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 max-w-md mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member?.id || index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl mb-4">
                    {member?.imageUrl || member?.image ? (
                      <LazyLoadImage
                        src={member.imageUrl || member.image}
                        alt={member?.name || member?.title || 'Team Member'}
                        effect="blur"
                        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-80 bg-gradient-to-br from-primary-400 to-purple-400 flex items-center justify-center">
                        <span className="text-white text-6xl font-display">
                          {(member?.name || member?.title || 'T')[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-1">
                    {member?.name || member?.title || 'Team Member'}
                  </h3>
                  <p className="text-primary-400 mb-2">
                    {member?.role || member?.position || 'Professional'}
                  </p>
                  {(member?.bio || member?.description) && (
                    <p className="text-gray-400 text-sm">
                      {member.bio || member.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Show message if no team members */}
          {!loading && teamMembers.length === 0 && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80"
                    alt="Robo - AI Photographer"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-medium mb-1">Robo</h3>
                    <p className="text-primary-400 mb-2">Photographer</p>
                    <p className="text-gray-300 text-sm">AI-powered photography assistant</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 mt-4">Our AI photographer is ready to assist you!</p>
              {error && (
                <p className="text-red-400 mt-2 text-sm">Unable to load team data: {error}</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Ready to Create Something{" "}
              <span className="text-primary-400">Amazing</span>?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Let's work together to capture your special moments and create
              lasting memories.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default About;