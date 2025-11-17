'use client'

import { useState, useEffect } from "react";
import Footer from "../src/container/footer";
import Header from "../src/container/header";

export default function Page() {
    const [rides, setRides] = useState<any[]>([]); // état pour stocker toutes les routes
    const [loading, setLoading] = useState(true); // état pour indiquer le chargement
    const [error, setError] = useState<string | null>(null); // état pour gérer les erreurs

    const url = "http://localhost:3001/rides/allRides";

    // Charger les rides au montage du composant
    useEffect(() => {
        const fetchRides = async () => {
            try {
                const res = await fetch(url, {
                    method : "GET",
                    credentials : "include"
                })
                if (!res.ok) throw new Error("Erreur serveur");
                const data = await res.json();
                setRides(data);
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Une erreur est survenue");
            } finally {
                setLoading(false);
            }
        };

        fetchRides();
    }, []);

    return (
        <>
            <Header />

            <main className="p-8">
                <h1 className="text-3xl mb-4">Toutes les routes</h1>

                {loading && <p>Chargement des routes...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && rides.length === 0 && <p>Aucune route trouvée.</p>}

                {!loading && !error && rides.length > 0 && (
                    <ul className="space-y-2">
                        {rides.map((ride, index) => (
                            <li key={index} className="border p-2 rounded">
                                <p><strong>Départ :</strong> {ride.departure}</p>
                                <p><strong>Arrivée :</strong> {ride.arrival}</p>
                                <p><strong>Conducteur :</strong> {ride.conducer}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </main>

            <Footer />
        </>
    );
}
