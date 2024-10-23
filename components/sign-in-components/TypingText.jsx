import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter'

const TypingText = () => {

  return (
    <motion.div
      className="absolute top-0 left-0 p-4 w-full text-white text-left" // Align text to the left
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2 }}
    >
      <h1 className="mb-4 text-2xl md:text-3xl lg:text-4xl font-bold">
        Welcome to the Universe of Shopping!
      </h1>
        <div className="text-lg md:text-xl lg:text-2xl text-gradient">
          <Typewriter
          words={["Your journey into the cosmos of shopping begins now!"]}
          typeSpeed={50} // How fast characters are typed (lower is faster)
          hideCursorAfterText={true} // Hide cursor after text appear
        />
        </div>
    </motion.div>
  );
};

export default TypingText;
