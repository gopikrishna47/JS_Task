"use client";

import { useState } from "react";

export default function ItemForm({ onItemCreated, itemToEdit }) {
  const [name, setName] = useState(itemToEdit ? itemToEdit.name : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = itemToEdit ? "PUT" : "POST";
    const url = itemToEdit ? "/api/items" : "/api/items";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: itemToEdit ? itemToEdit.id : Date.now(),
        name,
      }),
    });

    const data = await res.json();
    onItemCreated(data);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
        required
      />
      <button type="submit">{itemToEdit ? "Update" : "Add"} Item</button>
    </form>
  );
}
