// app/components/GlobalVideoBackground.tsx

import React from "react";

const GlobalVideoBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/background3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-50" /> {/* Optional overlay */}
    </div>
  );
};

export default GlobalVideoBackground;
