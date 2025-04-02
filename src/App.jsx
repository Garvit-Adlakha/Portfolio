import { BrowserRouter as Router } from 'react-router-dom';

import { useState, useEffect, lazy } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const Header=lazy(()=>import("./components/Header"));
const Hero=lazy(()=>import("./components/Hero"));
const About=lazy(()=>import("./components/About"));
const Skills=lazy(()=>import("./components/Skills"));
const Work=lazy(()=>import("./components/Work"));
const Contact=lazy(()=>import("./components/Contact"));
const Footer=lazy(()=>import("./components/Footer"));



gsap.registerPlugin(ScrollTrigger);

function App() {
  const [animationName, setAnimationName] = useState("idle");

  useEffect(() => {
    const elements = gsap.utils.toArray(".reveal-up");
    elements.forEach((element) => {
      gsap.fromTo(
        element,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%", // Trigger when element enters 80% of the viewport
            end: "bottom 20%", // Trigger until element leaves 20% of the viewport
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <Router>
      <ReactLenis root>
        <Header setAnimationName={setAnimationName} />
        <main>
          <Hero animationName={animationName} />
          <About />
          <Skills />
          <Work />
          <Contact />
        </main>
        <Footer />
      </ReactLenis>
    </Router>
  );
}

export default App;
