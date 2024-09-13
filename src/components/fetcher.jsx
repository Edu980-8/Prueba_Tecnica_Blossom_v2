import { useEffect, useState } from "react";
import { FiTrash, FiInfo } from "react-icons/fi";

const fetcher = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(
          "https://rickandmortyapi.com/api/character/?page=19"
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setCharacters(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="mt-10 text-green-600 text-3xl font-bold text-center mb-8 font-poppins">
        Rick and Morty Characters
      </h1>
      <ul className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {characters.map((character) => (
          <li
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 font-poppins"
            key={character.id}
          >
            <div className="relative w-full h-64">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <p className="text-lg font-semibold text-gray-800 mb-1">
                {character.name==="Two Guys with Handlebar Mustaches"?"Two Guys with Handlebar":character.name}
              </p>
              <p className="text-gray-600 text-sm">
                Species: {character.species}
              </p>
            </div>
            <div className="flex justify-between items-center p-4 border-t border-gray-300">
              <button className="w-full flex items-center justify-center text-red-500 hover:text-red-600 transition-colors">
                <FiTrash className="mr-2" />
                <span>Delete</span>
              </button>
              <button className="w-full flex items-center justify-center text-blue-500 hover:text-blue-600 transition-colors">
                <FiInfo className="mr-2" />
                <span>Details</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default fetcher;
