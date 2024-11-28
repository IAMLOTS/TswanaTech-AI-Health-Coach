// src/components/Navigation.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav className="main-navigation">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/personalized-recommendation">Personalized Recommendation</Link></li>
        <li><Link to="/ai-health-coach">AI Health Coach</Link></li>
        <li><Link to="/schedule-demo">Schedule Demo</Link></li>
        <li><Link to="/learn-more">Learn More</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;

// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import PersonalizedRecommendation from './pages/PersonalizedRecommendation';
import AIHealthCoach from './pages/AIHealthCoach';
import ScheduleDemo from './pages/ScheduleDemo';
import LearnMore from './pages/LearnMore';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/personalized-recommendation" element={<PersonalizedRecommendation />} />
          <Route path="/ai-health-coach" element={<AIHealthCoach />} />
          <Route path="/schedule-demo" element={<ScheduleDemo />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();