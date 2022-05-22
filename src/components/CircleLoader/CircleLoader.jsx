import { motion } from "framer-motion";

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1,
};

const CircleLoader = () => {
  return (
    <div className="relative w-40 h-40 mx-auto mt-40">
      <motion.span
        className="absolute top-0 left-0 rounded-full block w-40 h-40 border-8 border-gray-200 border-t-8 border-t-primary-500"
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  );
};

export default CircleLoader;
