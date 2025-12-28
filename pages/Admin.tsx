
import React, { useState } from 'react';
import { User, Editor } from '../types';

const ADMIN_WHITELIST = ['CreativeEditor']; // Mock whitelist

const Admin: React.FC<{ user: User | null }> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'editors' | 'users' | 'ratings'>('editors');
  
  // Mock data for admin
  const [editors, setEditors] = useState<Editor[]>([
    { id: '1', name: 'Zenix_Edit', videoUrl: 'https://youtube.com', thumbnailUrl: 'https://picsum.photos/seed/edit1/400/225', votes: 124 },
    { id: '2', name: 'MotionMaster', videoUrl: 'https://youtube.com', thumbnailUrl: 'https://picsum.photos/seed/edit2/400/225', votes: 89 },
  ]);

  const isAdmin = user && ADMIN_WHITELIST.includes(user.username);

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="text-6xl mb-6">⛔</div>
        <h2 className="text-4xl font-black mb-4 text-red-500">Access Denied</h2>
        <p className="text-gray-400 text-lg mb-8">
          This area is protected. Admin whitelist required for access.
        </p>
      </div>
    );
  }

  const adjustVotes = (id: string, delta: number) => {
    setEditors(prev => prev.map(e => e.id === id ? { ...e, votes: Math.max(0, e.votes + delta) } : e));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-black mb-2 tracking-tight">ADMIN PANEL</h2>
          <p className="text-gray-500">Secure tournament management dashboard.</p>
        </div>
        
        <div className="flex bg-[#111] p-1 rounded-2xl border border-white/10">
          {(['editors', 'users', 'ratings'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
                activeTab === tab ? 'bg-[#00FF88] text-[#0A0A0A]' : 'text-gray-500 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl">
        {activeTab === 'editors' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-8 py-6 font-black uppercase text-xs tracking-widest text-gray-500">Editor</th>
                  <th className="px-8 py-6 font-black uppercase text-xs tracking-widest text-gray-500">Thumbnail</th>
                  <th className="px-8 py-6 font-black uppercase text-xs tracking-widest text-gray-500 text-center">Votes</th>
                  <th className="px-8 py-6 font-black uppercase text-xs tracking-widest text-gray-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {editors.map((editor) => (
                  <tr key={editor.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-6 font-bold text-lg">{editor.name}</td>
                    <td className="px-8 py-6">
                      <img src={editor.thumbnailUrl} alt={editor.name} className="w-24 h-14 rounded-lg object-cover" />
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-black text-[#00FF88]">{editor.votes}</span>
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => adjustVotes(editor.id, 10)} className="text-[10px] bg-[#00FF88]/10 text-[#00FF88] px-2 py-1 rounded border border-[#00FF88]/20">+10</button>
                          <button onClick={() => adjustVotes(editor.id, -10)} className="text-[10px] bg-red-500/10 text-red-500 px-2 py-1 rounded border border-red-500/20">-10</button>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-red-500 font-bold text-sm hover:underline">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-8 border-t border-white/5">
              <button className="bg-white text-black px-6 py-3 rounded-xl font-bold hover:bg-[#00FF88] transition-colors">
                Add New Editor
              </button>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="p-20 text-center text-gray-500 italic">
            User audit logs and login history are stored in Cloudflare D1. 
            <br />Currently viewing mock live stream...
          </div>
        )}

        {activeTab === 'ratings' && (
          <div className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <span className="text-gray-500 text-sm font-bold uppercase block mb-2">Avg Rating</span>
                <span className="text-4xl font-black text-[#00FF88]">4.8 / 5.0</span>
              </div>
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <span className="text-gray-500 text-sm font-bold uppercase block mb-2">Total Reviews</span>
                <span className="text-4xl font-black">152</span>
              </div>
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <span className="text-gray-500 text-sm font-bold uppercase block mb-2">Satisfaction</span>
                <span className="text-4xl font-black text-[#00FF88]">96%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
