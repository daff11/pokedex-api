const axios = require("axios");
const Pokemon = require("../models/pokeModel");
const redis = require("../config/redis");

const getPokemonById = async (id) => {
    const key = `pokemon:${id}`;

    const cached = await redis.get(key);
    if (cached) {
        console.log("Redis Hit");
        return JSON.parse(cached);
    }

    let pokemon = await Pokemon.findByPk(id);
    if (pokemon) {
        console.log("DB Hit");
        await redis.set(key, JSON.stringify(pokemon), { EX: 60 });
        return pokemon;
    }

    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const p = res.data;

    const newPokemon = await Pokemon.create({
        id: p.id,
        name: p.name,
        height: p.height,
        weight: p.weight,
        base_experience: p.base_experience,
        image: p.sprites.front_default
    });

    await redis.set(key, JSON.stringify(newPokemon), {EX: 60});

    return newPokemon;
};

const getAllPokemon = async () => {
    const key = "pokemon:all";

    const cached = await redis.get(key);
    if (cached) {
        console.log("REDIS ALL");
        return JSON.parse(cached);
    }

    console.log("DB ALL");
    const data = await Pokemon.findAll();

    await redis.set(key, JSON.stringify(data), { EX: 60 });

    return data;
};

const syncPokemon = async (id) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = res.data;

    const [data] = await Pokemon.upsert({
        id: pokemon.id,
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        base_experience: pokemon.base_experience,
        image: pokemon.sprites.front_default
    });

    await redis.del(`pokemon:${id}`);
    await redis.del("pokemon:all");
    return data;
};

const updatePokemon = async (id, body, file) => {
    const pokemon = await Pokemon.findByPk(id);
    if (!pokemon) throw new Error("Not Found");

    await pokemon.update({
        name: body.name || pokemon.name,
        height: body.height || pokemon.height,
        weight: body.weight || pokemon.weight,
        base_experience: body.base_experience || pokemon.base_experience,
        image: file ? file.filename : pokemon.image
    });
    await redis.del(`pokemon:${id}`);
    await redis.del("pokemon:all");
    return pokemon;
};

const removePokemon = async (id) => {
    await Pokemon.destroy({ where: {id} });
    await redis.del(`pokemon:${id}`);
    await redis.del("pokemon:all");
};

module.exports = {
    getPokemonById,
    getAllPokemon,
    syncPokemon,
    updatePokemon,
    removePokemon
};