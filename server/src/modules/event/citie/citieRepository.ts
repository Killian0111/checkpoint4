import databaseClient from "../../../../database/client";
import type { Rows } from "../../../../database/client";

class cityRepository {
  // Lire toutes les villes
  async readAll(): Promise<Rows> {
    try {
      const [rows] = await databaseClient.query<Rows>(
        "SELECT * FROM cities ORDER BY name ASC",
      );
      return rows;
    } catch (error) {
      throw new Error("Erreur lors de la récupération des villes.");
    }
  }
}

export default new cityRepository();
