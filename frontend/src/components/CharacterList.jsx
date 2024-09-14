import { useCharacterContext } from "./CharacterContext";
import { FaTrash, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Search from "./Search"; // Mantén la búsqueda si la estás utilizando
import Filters from "./Filters";


const  PersonajesList = ({filteredCharacters, handleSoftDelete}) => {
  return (
    <div>
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
              <button
                className="flex items-center text-red-500 hover:text-red-600"
                onClick={() => handleSoftDelete(character.id)}
              >
                <FaTrash className="mr-2" /> Delete
              </button>

              <Link
                to={`/details/${character.id}`}
                className="flex items-center text-blue-500 hover:text-blue-600"
              >
                <p>{character.id}</p>
                <FaInfoCircle className="mr-2" /> Details
              </Link>
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  )
}


const CharacterList = () => {
  const {
    characters,
    handleSoftDelete,
    searchTerm,
    statusFilter,
    speciesFilter,
    genderFilter,
    sortOrder
  } = useCharacterContext(); // Desestructuración del contexto


  // Filtrar personajes basados en el término de búsqueda y el orden
  const filteredCharacters = characters
    .filter((character) => {
      // Aplicar el término de búsqueda
      const matchesSearchTerm = character.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        !statusFilter ||
        character.status.toLowerCase() === statusFilter.toLowerCase();
      
      const matchesSpecies =
        !speciesFilter ||
        character.species.toLowerCase() === speciesFilter.toLowerCase();
      const matchesGender =
        !genderFilter ||
        character.gender.toLowerCase() === genderFilter.toLowerCase();

      return (
        matchesSearchTerm &&
        matchesStatus &&
        matchesSpecies &&
        matchesGender &&
        !character.isDeleted
      );
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === "desc") {
        return b.name.localeCompare(a.name);
      }
      return 0; // Sin ordenamiento
    });

  // Renderizado de la lista de personajes
  return (
    <div className="container mx-auto">
      <h1 className="mt-10 text-green-600 text-3xl font-bold text-center mb-8">
        Rick and Morty Characters
      </h1>

      {/* Búsqueda */}
      <div className="mb-6">
        <Search />
      </div>

      {/* Filtros */}
      <div className="mb-6">
        <Filters />
      </div>

      {/* Lista de personajes */}
      <PersonajesList filteredCharacters={filteredCharacters} handleSoftDelete={handleSoftDelete} />
      
    </div>
  );
};

export default CharacterList;
