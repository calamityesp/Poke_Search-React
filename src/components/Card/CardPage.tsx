import didYouMean from "didyoumean2";
import {
  fetchAllPokemonNames,
  fetchPokemon,
} from "../../services/PokeApiService";
import Card from "./Card";
import React, { useState, useEffect } from "react";

const CardPage = () => {
  const [pokemon, setPokemon] = useState<string>("");
  const [pokeImage, setPokeImage] = useState<string>("");
  const [pokeSearch, setPokeSearch] = useState<string>("");
  const [altAvailable, setAltAvailable] = useState<bool>(false);//bool isn't a thing in typescript, try boolean :p
  const [altSearch, setAltSearch] = useState<string>("");

  const list = async () => {
    const pokelist = await fetchAllPokemonNames();
    return pokelist;
  };

  const handlePokemonSearch = async (event: React.FormEvent) => {
    event.preventDefault()
    const data = await fetchPokemon(pokeSearch);
    const currentPokemonList: string[] = await list();
    const altSearchValue = didYouMean(pokeSearch, currentPokemonList);
    //might also set the pokemon to empty once you search
    setPokeSearch("");

    // Check for alternative search values, this sets altAvailable to true if no data is recovered
    // regardless, otherwise reset the altAvailable.
    if (undefined === data) {//this logic seems really hacky and confusing and causes problems later
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
      /*it's later and we have problems. If there is currently not a pokemon in pokeSearch variable, which there will NOT
      be on the first render of this page, we are going to hit: https://pokeapi.co/api/v2/pokemon//
      if you check the docs it says that "Calling any API endpoint without a resource ID or name will return a paginated
      list of available resources for that API."
      so we get a pagination back, then on line 39 we try to read the sprites etc props, and we get:
          CardPage.tsx Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'other')
      all that to say, do we really even need to call this search on the initial render of the page? or any re-render for that matter?
      we are calling this on button click anyway:p
       */

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

      {/*add a form and now we can submit on enter button or on button click :]*/}
      <form onSubmit={handlePokemonSearch}>
      <label htmlFor="SearchPokemon">
        <input
          id="SearchPokemon"
          onChange={(e) => setPokeSearch(e.target.value)}
          value={pokeSearch}
          placeholder="Enter Pokemon Name"
        />
      </label>
      <button type={"submit"}>submit</button>
      </form>
    </>
  );
};

export default CardPage;
