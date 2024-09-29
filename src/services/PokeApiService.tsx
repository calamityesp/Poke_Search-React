import axios from "axios";
import {
  POKEAPI_POKEMON_BASE,
  POKEAPI_POKEMON_SPRITES,
} from "../config/constants";

//global state memory cache
const pokecache: { [key: string]: unknown } = {};
let pokeNameList: string[] = [];

/*
  with axios, one HUGE benefit is the ability to create custom axios instances. these can have a base url that we can create
  which means then later we don't have to include the baseurl, and can just pass in the endpoint, pokemon in this case. lets do it!
  also! string interpolation, please it's so nice>:3
   */
const pokeAxios = axios.create({
  baseURL: `${POKEAPI_POKEMON_BASE}/`
});

export const fetchPokemon = async (pokemon: string) => {


  try {
    if (undefined === pokecache[pokemon]) {
      // const response = await axios.get(
      //   POKEAPI_POKEMON_BASE + "/" + pokemon + "/",
      // );
      const response = await pokeAxios.get(pokemon);//a bit cleaner :]
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
    //you then don't use that base url you defined. Lets use our pokeAxios here!
    // const response = await axios.get(
    //   "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=2000",
    // );
    const response = await pokeAxios.get(`/?offset=0&limit=2000`)
    const data = response.data;
    pokeNameList = data["results"].map((poke: unknown) => {//could have better ts typing for these things
      const pokename = poke["name"];
      return pokename;
    });
  }
  return pokeNameList;
};
