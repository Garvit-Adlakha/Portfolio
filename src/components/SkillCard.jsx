
import PropTypes from "prop-types";

const SkillCard = ({ imgSrc, label, desc }) => {
  return (
    <div 
      className="group relative flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-zinc-800/40 to-zinc-900/40 backdrop-blur-sm border border-zinc-700/50 hover:border-zinc-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/5 hover:-translate-y-1"
    >
      {/* Subtle glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      
      {/* Icon Container */}
      <div 
        className="relative flex-shrink-0 w-14 h-14 p-3 rounded-xl bg-gradient-to-br from-zinc-700/60 to-zinc-800/60 border border-zinc-600/30 group-hover:border-zinc-500/50 transition-all duration-200"
      >
        {/* Icon glow background */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        
        <img
          src={imgSrc}
          alt={label}
          className="relative z-10 w-full h-full object-contain group-hover:brightness-110 transition-all duration-200"
          onError={(e) => {
            console.log('Icon failed to load:', imgSrc);
            e.target.style.display = 'none';
          }}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-grow min-w-0">
        <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors duration-200 tracking-tight">
          {label}
        </h3>
        <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-200 mt-0.5">
          {desc}
        </p>
      </div>
    </div>
  );
};

SkillCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default SkillCard;