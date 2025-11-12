interface RideCardProps {
  author: string;
  arrivalPlace: string;
  departurePlace: string;
  remainingPlaces: number;
  authorEmail: string;
  authorPhone: string;
}

export default function RideCard({
  author,
  arrivalPlace,
  departurePlace,
  remainingPlaces,
  authorEmail,
  authorPhone
}: RideCardProps) {
  return (
    <>
      <div className="flex flex-col p-3 bg-background border-primary border-4 w-1/5 rounded-2xl gap-6">
        <div className="flex justify-center">
          <h3 className="text-2xl text-text">{author}</h3>
        </div>
        <div className="flex gap-3">
          <p className="text-primary border-b">{departurePlace}</p>
          <p>à destination de :</p>
          <p className="text-primary border-b">{arrivalPlace}</p>
        </div>
        <div>
          <p>Il y a encore : {remainingPlaces} places disponibles.</p>
        </div>
        <div>
          <p>Email : {authorEmail}</p>
          <p>Téléphone : {authorPhone}</p>
        </div>
        <button className="text-background bg-primary rounded-full px-10 py-1">
          Réserver
        </button>
      </div>
    </>
  );
}
