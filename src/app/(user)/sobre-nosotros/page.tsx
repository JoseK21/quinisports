import React from "react";

import HomeHeader from "@/components/quinisports/headers/HomeHeader";
import AboutSectionOne from "@/components/pages/home/About/AboutSectionOne";
import Brands from "@/components/pages/home/Brands";
import ScrollUp from "@/components/pages/home/Common/ScrollUp";
import Contact from "@/components/pages/home/Contact";
import Features from "@/components/pages/home/Features";
import Hero from "@/components/pages/home/Hero";
import Testimonials from "@/components/pages/home/Testimonials";
import Video from "@/components/pages/home/Video";

const Page = () => {
  return (
    <main>
      <HomeHeader />
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <Brands />
      <AboutSectionOne />
      {/* <AboutSectionTwo /> */}
      <Testimonials />
      {/* <Pricing /> */}
      {/* <Blog /> */}
      <Contact />
    </main>
  );
};

export default Page;
