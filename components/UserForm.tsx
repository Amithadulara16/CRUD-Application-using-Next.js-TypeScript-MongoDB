"use client";

import { useEffect, useState } from "react";

export default function UserForm({ onSuccess, editingUser }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [editingUser]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    // API call එකට content-type එක එකතු කිරීම වඩාත් සුදුසුයි
    const method = editingUser ? "PUT" : "POST";
    const url = editingUser ? `/api/users/${editingUser._id}` : "/api/users";

    await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    setName("");
    setEmail("");
    onSuccess();
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow-md border border-gray-100" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {editingUser ? "Update User" : "Add New User"}
      </h2>

      <div className="space-y-4">
        <input
          className="border border-gray-300 p-3 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="border border-gray-300 p-3 w-full rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 rounded-md transition-all shadow-md"
        >
          {editingUser ? "Update User Details" : "Add User"}
        </button>
      </div>
    </form>
  );
}