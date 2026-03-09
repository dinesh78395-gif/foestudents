import { ChangeEvent } from 'react';

interface ScholarshipsFormProps {
  formData: Record<string, any>;
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
  onValidationError: (errors: Record<string, string>) => void;
}

const ScholarshipsForm = ({ formData, errors, onChange }: ScholarshipsFormProps) => {
  const educationLevels = [
    'High School',
    'Undergraduate',
    'Postgraduate',
    'Doctorate',
    'Diploma',
    'Certificate Course'
  ];

  const incomeRanges = [
    'Below ₹1 Lakh',
    '₹1-3 Lakhs',
    '₹3-5 Lakhs',
    '₹5-8 Lakhs',
    'Above ₹8 Lakhs'
  ];

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
        <label htmlFor="educationLevel">
          Education Level <span className="required">*</span>
        </label>
        <select
          id="educationLevel"
          value={formData.educationLevel || ''}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange('educationLevel', e.target.value)}
          className={errors.educationLevel ? 'error' : ''}
          required
          aria-required="true"
          aria-invalid={!!errors.educationLevel}
          aria-describedby={errors.educationLevel ? 'educationLevel-error' : undefined}
        >
          <option value="">Select education level</option>
          {educationLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        {errors.educationLevel && <span id="educationLevel-error" className="error-text">{errors.educationLevel}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="incomeRange">
          Family Income Range <span className="required">*</span>
        </label>
        <select
          id="incomeRange"
          value={formData.incomeRange || ''}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange('incomeRange', e.target.value)}
          className={errors.incomeRange ? 'error' : ''}
          required
          aria-required="true"
          aria-invalid={!!errors.incomeRange}
          aria-describedby={errors.incomeRange ? 'incomeRange-error' : undefined}
        >
          <option value="">Select income range</option>
          {incomeRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
        {errors.incomeRange && <span id="incomeRange-error" className="error-text">{errors.incomeRange}</span>}
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

export default ScholarshipsForm;
