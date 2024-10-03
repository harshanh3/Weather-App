import React, { useState } from 'react';
import axios from 'axios';
import myimage from './assets/clouds.png';

const Home = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const apiKey = '895284fb2d2c50a520ea537456963d9c'; 

  const searchLocation = (event) => {
    // Check if event is defined (for button click) or key press
    if (event && event.key !== 'Enter' && !event.target.closest('button')) {
      return; // Do nothing if it's not a valid event
    }

    if (location) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;
      
      axios.get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the data:", error);
        });
      setLocation(''); 
    }
  };

  return (
    <div className='bg-primary'>
      <h1 className='text-center mt-5'>Weather App</h1>
      <div className="bg-primary vh-100 d-flex justify-content-center align-items-center" style={{ marginTop: "-20px" }}>
        <div className="bg-white d-flex flex-column justify-content-start align-items-center p-3" 
          style={{ width: '550px', height: '550px', borderRadius: '10px' }}>
          
          <div className="d-flex" style={{ width: '100%', justifyContent: 'center' }}>
            <input 
              type="text" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={searchLocation} // Trigger search on Enter key press
              placeholder="Enter City Name" 
              style={{ width: '300px' }} 
              className="form-control me-2" 
            />
            <button onClick={searchLocation} className='bg-info-subtle border-0 rounded text-dark'>
              <i className="fa-solid fa-magnifying-glass fa-2x"></i>
            </button>
          </div>

          <div className='mt-5 bg-info-subtle rounded ps-4' style={{ width: '450px' }}>
            <h3>{data.name}</h3>
            {data.main ? (
              <>
                <p>Current Temp: {data.main.temp}°F</p>
                <p>Feels Like: {data.main.feels_like}°F</p>
                <p>Max: {data.main.temp_max}°F</p>
                <p>Min: {data.main.temp_min}°F</p>
              </>
            ) : (
              <p>Please enter a city name and press "Enter" or click the search button.</p>
            )}
          </div>

          <img className='mb-5' style={{ width: '200px' }} src={myimage} alt="clouds" />
        </div>
      </div>
    </div>
  );
};

export default Home;
