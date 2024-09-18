import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useCharacterContext } from "./CharacterContext";
import Filter_Buttons from "./Filter_Buttons";

const Filters = ({ filterFlag }) => {
  const { setSortOrder } = useCharacterContext();

  return (
    filterFlag && (
      <div className="flex flex-col gap-4 p-[1.5rem] border border-gray-200 rounded-[0.375rem] shadow-md">
        {/* Filtro por status */}
        <Filter_Buttons
          filterType="status"
          options={["", "Alive", "Dead", "Unknown"]}
        />

        {/* Filtro por especie */}
        <Filter_Buttons
          filterType="species"
          options={["", "Human", "Alien", "Unknown"]}
        />

        {/* Filtro por género */}
        <Filter_Buttons
          filterType="gender"
          options={["", "Male", "Female", "Unknown"]}
        />

        {/* Filtro por ordenamiento */}
        <div className="flex gap-[0.75rem] justify-center">
          <p className="mt-4 text-gray-600 font-bold text-[1rem]">Sort Order:</p>
          <button
            onClick={() => setSortOrder("asc")}
            className="mt-2 flex justify-center items-center w-[6.375rem] h-[2.75rem] px-[1.063rem] py-[0.625rem] text-black rounded-lg hover:bg-primary-100 hover:text-primary-600 focus:outline-none focus:ring-2"
          >
            <FaArrowUp />
          </button>
          <button
            onClick={() => setSortOrder("desc")}
            className="mt-2 flex justify-center items-center w-[6.375rem] h-[2.75rem] px-[1.063rem] py-[0.625rem] text-black rounded-lg hover:bg-primary-100 hover:text-primary-600 focus:outline-none focus:ring-2"
          >
            <FaArrowDown />
          </button>
        </div>
      </div>
    )
  );
};

export default Filters;
