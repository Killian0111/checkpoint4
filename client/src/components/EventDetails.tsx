import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./eventDetails.css";

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  organizer: string;
  price: number;
  duration: string;
  category: string;
  site_web: string;
  image_url: string;
}

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3310/api/event/${id}`);
        if (!response.ok) throw new Error("event introuvable");
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet événement ?",
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3310/api/event/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Erreur suppression");

        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (!event) return <p>Événement introuvable.</p>;

  return (
    <div className="event-details">
      <h1>{event.name}</h1>
      <img src={event.image_url} alt="event_image" />
      <p>{event.description}</p>
      <p>
        <strong>Date :</strong> {new Date(event.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Lieu :</strong> {event.location}
      </p>
      <p>
        <strong>Organisateur :</strong> {event.organizer}
      </p>
      <p>
        <strong>Prix :</strong> {event.price ? `${event.price} €` : "Gratuit"}
      </p>
      <p>
        <strong>Durée :</strong> {event.duration}
      </p>
      <p>
        <strong>Catégorie :</strong> {event.category}
      </p>
      {event.site_web && (
        <p>
          <strong>Site officiel :</strong>{" "}
          <a href={event.site_web} target="_blank" rel="noopener noreferrer">
            {event.site_web}
          </a>
        </p>
      )}

      <div className="links">
        <Link to={`/edit/${event.id}`}>Modifier</Link>
        <Link to="/">Retour à l'accueil</Link>
        <button type="button" onClick={handleDelete}>
          Supprimer l'événement
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
