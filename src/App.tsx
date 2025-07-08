import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Planner from './pages/Planner';
import Education from './pages/Education';
import Profile from './pages/Profile';
import TabBar from './components/TabBar';
import CompletedList from './features/profile/components/CompletedList';
import EditProfile from './features/profile/components/EditProfile';

function AppContent() {
  const location = useLocation();
  const basename = '/';
  const isWelcomePage = location.pathname === `${basename}`;

  return (
    <div className="min-h-screen bg-white pt-24">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/planner" element={<Planner />} />
        <Route path="/education" element={<Education />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/completed" element={<CompletedList />} />
        <Route path="/profile/edit" element={<EditProfile />} />
      </Routes>
      {!isWelcomePage && <TabBar />}
    </div>
  );
}

function App() {
  return (
    <Router basename="/planner-app">
      <AppContent />
    </Router>
  );
}

export default App;
