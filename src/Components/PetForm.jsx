import { useState, useEffect } from "react";

function PetForm({ onAdd, onUpdate, editingPet, setEditingPet }) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    age: "",
    food: "",
    notes: "",
  });

  useEffect(() => {
    if (editingPet) setForm(editingPet);
    else setForm({ name: "", type: "", age: "", food: "", notes: "" });
  }, [editingPet]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.type) return alert("İsim ve tür zorunludur!");
    if (editingPet) onUpdate(form);
    else onAdd(form);
    setForm({ name: "", type: "", age: "", food: "", notes: "" });
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-6 max-w-xl mx-auto">
      <h2
        className="font-semibold mb-4"
        style={{ color: "#1B6E4B", fontSize: "16px" }}
      >
        {editingPet ? "✏️ Hayvanı Güncelle" : "➕ Yeni Hayvan Ekle"}
      </h2>

      {["name", "type", "age", "food", "notes"].map((field) => (
        <div key={field} className="mb-3">
          <label
            className="block font-semibold uppercase mb-1"
            style={{ fontSize: "10px", letterSpacing: "0.06em", color: "#2C2C2A" }}
          >
            {field === "name" ? "Hayvan Adı *" :
             field === "type" ? "Tür (kedi, köpek...) *" :
             field === "age" ? "Yaş" :
             field === "food" ? "Mama Türü" : "Notlar"}
          </label>
          <input
            name={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:outline-none"
            style={{ fontSize: "11px", color: "#5F5E5A" }}
            onFocus={(e) => e.target.style.borderColor = "#1B6E4B"}
            onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
          />
        </div>
      ))}

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleSubmit}
          className="text-white px-4 py-2 rounded-lg w-full font-semibold"
          style={{ backgroundColor: "#1B6E4B", fontSize: "11px" }}
        >
          {editingPet ? "Güncelle" : "Ekle"}
        </button>
        {editingPet && (
          <button
            onClick={() => setEditingPet(null)}
            className="px-4 py-2 rounded-lg w-full font-semibold"
            style={{ backgroundColor: "#F5F4F0", color: "#5F5E5A", fontSize: "11px" }}
          >
            İptal
          </button>
        )}
      </div>
    </div>
  );
}

export default PetForm;