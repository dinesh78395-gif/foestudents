import {
  Opportunity,
  UserProfile,
  EligibilityResult,
  EligibilityCriterion,
  CriterionOperator,
} from '../types';

export class EligibilityEngine {
  evaluateEligibility(profile: UserProfile, opportunity: Opportunity): EligibilityResult {
    let requiredMatches = 0;
    let requiredTotal = 0;
    let optionalMatches = 0;
    let optionalTotal = 0;
    const reasons: string[] = [];

    for (const criterion of opportunity.eligibilityCriteria) {
      const userValue = profile.attributes[criterion.field];
      const matches = this.evaluateCriterion(userValue, criterion);

      if (criterion.required) {
        requiredTotal++;
        if (matches) {
          requiredMatches++;
        } else {
          reasons.push(`Does not meet ${criterion.field} requirement`);
        }
      } else {
        optionalTotal++;
        if (matches) {
          optionalMatches++;
        }
      }
    }

    // Determine status
    const requiredMatchRate = requiredTotal > 0 ? requiredMatches / requiredTotal : 1;
    const optionalMatchRate = optionalTotal > 0 ? optionalMatches / optionalTotal : 1;

    if (requiredMatchRate === 1) {
      if (optionalTotal === 0 || optionalMatchRate >= 0.5) {
        return {
          status: 'eligible',
          reason: 'You meet all required criteria',
          score: 100,
        };
      } else {
        return {
          status: 'possibly_eligible',
          reason: 'You meet required criteria but few optional criteria',
          score: 70,
        };
      }
    } else if (requiredMatchRate >= 0.7) {
      return {
        status: 'possibly_eligible',
        reason: reasons.join('; '),
        score: 50,
      };
    } else {
      return {
        status: 'not_eligible',
        reason: reasons.join('; '),
        score: 0,
      };
    }
  }

  private evaluateCriterion(userValue: any, criterion: EligibilityCriterion): boolean {
    if (userValue === undefined || userValue === null) {
      return false;
    }

    switch (criterion.operator) {
      case 'equals':
        return userValue == criterion.value;

      case 'greater_than':
        return Number(userValue) > Number(criterion.value);

      case 'less_than':
        return Number(userValue) < Number(criterion.value);

      case 'in_range':
        const [min, max] = criterion.value;
        return Number(userValue) >= Number(min) && Number(userValue) <= Number(max);

      case 'contains':
        if (typeof userValue === 'string') {
          return userValue.toLowerCase().includes(String(criterion.value).toLowerCase());
        }
        if (Array.isArray(userValue)) {
          return userValue.some((item) =>
            String(item).toLowerCase().includes(String(criterion.value).toLowerCase())
          );
        }
        return false;

      case 'in_list':
        if (Array.isArray(criterion.value)) {
          return criterion.value.includes(userValue);
        }
        return false;

      default:
        return false;
    }
  }
}
