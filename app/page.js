"use client";

import { useEffect, useState } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

export default function Page() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  const fetchItems = async () => {
    const res = await fetch("/api/items");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleItemCreated = (item) => {
    setItems((prevItems) => {
      if (itemToEdit) {
        return prevItems.map((i) => (i.id === item.id ? item : i));
      }
      return [...prevItems, item];
    });
    setItemToEdit(null);
  };

  const handleEdit = (item) => {
    setItemToEdit(item);
  };

  const handleDelete = async (id) => {
    await fetch("/api/items", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <h1 className="title">CRUD Operations</h1>
      <ItemForm onItemCreated={handleItemCreated} itemToEdit={itemToEdit} />
      <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
