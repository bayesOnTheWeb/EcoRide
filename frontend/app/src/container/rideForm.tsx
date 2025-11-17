'use client'

import { useState } from "react";
import UserInput from "../ui/userInput";
import RedirectButton from "../ui/redirectButton";

export default function RideForm() {

    const url = "http://localhost:3001/rides/createRide"

    // État des champs
    const [formData, setFormData] = useState({
        arrival: '',
        departure: '',
        conducer: ''
    })

    // Mettre à jour les champs
    function HandleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    // Soumission du formulaire
    async function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        // Validation simple
        if (!formData.arrival || !formData.departure || !formData.conducer) {
            alert("Tous les champs doivent être remplis !");
            return;
        }

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (!res.ok) throw new Error("Erreur serveur");

            const data = await res.json()
            console.log("Réponse serveur :", data)
            alert("Route créée avec succès !")
        } catch (err) {
            console.error(err)
            alert("Erreur lors de la création de la route.")
        }
    }

    return (
        <div className="flex flex-col">
            <h1 className="flex justify-center text-4xl text-primary p-8">Création de route</h1>
            <form onSubmit={HandleSubmit} className="flex flex-col justify-center px-150 gap-4">
                <UserInput
                    label={"Arrivée"}
                    type={"text"}
                    name={"arrival"}
                    placeholder={"Entrez votre lieu d'arrivée"}
                    value={formData.arrival}
                    onChange={HandleChange}
                />
                <UserInput
                    label={"Départ"}
                    type={"text"}
                    name={"departure"}
                    placeholder={"Entrez votre lieu de départ"}
                    value={formData.departure}
                    onChange={HandleChange}
                />
                <UserInput
                    label={"Prénom du conducteur"}
                    type={"text"}
                    name={"conducer"}
                    placeholder={"Entrez votre prénom"}
                    value={formData.conducer}
                    onChange={HandleChange}
                />
                <button className="bg-primary text-background rounded-2xl text-2xl" type="submit">
                    Créer une route
                </button>
                <RedirectButton
                    label={"Retourner à mon profil"}
                    redirectTo={"/me"}
                    isPrimary={false}
                />
            </form>
        </div>
    );
}
