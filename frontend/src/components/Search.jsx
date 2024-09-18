import { useCharacterContext } from "./CharacterContext";

const Search = () => {
  const { searchTerm, setSearchTerm } = useCharacterContext();

  return (
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-gray-200 w-full focus:outline-none"
      />
    
  );
};

export default Search;
