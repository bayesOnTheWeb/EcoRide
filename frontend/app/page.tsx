

import RideCard from "./src/container/RideCard";
import RedirectButton from "./src/ui/redirectButton";
import UserInput from "./src/ui/userInput";

export default function Home() {
  return (
  <>
  <div className="p-8">
  <RedirectButton label={"clickMe"} redirectTo={'/test'} isPrimary={true} />
  <UserInput label={"renseignez votre prénom"} type={"text"} name={"name"} placeholder={"prénom"} />
  <RideCard author={"pierre"} arrivalPlace={"Paris"} departurePlace={"Montpellier"} remainingPlaces={3} authorEmail={"pierre@email.com"} authorPhone={"06 25 63 97 98"} />
  </div>


  </>

);
}
