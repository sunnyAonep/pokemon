import React from 'react';
import { getTypeColor } from '../../utils/type';

type PokemonPopUpProps = {
  data: {
    name: string;
    number: number;
    image: string;
    info: string;
    types: string[];
  };
  onClose: () => void;
};

export default function PokemonPopUp({ data, onClose }: PokemonPopUpProps) {
  return (
    <div 
      className='fixed z-10 h-[100vh] w-[100vw] bg-slate-500 bg-opacity-35 flex items-center justify-center' 
      onClick={onClose}
    >
      <div 
        className='h-[70%] w-[50%] rounded-3xl bg-slate-200' 
        onClick={(e) => e.stopPropagation()}  // Prevent click events from bubbling up to the overlay
      >
        <div className='flex flex-row items-center rounded-t-3xl justify-between gap-5 h-[15%] w-[100%] p-4'>
          <h1 className='text-7xl font-mono'>{data.name}</h1>
          <h3 className='text-5xl font-mono'>#{data.number}</h3>
        </div>
        <div className='flex flex-row h-[50%] w-[100%]'>
          <div className='h-[100%] w-[40%] flex items-center justify-center'>
            <img src={data.image} alt={data.name} className='w-full h-full object-cover rounded-lg' />
          </div>
          <div className='h-[100%] w-[60%] rounded-l-2xl bg-green-300 p-4'>
            <p>{data.info}</p>
          </div>
        </div>
        <div className='flex flex-row items-center justify-around h-[25%] w-[100%] p-4'>
          <p className='font-bold'>Type:</p>
          {data.types.map((type, index) => (
            <span key={index} className=' rounded-lg px-3 py-1 text-sm' style={{ backgroundColor: getTypeColor(type) }}>{type}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
