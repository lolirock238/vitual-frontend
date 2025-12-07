import { useState, useEffect } from "react";
import { fetchCategories, createItem, addItemImage } from "../api";
import "./AddItemForm.css";

export default function AddItemForm({ onItemAdded }) {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !categoryId) return;

    // 1️⃣ Create the item
    const item = await createItem(name, parseInt(categoryId));

    // 2️⃣ If an image is selected, convert to base64 and upload
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result;
        await addItemImage(base64, item.id);
        onItemAdded && onItemAdded();
      };
      reader.readAsDataURL(imageFile);
    } else {
      onItemAdded && onItemAdded();
    }

    // Reset form
    setName("");
    setCategoryId("");
    setImageFile(null);
  };

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
      >
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <button type="submit">Add Item</button>
    </form>
  );
}
