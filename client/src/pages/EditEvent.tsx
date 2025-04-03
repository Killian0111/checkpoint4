import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../components/editEvent.css";

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  organizer: string;
  price: string;
  duration: string;
  category: string;
  site_web: string;
  image_url: string;
}

const EditEvent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    organizer: "",
    price: "",
    duration: "",
    category: "",
    site_web: "",
    image_url: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:3310/api/event/${id}`);
        if (!response.ok) throw new Error("Événement introuvable");
        const data = await response.json();
        setEvent(data);
        setFormData({
          name: data.name,
          date: data.date.split("T")[0],
          location: data.location,
          description: data.description,
          organizer: data.organizer,
          price: data.price,
          duration: data.duration,
          category: data.category,
          site_web: data.site_web,
          image_url: data.image_url,
        });
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3310/api/event/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      navigate(`/event/${id}`);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (!event) return <p>Événement introuvable.</p>;

  return (
    <div className="edit-event-container">
      <h1 className="edit-event-title">Modifier l'événement</h1>
      <form className="edit-event-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom :</label>
          <input
            className="form-input"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image_url">Image URL :</label>
          <input
            className="form-input"
            id="image_url"
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="Entrez une URL"
          />
          {formData.image_url && (
            <img
              src={formData.image_url}
              alt="Event"
              className="event-image-preview"
            />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date :</label>
          <input
            className="form-input"
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Lieu :</label>
          <input
            className="form-input"
            id="location"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description :</label>
          <textarea
            className="form-input"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="organizer">Organisateur :</label>
          <input
            className="form-input"
            id="organizer"
            type="text"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Prix (€) :</label>
          <input
            className="form-input"
            id="price"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Durée (HH:MM) :</label>
          <input
            className="form-input"
            id="duration"
            type="time"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Catégorie :</label>
          <input
            className="form-input"
            id="category"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="site_web">Site Web :</label>
          <input
            className="form-input"
            id="site_web"
            type="text"
            name="site_web"
            value={formData.site_web}
            onChange={handleChange}
          />
        </div>

        <button className="submit-button" type="submit">
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
