import { cn } from "../libs/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";
import ResponsiveImage from "./ResponsiveImage";

export const HoverEffect = ({
  items,
  className
}) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10", className)}>
      {items.map((item, idx) => (
        <div
          key={item?.projectLink}
          className="relative group h-full w-full transition-transform duration-200 hover:-translate-y-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-3xl blur-sm"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              />
            )}
          </AnimatePresence>
          <a
            href={item.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full w-full"
          >
            <Card>
              {/* Image Container with Overlay */}
              <div className="relative w-full h-56 overflow-hidden rounded-xl mb-6 group-hover:shadow-xl transition-shadow duration-200">
                <ResponsiveImage
                  src={item.imgSrc}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  imageType="project"
                  variant="card"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                
                {/* Project Link Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>

              {/* Content Section */}
              <div className="space-y-4">
                <CardTitle>{item.title}</CardTitle>
                <CardTags tags={item.tags} />
              </div>
            </Card>
          </a>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "relative h-full w-full p-6 rounded-2xl bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-zinc-700/50 transition-all duration-200 group-hover:border-zinc-500/50 group-hover:shadow-xl group-hover:shadow-cyan-500/5",
        className
      )}
    >
      {/* Glass Effect Border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children
}) => {
  return (
    <h3 className={cn(
      "text-xl font-bold text-zinc-100 leading-tight tracking-tight group-hover:text-white transition-colors duration-200",
      className
    )}>
      {children}
    </h3>
  );
};

export const CardDescription = ({
  className,
  children
}) => {
  return (
    <p
      className={cn(
        "text-zinc-400 leading-relaxed text-sm group-hover:text-zinc-300 transition-colors duration-200",
        className
      )}
    >
      {children}
    </p>
  );
};

export const CardTags = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-zinc-700/80 to-zinc-800/80 text-zinc-300 rounded-full border border-zinc-600/50 backdrop-blur-sm transition-all duration-200 hover:from-cyan-500/20 hover:to-blue-500/20 hover:border-cyan-400/50 hover:text-cyan-200"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};