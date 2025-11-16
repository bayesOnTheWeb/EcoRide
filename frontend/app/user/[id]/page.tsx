import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const params = useParams<{ tag: string }>();
  const url = `http://localhost:3000/auth/${params.tag}`;
  console.log(params);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setLoading(false);
            setData(data);
          }
        } else {
          setLoading(false);
          setError("Erreur lors de la récupération des données utilisateur");
          return JSON.stringify({
            success: false,
            message: "Erreur lors de la récupération des données utilisateur",
          });
        }
      } catch (error) {
        setLoading(false);
        setError("Erreur serveur, veuillez rééssayer plus tard");
        return {
          success: false,
          message: "Erreur serveur, veuillez rééssayer plus tard",
        };
      }
    }

    fetchData();
  }, [params.tag]);

  return (
    <>
      {loading ? <p>Chargement...</p> : error ? <p>{error}</p> : <p>{data}</p>}
    </>
  );
}
