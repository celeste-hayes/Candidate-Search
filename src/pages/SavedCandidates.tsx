import '../index.css';
import githubPlaceholder from '../assets/github_placeholder.svg';
import Table from 'react-bootstrap/Table';

const candidates = [
  {
    id: 1,
    image: githubPlaceholder,
    name: 'John Doe',
    location: 'New York, USA',
    email: 'john.doe@example.com',
    company: 'Acme Corp.',
    bio: 'A passionate developer with 5 years of experience in frontend development.'
  },
  {
    id: 2,
    image: githubPlaceholder,
    name: 'Jane Smith',
    location: 'San Francisco, USA',
    email: 'jane.smith@example.com',
    company: 'Tech Solutions',
    bio: 'Full-stack engineer with a focus on building scalable applications.'
  }
];

const SavedCandidates = () => {
  return (
    <div className="main">
      <h1>Potential Candidates</h1>

      <div className="table-container">
        <Table variant="dark" striped bordered hover responsive>
          <thead>
            <tr>
              <th className="image-column">Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th className="bio-column">Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td className="image-column">
                  <img
                    src={candidate.image || githubPlaceholder}
                    alt={candidate.name}
                  />
                </td>
                <td>{candidate.name}</td>
                <td>{candidate.location}</td>
                <td>{candidate.email}</td>
                <td>{candidate.company}</td>
                <td className="bio-column">{candidate.bio}</td>
                <td>
                  <button className="btn btn-danger">-</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default SavedCandidates;