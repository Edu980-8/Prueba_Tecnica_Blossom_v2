import { useParams, useNavigate } from "react-router-dom";
import { useCharacterContext } from "./CharacterContext";
import { FaArrowLeft, FaStar, FaRegStar } from "react-icons/fa";
import { useState } from "react";

const CharacterDetails = () => {
  const { id } = useParams();
  const { characters, favorites, toggleFavorite, addComment, comments } = useCharacterContext();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");

  // Encontrar el personaje seleccionado
  const character = characters.find((char) => char.id === id);

  if (!character) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-lg font-medium text-gray-600">Character not found</p>
      </div>
    );
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    addComment(character.id, comment);
    setComment(""); // Limpiar el campo de comentario después de enviarlo
  };

  const isFavorite = favorites.has(character.id);
  const characterComments = comments[character.id] || [];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8 px-4">
      <button
        onClick={handleBackClick}
        className="absolute top-4 left-4 flex items-center text-green-500 hover:text-green-600 text-lg font-semibold"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-8 max-w-3xl w-full">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 text-center">
          {character.name}
        </h1>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex-shrink-0 w-full lg:w-1/3 mb-6 lg:mb-0 relative">
            <img
              id={character.id}
              src={character.image}
              alt={character.name}
              className="w-full h-auto rounded-lg border-4 border-gray-300 shadow-xl transform transition-transform hover:scale-105"
            />
            <button
              onClick={() => toggleFavorite(character.id)}
              className="absolute top-2 right-2 text-yellow-500 hover:text-yellow-600"
              aria-label="Toggle Favorite"
            >
              {isFavorite ? <FaStar size={24} /> : <FaRegStar size={24} />}
            </button>
          </div>
          <div className="flex-1 lg:ml-8 text-center lg:text-left">
            <p className="text-lg font-medium text-green-600 mb-2 text-center lg:text-left">
              <span className="font-semibold text-gray-900">Species:</span> {character.species}
            </p>
            <p className="text-lg font-medium text-green-600 mb-2 text-center lg:text-left">
              <span className="font-semibold text-gray-900">Status:</span> {character.status}
            </p>
            <p className="text-lg font-medium text-green-600 mb-2 text-center lg:text-left">
              <span className="font-semibold text-gray-900">Gender:</span> {character.gender}
            </p>
            <p className="text-lg font-medium text-green-600 mb-4 text-center lg:text-left">
              <span className="font-semibold text-gray-900">Origin:</span> {character.origin}
            </p>
          </div>
        </div>
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
