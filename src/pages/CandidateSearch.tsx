import { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import githubPlaceholder from '../assets/github_placeholder.svg';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from "../interfaces/Candidate.interface";
import '../index.css';

const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 5;

  const fetchNextCandidate = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const users = await searchGithub();
      if (!users?.[0]) {
        throw new Error('No users available');
      }

      const detailedUser = await searchGithubUser(users[0].login);
      setCurrentCandidate(detailedUser);
      setRetryCount(0);
    } catch (err) {
      console.error('Error fetching candidate:', err);

      if (retryCount < MAX_RETRIES) {
        setRetryCount((prev) => prev + 1);
        setTimeout(fetchNextCandidate, 2000);
      } else {
        setError('Unable to load candidate. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNextCandidate();
  }, []);

  const handleAccept = async () => {
    if (currentCandidate) {
      const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
      const candidateToSave = {
        id: currentCandidate.id,
        login: currentCandidate.login,
        avatar_url: currentCandidate.avatar_url || githubPlaceholder,
        location: currentCandidate.location || 'N/A',
        email: currentCandidate.email || 'N/A',
        company: currentCandidate.company || 'N/A',
        bio: currentCandidate.bio || 'No bio available'
      };

      localStorage.setItem('savedCandidates', JSON.stringify([...savedCandidates, candidateToSave]));
    }
    await fetchNextCandidate();
  };

  const handleReject = () => {
    fetchNextCandidate();
  };

  const handleRetry = () => {
    setRetryCount(0);
    fetchNextCandidate();
  };

  return (
    <div className="main">
      <h1>Candidate Search</h1>

      {isLoading && <p>Loading...</p>}
      {error && (
        <div>
          <p>{error}</p>
          <Button onClick={handleRetry}>Retry</Button>
        </div>
      )}

      {currentCandidate && (
        <Card className="card" style={{ width: '18rem', borderRadius: '15px' }}>
          <Card.Img
            className="candidate-img"
            src={currentCandidate.avatar_url || githubPlaceholder}
            alt={currentCandidate.login}
          />
          <Card.Body>
            <Card.Title>{currentCandidate.login || 'No Name Available'}</Card.Title>
            <Card.Text><strong>Location:</strong> {currentCandidate.location || 'Not provided'}</Card.Text>
            <Card.Text><strong>Email:</strong> {currentCandidate.email || 'Not available'}</Card.Text>
            <Card.Text><strong>Company:</strong> {currentCandidate.company || 'Not available'}</Card.Text>
            <Card.Text><strong>Bio:</strong> {currentCandidate.bio || 'No bio available'}</Card.Text>
          </Card.Body>
        </Card>
      )}
      <div className="button-container">
        <Button className="reject" variant="danger" onClick={handleReject}>-</Button>
        <Button className="approve" variant="success" onClick={handleAccept}>+</Button>
      </div>
    </div>
  );
};

export default CandidateSearch;