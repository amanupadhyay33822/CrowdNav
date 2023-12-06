/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";


const App = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [a,seta]=useState([]);
  const sendData = async (req, res, next) => {
    try {
      const res= await axios.post(`http://localhost:3000/api/v1/location`,location)
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  const fetchData = async (req, res, next) => {
    try {
      const res= await axios.get(`http://localhost:3000/api/v1/get/location`)
      // console.log(res.data);
      seta(res.data);
      console.log(a);
      
      
      // setLocation({ latitude, longitude });
    } catch (error) {
      console.log(error);
    }
  }
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

  return (
    <div>
      {location ? (
        <div>
          {/* Your current location is: {location.latitude}, {location.longitude}
          */}
          {
            a.map((data)=>{
              return (
                <div key={1}>
                  {"lattitude is "+data.latitude} {" longitude is"+data.longitude}
                </div>
              )
            })
          }
        </div>
      ) : (
        <p>{error || 'Fetching location...'}</p>
      )}

      <button onClick={sendData} className="border bg-slate-600 m-3 p-2 text-white rounded-md">click me to get location</button>
      <button onClick={fetchData} className="border bg-slate-600 m-3 p-2 text-white rounded-md">click me fetch location from database</button>
    </div>
  );
};

export default App;
