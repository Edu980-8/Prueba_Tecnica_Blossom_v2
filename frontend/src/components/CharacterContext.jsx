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
  const [favorites, setFavorites] = useState(new Set()); // Conjunto de IDs de personajes favoritos
  const [comments, setComments] = useState({}); // { characterId: [comment1, comment2,

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const addComment = (id, comment) => {
    setComments((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), comment],
    }));
  };



  const handleSoftDelete = (id) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) =>
        character.id === id ? { ...character, isDeleted: true } : character
      )
    );
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
        favorites,
        comments,
        addComment
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => React.useContext(CharacterContext);
