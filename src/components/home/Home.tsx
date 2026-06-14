import Hero from "./Hero";
import Members from "./Members";
import DomainOfIntervention from "./DomainOfIntervention";
import Mission from "./Mission";
import Vission from "./Vission";
import LatestNews from "./LatestNews";
import PopupModal from "./Modal";
import CommingSoon from "../ComingSoon";
import { v4 as uuidv4 } from "uuid";

const Home: React.FC = async () => {
  const referenceId = uuidv4();
  console.log('mtn ref', referenceId)
    return (
      <main className="container-fluid p-0">
        <Hero />
        <DomainOfIntervention />
        <LatestNews />
        <Mission />
        <Vission />
        <PopupModal />
        {/* <CommingSoon text="website comming soon!"/> */}
      </main>
    );
};

export default Home;
