import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CategorySelection from './pages/CategorySelection';
import OpportunityList from './pages/OpportunityList';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<CategorySelection />} />
          <Route path="/opportunities/:category" element={<OpportunityList />} />
        </Routes>

        {/* Floating Chatbot Button */}
        {!isChatbotOpen && (
          <button
            className="chatbot-fab"
            onClick={() => setIsChatbotOpen(true)}
            aria-label="Open chatbot"
          >
            💬
          </button>
        )}

        {/* Chatbot */}
        <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
