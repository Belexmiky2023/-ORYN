
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  login: () => void;
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, login, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Vote', path: '/vote' },
    { name: 'Gift Votes', path: '/gift' },
    { name: 'Prize', path: '/prize' },
    { name: 'Rate Us', path: '/rate' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-[#00FF88]/20 h-20">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-[#00FF88] rounded-lg shadow-[0_0_15px_#00FF8880] flex items-center justify-center font-black text-[#0A0A0A] text-xl">
            O
          </div>
          <span className="text-xl font-bold tracking-tighter glow-green">ORYN SERVER</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-all duration-300 font-medium hover:text-[#00FF88] ${
                isActive(link.path) ? 'text-[#00FF88] scale-105' : 'text-gray-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center space-x-4 pl-4 border-l border-white/10">
              <div className="flex items-center space-x-2">
                <img src={user.avatarUrl} alt="User" className="w-8 h-8 rounded-full border border-[#00FF88]/50" />
                <span className="text-sm font-semibold">{user.username}</span>
              </div>
              <button 
                onClick={logout}
                className="text-xs text-gray-500 hover:text-red-400 transition-colors"
              >
                Logout
              </button>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-xs bg-[#00FF88]/10 text-[#00FF88] px-2 py-1 rounded border border-[#00FF88]/20">ADMIN</Link>
              )}
            </div>
          ) : (
            <button
              onClick={login}
              className="bg-[#00FF88] text-[#0A0A0A] px-6 py-2 rounded-full font-bold shadow-[0_0_20px_#00FF8840] hover:scale-105 transition-all duration-300"
            >
              Login with GitHub
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[#00FF88]" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-b border-[#00FF88]/20 py-6 px-6 space-y-4 animate-in slide-in-from-top fade-in duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-lg text-gray-400 hover:text-[#00FF88]"
            >
              {link.name}
            </Link>
          ))}
          {!user && (
            <button
              onClick={() => { login(); setIsOpen(false); }}
              className="w-full bg-[#00FF88] text-[#0A0A0A] py-3 rounded-xl font-bold"
            >
              Login with GitHub
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
