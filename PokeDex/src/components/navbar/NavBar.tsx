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
    <nav className='flex bg-[#cc1919] shadow-xl items-center justify-center gap-5 w-[20%] h-20 rounded-lg'>
      <input
        type="text"
        placeholder='Put the Pokémon name'
        value={search}
        onChange={handleChange}
        className='h-[70%] text-gray-700 bg-[#ffffff] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
      />
      <button
        onClick={handleSearch}
        className="bg-[#000000] text-white font-semibold py-2 px-4 rounded shadow-lg"
      >
        Search
      </button>
    </nav>
  );
}
