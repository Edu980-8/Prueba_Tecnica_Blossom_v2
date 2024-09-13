import { useCharacterContext } from "./CharacterContext";

const Search = () => {
  const { searchTerm, setSearchTerm } = useCharacterContext();

  return (
    <input
      type="text"
      placeholder="Search by name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  );
};

export default Search;
