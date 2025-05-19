import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Planner from './pages/Planner';
import Education from './pages/Education';
import Profile from './pages/Profile';
import TabBar from './components/TabBar';
import CompletedList from './features/profile/components/CompletedList';
import EditProfile from './features/profile/components/EditProfile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white pt-20">
        <Routes>
          <Route path="/planner" element={<Planner />} />
          <Route path="/education" element={<Education />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/completed" element={<CompletedList />} />
          <Route path="/edit" element={<EditProfile />} />
        </Routes>
        <TabBar />
      </div>
    </Router>
  );
}

export default App;
