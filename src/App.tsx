import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CardPage from "./components/Card/CardPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
