import React, { createContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonContextType {
  pokemonData: Pokemon[];
  handlePageChange: (page: number) => void;
  getPokemonData: (url: string) => Promise<any>;
  getPokemons: (offset: number, type?: string) => Promise<void>;
  count: number;
}

interface PokemonDataProps {
  children: ReactNode;
}

export const PokeContext = createContext<PokemonContextType | undefined>(undefined);

const PokemonData: React.FC<PokemonDataProps> = ({ children }) => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [pagination, setPagination] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const getPokemons = async (offset: number, type?: string) => {
    if (type) {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
        const pokemons = res.data.pokemon.map((p: { pokemon: { name: string; url: string } }) => p.pokemon);
        setPokemonData(pokemons);
        setCount(pokemons.length); 
      } catch (error) {
        console.error('Error fetching Pokémon data by type:', error);
      }
    } else {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
        setPokemonData(res.data.results);
        setCount(res.data.count);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    }
  };

  const getPokemonData = async (url: string, type?: string) => {
    if (url) {
      try {
        const res = await axios.get(url);
        if (type && !res.data.types.some((t: { type: { name: string } }) => t.type.name === type)) {
          return null;
        }
        return res.data;
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return null;
      }
    }
    return null;
  };

  const getRandomPokemon = async () => {
    try {
      const randomId = Math.floor(Math.random() * 660) + 1;
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      return res.data;
    } catch (error) {
      console.error('Error fetching random Pokémon data:', error);
      return null;
    }
  };

  const handlePageChange = (page: number) => {
    const offset = (page - 1) * 20;
    setPagination(offset);
  };

  useEffect(() => {
    getPokemons(pagination);
  }, [pagination]);

  const share = {
    getRandomPokemon,
    pokemonData,
    handlePageChange,
    getPokemonData,
    count,
    getPokemons
  };

  return (
    <PokeContext.Provider value={share}>
      {children}
    </PokeContext.Provider>
  );
};

export default PokemonData;
