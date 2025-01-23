import { cn } from "../libs/utils";

import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const HoverEffect = ({
  items,
  className
}) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10", className)}>
      {items.map((item, idx) => (
        <Link
          to={item?.projectLink}
          key={item?.projectLink}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-zinc-800/25 block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
              <figure className="aspect-square rounded-lg mb-4 overflow-hidden">
            <CardImage imgSrc={item.imgSrc} />
              </figure>
            <div className="flex items-center justify-between gap-4">
            <CardTitle>{item.title}</CardTitle>
            <CardTags tags={item.tags} />
            </div>
          </Card>
        </Link>
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
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-zinc-800/50 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20 reveal-up",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children
}) => {
  return (
    <p className={cn("mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>
      {children}
    </p>
  );
};

export const CardImage = ({ imgSrc }) => {
  return (
    <img
      src={imgSrc}
      alt="Project"
      className="w-full h-full object-cover rounded-xl"
    />
  );
};

export const CardTags = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-[#90AEAD] text-zinc-950 text-xs px-2 py-1 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
