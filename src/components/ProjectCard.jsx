import PropTypes from "prop-types";

const ProjectCard = ({ imgSrc, title, tags, projectLink, classes }) => {
  return (
    <div
      className={`relative p-4 rounded-2xl bg-zinc-800/50 hover:bg-zinc-700/50 active:bg-zinc-700/60 ring-1 ring-inset ring-zinc-50/5 transition-colors shadow-lg ${classes}`}
    >
      {/* Image Section */}
      <figure className="aspect-square rounded-lg mb-4 overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Content Section */}
      <div className="flex items-center justify-between gap-4">
        {/* Title and Tags */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
          <div className="flex flex-wrap items-center gap-2">
            {tags.map((label, key) => (
              <span
                key={key}
                className="h-8 px-3 text-sm font-medium text-zinc-400 bg-zinc-50/5 grid items-center rounded-lg"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Icon Section */}
        <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-[#90AEAD] text-zinc-950 shrink-0">
          <span
            className="material-symbols-rounded text-lg leading-none"
            aria-hidden="true"
          >
            arrow_outward
          </span>
        </div>
      </div>

      {/* Link Overlay */}
      <a
        href={projectLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0"
        title={`View details about ${title}`}
      ></a>
    </div>
  );
};

ProjectCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  projectLink: PropTypes.string,
  classes: PropTypes.string,
};

ProjectCard.defaultProps = {
  projectLink: "#",
  classes: "",
};

export default ProjectCard;
