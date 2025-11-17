"use client";

import { useState, useEffect } from "react";
import Header from "../src/container/header";
import Footer from "../src/container/footer";
import RedirectButton from "../src/ui/redirectButton";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:3001/user/me", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Non autorisé");

        const data = await res.json();
        console.log(data);
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

  async function handleLogout() {
  try {
    // Appel au backend pour supprimer le cookie si nécessaire
    await fetch("http://localhost:3001/auth/logout", {
      method: "POST",
      credentials: "include", // important si tu utilises cookies
    });

    // Redirection après déconnexion
    window.location.href = "/";
  } catch (err) {
    console.error("Erreur lors de la déconnexion :", err);
  }
}


  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Utilisateur non connecté</p>;
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center mx-20 sm:mx-150 gap-5">
        <div className="bg-primary rounded-2xl flex flex-col justify-center gap-3">
          <h1 className="text-background flex justify-center">
            Bienvenue sur le dashboard
          </h1>

          <h2 className="text-background flex justify-center">
            {user.firstname} {user.lastname}
          </h2>
          <p className="text-background flex justify-center">
            Email : {user.email}
          </p>
        </div>
        <div className="flex justify-center pb-100">
          <RedirectButton
            label={"accéder aux courses"}
            redirectTo={"/rides"}
            isPrimary={true}
          />
          <button className="bg-primary text-background text-2xl" onClick={handleLogout} type="button">se déconnecter</button>
        </div>
      </div>
      <Footer />
    </>
  );
}
