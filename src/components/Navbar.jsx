import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-scroll";

export const Navbar = ({ navOpen, setAnimationName }) => {
  const activeBox = useRef(null);
  const navRef = useRef(null);

  const navItems = [
    { label: "Home", to: "home", animation: "idle" },
    { label: "About", to: "about", animation: "idle" },
    { label: "Work", to: "work", animation: "idle" },
    { label: "Contact", to: "contact", className: "md:hidden", animation: "salute" },
  ];

  const updateActiveBox = (to) => {
    const targetLink = navRef.current.querySelector(`a[to="${to}"]`);
    if (targetLink && activeBox.current) {
      activeBox.current.style.top = `${targetLink.offsetTop}px`;
      activeBox.current.style.left = `${targetLink.offsetLeft}px`;
      activeBox.current.style.width = `${targetLink.offsetWidth}px`;
      activeBox.current.style.height = `${targetLink.offsetHeight}px`;
      activeBox.current.style.opacity = "1";
      activeBox.current.style.transform = "scale(1)";
    }
  };
  
  useEffect(() => {
    // Set the initial position for the home link
    updateActiveBox('home');
  }, []);


  return (
    <nav className={`navbar ${navOpen ? "active" : ""}`} ref={navRef}>
      {navItems.map(({ label, to, className, animation }) => (
        <Link
          key={to}
          to={to}
          spy={true}
          smooth={true}
          duration={500}
          className={`nav-link cursor-pointer ${className || ''}`}
          onSetActive={updateActiveBox}
          onPointerOver={() => setAnimationName(animation.toLowerCase())}
          onPointerOut={() => setAnimationName("idle")}
        >
          {label}
        </Link>
      ))}
      <div
        className="active-box"
        ref={activeBox}
      ></div>
    </nav>
  );
};

Navbar.propTypes = {
  navOpen: PropTypes.bool.isRequired,
  setAnimationName: PropTypes.func.isRequired,
};