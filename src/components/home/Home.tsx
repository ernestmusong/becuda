import { Suspense } from "react";
import { Title } from "../common/Headings";
import Hero from "./Hero";
import Members from "./Members";
import DomainOfIntervention from "./DomainOfIntervention";
import Mission from "./Mission";

const Home: React.FC = async () => {
    return (
      <main className="container-fluid p-0">
        <Hero />
        <Members />
        <DomainOfIntervention />
        <Mission />
      </main>
    );
};

export default Home;
