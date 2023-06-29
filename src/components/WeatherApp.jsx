import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import WeatherCard from "./WeatherCard";

const WeatherApp = () => {
  // State hooks
  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState(null);
  const [mood, setMood] = useState("");
  const [moodError, setMoodError] = useState(null);
  const [moodTemp, setMoodTemp] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  // Function to reset the state
  const resetAll = () => {
    setZip("");
    setZipError(null);
    setMood("");
    setMoodError(null);
    setMoodTemp(null);
    setWeatherData(null);
  };

  // Framer motion controls and variants for mood
  const moodControls = useAnimation();
  const moodVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.5 } },
  };

  // Mood to temperature map
  const moodToTemp = {
    happy: [70, 80],
    sad: [30, 40],
    angry: [80, 90],
    calm: [60, 70],
    irritated: [75, 85],
    joyful: [65, 75],
    stressed: [85, 95],
    content: [55, 65],
    excited: [70, 80],
    lonely: [40, 50],
    relaxed: [60, 70],
    weary: [50, 60],
    bored: [70, 80],
    adventurous: [60, 70],
    curious: [70, 80],
  };

  // Function to set the mood
  const submitMood = () => {
    const lowerCaseMood = mood.toLowerCase();
    if (!lowerCaseMood || !moodToTemp[lowerCaseMood]) {
      setMoodError("Please enter a valid mood.");
      return;
    }
    setMoodTemp(moodToTemp[lowerCaseMood]);
    setMoodError(null);
  };

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    setZipError(null);
    if (!zip) {
      setZipError("Please enter a zip code.");
      return;
    }
    // Fetch weather data from API
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=c5cc7b4f77664495961214741232706&q=${zip}`
      );
      if (!response.ok) {
        throw new Error("Could not fetch weather data.");
      }
      const data = await response.json();
      if (!data || !data.current) {
        throw new Error("No weather data available for this zip code.");
      }
      setWeatherData(data);
    } catch (error) {
      setZipError(error.message);
    }
  };

  // Function to check if mood matches the weather
  const checkMood = () => {
    if (!moodTemp || !weatherData) {
      return;
    }
    const currentTemp = weatherData.current.temp_f;
    if (currentTemp >= moodTemp[0] && currentTemp <= moodTemp[1]) {
      return "Your location matches your mood! 😲";
    } else {
      return "Your location does not match your mood.";
    }
  };

  // Framer motion variants for container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5, duration: 1 } },
  };
  const itemVariants = {
    hidden: { x: "-10vw" },
    visible: { x: 0, transition: { type: "spring", stiffness: 120 } },
  };

  // useEffect to handle mood change
  useEffect(() => {
    if (moodTemp) {
      moodControls.start("visible");
    }
  }, [moodTemp, moodControls]);

  // Form submit handlers
  const handleSubmitZip = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };
  const handleSubmitMood = (event) => {
    event.preventDefault();
    submitMood();
  };

  return (
    // Container with variants for motion effects
    <motion.div
      className="pb-4 sm:pb-10 flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <h1 className="text-2xl sm:text-4xl font-bold mb-8">Weather App</h1>

      {/* Weather section */}
      <motion.div
        layout
        className="w-full flex flex-col items-center mb-5 gap-4">
        <form
          onSubmit={handleSubmitZip}
          className="w-full flex flex-col items-center mb-5 gap-4">
          <motion.input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Enter zip code"
            className="mb-2 sm:mb-0 p-2 border rounded w-full"
            variants={itemVariants}
          />
          <motion.button
            type="submit"
            layout
            className="p-2 bg-blue-500 text-white rounded mt-2 w-full"
            variants={itemVariants}>
            Get Weather
          </motion.button>
          {zipError && <p className="text-red-500">{zipError}</p>}
        </form>
        {weatherData && <WeatherCard data={weatherData} />}
      </motion.div>

      {/* Mood section */}
      <motion.div
        layout
        className="w-full flex flex-col items-center mt-5 gap-4">
        <form
          onSubmit={handleSubmitMood}
          className="w-full flex flex-col items-center mb-5 gap-4">
          <motion.input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="Enter mood"
            className="mb-2 sm:mb-0 p-2 border rounded w-full"
            variants={itemVariants}
          />
          <motion.button
            type="submit"
            layout
            className="p-2 bg-blue-500 text-white rounded mt-2 w-full"
            variants={itemVariants}>
            Submit Mood
          </motion.button>
          {moodError && <p className="text-red-500">{moodError}</p>}
        </form>
        {moodTemp && (
          <motion.p
            className="mt-2 sm:mt-0 w-full text-center"
            variants={moodVariants}
            initial="hidden"
            animate={moodControls}>
            Your mood corresponds to a temperature range of {moodTemp[0]}°F -{" "}
            {moodTemp[1]}°F.
          </motion.p>
        )}
        <p>{checkMood()}</p>

        {/* Reset Button */}
        <motion.button
          onClick={resetAll}
          className="pt-2 bg-red-500 text-white rounded mt-2 w-full"
          variants={itemVariants}>
          Reset
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default WeatherApp;
