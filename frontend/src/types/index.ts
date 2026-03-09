export type Category = 'hackathons' | 'scholarships' | 'government_schemes';

export type EligibilityStatus = 'eligible' | 'possibly_eligible' | 'not_eligible';

export interface Opportunity {
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

export interface UserProfile {
  category: string;
  attributes: Record<string, any>;
}

export interface GovernmentSchemesProfile {
  age: number;
  state: string;
  occupation: string;
  annualIncome: number;
  socialCategory?: string;
}

export interface ScholarshipsProfile {
  educationLevel: string;
  incomeRange: string;
  state: string;
  socialCategory?: string;
}

export interface HackathonsProfile {
  fieldOfInterest: string[];
  skillLevel: string;
  locationPreference: string;
}
