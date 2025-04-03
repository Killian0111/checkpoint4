import type { RequestHandler } from "express";

import eventRepository from "./eventRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const events = await eventRepository.readAll(); //récupére tous les events
    res.json(events);
  } catch (error) {
    next(error);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);
    const event = await eventRepository.readById(eventId);
    if (event == null) {
      res.sendStatus(404);
    } else {
      res.json(event);
    }
  } catch (err) {
    next(err);
  }
};

const create: RequestHandler = async (req, res, next) => {
  console.info(req.body);
  const {
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
  } = req.body;
  try {
    const result = await eventRepository.create(
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
    );
    res.status(201).json({ message: "Événement créé avec succès", result });
  } catch (error) {
    next(error);
  }
};

const update: RequestHandler = async (req, res, next): Promise<void> => {
  const {
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
  } = req.body; // récupère données corps de la requête
  const eventId = Number(req.params.id);
  try {
    const result = await eventRepository.update(
      eventId,
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
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Événement non trouvé." });
    }
    res.json({ message: "Événement mis à jour.", result });
  } catch (error) {
    next(error);
  }
};

const deleteEvent: RequestHandler = async (req, res, next): Promise<void> => {
  const eventId = Number(req.params.id); // récupère ID de l'événement à supprimer
  try {
    const result = await eventRepository.delete(eventId);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Événement non trouvé." });
      return;
    }
    res.json({ message: "Événement supprimé." });
  } catch (error) {
    next(error);
  }
};

export default { browse, read, create, update, deleteEvent };
