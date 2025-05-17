import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Planner from './pages/Planner';
import Education from './pages/Education';
import Profile from './pages/Profile';
import TabBar from './components/TabBar';
import CompletedList from './features/profile/components/CompletedList';

function App() {
  useEffect(() => {
    if (window.Telegram?.WebApp?.expand) {
      window.Telegram.WebApp.expand();
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white pb-16">
        <Routes>
          <Route path="/planner" element={<Planner />} />
          <Route path="/education" element={<Education />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/completed" element={<CompletedList />} />
        </Routes>
        <TabBar />
      </div>
    </Router>
  );
}

export default App;
