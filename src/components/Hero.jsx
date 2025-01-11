import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei"; // Correct import
import Developer from "./Developer"; // Ensure Developer is implemented correctly
import CanvasLoader from "./CanvasLoader"; // Import or define this component
import PropTypes from "prop-types";
const Hero = ({animationName}) => {
  return (
    <section id="Home" className="pt-28 lg:pt-20">
      <div className="container  items-center lg:grid lg:grid-cols-2 lg:gap-10">
        <div className="">
          <div className="flex items-center gap-3">
            <figure className="img-box w-9 h-9 rounded-lg">
              <img
                src="/images/avatar-1.jpg"
                width={40}
                height={40}
                alt="Garvit Adlakha's portrait"
                className="img-cover"
              />
            </figure>
            <div className="flex items-center gap-1.5 text-zinc-400 text-sm tracking-wide">
              <span className="relative w-2 h-2 rounded-full bg-emerald-400">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping"></span>
              </span>
              Available for work
            </div>
          </div>
          <h2 className="headline-1 max-w-[15ch] sm:max-w-[20ch] lg:max-w-[15ch] mt-5 mb-8 lg:mb-10">
            Building Scalable Modern Websites for the future.
          </h2>
          <div className="flex items-center gap-3">
            ButtonPrimary 
            
            ButtonOutline</div>
        </div>
        <div className="canvas hidden  lg:block">
          <Canvas className="w-full max-w-[480px] ml-auto bg-gradient-to-t from-sky-400 vi 25% via-sky-400/40 to-65% rounded-[60px] overflow-hidden ">
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} />
            <Suspense fallback={<CanvasLoader />}>
              <Developer position-y={-3} scale={3} animationName={animationName}/>
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
};
Hero.propTypes = {
  animationName: PropTypes.string.isRequired,
}

export default Hero;
