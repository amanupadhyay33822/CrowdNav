


/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [locationsFromDatabase, setLocationsFromDatabase] = useState([]);
  const [distances, setDistances] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/get/location`);
      setLocationsFromDatabase(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateHaversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c * 1000; // Convert to meters

    return distance;
  };

  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  useEffect(() => {
    // Check if the Geolocation API is supported by the browser
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    // Get the user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (err) => {
        setError(`Error getting location: ${err.message}`);
      }
    );
  }, []); // The empty dependency array ensures that this effect runs only once on component mount
// console.log(locationsFromDatabase);
  const calculateDistances = () => {
    if (location && locationsFromDatabase.length > 0) {
      const distancesArray = locationsFromDatabase.map((dbLocation,index) => {
        
        const distance = calculateHaversineDistance(
          location.latitude,
          location.longitude,
          dbLocation.latitude,
          dbLocation.longitude
        );

        return {
          id: index+1, // Assuming each location has an ID
          distance: distance.toFixed(0) + " meters",
        };
      });

      setDistances(distancesArray);
    }
  };
console.log(distances);
  return (
    <div>
      {location ? (
        <div>
          <h3>Your current location is:</h3>
          <p>{"Latitude: " + location.latitude}</p>
          <p>{"Longitude: " + location.longitude}</p>
        </div>
      ) : (
        <p>{error || "Fetching location..."}</p>
      )}

      <button onClick={fetchData} className="border bg-slate-600 m-3 p-2 text-white rounded-md">
        Click me to fetch locations from the database
      </button>

      {locationsFromDatabase.length > 0 && (
        <button onClick={calculateDistances} className="border bg-slate-600 m-3 p-2 text-white rounded-md">
          Calculate Distances
        </button>
      )}

      {distances.length > 0 && (
        <div>
          <h3>Calculated Distances:</h3>
          {distances.map((distance) => (
            <p key={distance.id}>{`Location ${distance.id}: ${distance.distance}`}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
