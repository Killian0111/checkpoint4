import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import eventActions from "./modules/event/eventActions";

router.get("/api/event", eventActions.browse); // récupére tous les events
router.get("/api/event/:id", eventActions.read); // récupére event par id
router.post("/api/event", eventActions.create); // new event
router.put("/api/event/:id", eventActions.update); // maj event
router.delete("/api/event/:id", eventActions.deleteEvent); // supprime event

import citieActions from "./modules/event/citie/citieActions";

router.get("/api/cities", citieActions.browse);
/* ************************************************************************* */

export default router;
