import { Suspense } from "react";
import { Title } from "../common/Headings";
import Hero from "./Hero";

const Home: React.FC = async () => {
    return (
      <main className="container-fluid p-0">
        <Hero />
      </main>
    );
};

export default Home;
