import { useState, useEffect } from "react";

const CitySuggestions = ({ moodTemp }) => {
  const cityMap = {
    "70,80": ["Los Angeles", "San Diego", "Santa Monica"],
    "30,40": ["Denver", "Milwaukee", "Minneapolis"],
    "80,90": ["Las Vegas", "Phoenix", "Miami"],
    "50,60": ["San Francisco", "Portland", "Seattle"],
    "60,70": ["Austin", "Dallas", "New Orleans"],
    "40,50": ["Chicago", "Cincinnati", "Cleveland"],
    "20,30": ["Anchorage", "Detroit", "Buffalo"],
    "90,100": ["Houston", "Tampa", "Orlando"],
    "10,20": ["Missoula", "Fargo", "Duluth"],
    "0,10": ["Fairbanks", "Green Bay", "Appleton"],
    "60,80": ["Atlanta", "Tucson", "Oklahoma City"],
    "70,90": ["Baltimore", "Louisville", "Raleigh"],
    "30,50": ["Madison", "Toledo", "Sioux Falls"],
    "80,100": ["Charleston", "Savannah", "Jacksonville"],
    "40,60": ["Boise", "Salt Lake City", "Colorado Springs"],
  };

  const [suggestedCities, setSuggestedCities] = useState([]);

  useEffect(() => {
    setSuggestedCities(
      moodTemp && cityMap[moodTemp.join()] ? cityMap[moodTemp.join()] : []
    );
  }, [moodTemp]);

  return (
    <div>
      {suggestedCities.length > 0 && (
        <div className="mt-2 w-full text-center">
          Based on your mood, you may want to visit:
          {suggestedCities.map((city, index) => (
            <p key={`city-${index}`}>- {city}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySuggestions;
