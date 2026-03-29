const service = require("../services/pokeService");
const upload = require("../config/multer");

exports.getAll = async (req, res) => {
  try {
    res.status(200).json(await service.getAllPokemon());
  } catch (error) {
    res.status(500).json({ message: "API Error" });
  }

};

exports.getOne = async (req, res) => {
  try {
    res.status(200).json(await service.getPokemonById(req.params.id));
  } catch (error) {
    res.status(500).json({ message: "API Error" });
  }
};

exports.sync = async (req, res) => {
  try {
    res.status(200).json(await service.syncPokemon(req.params.id));
  } catch (error) {
    res.status(500).json({ message: "API Error" });
  }
};

exports.update = [
  upload.single("image"),
  async (req, res) => {
    try {
      res.status(200).json(await service.updatePokemon(req.params.id, req.body, req.file));
    } catch (error) {
      res.status(500).json({ message: "API Error" });
    }
  }
];

exports.delete = async (req, res) => {
  try {
    await service.removePokemon(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "API Error" });
  }
};