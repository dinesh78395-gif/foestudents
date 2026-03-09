# Opportunity Navigator

A web-based AI-powered platform that centralizes discovery and eligibility evaluation for hackathons, scholarships, and government schemes.

![Opportunity Navigator](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-ISC-blue)

## 🌟 Features

- **Category-Based Navigation**: Browse hackathons, scholarships, or government schemes
- **Smart Profile Forms**: Tailored forms for each category with validation
- **AI Chatbot**: Natural language interface to find opportunities
- **Eligibility Matching**: Intelligent algorithm evaluates your eligibility
- **Color-Coded Results**: Green (Eligible), Yellow (Possibly Eligible), Red (Not Eligible)
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Safe Redirection**: Confirmation modal before redirecting to official portals

## 📸 Screenshots

### Landing Page
Beautiful category selection with three main categories

### Profile Forms
Category-specific forms with validation

### Opportunity Results
Color-coded eligibility status with detailed information

### AI Chatbot
Natural language interface for finding opportunities

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/opportunity-navigator.git
   cd opportunity-navigator
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Create environment file for frontend**
   ```bash
   cd frontend
   cp .env.example .env
   ```

### Running Locally

You need to run both backend and frontend servers:

**Terminal 1 - Start Backend:**
```bash
cd backend
npm run dev
```
Backend runs on http://localhost:3000

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on http://localhost:5173

**Open your browser** and navigate to http://localhost:5173

### 🌐 Deploy to Production

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**
- Backend: Deploy to Render (free)
- Frontend: Deploy to Vercel (free)
- Total time: ~15 minutes
- Cost: $0/month

## 📁 Project Structure

```
opportunity-navigator/
├── frontend/              # React + TypeScript frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── types/        # TypeScript types
│   │   └── App.tsx       # Main app component
│   └── package.json
├── backend/              # Node.js + Express backend
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── data/         # Sample data
│   │   └── index.ts      # Server entry point
│   └── package.json
├── .kiro/specs/          # Project specifications
└── README.md
```

## 🎯 Usage

### Method 1: Category Selection
1. Select a category (Hackathons, Scholarships, or Government Schemes)
2. Fill in your profile details
3. View matched opportunities with eligibility status
4. Click "Apply Now" to visit official portals

### Method 2: AI Chatbot
1. Click the chatbot button (💬) in the bottom-right corner
2. Ask in natural language, e.g.:
   - "I'm looking for scholarships for undergraduate students"
   - "Show me hackathons for beginners"
   - "What government schemes are available for farmers?"
3. The chatbot will understand and show relevant opportunities

## 🛠️ Technology Stack

### Frontend
- React 19
- TypeScript
- React Router
- CSS3 (Custom styling)

### Backend
- Node.js
- Express
- TypeScript
- CORS

## 📡 API Endpoints

### GET /api/opportunities
Get all opportunities or filter by category

**Query Parameters:**
- `category` (optional): hackathons | scholarships | government_schemes
- `limit` (optional): Number of results
- `offset` (optional): Pagination offset

### POST /api/opportunities/match
Match opportunities based on user profile

**Request Body:**
```json
{
  "category": "scholarships",
  "attributes": {
    "educationLevel": "Undergraduate",
    "incomeRange": "₹1-3 Lakhs",
    "state": "Maharashtra"
  }
}
```

### POST /api/chatbot/query
Process natural language queries

**Request Body:**
```json
{
  "message": "I'm looking for scholarships",
  "conversationHistory": []
}
```

## 🎨 Features in Detail

### Eligibility Engine
- Evaluates user profiles against opportunity criteria
- Supports multiple operators: equals, greater_than, less_than, in_range, contains, in_list
- Returns eligibility status with detailed reasoning

### Mock AI Chatbot
- Intent classification (hackathons/scholarships/government schemes)
- Attribute extraction from natural language
- Context-aware follow-up questions
- Off-topic query rejection

### Sample Data
Includes 9 real opportunities:
- 3 Government Schemes (PM-KISAN, Post Matric Scholarship, Ayushman Bharat)
- 3 Scholarships (INSPIRE, Central Sector, Sitaram Jindal)
- 3 Hackathons (Smart India Hackathon, HackWithInfy, Google Solution Challenge)

## 🚧 Roadmap

- [ ] Real AI integration (OpenAI/Anthropic)
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication
- [ ] Redis caching
- [ ] Email notifications
- [ ] WhatsApp integration
- [ ] Multilingual support
- [ ] Voice interaction
- [ ] Production deployment

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Your Name - [GitHub Profile](https://github.com/YOUR_USERNAME)

## 🙏 Acknowledgments

- Built with React and Node.js
- Inspired by the need to simplify opportunity discovery
- Sample data based on real Indian government schemes and programs

---

⭐ Star this repo if you find it helpful!

