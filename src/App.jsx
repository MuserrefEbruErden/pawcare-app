import { useState, useEffect } from "react";
import PetForm from "./Components/PetForm";
import PetList from "./Components/PetList";

const defaultPets = [
  { id: 1, name: "Pamuk", type: "Kedi", age: "2", food: "Whiskas", notes: "Aşıları tam" },
  { id: 2, name: "Tarçın", type: "Köpek", age: "1", food: "Pronature", notes: "Kısır" },
  { id: 3, name: "Boncuk", type: "Muhabbet Kuşu", age: "1", food: "Bonnie", notes: "Bonnie marka dışında yem yemiyor" },
  { id: 4, name: "Mavi", type: "Beta Balığı", age: "3 aylık", food: "Tetra GoldFish", notes: "Tek başına yaşaması gerek" },
  { id: 5, name: "Karamel", type: "Kedi", age: "3", food: "Royal Canin", notes: "İç mekan kedisi" },
  { id: 6, name: "Fıstık", type: "Köpek", age: "4", food: "Hills", notes: "Her gün yürüyüş lazım" },
  { id: 7, name: "Minnoş", type: "Kedi", age: "1", food: "Felix", notes: "Yeni alındı" },
  { id: 8, name: "Zeytin", type: "Tavşan", age: "2", food: "Timothy otu", notes: "Serbest dolaşıyor" },
  { id: 9, name: "Sarı", type: "Kanarya", age: "1", food: "Trill", notes: "Sabah erken ötüyor" },
  { id: 10, name: "Papatya", type: "Kedi", age: "5", food: "Purina", notes: "Yaşlı, özel mama gerekiyor" },
];

function App() {
  const [pets, setPets] = useState([]);
  const [editingPet, setEditingPet] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("pets");
    if (saved) {
      setPets(JSON.parse(saved));
    } else {
      setPets(defaultPets);
      localStorage.setItem("pets", JSON.stringify(defaultPets));
    }
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
