import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useCharacterContext } from './CharacterContext';

const Favorite_Button = ({ characterId, className }) => {
  const { characters, toggleFavorite, updateCharacterReturned } = useCharacterContext();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Encuentra el personaje actual en el contexto y actualiza el estado local
    const character = characters.find((char) => char.id === characterId);
    if (character) {
      setIsFavorite(character.favorite);
    }
  }, [characters, characterId]);

  const handleClick = () => {
    // Toggle el estado de favorito
    toggleFavorite(characterId);
    // Actualizar el personaje devuelto inmediatamente después de cambiar el estado
    updateCharacterReturned(characterId);
  };

  return (
    <div
      className={`w-[32px] text-gray-600 h-[32px] ml-auto flex items-center justify-center rounded cursor-pointer group ${className}`}
      onClick={handleClick}
    >
      {isFavorite ? (
        <FaHeart className="bg-white w-[24px] h-[24px] rounded-[50%] p-[0.3rem] text-secondary-600" />
      ) : (
        <FaRegHeart className="bg-white w-[24px] h-[24px] rounded-[50%] p-[0.3rem] text-red-600" />
      )}
    </div>
  );
};

export default Favorite_Button;
