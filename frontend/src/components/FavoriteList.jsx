import { useCharacterContext } from './CharacterContext';
import { FaTrash } from 'react-icons/fa';
import Favorite_Button from './Favorite_Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Hook personalizado para detectar si la vista es móvil
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
};

const FavoriteList = ({ setCharacter_returned }) => {
  const { favorites, removeFavorite, handleSoftDelete } = useCharacterContext();
  const navigate = useNavigate();
  const isMobile = useIsMobile(); // Usa el hook para detectar si es móvil

  const handleCharacterClick = (character) => {
    if (isMobile) {
      navigate(`/character/${character.id}`); // Navega a la vista de detalles en móvil
    } else {
      setCharacter_returned(character); // Muestra detalles en la misma página en escritorio
    }
  };

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
              onClick={() => handleCharacterClick(character)} // Clic en el contenedor entero
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
                    e.stopPropagation(); // Evita la propagación del evento clic
                    handleSoftDelete(character.id); // Soft delete
                    removeFavorite(character.id); // Remueve de favoritos
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
