import { createContext, useContext, useState, useEffect } from "react";

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  useEffect(() => {
    // Fetch de los personajes desde la API
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => setCharacters(data.results));
  }, []);

  const handleSoftDelete = (id) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((character) =>
        character.id === id ? { ...character, isDeleted: true } : character
      )
    );
  };

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
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => useContext(CharacterContext);
