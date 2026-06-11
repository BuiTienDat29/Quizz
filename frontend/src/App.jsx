import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TopicDetail from './pages/TopicDetail';
import Quiz from './pages/Quiz';
import QuizResult from './pages/QuizResult';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-blue-600">Java Quiz App</span>
              <div className="flex gap-4 ml-6">
                <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">Dashboard</Link>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/topics/:id" element={<TopicDetail />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/quiz/result/:sessionId" element={<QuizResult />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
