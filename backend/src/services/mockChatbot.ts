import { opportunities } from '../data/opportunities';
import { EligibilityEngine } from './eligibilityEngine';
import { UserProfile, OpportunityWithEligibility } from '../types';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  reply: string;
  opportunities?: OpportunityWithEligibility[];
  extractedProfile?: {
    category: string;
    attributes: Record<string, any>;
  };
}

export class MockChatbot {
  private eligibilityEngine: EligibilityEngine;

  constructor() {
    this.eligibilityEngine = new EligibilityEngine();
  }

  async processQuery(message: string, conversationHistory: ChatMessage[] = []): Promise<ChatResponse> {
    const lowerMessage = message.toLowerCase();

    // Intent classification
    const intent = this.classifyIntent(lowerMessage);

    if (intent === 'unclear') {
      return {
        reply: "I can help you find hackathons, scholarships, or government schemes! Which one are you interested in?",
      };
    }

    if (intent === 'off_topic') {
      return {
        reply: "I'm here to help you discover opportunities like hackathons, scholarships, and government schemes. How can I assist you with finding opportunities?",
      };
    }

    // Extract attributes based on intent
    const attributes = this.extractAttributes(lowerMessage, intent);
    
    if (Object.keys(attributes).length === 0) {
      return {
        reply: this.getFollowUpQuestion(intent),
      };
    }

    // Match opportunities
    const profile: UserProfile = {
      category: intent,
      attributes,
    };

    const filtered = opportunities.filter((opp) => opp.category === intent);
    const now = new Date();
    const activeOpportunities = filtered.filter((opp) => new Date(opp.deadline) > now);

    const results: OpportunityWithEligibility[] = activeOpportunities.map((opportunity) => {
      const eligibility = this.eligibilityEngine.evaluateEligibility(profile, opportunity);
      return {
        ...opportunity,
        eligibilityStatus: eligibility.status,
        eligibilityReason: eligibility.reason,
      };
    });

    // Sort by eligibility
    results.sort((a, b) => {
      const statusOrder = { eligible: 0, possibly_eligible: 1, not_eligible: 2 };
      return statusOrder[a.eligibilityStatus] - statusOrder[b.eligibilityStatus];
    });

    const eligibleCount = results.filter((r) => r.eligibilityStatus === 'eligible').length;

    let reply = '';
    if (eligibleCount > 0) {
      reply = `Great news! I found ${eligibleCount} ${intent === 'hackathons' ? 'hackathon' : intent === 'scholarships' ? 'scholarship' : 'government scheme'}${eligibleCount > 1 ? 's' : ''} you're eligible for! Here are the opportunities:`;
    } else if (results.length > 0) {
      reply = `I found ${results.length} ${intent === 'hackathons' ? 'hackathon' : intent === 'scholarships' ? 'scholarship' : 'government scheme'}${results.length > 1 ? 's' : ''} that might interest you. Some may require additional qualifications:`;
    } else {
      reply = `I couldn't find any active ${intent === 'hackathons' ? 'hackathons' : intent === 'scholarships' ? 'scholarships' : 'government schemes'} matching your profile right now. Try adjusting your criteria or check back later!`;
    }

    return {
      reply,
      opportunities: results.slice(0, 5), // Limit to top 5
      extractedProfile: {
        category: intent,
        attributes,
      },
    };
  }

  private classifyIntent(message: string): string {
    // Hackathon keywords
    if (
      message.includes('hackathon') ||
      message.includes('coding competition') ||
      message.includes('hack') ||
      message.includes('code') ||
      message.includes('programming contest')
    ) {
      return 'hackathons';
    }

    // Scholarship keywords
    if (
      message.includes('scholarship') ||
      message.includes('education') ||
      message.includes('study') ||
      message.includes('student') ||
      message.includes('college') ||
      message.includes('university') ||
      message.includes('tuition')
    ) {
      return 'scholarships';
    }

    // Government scheme keywords
    if (
      message.includes('government') ||
      message.includes('scheme') ||
      message.includes('welfare') ||
      message.includes('benefit') ||
      message.includes('subsidy') ||
      message.includes('farmer') ||
      message.includes('health insurance')
    ) {
      return 'government_schemes';
    }

    // Off-topic detection
    if (
      message.includes('weather') ||
      message.includes('news') ||
      message.includes('recipe') ||
      message.includes('movie') ||
      message.includes('sports')
    ) {
      return 'off_topic';
    }

    return 'unclear';
  }

  private extractAttributes(message: string, category: string): Record<string, any> {
    const attributes: Record<string, any> = {};

    if (category === 'scholarships') {
      // Education level
      if (message.includes('undergraduate') || message.includes('bachelor') || message.includes('bsc') || message.includes('btech')) {
        attributes.educationLevel = 'Undergraduate';
      } else if (message.includes('postgraduate') || message.includes('master') || message.includes('msc') || message.includes('mtech')) {
        attributes.educationLevel = 'Postgraduate';
      } else if (message.includes('high school') || message.includes('12th') || message.includes('class 12')) {
        attributes.educationLevel = 'High School';
      }

      // Income range
      if (message.includes('low income') || message.includes('poor') || message.includes('below 1 lakh')) {
        attributes.incomeRange = 'Below ₹1 Lakh';
      } else if (message.includes('1-3 lakh') || message.includes('middle class')) {
        attributes.incomeRange = '₹1-3 Lakhs';
      } else if (message.includes('3-5 lakh')) {
        attributes.incomeRange = '₹3-5 Lakhs';
      }

      // State
      const states = ['maharashtra', 'karnataka', 'tamil nadu', 'delhi', 'gujarat', 'rajasthan', 'uttar pradesh'];
      for (const state of states) {
        if (message.includes(state)) {
          attributes.state = state.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          break;
        }
      }
    }

    if (category === 'hackathons') {
      // Skill level
      if (message.includes('beginner') || message.includes('new') || message.includes('learning')) {
        attributes.skillLevel = 'Beginner';
      } else if (message.includes('intermediate') || message.includes('some experience')) {
        attributes.skillLevel = 'Intermediate';
      } else if (message.includes('advanced') || message.includes('experienced')) {
        attributes.skillLevel = 'Advanced';
      } else if (message.includes('expert') || message.includes('professional')) {
        attributes.skillLevel = 'Expert';
      }

      // Field of interest
      const fields = [];
      if (message.includes('web') || message.includes('website')) fields.push('Web Development');
      if (message.includes('mobile') || message.includes('app')) fields.push('Mobile Development');
      if (message.includes('ai') || message.includes('machine learning') || message.includes('ml')) fields.push('AI/Machine Learning');
      if (message.includes('blockchain')) fields.push('Blockchain');
      if (fields.length > 0) {
        attributes.fieldOfInterest = fields;
      }

      // Location preference
      if (message.includes('online') || message.includes('remote')) {
        attributes.locationPreference = 'Online';
      } else if (message.includes('offline') || message.includes('in-person')) {
        attributes.locationPreference = 'Offline';
      }
    }

    if (category === 'government_schemes') {
      // Age
      const ageMatch = message.match(/(\d+)\s*(?:years old|year old|years|yr)/);
      if (ageMatch) {
        attributes.age = parseInt(ageMatch[1]);
      }

      // Occupation
      if (message.includes('farmer') || message.includes('agriculture')) {
        attributes.occupation = 'Farmer';
      } else if (message.includes('student')) {
        attributes.occupation = 'Student';
      }

      // Income
      const incomeMatch = message.match(/(\d+)\s*(?:lakh|lakhs)/);
      if (incomeMatch) {
        attributes.annualIncome = parseInt(incomeMatch[1]) * 100000;
      }
    }

    return attributes;
  }

  private getFollowUpQuestion(category: string): string {
    switch (category) {
      case 'scholarships':
        return "I'd love to help you find scholarships! Could you tell me:\n- What level of education are you at? (High School, Undergraduate, Postgraduate)\n- What's your family income range?\n- Which state are you from?";
      
      case 'hackathons':
        return "Great! I can help you find hackathons. Tell me:\n- What's your skill level? (Beginner, Intermediate, Advanced, Expert)\n- What technologies interest you? (Web, Mobile, AI, etc.)\n- Do you prefer online or offline events?";
      
      case 'government_schemes':
        return "I can help you find government schemes! Please share:\n- Your age\n- Your occupation (Farmer, Student, etc.)\n- Your annual income\n- Which state you're from";
      
      default:
        return "I can help you find opportunities! What are you looking for - hackathons, scholarships, or government schemes?";
    }
  }
}
