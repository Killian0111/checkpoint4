import type { RequestHandler } from "express";
import citieRepository from "./citieRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const cities = await citieRepository.readAll();
    res.json(cities);
  } catch (error) {
    next(error);
  }
};

export default { browse };
