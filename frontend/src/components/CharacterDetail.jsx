import { useParams } from "react-router-dom";
import { useCharacterContext } from "./CharacterContext";
import Favorite_Button from "./Favorite_Button";
import CharacterDetails from "./CharacterComments";
import imageNotTaken from "../assets/no-picture-taking.png";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const CharacterDetail = () => {
  const { id } = useParams();
  const { characters } = useCharacterContext();
  const character = characters.find((char) => char.id === id);
  const navigate = useNavigate();

  if (!character) return <div>Character not found</div>;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-6">
        <div className="relative w-20 h-20">
          <FaArrowLeft onClick={() => navigate(-1) } className="cursor-pointer text-primary-600 " />
          <img
            src={character.image || imageNotTaken}
            alt={character.name}
            className="w-20 h-20 rounded-full border border-white"
          />
          <div className="absolute bottom-0 right-0 mb-[-0.5rem] mr-[-0.5rem]">
            <Favorite_Button
              characterId={character.id}
              favorite={character.favorite}
              className="w-8 h-8"
            />
          </div>
        </div>

        <h1 className="text-xl lg:text-2xl font-bold mt-4">{character.name}</h1>

        <div className="font-greycliff mt-6 text-left text-base">
          <h2 className="font-bold mt-2">Specie</h2>
          <p className="text-gray-400 mb-2">{character.species}</p>
          <div className="w-full border border-gray-200 mb-2"></div>
          <h2 className="font-bold mt-2">Status</h2>
          <p className="text-gray-400 mb-2">{character.status}</p>
          <div className="w-full border border-gray-200 mb-2"></div>
          <h2 className="font-bold mt-2">Gender</h2>
          <p className="text-gray-400 mb-2">{character.gender}</p>
          <div className="w-full border border-gray-200 mb-2"></div>
          <h2 className="font-bold mt-2">Origin</h2>
          <p className="text-gray-400 mb-2">{character.origin}</p>
          <div className="w-full border border-gray-200 mb-2"></div>
          <CharacterDetails character={character} />
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
