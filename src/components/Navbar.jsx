import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const Navbar = ({ navOpen, setAnimationName }) => {
  const lastActiveLink = useRef(null);
  const activeBox = useRef(null);
  const [activeSection, setActiveSection] = useState("home"); // State to track the active section

  const navItems = [
    { label: "Home", link: "#home", className: "nav-link", animation: "idle" },
    { label: "About", link: "#about", className: "nav-link", animation: "idle" },
    { label: "Work", link: "#work", className: "nav-link", animation: "idle" },
    { label: "Contact", link: "#contact", className: "nav-link md:hidden md:block", animation: "salute" },
  ];

  // Initialize the active box position
  const initActiveBox = () => {
    if (lastActiveLink.current && activeBox.current) {
      activeBox.current.style.top = `${lastActiveLink.current.offsetTop}px`;
      activeBox.current.style.left = `${lastActiveLink.current.offsetLeft}px`;
      activeBox.current.style.width = `${lastActiveLink.current.offsetWidth}px`;
      activeBox.current.style.height = `${lastActiveLink.current.offsetHeight}px`;
    }
  };

  // Handle link click
  const activeCurrentLink = (event) => {
    if (lastActiveLink.current) {
      lastActiveLink.current.classList.remove("active");
    }
    event.target.classList.add("active");
    lastActiveLink.current = event.target;
    initActiveBox();
  };

  // Set up Intersection Observer to detect active section
  useEffect(() => {
    const observerOptions = {
      root: null, // Use the viewport as the root
      rootMargin: "0px",
      threshold: 0.5, // Trigger when 50% of the section is visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId); // Update the active section state
        }
      });

      // Check if the user has scrolled to the very top of the page
      if (window.scrollY === 0) {
        setActiveSection("home"); // Set "home" as the active section
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    navItems.forEach(({ link }) => {
      const section = document.querySelector(link);
      if (section) {
        observer.observe(section);
      }
    });

    // Add a scroll event listener to detect when the user scrolls to the top
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setActiveSection("home"); 
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup observer and scroll listener on unmount
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navItems]);

  // Update the active link and box when the active section changes
  useEffect(() => {
    const activeLink = document.querySelector(`a[href="#${activeSection}"]`);
    if (activeLink) {
      if (lastActiveLink.current) {
        lastActiveLink.current.classList.remove("active");
      }
      activeLink.classList.add("active");
      lastActiveLink.current = activeLink;
      initActiveBox();
    }
  }, [activeSection]);

  // Initialize the active box on mount
  useEffect(() => {
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
      homeLink.classList.add("active");
      lastActiveLink.current = homeLink;
      initActiveBox();
    }
  }, []);

  return (
    <nav className={`navbar ${navOpen ? "active" : ""}`}>
      {navItems.map(({ label, link, className, animation }, key) => (
        <a
          href={link}
          key={key}
          className={className}
          onClick={(event) => {
            activeCurrentLink(event);
            setAnimationName(animation.toLowerCase());
          }}
          onPointerOver={() => setAnimationName(animation.toLowerCase())}
          onPointerOut={() => setAnimationName("idle")}
        >
          {label}
        </a>
      ))}
      <div className="active-box" ref={activeBox}></div>
    </nav>
  );
};

Navbar.propTypes = {
  navOpen: PropTypes.bool.isRequired,
  setAnimationName: PropTypes.func.isRequired,
};