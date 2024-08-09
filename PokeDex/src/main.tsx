import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import PokemonData from './context/PokemonData.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PokemonData>
    <App />
  </PokemonData>
)
