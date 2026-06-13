import { useState, useEffect } from "react";
import PetForm from "./Components/PetForm";
import PetList from "./Components/PetList";

function App() {
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("pets");
    if (saved) setPets(JSON.parse(saved));
  }, []);

  const savePets = (newPets) => {
    setPets(newPets);
    localStorage.setItem("pets", JSON.stringify(newPets));
  };

  const addPet = (pet) => {
    const newPets = [...pets, { ...pet, id: Date.now() }];
    savePets(newPets);
  };

  const updatePet = (updatedPet) => {
    const newPets = pets.map((p) => (p.id === updatedPet.id ? updatedPet : p));
    savePets(newPets);
    setEditingPet(null);
  };

  const deletePet = (id) => {
    const newPets = pets.filter((p) => p.id !== id);
    savePets(newPets);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F4F0" }}>
      <header style={{ backgroundColor: "#1B6E4B" }} className="py-5 px-6 shadow-md mb-8">
        <h1
          className="text-center text-white font-bold"
          style={{ fontSize: "17px", letterSpacing: "-0.3px" }}
        >
          🐾 Evcil Hayvan Takip Uygulaması
        </h1>
      </header>
      <div className="px-4">
        <PetForm
          onAdd={addPet}
          onUpdate={updatePet}
          editingPet={editingPet}
          setEditingPet={setEditingPet}
        />
        <PetList pets={pets} onDelete={deletePet} onEdit={setEditingPet} />
      </div>
    </div>
  );
}

export default App;