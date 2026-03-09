export type Category = 'hackathons' | 'scholarships' | 'government_schemes';

export type EligibilityStatus = 'eligible' | 'possibly_eligible' | 'not_eligible';

export type CriterionOperator = 'equals' | 'greater_than' | 'less_than' | 'in_range' | 'contains' | 'in_list';

export interface EligibilityCriterion {
  field: string;
  operator: CriterionOperator;
  value: any;
  required: boolean;
  weight: number;
}

export interface Opportunity {
  id: string;
  title: string;
  category: Category;
  description: string;
  simplifiedDescription: string;
  benefits: string;
  requiredDocuments: string[];
  startDate: Date;
  deadline: Date;
  officialLink: string;
  eligibilityCriteria: EligibilityCriterion[];
}

export interface UserProfile {
  category: string;
  attributes: Record<string, any>;
}

export interface EligibilityResult {
  status: EligibilityStatus;
  reason: string;
  score: number;
}

export interface OpportunityWithEligibility extends Opportunity {
  eligibilityStatus: EligibilityStatus;
  eligibilityReason: string;
}
