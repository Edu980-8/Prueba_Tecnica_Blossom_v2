import { useCharacterContext } from "./CharacterContext";
import { FaTrash, FaSearch, FaSlidersH } from "react-icons/fa";
import Search from "./Search";
import Filters from "./Filters";
import Favorite_Button from "./Favorite_Button";
import CharacterDetails from "./CharacterComments";
import imageNotTaken from "../assets/no-picture-taking.png";

const PersonajesList = ({
  filteredCharacters,
  handleSoftDelete,
  setCharacter_returned,
}) => {
  return (
    <ul className="font-greycliff m-auto">
      {filteredCharacters.map((character) => (
        <li
          key={character.id}
          className="p-4 justify-self-center focus:outline-none hover:bg-primary-100 hover:rounded-lg border-t border-gray-300"
          onClick={() => {
            setCharacter_returned(character);
          }}
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
    <div className="px-6">
      <div className="grid grid-cols-[23%_70%] gap-[5%]">
        <div className="mt-6">
          <h1 className="font-greycliff mt-10 text-left text-2xl font-bold mb-8">
            Rick and Morty List
          </h1>
          <div className="w-full bg-gray-200 p-3 flex items-center rounded-[8px]">
            <FaSearch className="mr-2 text-gray-400" />
            <Search />
            <FaSlidersH
              className="w-[2.375rem] h-[2.375rem] text-primary-600 cursor-pointer rotate-90 p-[0.5rem] bg-primary-100 rounded-[0.5rem]"
              onClick={() => setFilterFlag(!filterFlag)}
            />
          </div>
          <div className="mt-6 mb-6">
            <Filters filterFlag={filterFlag} />
          </div>

          <section>
            <p className="font-greycliff mt-10 text-left text-[12px] font-bold mb-8">
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

        <div className="w-full">
          <div className="mt-6">
            <section>
              <div className="relative w-[75px] h-[75px]">
                <img
                  src={character_returned ? character_returned.image : imageNotTaken}
                  alt=""
                  className="w-[75px] h-[75px] rounded-[50%] border-1 border-white"
                />
                <div className="absolute bottom-0 right-0 mb-[-0.5rem] mr-[-0.5rem]">
                  <Favorite_Button
                    characterId={character_returned?.id}
                    favorite={character_returned?.favorite}
                    className="w-[2rem] h-[2rem]"
                  />
                </div>
              </div>

              <h1 className="text-[1.5rem] font-bold">
                {character_returned?.name}
              </h1>
            </section>
            {character_returned ? (
              <div className="font-greycliff mt-10 text-left text-[1rem]">
                <h2 className="font-bold mt-2">Specie</h2>
                <p className="text-gray-400 mb-2">
                  {character_returned.species}
                </p>
                <div className="w-full border border-gray-200"></div>
                <h2 className="font-bold mt-2">Status</h2>
                <p className="text-gray-400 mb-2">
                  {character_returned.status}
                </p>
                <div className="w-full border border-gray-200"></div>
                <h2 className="font-bold mt-2">Gender</h2>
                <p className="text-gray-400 mb-2">
                  {character_returned.gender}
                </p>
                <div className="w-full border border-gray-200"></div>
                <h2 className="font-bold mt-2">Origin</h2>
                <p className="text-gray-400 mb-2">
                  {character_returned.origin}
                </p>
                <div className="w-full border border-gray-200"></div>
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
