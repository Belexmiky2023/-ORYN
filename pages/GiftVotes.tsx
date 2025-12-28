
import React, { useState } from 'react';
import { User } from '../types';
import { GIFT_PACKAGES, ADMIN_TELEGRAM } from '../constants';

const GiftVotes: React.FC<{ user: User | null }> = ({ user }) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    if (!selectedPackage) return;
    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-32 h-32 bg-[#00FF88]/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce border-2 border-[#00FF88] shadow-[0_0_30px_#00FF8840]">
          <svg className="w-16 h-16 text-[#00FF88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl font-black mb-4 glow-green">Done!</h2>
        <p className="text-gray-400 text-lg mb-8">
          Your request has been received. Our admin will verify the transaction and apply your votes manually within 24 hours.
        </p>
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl mb-8">
          <p className="text-sm text-red-400 font-medium">
            IMPORTANT: If your transaction is not applied within 24 hours, please DM us with your payment screenshot.
          </p>
        </div>
        <a
          href={ADMIN_TELEGRAM}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full bg-[#00FF88] text-[#0A0A0A] py-5 rounded-2xl font-black text-xl shadow-[0_0_30px_#00FF8830] transition-transform hover:scale-[1.02] active:scale-95"
        >
          INBOX ADMIN
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black mb-4 tracking-tight glow-green">BOOST YOUR FAVORITE</h2>
        <p className="text-gray-500 text-lg">Gift extra votes to help an editor win the tournament.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {GIFT_PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => setSelectedPackage(pkg.id)}
            className={`p-10 rounded-[32px] cursor-pointer transition-all duration-500 border-2 flex flex-col items-center text-center relative overflow-hidden group ${
              selectedPackage === pkg.id 
              ? 'border-[#00FF88] bg-[#00FF88]/10 shadow-[0_0_40px_#00FF8820]' 
              : 'border-white/5 bg-[#111] hover:border-[#00FF88]/30'
            }`}
          >
            <div className={`absolute -top-12 -right-12 w-24 h-24 blur-[40px] opacity-20 transition-opacity ${selectedPackage === pkg.id ? 'bg-[#00FF88]' : 'bg-white'}`}></div>
            
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">⭐</div>
            <h3 className="text-2xl font-black mb-2">{pkg.label}</h3>
            <p className="text-gray-500 text-sm">Boost leaderboard position instantly</p>
            
            <div className={`mt-8 px-6 py-2 rounded-full font-bold text-sm ${selectedPackage === pkg.id ? 'bg-[#00FF88] text-black' : 'bg-white/5 text-gray-400'}`}>
              {selectedPackage === pkg.id ? 'Selected' : 'Select Package'}
            </div>
          </div>
        ))}
      </div>

      {selectedPackage && (
        <div className="bg-[#111] border border-[#00FF88]/20 rounded-[32px] p-10 animate-in slide-in-from-bottom duration-500">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#00FF88] text-black flex items-center justify-center text-sm font-black">2</span>
            Complete Payment
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <p className="text-gray-400 mb-4">
                To complete your purchase, please send the required Stars via Telegram to our official account. 
              </p>
              <div className="space-y-2 mb-8">
                <div className="flex justify-between text-sm py-2 border-b border-white/5">
                  <span className="text-gray-500">Recipient</span>
                  <span className="font-mono text-[#00FF88]">@Oryn179</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-white/5">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-bold text-white">
                    {GIFT_PACKAGES.find(p => p.id === selectedPackage)?.stars} Stars
                  </span>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
              <a
                href={ADMIN_TELEGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-white/5 border border-white/10 px-8 py-4 rounded-2xl font-bold text-white hover:bg-white/10 transition-colors mb-4"
              >
                Pay Here @Oryn179
              </a>
              <button
                onClick={handleConfirm}
                className="w-full bg-[#00FF88] text-[#0A0A0A] px-12 py-4 rounded-2xl font-black text-lg shadow-[0_0_20px_#00FF8830] hover:scale-105 transition-all"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftVotes;
