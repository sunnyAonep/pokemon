import React, { useState } from 'react';
import reactIvcon from '../../assets/react.svg';

interface Props {
  onSearch: (searchTerm: string) => void;
}

export default function NavBar({ onSearch}: Props) {
  const [search, setSearch] = useState('');

  const handleSearch = (e: any) => {
    e.preventDefault()
    onSearch(search);
    setSearch("")
  };

  return (
    <div className='flex bg-slate-200 shadow-2xl items-center justify-center w-[90%] md:w-[50%] h-20 rounded-lg opacity-80'>
     <form action="" onSubmit={handleSearch} className='flex items-center justify-center gap-8 w-[90%] h-20 rounded-lg opacity-80'>
      <input
        type="text"
        placeholder='Put the Pokémon name'
        value={search}
        onChange={(e:any) => setSearch(e.target.value)}
        className='h-[70%] w-[60%] text-gray-700 bg-[#ffffff] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent'
      />
      <button
        className="bg-[#000000] w-[25%] h-[50%] text-white font-semibold rounded shadow-lg"
      >
        Search
      </button>
     </form>
     </div>
  );
}
