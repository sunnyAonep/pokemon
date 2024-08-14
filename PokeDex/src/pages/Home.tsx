import React, { useState, useContext, useEffect } from "react";
import NavBar from "../components/navbar/NavBar";
import Pokemon from "../components/pokemonCard/Pokemon";
import PokemonCardTitle from "../components/pokemonCard/PokemonCardTitle";
import { PokeContext } from "../context/PokemonData";
import pokedexIcon from "../assets/imgs/Pokédex_logo.png";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PokemonPopUp from "../components/PopUp/PokemonPopUp";
import { handleNextPage, handlePreviousPage } from "../utils/pagination";
import { PokemonsTypes, getTypeColor } from "../utils/type";

export default function Home() {
  const { pokemonData, handlePageChange, count, getPokemons } = useContext<any>(PokeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<string>("");

  const { data, isError } = useQuery({
    queryKey: ["pokemon", searchTerm],
    queryFn: () =>
      searchTerm
        ? axios
            .get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`)
            .then((res) => res.data)
        : null,
    placeholderData: null,
    enabled: !!searchTerm,  // Only run if searchTerm is not empty
  });

  useEffect(() => {
    if (data) {
      setSelectedPokemon(data);
    }
    if (isError) {
      alert("Enter a valid Pokémon name");
    }
  }, [data, isError]);

  useEffect(() => {
    getPokemons(currentPage * 20 - 20, selectedType);
  }, [selectedType]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    handlePageChange(page);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const typeSelector = () => (
    <div className="flex flex-wrap gap-4 justify-center mb-4">
      {PokemonsTypes.map(({ type, color }) => (
        <button
          key={type}
          onClick={() => handleTypeChange(type)}
          className={`px-4 py-2 text-white rounded-full transition-colors duration-150 ease-in-out ${
            selectedType === type ? 'bg-gray-700' : ''
          }`}
          style={{
            backgroundColor: selectedType === type ? '#4A4A4A' : getTypeColor(type),
          }}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
      <button
        onClick={() => handleTypeChange('')}
        className={`px-4 py-2 text-white rounded-full transition-colors duration-150 ease-in-out ${
          !selectedType ? 'bg-gray-700' : 'bg-gray-300'
        }`}
      >
        All
      </button>
    </div>
  );

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(count / 20);
    const pageNumbers = Array.from(
      { length: totalPages <= 5 ? totalPages : 5 },
      (_, i) => {
        if (totalPages <= 5 || currentPage <= 3) return i + 1;
        if (currentPage >= totalPages - 2) return totalPages - 4 + i;
        return currentPage - 2 + i;
      }
    );

    return (
      <div className='flex gap-2 w-[35%] h-[100%]'>
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`w-[20%] text-lg font-bold rounded-full transition duration-150 ease-in-out ${
              page === currentPage
                ? "bg-red-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-red-400 hover:text-white"
            }`}
            onClick={() => handlePageClick(page)}
            style={{
              boxShadow: page === currentPage ? "0 4px #B22222" : "0 2px #999",
            }}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  const handlePokemonClick = (pokemon: any) => {
    setSelectedPokemon(pokemon);
  };

  const handleClosePopup = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="flex flex-col w-full h-full gap-8 items-center bg-[#f3feb8]">
      <img
        src={pokedexIcon}
        alt="Pokédex Icon"
        className=" max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
      />
      <div className="flex flex-wrap justify-around w-full h-full items-center text-center gap-4">
        {[...Array(5)].map((_, index) => (
          <div 
            key={index}
            className={`flex justify-center items-center w-[30%] ${index === 0 ? 'transform hidden sm:block' : index === 4 ? 'transform hidden sm:block' : ''}`}
          >
            <PokemonCardTitle />
          </div>
        ))}
      </div>
      <NavBar onSearch={handleSearch} />
      <h1 className="w-[80%] text-2xl font-semibold text-left ">
        Pokémons:
      </h1>
      {typeSelector()}
      <div className="flex md:flex-raw justify-center items-center gap-4 h-10 w-full">
        <button
          className="bg-red-500 text-white text-sm md:h-10 md:w-16 h-[80%] w-[15%] font-bold rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 active:bg-red-700 transition duration-150 ease-in-out"
          onClick={() =>
            handlePreviousPage(currentPage, setCurrentPage, handlePageChange)
          }
          disabled={currentPage === 1}
          style={{
            background: `linear-gradient(to bottom, #FF3B3B, #FF0000)`,
            border: "2px solid white",
            boxShadow: "0 4px #B22222",
          }}
        >
          Prev
        </button>
        {renderPageNumbers()}
        <button
          className="bg-red-500 text-white font-bold text-sm md:h-10 md:w-16 h-[80%] w-[15%] rounded-full shadow-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 active:bg-red-700 transition duration-150 ease-in-out"
          onClick={() =>
            handleNextPage(currentPage, setCurrentPage, handlePageChange, count)
          }
          disabled={currentPage === Math.ceil(count / 20)}
          style={{
            background: `linear-gradient(to bottom, #FF3B3B, #FF0000)`,
            border: "2px solid white",
            boxShadow: "0 4px #B22222",
          }}
        >
          Next
        </button>
      </div>
      <div className="flex flex-wrap gap-4 justify-center w-[80%]">
        {pokemonData.map((pokemon: any, index: number) => (
          <Pokemon
            key={index}
            url={pokemon.url}
            handlePokemonClick={handlePokemonClick}
          />
        ))}
      </div>
      {selectedPokemon && (
        <PokemonPopUp
          data={{
            name: selectedPokemon.name,
            number: selectedPokemon.id,
            image: selectedPokemon.sprites.front_default,
            height: selectedPokemon.height,
            weight: selectedPokemon.weight,
            types: selectedPokemon.types.map(
              (typeInfo: any) => typeInfo.type.name
            ),
            stats: selectedPokemon.stats,
            gif: selectedPokemon.sprites.other.showdown.front_default,
            moves: selectedPokemon.moves,
          }}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}
