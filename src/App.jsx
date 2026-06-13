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

  const catCount = pets.filter((p) => p.type.toLowerCase().includes("kedi")).length;
  const dogCount = pets.filter((p) => p.type.toLowerCase().includes("köpek")).length;
  const otherCount = pets.length - catCount - dogCount;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F4F0" }}>
      <header style={{ backgroundColor: "#1B6E4B" }} className="py-5 px-6 shadow-md mb-8">
        <h1 className="text-center text-white font-bold" style={{ fontSize: "20px" }}>
          🐾 PawCare
        </h1>
        <p className="text-center font-medium" style={{ color: "#a8d5b5", fontSize: "11px", marginTop: "2px" }}>
          Evcil Hayvan Takip Uygulaması
        </p>
      </header>
      <div className="max-w-xl mx-auto px-4">
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-2xl shadow p-4 text-center">
            <p className="font-bold" style={{ color: "#1B6E4B", fontSize: "28px" }}>{pets.length}</p>
            <p style={{ color: "#888780", fontSize: "10px" }}>Toplam</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 text-center">
            <p className="font-bold" style={{ color: "#F5A623", fontSize: "28px" }}>{catCount}</p>
            <p style={{ color: "#888780", fontSize: "10px" }}>🐱 Kedi</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 text-center">
            <p className="font-bold" style={{ color: "#1B6E4B", fontSize: "28px" }}>{dogCount}</p>
            <p style={{ color: "#888780", fontSize: "10px" }}>🐶 Köpek</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 text-center">
            <p className="font-bold" style={{ color: "#E24B4A", fontSize: "28px" }}>{otherCount}</p>
            <p style={{ color: "#888780", fontSize: "10px" }}>🐾 Diğer</p>
          </div>
        </div>
        <PetForm onAdd={addPet} onUpdate={updatePet} editingPet={editingPet} setEditingPet={setEditingPet} />
        <PetList pets={pets} onDelete={deletePet} onEdit={setEditingPet} />
      </div>
    </div>
  );
}

export default App;
