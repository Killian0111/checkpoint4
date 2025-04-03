import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/addEvent.css";

interface EventFormData {
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

const AddEvent = () => {
  const [formData, setFormData] = useState<EventFormData>({
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
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3310/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok)
        throw new Error("Erreur lors de la création de l'événement");

      navigate("/");
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <div className="add-event-container">
      <form className="add-event-form" onSubmit={handleSubmit}>
        <h1 className="add-event-title">Créer un nouvel événement</h1>
        <div className="form-group">
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date :</label>
          <input
            type="date"
            id="date"
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
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description :</label>
          <textarea
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
            type="text"
            id="organizer"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Prix :</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Durée (HH:MM:SS) :</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            placeholder="HH:MM:SS"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Catégorie :</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="site_web">Site Web :</label>
          <input
            type="url"
            id="site_web"
            name="site_web"
            value={formData.site_web}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image_url">URL de l'image :</label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Créer l'événement
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
