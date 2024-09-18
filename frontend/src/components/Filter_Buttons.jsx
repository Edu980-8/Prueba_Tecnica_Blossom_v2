import { useCharacterContext } from "./CharacterContext";

const Filter_Buttons = ({ filterType, options }) => {
  const { setStatusFilter, setSpeciesFilter, setGenderFilter } = useCharacterContext();

  const handleFilterChange = (value) => {
    switch (filterType) {
      case "status":
        setStatusFilter(value);
        break;
      case "species":
        setSpeciesFilter(value);
        break;
      case "gender":
        setGenderFilter(value);
        break;
      default:
        break;
    }
  };

  // Determina el título basado en el tipo de filtro
  const getTitle = () => {
    switch (filterType) {
      case "status":
        return "Status";
      case "species":
        return "Species";
      case "gender":
        return "Gender";
      default:
        return "Filter";
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-gray-400 text-[0.875rem] font-weight-[500] mb-[0.375rem]">{getTitle()}</h3>
      <div className="grid grid-cols-4 gap-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleFilterChange(option)}
            className="w-full  py-2 border border-gray-300 rounded-lg  hover:bg-primary-100 hover:text-primary-600 focus:outline-none focus:ring-2"
          >
            {option || "All"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter_Buttons;
