"use client";

import { useEffect, useState } from "react";
import UserForm from "@/components/UserForm";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<any>(null);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (_id: string) => {
  await fetch(`/api/users/${_id}`, { method: "DELETE" });
  fetchUsers();
};

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">User Dashboard</h1>

      <div className="mb-8">
        <UserForm onSuccess={fetchUsers} editingUser={editingUser} />
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        {users.map((user, index) => (
          <div
            key={user._id}
            
            className={`flex justify-between items-center p-4 border-b last:border-b-0 transition-colors ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            } hover:bg-blue-50`}
          >
            <div>
              <p className="font-bold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setEditingUser(user)}
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md shadow-sm transition-all text-sm font-medium"
              >
                Edit
              </button>

              <button
                onClick={() => deleteUser(user._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-sm transition-all text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
//67s5lnrYkLbe5929
