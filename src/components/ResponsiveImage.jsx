import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import PropTypes from "prop-types";

/**
 * ResponsiveImage Component
 * 
 * A performance-optimized image component that:
 * - Uses optimized image sizes for different breakpoints
 * - Implements lazy loading with blur effect
 * - Provides fallback for missing optimized images
 * - Supports retina displays automatically
 */
const ResponsiveImage = ({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  effect = "blur",
  imageType = "default", // 'avatar', 'photo', 'project'
  variant = "default", // 'thumb', 'card', 'large', etc.
  ...props
}) => {
  // Generate srcSet based on image type and variant
  const generateSrcSet = (originalSrc, type, variant) => {
    const basePath = originalSrc.replace(/\/([^/]+)\.webp$/, '');
    const filename = originalSrc.match(/\/([^/]+)\.webp$/)?.[1];
    
    if (!filename) return originalSrc;
    
    const optimizedBasePath = `${basePath}/optimized/${filename}`;
    
    // Define srcSet patterns for different image types
    const srcSetConfigs = {
      avatar: {
        default: [
          `${optimizedBasePath}-40.webp 1x`,
          `${optimizedBasePath}-80.webp 2x`
        ]
      },
      photo: {
        thumb: [
          `${optimizedBasePath}-thumb.webp 1x`,
          `${optimizedBasePath}-thumb-2x.webp 2x`
        ],
        small: [
          `${optimizedBasePath}-small.webp 1x`,
          `${optimizedBasePath}-medium.webp 2x`
        ],
        medium: [
          `${optimizedBasePath}-medium.webp 1x`,
          `${optimizedBasePath}-large.webp 2x`
        ],
        large: [
          `${optimizedBasePath}-large.webp 1x`
        ]
      },
      project: {
        card: [
          `${optimizedBasePath}-card.webp 1x`,
          `${optimizedBasePath}-card-2x.webp 2x`
        ],
        large: [
          `${optimizedBasePath}-large.webp 1x`
        ]
      }
    };
    
    const config = srcSetConfigs[type]?.[variant];
    return config ? config.join(', ') : originalSrc;
  };
  
  // Generate the appropriate src for the LazyLoadImage
  const getOptimizedSrc = (originalSrc, type, variant) => {
    const basePath = originalSrc.replace(/\/([^/]+)\.webp$/, '');
    const filename = originalSrc.match(/\/([^/]+)\.webp$/)?.[1];
    
    if (!filename) return originalSrc;
    
    const suffixMap = {
      avatar: { default: '-40' },
      photo: { 
        thumb: '-thumb',
        small: '-small', 
        medium: '-medium',
        large: '-large'
      },
      project: { 
        card: '-card',
        large: '-large'
      }
    };
    
    const suffix = suffixMap[type]?.[variant];
    return suffix ? 
      `${basePath}/optimized/${filename}${suffix}.webp` : 
      originalSrc;
  };
  
  const optimizedSrc = getOptimizedSrc(src, imageType, variant);
  const srcSet = generateSrcSet(src, imageType, variant);
  
  return (
    <picture>
      {/* WebP optimized sources */}
      {srcSet !== src && (
        <source 
          srcSet={srcSet} 
          type="image/webp" 
          sizes={sizes}
        />
      )}
      
      {/* Fallback LazyLoadImage */}
      <LazyLoadImage
        src={optimizedSrc}
        alt={alt}
        className={className}
        effect={effect}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        onError={(e) => {
          // Fallback to original image if optimized version fails
          console.warn(`Optimized image failed to load, falling back to original: ${src}`);
          if (e.target.src !== src) {
            e.target.src = src;
          }
        }}
        {...props}
      />
    </picture>
  );
};

ResponsiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  sizes: PropTypes.string,
  priority: PropTypes.bool,
  effect: PropTypes.string,
  imageType: PropTypes.oneOf(['avatar', 'photo', 'project', 'default']),
  variant: PropTypes.oneOf(['default', 'thumb', 'small', 'medium', 'large', 'card'])
};

export default ResponsiveImage; 