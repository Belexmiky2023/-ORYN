
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Vote from './pages/Vote';
import Prize from './pages/Prize';
import GiftVotes from './pages/GiftVotes';
import RateUs from './pages/RateUs';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('oryn_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const loginWithGithub = () => {
    // In production on Cloudflare, you would redirect to:
    // window.location.href = `/api/auth/github`;
    
    // Keeping mock for immediate testing in browser
    const mockUser: User = {
      id: 'gh-' + Math.random().toString(36).substr(2, 9),
      username: 'CreativeEditor',
      avatarUrl: 'https://picsum.photos/seed/editor/200',
      role: 'user',
      hasVoted: false
    };
    setUser(mockUser);
    localStorage.setItem('oryn_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('oryn_user');
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white selection:bg-[#00FF88] selection:text-black">
        <div className="fixed inset-0 bg-glow pointer-events-none z-0"></div>
        
        <Navbar user={user} login={loginWithGithub} logout={logout} />
        
        <main className="flex-grow z-10 pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vote" element={<Vote user={user} login={loginWithGithub} />} />
            <Route path="/prize" element={<Prize />} />
            <Route path="/gift" element={<GiftVotes user={user} />} />
            <Route path="/rate" element={<RateUs user={user} />} />
            <Route path="/admin" element={<Admin user={user} />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
