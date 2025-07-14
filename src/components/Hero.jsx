import { useState, lazy } from "react";
import Modal from "react-modal";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import PropTypes from "prop-types";
import { ButtonPrimary } from "./Button";
import { Link } from "react-scroll";
import ResponsiveImage from "./ResponsiveImage";

const Developer = lazy(() => import("./Developer"));
const CanvasLoader = lazy(() => import("./CanvasLoader"));

// Ensure the modal is accessible
Modal.setAppElement('#root'); // Assuming your root element has the id 'root'

const Hero = ({ animationName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section id="home" className="pt-28 lg:pt-20 bg-[#244855]">
      <div className="container items-center lg:grid lg:grid-cols-2 lg:gap-10">
        <div className="">
          <div className="flex items-center gap-3 reveal-up">
            <figure className="img-box w-10 h-10 rounded-lg cursor-pointer" onClick={openModal}>
              <ResponsiveImage
                src="/images/photo.webp"
                alt="Garvit Adlakha's portrait"
                className="img-cover bg-[#244855]"
                imageType="photo"
                variant="thumb"
                sizes="40px"
                priority={true}
              />
            </figure>
            <div className="flex items-center gap-1.5 text-zinc-400 text-sm tracking-wide">
              <span className="relative w-2 h-2 rounded-full bg-emerald-400">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping"></span>
              </span>
              Available for work
            </div>
          </div>
          <h2 className="headline-1 max-w-[15ch] sm:max-w-[20ch] lg:max-w-[15ch] mt-5 mb-8 lg:mb-10 reveal-up">
Crafting Digital Experiences, from Concept to Code.
</h2>

          <div className="flex items-center gap-3">
          <ButtonPrimary
           label="Download CV"
           icon="download"
           href="https://drive.google.com/file/d/1aZsumuY9o2H__W-hLXwcgGQ16CVwt1Fv/view?usp=sharing"
           target="_blank"
           rel="noopener noreferrer"
           className="material-symbols-outlined btn btn-primary "
            />

            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className="btn btn-outline cursor-pointer"
            >
              More About Me
              <span className="material-symbols-outlined" aria-hidden="true">
                arrow_downward
              </span>
            </Link>
          </div>
        </div>
        <div className="canvas hidden lg:block reveal-up">
          <Canvas className="w-full max-w-[480px] ml-auto bg-gradient-to-t from-zinc-800/25 via-zinc-800/50 to-65% rounded-[60px] overflow-hidden">
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
            <Suspense fallback={<CanvasLoader />}>
              <Developer position-y={-3} scale={3} animationName={animationName} />
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* Modal for enlarged image */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Enlarged Image"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="flex justify-center items-center h-full">
          <ResponsiveImage
            src="/images/photo.webp"
            alt="Garvit Adlakha's portrait"
            className="max-w-full max-h-full"
            imageType="photo"
            variant="large"
            sizes="(max-width: 768px) 90vw, 60vw"
          />
        </div>
        <button onClick={closeModal} className="close-button material-symbols-outlined">
          Close
        </button>
      </Modal>
    </section>
  );
};

Hero.propTypes = {
  animationName: PropTypes.string.isRequired,
};

export default Hero;