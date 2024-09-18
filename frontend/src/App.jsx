import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import { CharacterProvider } from "./components/CharacterContext";

const App = () => {
  return (
    <CharacterProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </Router>
    </CharacterProvider>
  );
};

export default App;
