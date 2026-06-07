import { Title2 } from "../common/Headings";

const DomainOfIntervention: React.FC = () => {
    return (
       
      <section className="container">
        <Title2 title="domain of intervention"/>
        <p style={{ color: 'Var(--softWhite)' }}>
            <span style={{ color: 'Var(--lightRed)' }}>
              <strong className="text-uppercase">development:</strong>
              {' '}
            </span>

             Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ducimus maxime ullam veritatis quae pariatur exercitationem odit voluptatum reprehenderit eos, magni libero, laborum dolore debitis dicta ipsum non explicabo. Nihil?
        </p>
        <p style={{ color: 'Var(--softWhite)' }}>
            <span style={{ color: 'Var(--lightRed)' }}>
              <strong className="text-uppercase">education:</strong>
              {' '}
            </span>

             Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ducimus maxime ullam veritatis quae pariatur exercitationem odit voluptatum reprehenderit eos, magni libero, laborum dolore debitis dicta ipsum non explicabo. Nihil?
        </p>
     </section>
       
    );
  };
  
  export default DomainOfIntervention;