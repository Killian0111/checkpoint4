import { useEffect, useState } from "react";
import axios from "axios";
import "./cities.css";

interface City {
  id: number;
  name: string;
  image_url: string;
  country: string;
  airport: string;
  distance_to_event: number;
  transport_options: string;
}

const CitiesList = () => {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:3310/api/cities");
        setCities(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCities();
  }, []);

  return (
    <div className="cities-section">
      <h1>Villes principales</h1>
      <div className="cities-list">
        {cities.map((city) => (
          <div key={city.id} className="city-card">
            <h3>
              {city.name}, {city.country}
            </h3>
            <img src={city.image_url} alt={city.name} className="city-image" />
            <p>✈️ Aéroport : {city.airport}</p>
            <p>📍 Distance au concert : {city.distance_to_event} km</p>
            <p>🚖 Transport : {city.transport_options}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitiesList;
