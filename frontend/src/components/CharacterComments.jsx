import { useParams} from "react-router-dom";
import { useCharacterContext } from "./CharacterContext";
import { useState } from "react";

const CharacterDetails = ({character}) => {
  const { id } = useParams();
  const { characters, addComment, comments } = useCharacterContext();

  const [comment, setComment] = useState("");

  // Encontrar el personaje seleccionado
  console.log("Este es el valor de character_returned dentro del componente CharacterComments:", character)

  if (!character) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-lg font-medium text-gray-600">Character not found</p>
      </div>
    );
  }


  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    addComment(character.id, comment);
    setComment(""); // Limpiar el campo de comentario después de enviarlo
  };

  const characterComments = comments[character.id] || [];

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-8 max-w-3xl w-full">
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Add a Comment</h2>
          <form onSubmit={handleCommentSubmit} className="flex flex-col items-center">
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Add your comment here..."
              className="w-full h-24 p-4 border border-gray-300 rounded-lg mb-4 resize-none"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-600 transition-colors"
            >
              Submit Comment
            </button>
          </form>
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Comments</h3>
            <ul>
              {characterComments.length > 0 ? (
                characterComments.map((comment, index) => (
                  <li key={index} className="border-b border-gray-300 py-2">{comment}</li>
                ))
              ) : (
                <p className="text-gray-600 text-center">No comments yet.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
