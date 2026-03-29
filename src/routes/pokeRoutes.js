const express = require("express");
const router = express.Router();
const controller = require("../controllers/pokeController");

router.get("/pokemon", controller.getAll);
router.get("/pokemon/:id", controller.getOne);
router.post("/pokemon/sync/:id", controller.sync);
router.put("/pokemon/:id", controller.update);
router.delete("/pokemon/:id", controller.delete);

module.exports = router;