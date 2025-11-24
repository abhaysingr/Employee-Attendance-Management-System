import "./App.css";

// Components
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LogoCarousel from "./components/LogoCarousel";
import Navbar from "./components/Navbar";
import PricingCards from "./components/PricingCards";
// import ProjectManagement from "./components/ProjectManagement";
import SocialMediaSection from "./components/SocialMediaSection";
// import TestimonialCards from "./components/TestimonialCards";
import WorkEverywhere from "./components/WorkEverywhere";
// import WorkWithApps from "./components/WorkWithApps";
import Service from "./components/Service";
import About from "./components/About";
import Contact from "./components/Contact";
import CookieConsent from "./components/CookieConsent";

function App() {
  return (
    <div>
      <Navbar />
      <CookieConsent />
      <HeroSection />
      <Service/>
      <About/>
      <PricingCards />
      <WorkEverywhere />
      <LogoCarousel />
      {/* <WorkWithApps /> */}
      {/* <TestimonialCards /> */}
      {/* <ProjectManagement /> */}
      <CallToAction />
      <Contact/>
      <Footer />
      <SocialMediaSection />
    </div>
  );
}


export default App;
