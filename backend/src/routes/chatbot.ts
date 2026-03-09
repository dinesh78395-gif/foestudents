import { Router, Request, Response } from 'express';
import { MockChatbot } from '../services/mockChatbot';

const router = Router();
const chatbot = new MockChatbot();

// POST /api/chatbot/query - Process chatbot query
router.post('/query', async (req: Request, res: Response) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await chatbot.processQuery(message, conversationHistory || []);

    res.json(response);
  } catch (error) {
    console.error('Error processing chatbot query:', error);
    res.status(500).json({ error: 'Failed to process query' });
  }
});

export default router;
