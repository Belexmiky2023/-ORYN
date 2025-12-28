
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-12 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="text-2xl font-bold glow-green tracking-tight">ORYN SERVER</h2>
          <p className="text-gray-500 mt-2">The premier video editing tournament hub.</p>
        </div>
        
        <div className="flex space-x-8 text-gray-400">
          <a href="#" className="hover:text-[#00FF88] transition-colors">Discord</a>
          <a href="#" className="hover:text-[#00FF88] transition-colors">YouTube</a>
          <a href="https://t.me/oryn179" className="hover:text-[#00FF88] transition-colors">Telegram</a>
        </div>
        
        <div className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Oryn Server. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
