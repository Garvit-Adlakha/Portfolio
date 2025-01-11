import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

export const Navbar = ({ navOpen, setAnimationName }) => {
  const lastActiveLink = useRef(null);
  const activeBox = useRef(null);

  const navItems = [
    { label: "Home", link: "#home", className: "nav-link active", animation: "idle" },
    { label: "About", link: "#about", className: "nav-link", animation: "idle" },
    { label: "Work", link: "#work", className: "nav-link", animation: "idle" },
    { label: "Reviews", link: "#reviews", className: "nav-link", animation: "idle" },
    { label: "Contact", link: "#contact", className: "nav-link md:hidden md:block", animation: "victory" },
  ];

  const initActiveBox = () => {
    if (lastActiveLink.current && activeBox.current) {
      activeBox.current.style.top = `${lastActiveLink.current.offsetTop}px`;
      activeBox.current.style.left = `${lastActiveLink.current.offsetLeft}px`;
      activeBox.current.style.width = `${lastActiveLink.current.offsetWidth}px`;
      activeBox.current.style.height = `${lastActiveLink.current.offsetHeight}px`;
    }
  };

  const activeCurrentLink = (event) => {
    if (lastActiveLink.current) {
      lastActiveLink.current.classList.remove("active");
    }
    event.target.classList.add("active");
    lastActiveLink.current = event.target;
    initActiveBox();
  };

  useEffect(() => {
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) {
      homeLink.classList.add("active");
      lastActiveLink.current = homeLink;
      initActiveBox();
    }
    initActiveBox();
    window.addEventListener("resize", initActiveBox);

    return () => {
      window.removeEventListener("resize", initActiveBox);
    };
  }, []);

  return (
    <nav className={`navbar ${navOpen ? "active" : ""}`}>
      {navItems.map(({ label, link, className, animation }, key) => (
        <a
          href={link}
          key={key}
          className={className}
          onClick={(event) => {
            console.log('Link clicked:', label); // Add this to verify click
            activeCurrentLink(event);
            console.log('Setting animation to:', animation.toLowerCase());
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
