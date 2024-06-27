import { motion } from "framer-motion";
import { cn } from "@/utils/styling";

export const Spinner = ({ className }) => {
  return (
    <div className="relative size-32">
      <motion.span
        className={cn(
          "block size-32 border-8 border-gray-200/20 border-t-8 border-t-yellow-500 rounded-full absolute top-0 left-0",
          className
        )}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "easeInOut",
          duration: 1,
        }}
      />
    </div>
  );
};

export default Spinner;
