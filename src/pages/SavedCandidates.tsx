import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import githubPlaceholder from '../assets/github_placeholder.svg';
import type Candidate from '../interfaces/Candidate.interface';
import '../index.css';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);

  const handleReject = (candidateId: number) => {
    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.id !== candidateId
    );
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <div className="main">
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <div>
          <p style={{ marginTop: '50px' }}>No candidates saved. Please navigate back to the home page and search for candidates.</p>
          <Button className="home btn" onClick={handleNavigateHome} style={{ display: 'block', margin: '0 auto' }} variant="dark">
            Go to Home Page
          </Button>
        </div>
      ) : (
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
              {savedCandidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td className="image-column">
                    <img
                      src={candidate.avatar_url || githubPlaceholder}
                      alt={candidate.login}
                    />
                  </td>
                  <td>{candidate.login || 'No Name Available'}</td>
                  <td>{candidate.location || 'Not provided'}</td>
                  <td>{candidate.email || 'Not available'}</td>
                  <td>{candidate.company || 'Not available'}</td>
                  <td className="bio-column">{candidate.bio || 'No bio available'}</td>
                  <td>
                    <Button
                      className="btn btn-danger"
                      onClick={() => handleReject(candidate.id)}
                    >
                      -
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default SavedCandidates;