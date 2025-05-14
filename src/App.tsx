import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Planner from './pages/Planner';
import Education from './pages/Education';
import Profile from './pages/Profile';
import TabBar from './components/TabBar';

function App() {
  return (
    <Router>
        <div className="min-h-screen bg-white pb-16">
        <Routes>
          <Route path="/planner" element={<Planner />} />
          <Route path="/education" element={<Education />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <TabBar />
        </div>
    </Router>
  );
}

export default App;
