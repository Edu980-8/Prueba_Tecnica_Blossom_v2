import { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
const CharacterContext = createContext();

const query = `
  query {
    characters {
      id
      name
      species
      gender
      origin
      image
    }
  }
`;

// Función para obtener personajes desde la API
const fetchCharacters = async (filter) => {
  const response = await fetch('http://localhost:3000/graphql', {
    method: 'POST', // Cambiado a POST
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { filter }
    }),
  });

  console.log(response);

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  return result.data.characters;
};

// Componente del proveedor de contexto
export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Construir el objeto de filtro basado en los estados
    const filter = {
      name: searchTerm,
      status: statusFilter,
      species: speciesFilter,
      gender: genderFilter,
    };

    fetchCharacters(filter)
      .then(data => {
        setCharacters(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [searchTerm, statusFilter, speciesFilter, genderFilter]); // Dependencias del useEffect

  const handleSoftDelete = (id) => {
    setCharacters(prevCharacters =>
      prevCharacters.map(character =>
        character.id === id ? { ...character, isDeleted: true } : character
      )
    );
  };

  // Console logs para debugging
  console.log("Status Filter:", statusFilter);
  console.log("Species Filter:", speciesFilter);
  console.log("Gender Filter:", genderFilter);

  return (
    <CharacterContext.Provider
      value={{
        characters,
        handleSoftDelete,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        speciesFilter,
        setSpeciesFilter,
        genderFilter,
        setGenderFilter,
        sortOrder,
        setSortOrder,
        loading,
        error,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

// Hook para usar el contexto
export const useCharacterContext = () => useContext(CharacterContext);
