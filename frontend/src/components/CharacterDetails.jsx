import { useParams } from "react-router-dom";
import { useCharacterContext } from "./CharacterContext";

const CharacterDetails = () => {
  const { id } = useParams();
  const numericId = parseInt(id, 10); // Convierte el ID a número entero
  const { characters } = useCharacterContext();

  // Encontrar el personaje seleccionado
  const character = characters.find((char) => char.id === numericId);
  console.log(character);

  if (!character) {
    return <p>Character not found</p>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mt-10">{character.name}</h1>
      <img
        id={character.id}
        src={character.image}
        alt={character.name}
        className="w-1/2 mx-auto mt-4"
      />
      <p className="text-center mt-4">Species: {character.species}</p> {/* Corrección de species */}
      <p className="text-center mt-2">Status: {character.status}</p> {/* Corrección de status */}
    </div>
  );
};

export default CharacterDetails;
