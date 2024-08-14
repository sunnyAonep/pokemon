import React, { useState } from "react";
import { getTypeColor } from "../../utils/type";

type PokemonPopUpProps = {
  data: {
    name: string;
    number: number;
    image: string;
    height: string;
    weight: string;
    types: string[];
    stats: { stat: { name: string }, base_stat: number }[];
    gif?: string;
    moves: {move: {name:string} , };
  };
  onClose: () => void;
};

export default function PokemonPopUp({ data, onClose }: PokemonPopUpProps) {
  const [playgif , setPlayGif] = useState<boolean>(false)
  return (
<div
  className="fixed z-10 inset-0 bg-slate-500 bg-opacity-35 flex items-center justify-center"
  onClick={onClose}
>
  <div
    className="h-[85%] w-[90%] md:h-[75%] xl:w-[50%] md:w-[80%] rounded-3xl bg-slate-200 overflow-y-auto"
    onClick={(e) => e.stopPropagation()}
  >
    <div className="flex flex-row items-center rounded-t-3xl justify-center gap-2 md:gap-5 h-[15%] md:h-[20%] w-[100%] p-3 md:p-4">
      <h1 className="text-2xl md:text-4xl font-mono text-center truncate">
        {data.name}
      </h1>
      <h3 className="text-lg md:text-2xl font-mono text-center">
        #{data.number}
      </h3>
    </div>

    <div className="flex flex-col md:flex-row h-[55%]">
      <div className="h-[60%] md:h-[100%] w-[100%] md:w-[40%] flex flex-col items-center justify-center">
        {!playgif?<img
          src={data.image}
          alt={data.name}
          className="w-[50%] h-[80%] md:w-[70%] md:h-[70%] object-fit rounded-lg"
        />:
        <div className="w-[60%] h-[100%] md:w-[70%] md:h-[70%] flex items-center justify-center rounded-lg">
          <img
          src={data.gif}
          alt={data.name}
          className="w-[50%] h-[80%] md:w-[60%] md:h-[80%] object-fit rounded-lg"
        />
        </div>
        }
       { data.gif? <button onClick={()=> setPlayGif(!playgif)}>see the pokemon move</button> : null}
      </div>
      <div className="h-[50%] md:h-[100%] w-[100%] md:w-[60%] rounded-none md:rounded-l-2xl flex flex-col gap-2 bg-green-300 p-4">
        <div className="flex gap-6">
        <p className="text-xs md:text-md font-medium text-gray-600 truncate">
          Weight: {data.weight} kg
        </p>
        <p className="text-xs md:text-md font-medium text-gray-600 truncate">
          Height: {data.height} m
        </p>
        </div>
        <div className="flex flex-wrap gap-1 md:gap-2 mt-1 ">
          {data.stats.map((stats, index) => (
            <div
              key={index}
              className="flex gap-1 md:gap-2 flex-row items-center w-[45%]"
            >
              <span className="text-xs md:text-md font-medium text-gray-600 truncate">
                {stats.stat.name}:
              </span>
              <span className="text-xs md:text-md font-bold text-gray-800">
                {stats.base_stat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="flex flex-wrap items-center justify-around h-[20%] md:h-[20%] w-[100%] p-3 md:p-4 mt-2 md:mt-4">
      <p className="font-bold text-md md:text-lg">Type:</p>
      {data.types.map((type, index) => (
        <span
          key={index}
          className="rounded-lg px-2 md:px-3 py-1 text-xs md:text-md"
          style={{ backgroundColor: getTypeColor(type) }}
        >
          {type}
        </span>
      ))}
      <div className="w-[80%] md:w-[50%] flex justify-center items-center border-t-2 pt-2 border-black md:border-t-0 md:pt-0">
        <a href={`https://pokemon.fandom.com/wiki/${data.name}`}>
          <button className="bg-blue-300 shadow-xl font-thin rounded-xl flex items-center justify-center h-[30px] md:h-[40px]">
            <p className="w-[80%] text-center text-xs md:text-md">
              More media about {data.name}
            </p>
          </button>
        </a>
      </div>
    </div>
  </div>
</div>
  )};
