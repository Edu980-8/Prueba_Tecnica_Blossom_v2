import { useCharacterContext } from "./CharacterContext";
import { FaTrash, FaSearch, FaSlidersH } from "react-icons/fa";
import Search from "./Search";
import Filters from "./Filters";
import Favorite_Button from "./Favorite_Button";
import CharacterDetails from "./CharacterComments";
import imageNotTaken from "../assets/no-picture-taking.png";
import { useNavigate } from "react-router-dom";

const PersonajesList = ({
  filteredCharacters,
  handleSoftDelete,
  setCharacter_returned,
}) => {
  const navigate = useNavigate();

  const handleCharacterClick = (character) => {
    const isMobile = window.innerWidth <= 768; // Detecta si es móvil
    if (isMobile) {
      navigate(`/character/${character.id}`); // Navega a la vista de detalles en móvil
    } else {
      setCharacter_returned(character); // Muestra detalles en la misma página en escritorio
    }
  };

  return (
    <ul className="font-greycliff m-auto">
      {filteredCharacters.map((character) => (
        <li
          key={character.id}
          className="p-4 justify-self-center focus:outline-none hover:bg-primary-100 hover:rounded-lg border-t border-gray-300"
          onClick={() => handleCharacterClick(character)}
        >
          <div className="flex items-center">
            <img
              src={character.image}
              alt={character.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="text-left text-sm ml-4 w-full">
              <p className="font-bold">{character.name}</p>
              <p className="text-gray-600">Species: {character.species}</p>
            </div>
            <Favorite_Button
              characterId={character.id}
              favorite={character.favorite}
              className="ml-auto"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              className="flex items-center text-red-500 hover:text-red-600"
              onClick={(e) => {
                e.stopPropagation(); // Para evitar que el clic en "Delete" también active el onClick del elemento padre
                handleSoftDelete(character.id);
              }}
            >
              <FaTrash className="mr-2" /> Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

const FavoriteList = ({ favorites, setCharacterReturned }) => (
  <section>
    <h2 className="font-greycliff mt-10 text-left text-xl font-bold mb-8">
      Favorites
    </h2>
    <ul className="font-greycliff m-auto">
      {favorites.map((character) => (
        <li
          key={character.id}
          className="p-4 justify-self-center focus:outline-none hover:bg-primary-100 hover:rounded-lg border-t border-gray-300"
          onClick={() => setCharacterReturned(character)}
        >
          <div className="flex items-center">
            <img
              src={character.image}
              alt={character.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="text-left text-sm ml-4 w-full">
              <p className="font-bold">{character.name}</p>
              <p className="text-gray-600">Species: {character.species}</p>
            </div>
            <Favorite_Button
              characterId={character.id}
              favorite={true}
              className="ml-auto"
            />
          </div>
        </li>
      ))}
    </ul>
  </section>
);

const CharacterList = () => {
  const {
    characters,
    handleSoftDelete,
    searchTerm,
    statusFilter,
    speciesFilter,
    genderFilter,
    sortOrder,
    filterFlag,
    setFilterFlag,
    character_returned,
    setCharacter_returned,
    favorites,
  } = useCharacterContext();

  const filteredCharacters = characters
    .filter((character) => {
      const matchesSearchTerm = character.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus =
        !statusFilter ||
        character.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesSpecies =
        !speciesFilter ||
        character.species.toLowerCase() === speciesFilter.toLowerCase();
      const matchesGender =
        !genderFilter ||
        character.gender.toLowerCase() === genderFilter.toLowerCase();

      return (
        matchesSearchTerm &&
        matchesStatus &&
        matchesSpecies &&
        matchesGender &&
        !character.isDeleted
      );
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === "desc") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 lg:gap-8">
        <div className="lg:mt-6">
          <h1 className="font-greycliff mt-6 text-left text-xl lg:text-2xl font-bold mb-6 lg:mb-8">
            Rick and Morty List
          </h1>

          <div className="mt-6">
            <div className="w-full bg-gray-200 p-3 flex items-center rounded-lg">
              <FaSearch className="mr-2 text-gray-400" />
              <Search />
              <FaSlidersH
                className="w-10 h-10 text-primary-600 cursor-pointer rotate-90 p-1 bg-primary-100 rounded-md"
                onClick={() => setFilterFlag(!filterFlag)}
              />
            </div>

            {/* Filters Button */}
            <div
              className={`lg:hidden mt-6 mb-6 bg-white ${
                filterFlag ? "" : "hidden"
              }`}
            >
              <Filters filterFlag={filterFlag} />
            </div>

            {/* Filters Panel for Desktop */}
            <div className="hidden lg:block lg:mt-6 mb-6 bg-white">
              <Filters filterFlag={filterFlag} />
            </div>

            <FavoriteList
              favorites={favorites}
              setCharacterReturned={setCharacter_returned}
            />

            <section>
              <p className="font-greycliff mt-6 text-left text-sm lg:text-base font-bold mb-6 lg:mb-8">
                CHARACTERS ({filteredCharacters.length})
              </p>
            </section>

            <div className="m-auto w-full">
              <PersonajesList
                filteredCharacters={filteredCharacters}
                handleSoftDelete={handleSoftDelete}
                setCharacter_returned={setCharacter_returned}
              />
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-full">
          <div className="mt-6">
            <section>
              <div className="relative w-20 h-20">
                <img
                  src={
                    character_returned
                      ? character_returned.image
                      : imageNotTaken
                  }
                  alt=""
                  className="w-20 h-20 rounded-full border border-white"
                />
                <div className="absolute bottom-0 right-0 mb-[-0.5rem] mr-[-0.5rem]">
                  <Favorite_Button
                    characterId={character_returned?.id}
                    favorite={character_returned?.favorite}
                    className="w-8 h-8"
                  />
                </div>
              </div>

              <h1 className="text-xl lg:text-2xl font-bold mt-4">
                {character_returned?.name}
              </h1>
            </section>
            {character_returned ? (
              <div className="font-greycliff mt-6 text-left text-base">
                <h2 className="font-bold mt-2">Specie</h2>
                <p className="text-gray-400 mb-2">
                  {character_returned.species}
                </p>
                <div className="w-full border border-gray-200 mb-2"></div>
                <h2 className="font-bold mt-2">Status</h2>
                <p className="text-gray-400 mb-2">
                  {character_returned.status}
                </p>
                <div className="w-full border border-gray-200 mb-2"></div>
                <h2 className="font-bold mt-2">Gender</h2>
                <p className="text-gray-400 mb-2">
                  {character_returned.gender}
                </p>
                <div className="w-full border border-gray-200 mb-2"></div>
                <h2 className="font-bold mt-2">Origin</h2>
                <p className="text-gray-400 mb-2">
                  {character_returned.origin}
                </p>
                <div className="w-full border border-gray-200 mb-2"></div>
                <CharacterDetails character={character_returned} />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterList;
