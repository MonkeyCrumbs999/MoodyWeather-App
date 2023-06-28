import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const WeatherCard = ({ data }) => {
  const controls = useAnimation();
  const cardVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    hiding: { scale: 0.5, opacity: 0, transition: { duration: 0.5 } },
    rotate: { rotate: 360, transition: { duration: 0.5 } },
  };

  const [displayData, setDisplayData] = useState(data);

  useEffect(() => {
    controls.start("hiding").then(() => {
      setDisplayData(data);
      controls.start("visible");
    });
  }, [data, controls]);

  return (
    <motion.div
      className="rounded-lg shadow-lg p-10 bg-white mt-4 text-center dark:bg-gray-800 dark:text-white"
      variants={cardVariants}
      initial="hidden"
      animate={controls}>
      <h2 className="text-2xl font-bold mb-4">
        {displayData.location.name}, {displayData.location.region}
      </h2>
      <img
        src={
          displayData.current.condition.icon.startsWith("//")
            ? "http:" + displayData.current.condition.icon
            : displayData.current.condition.icon
        }
        alt={displayData.current.condition.text}
        className="mx-auto"
      />
      <p className="text-gray-500 mt-4">{displayData.current.condition.text}</p>
      <h3 className="text-3xl mt-2">{displayData.current.temp_f}°F</h3>
    </motion.div>
  );
};

export default WeatherCard;
