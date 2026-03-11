import { useState, type FormEvent } from 'react';
import GovernmentSchemesForm from './forms/GovernmentSchemesForm';
import ScholarshipsForm from './forms/ScholarshipsForm';
import HackathonsForm from './forms/HackathonsForm';
import './ProfileForm.css';

interface UserProfile {
  category: string;
  attributes: Record<string, any>;
}

interface ProfileFormProps {
  category: string;
  onSubmit: (profile: UserProfile) => void;
  loading: boolean;
}

const ProfileForm = ({ category, onSubmit, loading }: ProfileFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const profile: UserProfile = {
      category,
      attributes: formData,
    };

    onSubmit(profile);
  };

  const renderForm = () => {
    switch (category) {
      case 'government_schemes':
        return (
          <GovernmentSchemesForm
            formData={formData}
            errors={errors}
            onChange={handleFieldChange}
            onValidationError={setErrors}
          />
        );
      case 'scholarships':
        return (
          <ScholarshipsForm
            formData={formData}
            errors={errors}
            onChange={handleFieldChange}
            onValidationError={setErrors}
          />
        );
      case 'hackathons':
        return (
          <HackathonsForm
            formData={formData}
            errors={errors}
            onChange={handleFieldChange}
            onValidationError={setErrors}
          />
        );
      default:
        return <p>Invalid category selected</p>;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <h2>Enter Your Profile</h2>
      <p className="form-description">
        Fill in your details to find matching opportunities
      </p>

      {renderForm()}

      <button
        type="submit"
        className="submit-button"
        disabled={loading}
        aria-label="Find matching opportunities"
      >
        {loading ? 'Searching...' : 'Find Opportunities'}
      </button>
    </form>
  );
};

export default ProfileForm;
