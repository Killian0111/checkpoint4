import { useEffect, useState } from "react";
import axios from "axios";
import EventList from "../components/EventList";

import "../components/eventList.css";
import CitiesList from "../components/Cities";

const HomePage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3310/api/event");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <EventList events={events} />
      <CitiesList />
    </div>
  );
};

export default HomePage;
