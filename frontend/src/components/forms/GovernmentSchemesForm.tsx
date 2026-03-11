import { type ChangeEvent } from 'react';

interface GovernmentSchemesFormProps {
  formData: Record<string, any>;
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
  onValidationError: (errors: Record<string, string>) => void;
}

const GovernmentSchemesForm = ({ formData, errors, onChange }: GovernmentSchemesFormProps) => {
  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const socialCategories = ['General', 'OBC', 'SC', 'ST', 'EWS'];

  return (
    <>
      <div className="form-group">
        <label htmlFor="age">
          Age <span className="required">*</span>
        </label>
        <input
          type="number"
          id="age"
          value={formData.age || ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('age', parseInt(e.target.value) || '')}
          className={errors.age ? 'error' : ''}
          min="0"
          max="120"
          required
          aria-required="true"
          aria-invalid={!!errors.age}
          aria-describedby={errors.age ? 'age-error' : undefined}
        />
        {errors.age && <span id="age-error" className="error-text">{errors.age}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="state">
          State <span className="required">*</span>
        </label>
        <select
          id="state"
          value={formData.state || ''}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange('state', e.target.value)}
          className={errors.state ? 'error' : ''}
          required
          aria-required="true"
          aria-invalid={!!errors.state}
          aria-describedby={errors.state ? 'state-error' : undefined}
        >
          <option value="">Select your state</option>
          {indianStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {errors.state && <span id="state-error" className="error-text">{errors.state}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="occupation">
          Occupation <span className="required">*</span>
        </label>
        <input
          type="text"
          id="occupation"
          value={formData.occupation || ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('occupation', e.target.value)}
          className={errors.occupation ? 'error' : ''}
          placeholder="e.g., Student, Farmer, Self-employed"
          required
          aria-required="true"
          aria-invalid={!!errors.occupation}
          aria-describedby={errors.occupation ? 'occupation-error' : undefined}
        />
        {errors.occupation && <span id="occupation-error" className="error-text">{errors.occupation}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="annualIncome">
          Annual Income (₹) <span className="required">*</span>
        </label>
        <input
          type="number"
          id="annualIncome"
          value={formData.annualIncome || ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('annualIncome', parseInt(e.target.value) || '')}
          className={errors.annualIncome ? 'error' : ''}
          min="0"
          placeholder="e.g., 300000"
          required
          aria-required="true"
          aria-invalid={!!errors.annualIncome}
          aria-describedby={errors.annualIncome ? 'annualIncome-error' : undefined}
        />
        {errors.annualIncome && <span id="annualIncome-error" className="error-text">{errors.annualIncome}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="socialCategory">
          Social Category <span className="optional-label">(Optional)</span>
        </label>
        <select
          id="socialCategory"
          value={formData.socialCategory || ''}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange('socialCategory', e.target.value)}
        >
          <option value="">Select category</option>
          {socialCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default GovernmentSchemesForm;
