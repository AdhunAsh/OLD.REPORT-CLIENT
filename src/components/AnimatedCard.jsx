import { motion } from "framer-motion";

const AnimatedCard = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className={`p-6 bg-white rounded ${className}`}
  >
    {children}
  </motion.div>
);

export default AnimatedCard;