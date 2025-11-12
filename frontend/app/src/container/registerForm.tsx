"use client";

import { useState } from "react";
import UserInput from "../ui/userInput";

export default function RegisterForm() {
  // Hooks pour chaque champ
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    if(confirmPassword != password){
      setMessage('Les mots de passe ne correspondent pas')
      return 
    }
    try {
      const res = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage(result.message || "Inscription réussie !")
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setMessage(result.message || "Erreur lors de l'inscription.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur réseau, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col sm:px-100 justify-center items-center ">
      <h1 className="text-primary pb-20 text-4xl">INSCRIPTION</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 px-16 rounded-2xl w-full max-w-auto"
      >
        <UserInput
          label="Prénom"
          type="text"
          name="firstname"
          placeholder="Entrez votre prénom"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <UserInput
          label="Nom de famille"
          type="text"
          name="lastname"
          placeholder="Entrez votre nom de famille"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <UserInput
          label="Adresse e-mail"
          type="email"
          name="email"
          placeholder="Entrez votre adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <UserInput
          label="Mot de passe"
          type="password"
          name="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <UserInput
          label="Confirmation mot de passe"
          type="password"
          name="confirmPassword"
          placeholder="Confirmez votre mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          className="text-background bg-primary rounded-full px-10 py-2 font-bold hover:opacity-90 transition"
          type="submit"
          disabled={loading}
        >
          {loading ? "En cours..." : "S'inscrire"}
        </button>

        {message && <p className="mt-2 text-center text-sm text-secondary">{message}</p>}
      </form>
    </div>
  );
}
