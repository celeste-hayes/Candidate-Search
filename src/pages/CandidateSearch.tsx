import { Card, Button } from 'react-bootstrap';
import githubPlaceholder from '../assets/github_placeholder.svg';
import '../index.css';
//import { useState, useEffect } from 'react';//
//import { searchGithub, searchGithubUser } from '../api/API';//


const CandidateSearch = () => {
  return (
    <div className="main">
      <h1>Candidate Search</h1>
      <Card className="card" style={{ width: '18rem', borderRadius: '15px' }}>
        <Card.Img className="candidate-img" src={githubPlaceholder} alt="Candidate" />
        <Card.Body>
          <Card.Title>Candidate Name</Card.Title>
          <Card.Text>Location:</Card.Text>
          <Card.Text>Email:</Card.Text>
          <Card.Text>Company:</Card.Text>
          <Card.Text>Bio:</Card.Text>
        </Card.Body>
      </Card>
      {/* Button Container */}
      <div className="button-container">
        <Button className="reject" variant="danger">-</Button>
        <Button className="approve" variant="success">+</Button>
      </div>
    </div>
  );
};

export default CandidateSearch;