"use client";

import { useEffect, useState } from "react";
import UserInput from "../ui/userInput";
import { redirect } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false); 
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (res.ok) {
        setMessage(result.message || "Connexion réussie !");
        setIsError(false);
        setEmail("");
        setPassword("");

        redirect('/')
      } else {
        setMessage(result.message || "Erreur lors de la connexion.");
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur réseau, veuillez réessayer.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col sm:px-100 sm:py-10 justify-center items-center">
      <h1 className="text-primary pb-20 text-4xl">CONNEXION</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:pt-20 gap-4 px-16 rounded-2xl w-full max-w-auto"
      >
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

        <button
          className="text-background bg-primary rounded-full px-10 py-2 font-bold hover:opacity-90 transition"
          type="submit"
          disabled={loading}
        >
          {loading ? "En cours..." : "Se connecter"}
        </button>

        {message && (
          <p
            className={`mt-2 text-center text-sm ${
              isError ? "text-error" : "text-primary"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
