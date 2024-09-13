import { useEffect, useState } from "react";
import { FiTrash, FiInfo } from "react-icons/fi";

const fetcher = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]); // Datos filtrados
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          "https://rickandmortyapi.com/api/character/?page=18"
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setCharacters(data.results);
        setFilteredCharacters(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleSearch = () => {
    let filtered = characters;

    if (searchTerm) {
      filtered = filtered.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(
        (character) =>
          character.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (speciesFilter) {
      filtered = filtered.filter(
        (character) =>
          character.species.toLowerCase() === speciesFilter.toLowerCase()
      );
    }

    if (genderFilter) {
      filtered = filtered.filter(
        (character) =>
          character.gender.toLowerCase() === genderFilter.toLowerCase()
      );
    }

    setFilteredCharacters(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, statusFilter, speciesFilter, genderFilter]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto">
      <h1 className="mt-10 text-green-600 text-3xl font-bold text-center mb-8">
        Rick and Morty Characters
      </h1>

      {/* Input de búsqueda */}
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Filtro por status */}
        <select
          value={statusFilter}
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
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
          className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Filter by Species</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
        </select>

        {/* Filtro por género */}
        <select
          value={genderFilter}
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

      {/* Lista de personajes filtrados */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredCharacters.map((character) => (
          <li key={character.id} className="bg-white shadow-lg rounded-lg p-4">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="text-center mt-4">
              <p className="text-xl font-bold">{character.name}</p>
              <p className="text-gray-600">Species: {character.species}</p>
            </div>
            <div className="flex justify-between mt-4">
              <button className="flex items-center text-red-500 hover:text-red-600">
                <FiTrash className="mr-2" /> Delete
              </button>
              <button className="flex items-center text-blue-500 hover:text-blue-600">
                <FiInfo className="mr-2" /> Details
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default fetcher;
