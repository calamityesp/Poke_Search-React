import axios from "axios";
import {
  POKEAPI_POKEMON_BASE,
  POKEAPI_POKEMON_SPRITES,
} from "../config/constants";

//global state memory cache
const pokecache: { [key: string]: unknown } = {};
let pokeNameList: string[] = [];

export const fetchPokemon = async (pokemon: string) => {
  try {
    if (undefined === pokecache[pokemon]) {
      const response = await axios.get(
        POKEAPI_POKEMON_BASE + "/" + pokemon + "/",
      );
      pokecache[pokemon] = response.data;
    }
    const data = pokecache[pokemon];

    //testing
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const fetchPokemonImage = async (pokemon: string) => {
  const data = await fetchPokemon(pokemon);
  return data[POKEAPI_POKEMON_SPRITES];
};

export const fetchAllPokemonNames = async () => {
  if (pokeNameList.length === 0) {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2000",
    );
    const data = response.data;
    pokeNameList = data["results"].map((poke: unknown) => {
      const pokename = poke["name"];
      return pokename;
    });
  }
  return pokeNameList;
};
