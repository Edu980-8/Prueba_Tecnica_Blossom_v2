
import { useCharacterContext } from './CharacterContext';
import { FaTrash } from 'react-icons/fa';
import Favorite_Button from './Favorite_Button';

const FavoriteList = ({ setCharacter_returned }) => {
  const { favorites, removeFavorite, handleSoftDelete } = useCharacterContext();

  return (
    <div className="px-6 mt-6">
      <h1 className="font-greycliff text-left text-2xl font-bold mb-4">Favorites</h1>
      <ul className="font-greycliff">
        {favorites.length === 0 ? (
          <p>No favorites added yet.</p>
        ) : (
          favorites.map((character) => (
            <li
              key={character.id}
              className="p-4 border-t border-gray-300 hover:bg-primary-100 rounded-lg cursor-pointer"
              onClick={() => setCharacter_returned(character)}
            >
              <div className="flex items-center">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-[32px] h-[32px] rounded-[50%]"
                />
                <div className="text-left text-[16px] ml-4 w-full">
                  <p className="font-bold">{character.name}</p>
                  <p className="text-gray-600">Species: {character.species}</p>
                </div>
                <Favorite_Button
                  characterId={character.id}
                  favorite={true} // Always true for favorites list
                  className="ml-auto"
                />
              </div>

              <div className="flex justify-between mt-4">
                <button
                  className="flex items-center text-red-500 hover:text-red-600"
                  onClick={(e) => {
                    e.stopPropagation(); // Para evitar que el clic en "Delete" también active el onClick del elemento padre
                    handleSoftDelete(character.id);
                    removeFavorite(character.id);
                  }}
                >
                  <FaTrash className="mr-2" /> Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FavoriteList;
