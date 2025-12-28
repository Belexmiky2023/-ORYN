
import React from 'react';

const Prize: React.FC = () => {
  const prizes = [
    {
      tier: '1ST PLACE',
      amount: '$500',
      perks: ['Exclusive Editor Badge', 'Pro Asset Bundle', 'Pinned YouTube Feature', 'Social Media Shoutout'],
      color: '#00FF88',
      glow: 'shadow-[0_0_40px_rgba(0,255,136,0.3)]'
    },
    {
      tier: '2ND PLACE',
      amount: '$250',
      perks: ['Silver Medalist Badge', 'Standard Asset Bundle', 'YouTube Feature'],
      color: '#00A3FF',
      glow: 'shadow-[0_0_40px_rgba(0,163,255,0.2)]'
    },
    {
      tier: '3RD PLACE',
      amount: '$100',
      perks: ['Bronze Medalist Badge', 'Starter Asset Bundle'],
      color: '#FF0088',
      glow: 'shadow-[0_0_40px_rgba(255,0,136,0.2)]'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black mb-4 glow-green">THE REWARDS</h2>
        <p className="text-gray-500 text-lg">Excellence deserves recognition. Win big at Oryn Server.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {prizes.map((prize, index) => (
          <div 
            key={prize.tier} 
            className={`bg-[#111] border-2 rounded-[40px] p-10 flex flex-col items-center text-center relative overflow-hidden group transition-all duration-500 hover:-translate-y-4 ${prize.glow}`}
            style={{ borderColor: `${prize.color}20` }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: prize.color }}></div>
            
            <span className="text-sm font-black uppercase tracking-widest mb-6 opacity-60" style={{ color: prize.color }}>{prize.tier}</span>
            <div className="text-7xl font-black mb-8 tracking-tighter" style={{ color: prize.color }}>{prize.amount}</div>
            
            <ul className="space-y-4 mb-10 text-gray-400 w-full text-left">
              {prize.perks.map(perk => (
                <li key={perk} className="flex items-center space-x-3 text-sm">
                  <span style={{ color: prize.color }}>✔</span>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-auto w-full">
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000 group-hover:w-full w-12" style={{ backgroundColor: prize.color }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prize;
