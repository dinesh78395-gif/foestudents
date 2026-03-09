import { useState } from 'react';
import './OpportunityCard.css';

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

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const OpportunityCard = ({ opportunity }: OpportunityCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const getStatusColor = () => {
    switch (opportunity.eligibilityStatus) {
      case 'eligible':
        return '#4CAF50';
      case 'possibly_eligible':
        return '#FF9800';
      case 'not_eligible':
        return '#f44336';
      default:
        return '#999';
    }
  };

  const getStatusText = () => {
    switch (opportunity.eligibilityStatus) {
      case 'eligible':
        return 'Eligible';
      case 'possibly_eligible':
        return 'Possibly Eligible';
      case 'not_eligible':
        return 'Not Eligible';
      default:
        return 'Unknown';
    }
  };

  const getDaysUntilDeadline = () => {
    const deadline = new Date(opportunity.deadline);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysUntilDeadline();
  const isUrgent = daysRemaining <= 7 && daysRemaining > 0;

  const handleApplyClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmRedirect = () => {
    window.open(opportunity.officialLink, '_blank', 'noopener,noreferrer');
    setShowConfirmation(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="opportunity-card">
        <div className="card-header">
          <h3>{opportunity.title}</h3>
          <span
            className="status-badge"
            style={{ backgroundColor: getStatusColor() }}
            aria-label={`Eligibility status: ${getStatusText()}`}
          >
            {getStatusText()}
          </span>
        </div>

        <p className="description">{opportunity.description}</p>

        <div className="eligibility-reason">
          <strong>Why:</strong> {opportunity.eligibilityReason}
        </div>

        <div className="deadline-info">
          <span className={`deadline ${isUrgent ? 'urgent' : ''}`}>
            {isUrgent && '⚠️ '}
            Deadline: {formatDate(opportunity.deadline)}
            {daysRemaining > 0 && ` (${daysRemaining} days remaining)`}
            {daysRemaining === 0 && ' (Today!)'}
            {daysRemaining < 0 && ' (Expired)'}
          </span>
        </div>

        <button
          className="details-toggle"
          onClick={() => setShowDetails(!showDetails)}
          aria-expanded={showDetails}
          aria-label={showDetails ? 'Hide details' : 'Show details'}
        >
          {showDetails ? '▼ Hide Details' : '▶ Show Details'}
        </button>

        {showDetails && (
          <div className="details-section">
            <div className="detail-item">
              <strong>Benefits:</strong>
              <p>{opportunity.benefits}</p>
            </div>

            <div className="detail-item">
              <strong>Required Documents:</strong>
              <ul>
                {opportunity.requiredDocuments.map((doc, index) => (
                  <li key={index}>{doc}</li>
                ))}
              </ul>
            </div>

            <div className="detail-item">
              <strong>Application Timeline:</strong>
              <p>Start: {formatDate(opportunity.startDate)}</p>
              <p>Deadline: {formatDate(opportunity.deadline)}</p>
            </div>
          </div>
        )}

        <button
          className="apply-button"
          onClick={handleApplyClick}
          disabled={daysRemaining < 0}
          aria-label={`Apply for ${opportunity.title}`}
        >
          {daysRemaining < 0 ? 'Application Closed' : 'Apply Now →'}
        </button>
      </div>

      {showConfirmation && (
        <div className="modal-overlay" onClick={() => setShowConfirmation(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Leaving Opportunity Navigator</h3>
            <p>
              You are about to be redirected to the official application portal.
              Please complete your application there.
            </p>
            <div className="modal-actions">
              <button
                className="modal-button cancel"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="modal-button confirm"
                onClick={handleConfirmRedirect}
              >
                Continue to Official Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OpportunityCard;
