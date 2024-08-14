export const PokemonsTypes = [
    { type: "normal", color: "#A8A878" }, 
    { type: "grass", color: "#78C850" },  
    { type: "fire", color: "#F08030" },  
    { type: "water", color: "#6890F0" },  
    { type: "bug", color: "#A8B820" },  
    { type: "electric", color: "#F8D030" },  
    { type: "rock", color: "#B8A038" },  
    { type: "ghost", color: "#705898" },  
    { type: "poison", color: "#A040A0" },  
    { type: "fighting", color: "#C03028" },  
    { type: "psychic", color: "#F85888" },  
    { type: "ground", color: "#E0C068" },  
    { type: "dragon", color: "#7038F8" },  
];

export const getTypeColor = (type: string) => {
    const typeInfo = PokemonsTypes.find(t => t.type === type);
    return typeInfo ? typeInfo.color : 'gray';
};