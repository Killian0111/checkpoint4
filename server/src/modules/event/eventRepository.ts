import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class eventRepository {
  // lire tous les événements
  async readAll(): Promise<Rows> {
    try {
      const [rows] = await databaseClient.query<Rows>(
        "SELECT * FROM events ORDER BY date ASC",
      );
      return rows;
    } catch (error) {
      throw new Error("Erreur lors de la récupération des événements.");
    }
  }

  // lire un événement par son ID
  async readById(id: number): Promise<Rows[0] | null> {
    try {
      const [rows] = await databaseClient.query<Rows>(
        "SELECT * FROM events WHERE id = ?",
        [id],
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error("Erreur lors de la récupération de l'événement.");
    }
  }

  // créer un événement
  async create(
    name: string,
    date: string,
    location: string,
    description: string,
    organizer: string,
    price: string,
    duration: string,
    category: string,
    site_web: string,
    image_url: string,
  ): Promise<Result> {
    try {
      const [result] = await databaseClient.query<Result>(
        "INSERT INTO events (name, date, location, description, organizer, price, duration, category, site_web, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          name,
          date,
          location,
          description,
          organizer,
          price,
          duration,
          category,
          site_web,
          image_url,
        ],
      );
      return result;
    } catch (error) {
      throw new Error("Erreur lors de la création de l'événement.");
    }
  }

  // maj événement
  async update(
    id: number,
    name: string,
    date: string,
    location: string,
    description: string,
    organizer: string,
    price: string,
    duration: string,
    category: string,
    site_web: string,
    image_url: string,
  ): Promise<Result> {
    try {
      const [result] = await databaseClient.query<Result>(
        "UPDATE events SET name = ?, date = ?, location = ?, description = ?, organizer = ?, price = ?, duration = ?, category = ?, site_web = ?, image_url = ? WHERE id = ?",
        [
          name,
          date,
          location,
          description,
          organizer,
          price,
          duration,
          category,
          site_web,
          image_url,
          id,
        ],
      );
      return result;
    } catch (error) {
      throw new Error("Erreur lors de la mise à jour de l'événement.");
    }
  }

  // supprimer événement
  async delete(id: number): Promise<Result> {
    try {
      const [result] = await databaseClient.query<Result>(
        "DELETE FROM events WHERE id = ?",
        [id],
      );
      return result;
    } catch (error) {
      throw new Error("Erreur lors de la suppression de l'événement.");
    }
  }
}

export default new eventRepository();
