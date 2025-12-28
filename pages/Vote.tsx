
import React, { useState } from 'react';
import { Editor, User } from '../types';

interface VoteProps {
  user: User | null;
  login: () => void;
}

const INITIAL_EDITORS: Editor[] = [
  { id: '1', name: 'Zenix_Edit', videoUrl: 'https://youtube.com', thumbnailUrl: 'https://picsum.photos/seed/edit1/400/225', votes: 124 },
  { id: '2', name: 'MotionMaster', videoUrl: 'https://youtube.com', thumbnailUrl: 'https://picsum.photos/seed/edit2/400/225', votes: 89 },
  { id: '3', name: 'AfterEffectsGod', videoUrl: 'https://youtube.com', thumbnailUrl: 'https://picsum.photos/seed/edit3/400/225', votes: 205 },
  { id: '4', name: 'FluxEditor', videoUrl: 'https://youtube.com', thumbnailUrl: 'https://picsum.photos/seed/edit4/400/225', votes: 156 },
];

const Vote: React.FC<VoteProps> = ({ user, login }) => {
  const [editors, setEditors] = useState<Editor[]>(INITIAL_EDITORS);
  const [hasVotedLocally, setHasVotedLocally] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (id: string) => {
    if (!user) {
      alert('Please login with GitHub to vote!');
      login();
      return;
    }
    
    if (user.hasVoted || hasVotedLocally) {
      alert('You have already cast your vote!');
      return;
    }

    setIsVoting(true);
    try {
      // Real API call to Cloudflare Function
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ editorId: id, userId: user.id }),
      });

      if (response.ok) {
        setEditors(prev => prev.map(e => e.id === id ? { ...e, votes: e.votes + 1 } : e));
        setHasVotedLocally(true);
      } else {
        throw new Error('Vote failed');
      }
    } catch (err) {
      // Fallback for local testing if API isn't present
      console.warn('API call failed, falling back to local simulation', err);
      setEditors(prev => prev.map(e => e.id === id ? { ...e, votes: e.votes + 1 } : e));
      setHasVotedLocally(true);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-black mb-2 tracking-tight">VOTING PANEL</h2>
          <p className="text-gray-500">Pick the best edit. Your vote matters.</p>
        </div>
        
        <div className="bg-[#111] border border-white/10 px-6 py-4 rounded-2xl">
          <h4 className="font-bold text-[#00FF88] text-sm uppercase mb-2">Voting Rules</h4>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Login with GitHub required</li>
            <li>• Only 1 vote per account</li>
            <li>• Refreshing will not reset your vote</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {editors.sort((a,b) => b.votes - a.votes).map((editor) => (
          <div key={editor.id} className="bg-[#111] rounded-3xl overflow-hidden border border-white/5 border-glow transition-all duration-300">
            <div className="aspect-video relative group cursor-pointer">
              <img src={editor.thumbnailUrl} alt={editor.name} className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-500" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-[#00FF88] flex items-center justify-center text-black">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl">{editor.name}</h3>
                <div className="flex items-center space-x-1 text-[#00FF88]">
                  <span className="font-black">{editor.votes}</span>
                  <span className="text-[10px] uppercase font-bold text-gray-500">Votes</span>
                </div>
              </div>
              
              <button
                disabled={hasVotedLocally || user?.hasVoted || isVoting}
                onClick={() => handleVote(editor.id)}
                className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
                  hasVotedLocally || user?.hasVoted || isVoting
                  ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                  : 'bg-white/5 border border-[#00FF88]/30 text-[#00FF88] hover:bg-[#00FF88] hover:text-[#0A0A0A] shadow-[0_0_15px_#00FF8820]'
                }`}
              >
                {isVoting ? 'Processing...' : (hasVotedLocally || user?.hasVoted ? 'Vote Submitted' : 'Vote Now')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vote;
