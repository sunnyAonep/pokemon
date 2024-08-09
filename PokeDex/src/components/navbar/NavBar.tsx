import React, { useState } from 'react';
import reactIvcon from '../../assets/react.svg';

interface Props {
  onSearch: (searchTerm: string) => void;
}

export default function NavBar({ onSearch}: Props) {
  const [search, setSearch] = useState('');

  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <nav className='flex bg-slate-300 shadow-xl items-center justify-around w-[70%] h-[10%] rounded-b-md'>
      <img src={reactIvcon} alt="React Icon" className='h-[50%]' />
      <input
        type="text"
        placeholder='Put the Pokémon name'
        value={search}
        onChange={handleChange}
        className='h-[70%] text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 active:bg-blue-700 transition duration-150 ease-in-out"
      >
        Search
      </button>
    </nav>
  );
}
