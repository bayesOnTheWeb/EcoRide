'use client'

import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:3001/user/me", {
          credentials: "include", // 🔑 pour envoyer le cookie
        });
        if (!res.ok) throw new Error("Non autorisé");

        const data = await res.json();
        console.log(data)
        setUser(data.user);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Utilisateur non connecté</p>; // si fetch échoue ou token invalide

  return (
    <div>
      <h1>Bienvenue sur le dashboard</h1>
      <h2>{user.firstname} {user.lastname}</h2>
      <p>Email : {user.email}</p>
    </div>
  );
}
