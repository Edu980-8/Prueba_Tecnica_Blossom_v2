import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useCharacterContext } from "./CharacterContext";

const Favorite_Button = ({ characterId, favorite }) => {
  const { toggleFavorite } = useCharacterContext();
  console.log("Este es el valor dentro del componente Favorite_Button:", favorite)
  
  return (
    <div
      className="w-[32px] text-gray-600 h-[32px] ml-auto flex items-center justify-center rounded cursor-pointer group "
      onClick={() => toggleFavorite(characterId)}
    >
      {favorite ? (
        <FaHeart className="bg-white w-[24px] h-[24px] rounded-[50%] p-[0.3rem] text-secondary-600" />
      ) : (
        <FaRegHeart className="bg-white w-[24px] h-[24px] rounded-[50%] p-[0.3rem] text-red-600" />
      )}
    </div>
  );
};

export default Favorite_Button;
