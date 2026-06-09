import Hero from "./Hero";
import Members from "./Members";
import DomainOfIntervention from "./DomainOfIntervention";
import Mission from "./Mission";
import Vission from "./Vission";
import LatestNews from "./LatestNews";

const Home: React.FC = async () => {
    return (
      <main className="container-fluid p-0">
        <Hero />
        <DomainOfIntervention />
        <LatestNews />
        <Mission />
        <Vission />
      </main>
    );
};

export default Home;
