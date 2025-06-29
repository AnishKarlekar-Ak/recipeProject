// App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import axios from "axios";
import Index from "./pages/index";
import Recipes from "./pages/Recipes";
import RecipePage from "./pages/RecipePage";
import Contact from "./pages/Contact";
import About from "./pages/About";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
