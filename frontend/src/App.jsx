import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterList from "./components/CharacterList";
import CharacterDetails from "./components/CharacterComments";
import { CharacterProvider } from "./components/CharacterContext";

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
