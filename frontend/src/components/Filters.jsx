import { useCharacterContext } from "./CharacterContext";

const Filters = () => {
  const { setStatusFilter, setSpeciesFilter, setGenderFilter } = useCharacterContext();

  return (
    <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
      {/* Filtro por status */}
      <select
        onChange={(e) => setStatusFilter(e.target.value)}
        className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">Filter by Status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      {/* Filtro por especie */}
      <select
        onChange={(e) => setSpeciesFilter(e.target.value)}
        className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">Filter by Species</option>
        <option value="human">Human</option>
        <option value="alien">Alien</option>
      </select>

      {/* Filtro por género */}
      <select
        onChange={(e) => setGenderFilter(e.target.value)}
        className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        <option value="">Filter by Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>

      

    </div>
  );
};

export default Filters;
