import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import OpportunityCard from '../components/OpportunityCard';
import { API_URL } from '../config';
import './OpportunityList.css';

type EligibilityStatus = 'eligible' | 'possibly_eligible' | 'not_eligible';

interface Opportunity {
  id: string;
  title: string;
  category: string;
  description: string;
  eligibilityStatus: EligibilityStatus;
  eligibilityReason: string;
  benefits: string;
  requiredDocuments: string[];
  startDate: string;
  deadline: string;
  officialLink: string;
}

interface UserProfile {
  category: string;
  attributes: Record<string, any>;
}

const OpportunityList = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const getCategoryTitle = () => {
    switch (category) {
      case 'hackathons':
        return 'Hackathons';
      case 'scholarships':
        return 'Scholarships';
      case 'government_schemes':
        return 'Government Schemes';
      default:
        return 'Opportunities';
    }
  };

  const handleSubmit = async (profile: UserProfile) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/opportunities/match`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category,
          attributes: profile.attributes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch opportunities');
      }

      const data = await response.json();
      setOpportunities(data.opportunities || []);
      setShowResults(true);
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to fetch opportunities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="opportunity-list">
      <div className="container">
        <header className="page-header">
          <button onClick={handleBack} className="back-button" aria-label="Go back to categories">
            ← Back
          </button>
          <h1>{getCategoryTitle()}</h1>
        </header>

        {!showResults ? (
          <div className="form-section">
            <ProfileForm category={category || ''} onSubmit={handleSubmit} loading={loading} />
          </div>
        ) : (
          <div className="results-section">
            <div className="results-header">
              <h2>Matching Opportunities</h2>
              <button onClick={() => setShowResults(false)} className="edit-button">
                Edit Profile
              </button>
            </div>

            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}

            {opportunities.length === 0 ? (
              <div className="no-results">
                <p>No opportunities found matching your profile.</p>
                <p>Try adjusting your criteria or check back later.</p>
              </div>
            ) : (
              <div className="opportunities-grid">
                {opportunities.map((opportunity) => (
                  <OpportunityCard key={opportunity.id} opportunity={opportunity} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunityList;
