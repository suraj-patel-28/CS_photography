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
  // Initialize as empty array to prevent undefined errors
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDefaultTeam = useCallback(() => [
    {
      id: 1,
      name: "John Smith",
      role: "Lead Photographer",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      bio: "15+ years capturing moments",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Creative Director",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      bio: "Visionary behind our aesthetic",
    },
    {
      id: 3,
      name: "Mike Chen",
      role: "Videographer",
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      bio: "Master of cinematic storytelling",
    },
  ], []);

  const fetchTeamMembers = useCallback(async () => {
    try {
      setLoading(true);
      // Use environment variable for API URL
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://csphotography-backend.onrender.com';
      const response = await axios.get(`${API_BASE_URL}/api/team`);
      
      // Safely access the response data
      const teamData = response?.data?.data || response?.data || [];
      
      if (Array.isArray(teamData) && teamData.length > 0) {
        setTeamMembers(teamData);
      } else {
        // Use default team if no data from API
        setTeamMembers(getDefaultTeam());
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
      // Always fallback to default team on error
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

      {/* Team Section - FIXED: Added safe array check */}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.isArray(teamMembers) && teamMembers.map((member, index) => (
                <motion.div
                  key={member?.id || index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl mb-4">
                    {member?.imageUrl ? (
                      <LazyLoadImage
                        src={member.imageUrl}
                        alt={member?.name || 'Team Member'}
                        effect="blur"
                        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-80 bg-gradient-to-br from-primary-400 to-purple-400 flex items-center justify-center">
                        <span className="text-white text-6xl font-display">
                          {member?.name ? member.name[0] : 'T'}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-1">
                    {member?.name || 'Team Member'}
                  </h3>
                  <p className="text-primary-400 mb-2">{member?.role || 'Professional'}</p>
                  {member?.bio && (
                    <p className="text-gray-400 text-sm">{member.bio}</p>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Show message if no team members */}
          {!loading && (!Array.isArray(teamMembers) || teamMembers.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading team information...</p>
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