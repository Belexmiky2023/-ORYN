
import React, { useState, useEffect } from 'react';
import { TOURNAMENT_END_DATE, REGISTRATION_FORM_URL } from '../constants';

const Home: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = +new Date(TOURNAMENT_END_DATE) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Hero Section */}
      <section className="py-20 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00FF88]/10 blur-[120px] rounded-full -z-10"></div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight animate-float">
          ORYN SERVER <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF88] to-[#00A3FF] glow-green">
            EDITORS TOURNAMENT
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12">
          "Show your edit. Get votes. Win rewards."
        </p>

        {/* Countdown */}
        <div className="flex justify-center gap-4 mb-20">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((item) => (
            <div key={item.label} className="w-24 h-28 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-[#00FF88]">{item.value.toString().padStart(2, '0')}</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-bold">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-white/5 border border-white/10 rounded-[40px] p-12 text-center max-w-4xl mx-auto mb-20 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00FF88]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <h3 className="text-3xl font-bold mb-4">Ready to compete?</h3>
        <p className="text-gray-400 text-lg mb-8">
          Want to register and show your edit and want to win? Join the elite pool of video editors and claim your spot on the leaderboard.
        </p>
        <a
          href={REGISTRATION_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#00FF88] text-[#0A0A0A] px-10 py-4 rounded-2xl font-black text-lg shadow-[0_0_30px_#00FF8850] hover:scale-105 transition-all duration-300"
        >
          Register Here
        </a>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 pb-20">
        {[
          { title: 'Vote Fairly', desc: 'Secure GitHub-linked voting system ensures one vote per human.', icon: '⚡' },
          { title: 'Win Big', desc: 'Top 3 editors receive cash prizes, asset packs, and exposure.', icon: '🏆' },
          { title: 'Get Rated', desc: 'Receive feedback from the community and improve your craft.', icon: '⭐' }
        ].map((feat) => (
          <div key={feat.title} className="p-8 rounded-3xl bg-[#111] border border-white/5 border-glow transition-all duration-300">
            <div className="text-4xl mb-4">{feat.icon}</div>
            <h4 className="text-xl font-bold mb-2 text-[#00FF88]">{feat.title}</h4>
            <p className="text-gray-500">{feat.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
