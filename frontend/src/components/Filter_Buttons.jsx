import { useCharacterContext } from "./CharacterContext";

const Filter_Buttons = ({ filterType, options }) => {
  const { statusFilter, speciesFilter, genderFilter, setStatusFilter, setSpeciesFilter, setGenderFilter } = useCharacterContext();

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

  // Obtener el filtro actual según el tipo
  const getSelectedFilter = () => {
    switch (filterType) {
      case "status":
        return statusFilter;
      case "species":
        return speciesFilter;
      case "gender":
        return genderFilter;
      default:
        return null;
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
            className={`w-full py-2 border border-gray-300 rounded-lg 
              ${getSelectedFilter() === option ? 'bg-primary-100 text-primary-600' : 'hover:bg-primary-100 hover:text-primary-600'} 
              focus:outline-none`}
          >
            {option === "Unknown" ? "Other" : option || "All"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filter_Buttons;
