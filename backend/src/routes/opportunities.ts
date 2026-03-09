import { Router, Request, Response } from 'express';
import { opportunities } from '../data/opportunities';
import { EligibilityEngine } from '../services/eligibilityEngine';
import { UserProfile, OpportunityWithEligibility } from '../types';

const router = Router();
const eligibilityEngine = new EligibilityEngine();

// GET /api/opportunities - Get all opportunities or filter by category
router.get('/', (req: Request, res: Response) => {
  try {
    const { category, limit, offset } = req.query;

    let filtered = opportunities;

    // Filter by category if provided
    if (category) {
      filtered = opportunities.filter((opp) => opp.category === category);
    }

    // Filter out past deadlines
    const now = new Date();
    filtered = filtered.filter((opp) => new Date(opp.deadline) > now);

    // Sort by deadline (nearest first)
    filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

    // Pagination
    const limitNum = limit ? parseInt(limit as string) : filtered.length;
    const offsetNum = offset ? parseInt(offset as string) : 0;
    const paginated = filtered.slice(offsetNum, offsetNum + limitNum);

    res.json({
      opportunities: paginated,
      total: filtered.length,
      hasMore: offsetNum + limitNum < filtered.length,
    });
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    res.status(500).json({ error: 'Failed to fetch opportunities' });
  }
});

// POST /api/opportunities/match - Match opportunities based on user profile
router.post('/match', (req: Request, res: Response) => {
  try {
    const profile: UserProfile = req.body;

    if (!profile || !profile.category || !profile.attributes) {
      return res.status(400).json({ error: 'Invalid profile data' });
    }

    // Filter opportunities by category
    let filtered = opportunities.filter((opp) => opp.category === profile.category);

    // Filter out past deadlines
    const now = new Date();
    filtered = filtered.filter((opp) => new Date(opp.deadline) > now);

    // Evaluate eligibility for each opportunity
    const results: OpportunityWithEligibility[] = filtered.map((opportunity) => {
      const eligibility = eligibilityEngine.evaluateEligibility(profile, opportunity);

      return {
        ...opportunity,
        eligibilityStatus: eligibility.status,
        eligibilityReason: eligibility.reason,
      };
    });

    // Sort by eligibility score and deadline
    results.sort((a, b) => {
      // Priority: eligible > possibly_eligible > not_eligible
      const statusOrder = { eligible: 0, possibly_eligible: 1, not_eligible: 2 };
      const statusDiff = statusOrder[a.eligibilityStatus] - statusOrder[b.eligibilityStatus];
      
      if (statusDiff !== 0) return statusDiff;
      
      // If same status, sort by deadline
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });

    res.json({
      opportunities: results,
      matchCount: results.filter((r) => r.eligibilityStatus === 'eligible').length,
    });
  } catch (error) {
    console.error('Error matching opportunities:', error);
    res.status(500).json({ error: 'Failed to match opportunities' });
  }
});

export default router;
