import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Event {
  id: number;
  name: string;
  image_url: string;
  date: string;
  location: string;
  description: string;
}

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  const [fetchedEvents, setFetchedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/event");
        const data = await response.json();
        setFetchedEvents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p>Chargement des événements...</p>;
  }

  return (
    <div className="events-container">
      <h1 className="event-title">Événements à venir</h1>
      <div className="events-carousel">
        {(fetchedEvents.length > 0 ? fetchedEvents : events).map((event) => (
          <div key={event.id} className="event-card">
            <h3 className="event-name">{event.name}</h3>
            <img
              src={event.image_url}
              alt={event.name}
              className="event-image"
            />
            <p className="event-description">{event.description}</p>
            <p className="event-details">
              {new Date(event.date).toLocaleDateString()} <br />{" "}
              {event.location}
            </p>
            <Link to={`/event/${event.id}`} className="event-link">
              Voir plus
            </Link>
          </div>
        ))}
      </div>
      <hr className="section-separator" />
    </div>
  );
};

export default EventList;
