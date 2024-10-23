"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-10"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};


export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({ rotate, scale, children }) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(128, 0, 255, 0.7), 0 0 80px rgba(255, 255, 255, 0.5)", 
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-[4px] border-gray-800 p-2 md:p-6 bg-[#111111] rounded-[30px] shadow-2xl shadow-violet-500"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-purple-900 to-black dark:bg-zinc-900 md:rounded-2xl md:p-4 relative">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-indigo-500/10 blur-lg opacity-70 rounded-2xl"></div>
        <div className="relative z-20 h-full w-full p-4 md:p-6">{children}</div>
      </div>
    </motion.div>
  );
};
