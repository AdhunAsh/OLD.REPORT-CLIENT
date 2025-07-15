import { motion } from "framer-motion";

const AnimatedCard = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
    className={`p-6 bg-white rounded ${className}`}
  >
    {children}
  </motion.div>
);

export default AnimatedCard;