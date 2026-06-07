import { members } from "@/data/members";
import { Title2 } from "../common/Headings";

const Members: React.FC = () => {
    return (
       
        <section>
            <Title2 title="executive members"/>
        <table className="table table-bordered">
          <thead style={{ backgroundColor: '#DCDCDC' }}>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">position</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr className="bg-light" key={member.id}>
                <td className="text-uppercase">{member.name}</td>
                <td className="text-uppercase">{member.position}</td>
              </tr>
            ))}
  
          </tbody>
        </table>
      </section>
       
    );
  };
  
  export default Members;
  