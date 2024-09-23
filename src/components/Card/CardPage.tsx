import didYouMean from "didyoumean2";
import {
  fetchAllPokemonNames,
  fetchPokemon,
} from "../../services/PokeApiService";
import Card from "./Card";
import { useState, useEffect } from "react";

const CardPage = () => {
  const [pokemon, setPokemon] = useState<string>("");
  const [pokeImage, setPokeImage] = useState<string>("");
  const [pokeSearch, setPokeSearch] = useState<string>("");
  const [altAvailable, setAltAvailable] = useState<bool>(false);
  const [altSearch, setAltSearch] = useState<string>("");

  const list = async () => {
    const pokelist = await fetchAllPokemonNames();
    return pokelist;
  };

  const handlePokemonSearch = async () => {
    const data = await fetchPokemon(pokeSearch);
    const currentPokemonList: string[] = await list();
    const altSearchValue = didYouMean(pokeSearch, currentPokemonList);

    // Check for alternative search values, this sets altAvailable to true if no data is recovered
    // regardless, otherwise reset the altAvailable.
    if (undefined === data) {
      if (null !== altSearchValue) {
        setAltAvailable(true);
        setAltSearch(altSearchValue);
      } else {
        setAltAvailable(true);
      }
    } else {
      setAltAvailable(false);
    }
    //get pokemon image
    const image = data["sprites"]["other"]["dream_world"]["front_default"];
    setPokeImage(image);
    setPokemon(data["name"]);
  };

  useEffect(() => {
    if (!altAvailable) {
      handlePokemonSearch();
    }
  }, [altAvailable]);

  const handleAltPokemonSearch = async (alt: string) => {
    setPokeSearch(alt);
    setAltAvailable(false);
  };

  return (
    <>
      {pokemon === "" ? (
        <h2>Enter Pokemon Name to Search</h2>
      ) : (
        <Card name={pokemon} imgUrl={pokeImage} />
      )}

      {/* checking for alt search, if altAvailable but no altSearch, then input was invalid */}
      {altAvailable && altSearch && (
        <article className="m-3">
          <p className="inline mr-2">Did you mean: </p>
          <button
            onClick={() => handleAltPokemonSearch(altSearch)}
            className="inline bg-bubble-gum"
          >
            {altSearch}
          </button>
        </article>
      )}
      {altAvailable && !altSearch && (
        <p className="text-[#ff0000]">Invalid search Parameter</p>
      )}

      <label htmlFor="SearchPokemon">
        <input
          id="SearchPokemon"
          onChange={(e) => setPokeSearch(e.target.value)}
          value={pokeSearch}
          placeholder="Enter Pokemon Name"
        />
      </label>
      <button onClick={handlePokemonSearch}>submit</button>
    </>
  );
};

export default CardPage;
