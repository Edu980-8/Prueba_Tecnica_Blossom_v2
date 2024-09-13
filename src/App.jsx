import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterList from "../src/components/CharacterList";
import CharacterDetails from "../src/components/CharacterDetails";
import { CharacterProvider } from "../src/components/CharacterContext";

const App = () => {
  return (
    <CharacterProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/details/:id" element={<CharacterDetails />} />
        </Routes>
      </Router>
    </CharacterProvider>
  );
};

export default App;
