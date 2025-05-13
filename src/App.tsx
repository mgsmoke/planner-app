import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Planner from './pages/Planner';
import Education from './pages/Education';
import Profile from './pages/Profile';
import TabBar from './components/TabBar';

function App() {
  return (
    <Router>
      <div className="pb-16"> {/* отступ снизу, чтобы TabBar не перекрывал контент */}
        <Routes>
          <Route path="/" element={<Planner />} />
          <Route path="/education" element={<Education />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <TabBar />
      </div>
    </Router>
  );
}

export default App;
