import './App.css';
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
function App() {
  const [search, setSearch] = useState("");
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        </Routes>
        </main>
      <Footer />
    </BrowserRouter>
    
  );
}

export default App;
