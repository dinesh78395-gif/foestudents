import { ChangeEvent } from 'react';

interface HackathonsFormProps {
  formData: Record<string, any>;
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
  onValidationError: (errors: Record<string, string>) => void;
}

const HackathonsForm = ({ formData, errors, onChange }: HackathonsFormProps) => {
  const fieldsOfInterest = [
    'Web Development',
    'Mobile Development',
    'AI/Machine Learning',
    'Blockchain',
    'IoT',
    'Cybersecurity',
    'Data Science',
    'Game Development',
    'Cloud Computing',
    'DevOps'
  ];

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const handleInterestChange = (interest: string, checked: boolean) => {
    const currentInterests = formData.fieldOfInterest || [];
    if (checked) {
      onChange('fieldOfInterest', [...currentInterests, interest]);
    } else {
      onChange('fieldOfInterest', currentInterests.filter((i: string) => i !== interest));
    }
  };

  return (
    <>
      <div className="form-group">
        <label>
          Field of Interest <span className="required">*</span>
        </label>
        <div className="checkbox-group">
          {fieldsOfInterest.map((interest) => (
            <div key={interest} className="checkbox-item">
              <input
                type="checkbox"
                id={`interest-${interest}`}
                checked={(formData.fieldOfInterest || []).includes(interest)}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleInterestChange(interest, e.target.checked)}
                aria-label={interest}
              />
              <label htmlFor={`interest-${interest}`}>{interest}</label>
            </div>
          ))}
        </div>
        {errors.fieldOfInterest && <span className="error-text">{errors.fieldOfInterest}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="skillLevel">
          Skill Level <span className="required">*</span>
        </label>
        <select
          id="skillLevel"
          value={formData.skillLevel || ''}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange('skillLevel', e.target.value)}
          className={errors.skillLevel ? 'error' : ''}
          required
          aria-required="true"
          aria-invalid={!!errors.skillLevel}
          aria-describedby={errors.skillLevel ? 'skillLevel-error' : undefined}
        >
          <option value="">Select skill level</option>
          {skillLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        {errors.skillLevel && <span id="skillLevel-error" className="error-text">{errors.skillLevel}</span>}
      </div>

      <div className="form-group">
        <label>
          Location Preference <span className="required">*</span>
        </label>
        <div className="radio-group">
          <div className="radio-item">
            <input
              type="radio"
              id="location-online"
              name="locationPreference"
              value="Online"
              checked={formData.locationPreference === 'Online'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('locationPreference', e.target.value)}
              aria-label="Online"
            />
            <label htmlFor="location-online">Online</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="location-offline"
              name="locationPreference"
              value="Offline"
              checked={formData.locationPreference === 'Offline'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('locationPreference', e.target.value)}
              aria-label="Offline"
            />
            <label htmlFor="location-offline">Offline</label>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id="location-both"
              name="locationPreference"
              value="Both"
              checked={formData.locationPreference === 'Both'}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('locationPreference', e.target.value)}
              aria-label="Both"
            />
            <label htmlFor="location-both">Both</label>
          </div>
        </div>
        {errors.locationPreference && <span className="error-text">{errors.locationPreference}</span>}
      </div>
    </>
  );
};

export default HackathonsForm;
