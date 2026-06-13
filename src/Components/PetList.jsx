function PetList({ pets, onDelete, onEdit }) {
  if (pets.length === 0) {
    return (
      <p className="text-center mt-10" style={{ color: "#888780", fontSize: "11px" }}>
        Henüz kayıtlı hayvan yok. Eklemek için formu kullan! 🐾
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto grid gap-4">
      {pets.map((pet) => (
        <div
          key={pet.id}
          className="bg-white rounded-2xl shadow p-5 flex justify-between items-start"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="px-2 py-1 rounded-full text-white font-bold"
                style={{ backgroundColor: "#F5A623", fontSize: "8px" }}
              >
                🐾
              </span>
              <h3
                className="font-bold"
                style={{ color: "#1B6E4B", fontSize: "16px" }}
              >
                {pet.name}
              </h3>
            </div>
            <p style={{ color: "#5F5E5A", fontSize: "11px", lineHeight: "1.5" }}>
              <span className="font-semibold" style={{ color: "#2C2C2A" }}>Tür:</span> {pet.type}
            </p>
            {pet.age && (
              <p style={{ color: "#5F5E5A", fontSize: "11px", lineHeight: "1.5" }}>
                <span className="font-semibold" style={{ color: "#2C2C2A" }}>Yaş:</span> {pet.age}
              </p>
            )}
            {pet.food && (
              <p style={{ color: "#5F5E5A", fontSize: "11px", lineHeight: "1.5" }}>
                <span className="font-semibold" style={{ color: "#2C2C2A" }}>Mama:</span> {pet.food}
              </p>
            )}
            {pet.notes && (
              <p style={{ color: "#888780", fontSize: "10px", lineHeight: "1.5", marginTop: "4px" }}>
                Not: {pet.notes}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2 ml-4">
            <button
              onClick={() => onEdit(pet)}
              className="text-white px-3 py-1 rounded-lg font-semibold"
              style={{ backgroundColor: "#F5A623", fontSize: "10px" }}
            >
              ✏️ Düzenle
            </button>
            <button
              onClick={() => onDelete(pet.id)}
              className="text-white px-3 py-1 rounded-lg font-semibold"
              style={{ backgroundColor: "#E24B4A", fontSize: "10px" }}
            >
              🗑️ Sil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PetList;