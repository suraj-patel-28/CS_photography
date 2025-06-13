import React from "react";
import Hero from "../components/home/Hero";
import FeaturedWork from "../components/home/FeaturedWork";
import Services from "../components/home/Services";
import Testimonials from "../components/home/Testimonials";

const Home = () => {
  return (
    <main>
      <Hero />
      <FeaturedWork />
      <Services />
      <Testimonials />
    </main>
  );
};

export default Home;
