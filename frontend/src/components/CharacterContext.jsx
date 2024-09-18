import React, { createContext, useState, useEffect, useCallback } from "react";

const CharacterContext = createContext();

const buildQuery = (filters) => {
  // Construir los argumentos de filtro en formato de objeto
  const filterArgs = Object.entries(filters)
    .filter(([_, value]) => value) // Filtrar los filtros con valores
    .map(([key, value]) => `${key}: "${value}"`) // Convertir los pares clave-valor a formato "key: value"
    .join(", "); // Unir los filtros con comas

  // Construir la consulta GraphQL
  const query = `
    query {
      characters(filter: { ${filterArgs} }) {
        id
        name
        species
        status
        gender
        origin
        image
      }
    }
  `;

  return query;
};

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [comments, setComments] = useState({}); // { characterId: [comment1, comment2, ...], ... }
  const [filterFlag, setFilterFlag] = useState(false);
  const [character_returned, setCharacter_returned] = useState({});
  const [favorites, setFavorites] = useState([]);

  const addComment = (id, comment) => {
    setComments((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), comment],
    }));
  };

  const toggleFavorite = (id) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) =>
        character.id === id
          ? { ...character, favorite: !character.favorite } // Alterna el estado de favorito
          : character
      )
    );
    // Actualiza la lista de favoritos después de alternar el estado de favorito
    if (favorites.some((character) => character.id === id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  const addFavorite = (id) => {
    setFavorites((prevFavorites) => [
      ...prevFavorites,
      characters.find((character) => character.id === id),
    ]);
    handleSoftDelete(id); // Elimina el personaje de la lista de caracteres
  };

  const removeFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((character) => character.id !== id)
    );
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) =>
        character.id === id ? { ...character, isDeleted: false } : character
      )
    );
  };

  const handleSoftDelete = (id) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) =>
        character.id === id ? { ...character, isDeleted: true } : character
      )
    );
  };

  const updateCharacterReturned = (characterId) => {
    const updatedCharacter = characters.find(character => character.id === characterId);
    setCharacter_returned(updatedCharacter);
  };

  const fetchCharacters = useCallback(async (filters) => {
    setLoading(true);
    setError(null);

    const query = buildQuery(filters);

    try {
      const response = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      setCharacters(result.data.characters);
    } catch (error) {
      setError(error.message);
      //console.error("Error fetching characters:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const filters = {
      name: searchTerm,
      status: statusFilter,
      species: speciesFilter,
      gender: genderFilter,
    };
    fetchCharacters(filters);
  }, [searchTerm, statusFilter, speciesFilter, genderFilter, sortOrder, fetchCharacters]);

  return (
    <CharacterContext.Provider
      value={{
        characters,
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
        fetchCharacters,
        setCharacters,
        loading, // Proporcionar estado de carga
        error, // Proporcionar estado de error
        handleSoftDelete,
        toggleFavorite,
        comments,
        addComment,
        filterFlag,
        setFilterFlag,
        character_returned,
        setCharacter_returned,
        updateCharacterReturned,
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => React.useContext(CharacterContext);
