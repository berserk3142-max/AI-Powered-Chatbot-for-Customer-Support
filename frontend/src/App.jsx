import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatPage from './pages/ChatPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';

function App() {
    return (
        <Router>
            <div className="app">
                <Sidebar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<ChatPage />} />
                        <Route path="/chat" element={<ChatPage />} />
                        <Route path="/analytics" element={<AnalyticsPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="/help" element={<HelpPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
