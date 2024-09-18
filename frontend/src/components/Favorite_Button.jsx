import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useCharacterContext } from "./CharacterContext";

const Favorite_Button = ({ characterId, favorite }) => {
  const { toggleFavorite } = useCharacterContext();
  console.log("Este es el valor dentro del componente Favorite_Button:", favorite)
  
  return (
    <div
      className="w-[32px] text-gray-600 h-[32px] ml-auto hover:bg-white hover:text-secondary-600 flex items-center justify-center rounded-[50%] cursor-pointer group"
      onClick={() => toggleFavorite(characterId)}
    >
      {favorite ? (
        <FaHeart className="text-secondary-600" />
      ) : (
        <FaRegHeart className="text-red-600" />
      )}
    </div>
  );
};

export default Favorite_Button;
