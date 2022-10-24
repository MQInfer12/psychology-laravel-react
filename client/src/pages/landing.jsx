import React from "react";
import FirstSection from "../components/landing/firstSection";
import Footer from "../components/landing/footer";
import Navbar from "../components/landing/navbar";
import SecondSection from "../components/landing/secondSection";
import ThirdSection from "../components/landing/thirdSection";

const Landing = () => {
  return (
    <>
      <Navbar />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <Footer />
    </>
  )
}

export default Landing;