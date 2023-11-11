import React, { useState } from "react";
interface ImageProps {
  src: string;
  alt: string;
}

const ImageHoverZoom: React.FC<ImageProps> = ({ src, alt }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const imageStyle = {
    transform: hovered ? "scale(1.2)" : "scale(1)",
    transition: "transform 0.3s ease",
  };

  return (
   <> <img
      src={src}
      alt={alt}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={imageStyle}
    />
   </>
  );
};

export default ImageHoverZoom;
