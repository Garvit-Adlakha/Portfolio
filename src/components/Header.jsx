import { Navbar } from "./Navbar";
import { useState } from "react";
import { Link } from "react-scroll";
import ResponsiveImage from "./ResponsiveImage";

const Header = ({setAnimationName} ) => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full h-20 flex items-center z-40 bg-gradient-to-b from-zinc-900 to-zinc-900/0">
      <div className="max-w-screen-2xl w-full mx-auto px-4 flex justify-between items-center md:px-6 md:grid md:grid-cols-[1fr,3fr,1fr]">
        <h1>
          <a href="/" className="logo">
            <ResponsiveImage
              src="/images/avatar.webp"
              alt="Garvit Adlakha Logo"
              className="h-10 w-auto"
              imageType="avatar"
              variant="default"
              sizes="40px"
              priority={true}
            />
          </a>
        </h1>
        <div className="relative md:justify-self-center">
          <button
            className="menu-btn md:hidden"
            onClick={() => setNavOpen((prev)=> !prev)}
          >
            <span className="material-symbols-outlined">
              {navOpen ? 'close': 'menu'}
              </span>
          </button>
          <Navbar navOpen={navOpen} setAnimationName={setAnimationName} />
        </div>
        <Link
          to="contact"
          spy={true}
          smooth={true}
          duration={500}
          className="btn btn-secondary max-md:hidden md:justify-self-end transition ring-1 ring-inset ring-zinc-900 shadow-xl hover:shadow-md active:shadow-inner"
          onPointerOver={() => setAnimationName('salute')}
          onPointerOut={() => setAnimationName("idle")}
        >
          Contact me
        </Link>
      </div>
    </header>
  );
};

export default Header;
