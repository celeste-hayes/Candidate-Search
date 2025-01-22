interface Candidate {
    id: number;
    login: string;
    avatar_url: string;
    location: string | null;
    email: string | null;
    company: string | null;
    bio: string | null;
}

export default Candidate;