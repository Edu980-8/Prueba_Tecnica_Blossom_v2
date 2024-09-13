import { useCharacterContext } from "./CharacterContext";
import { FaTrash, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Filters from "./Filters";
import Search from "./Search";

const CharacterList = () => {
  const { characters, handleSoftDelete, searchTerm, statusFilter, speciesFilter, genderFilter, sortOrder, setSortOrder } = useCharacterContext();

  // Filtrar personajes basados en el término de búsqueda y los filtros del contexto
  const filteredCharacters = characters
    .filter((character) => {
      const matchesSearchTerm = character.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || character.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesSpecies = !speciesFilter || character.species.toLowerCase() === speciesFilter.toLowerCase();
      const matchesGender = !genderFilter || character.gender.toLowerCase() === genderFilter.toLowerCase();

      return matchesSearchTerm && matchesStatus && matchesSpecies && matchesGender && !character.isDeleted;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === "desc") {
        return b.name.localeCompare(a.name);
      }
      return 0; // Sin ordenamiento
    });

  return (
    <div className="container mx-auto">
      <h1 className="mt-10 text-green-600 text-3xl font-bold text-center mb-8">
        Rick and Morty Characters
      </h1>

      {/* Filtros, búsqueda y ordenación */}
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <Search />
        <Filters />
      </div>

      {/* Botones de ordenación */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setSortOrder("asc")}
          className={`px-4 py-2 rounded-lg focus:outline-none ${sortOrder === "asc" ? "bg-green-500 text-white" : "bg-white text-gray-700 border border-gray-300"}`}
        >
          Sort A-Z
        </button>
        <button
          onClick={() => setSortOrder("desc")}
          className={`px-4 py-2 rounded-lg focus:outline-none ${sortOrder === "desc" ? "bg-green-500 text-white" : "bg-white text-gray-700 border border-gray-300"}`}
        >
          Sort Z-A
        </button>
      </div>

      {/* Lista de personajes */}
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
              {/* Botón de eliminar */}
              <button
                className="flex items-center text-red-500 hover:text-red-600"
                onClick={() => handleSoftDelete(character.id)}
              >
                <FaTrash className="mr-2" /> Delete
              </button>

              {/* Botón de detalles */}
              <Link to={`/details/${character.id}`} className="flex items-center text-blue-500 hover:text-blue-600">
                <FaInfoCircle className="mr-2" /> Details
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;
