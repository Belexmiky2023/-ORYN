
import React, { useState } from 'react';
import { User } from '../types';

const RateUs: React.FC<{ user: User | null }> = ({ user }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (rating === 0) return;
    
    // In a real app, send to Cloudflare KV/D1
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center animate-in fade-in zoom-in duration-500">
        <div className="text-6xl mb-6">💎</div>
        <h2 className="text-4xl font-black mb-4 glow-green">Thank You!</h2>
        <p className="text-gray-400 text-lg mb-8">
          Your rating has been recorded. We appreciate your feedback in making Oryn Server better.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-[#00FF88] font-bold hover:underline"
        >
          Submit another feedback?
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-black mb-4 glow-green">RATE THE EXPERIENCE</h2>
        <p className="text-gray-500 text-lg">Help us maintain a premium standard for editors.</p>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-[40px] p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FF88] to-transparent opacity-50"></div>
        
        {!user ? (
          <div className="text-center py-10">
            <div className="text-4xl mb-6 opacity-20">🔒</div>
            <p className="text-gray-400 mb-8">You must be logged in with GitHub to rate us.</p>
            <p className="text-sm text-gray-600 italic">One rating per user strictly enforced.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="flex flex-col items-center">
              <span className="text-sm uppercase tracking-[0.2em] text-gray-500 font-bold mb-6">Select Stars</span>
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(star)}
                    className="transition-all duration-300 transform hover:scale-125 focus:outline-none"
                  >
                    <svg
                      className={`w-14 h-14 transition-colors duration-300 ${
                        (hover || rating) >= star ? 'text-[#00FF88] drop-shadow-[0_0_10px_#00FF8880]' : 'text-white/10'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
              <div className="mt-4 text-[#00FF88] font-bold text-xl h-8">
                {rating === 1 && 'Needs Improvement'}
                {rating === 2 && 'Fair'}
                {rating === 3 && 'Good'}
                {rating === 4 && 'Great'}
                {rating === 5 && 'Elite Experience'}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-widest block">Your Feedback (Optional)</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us what you love or what we can improve..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white placeholder-gray-600 focus:border-[#00FF88]/50 focus:outline-none transition-all h-32 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={rating === 0}
              className={`w-full py-5 rounded-2xl font-black text-xl transition-all duration-300 ${
                rating > 0 
                ? 'bg-[#00FF88] text-[#0A0A0A] shadow-[0_0_30px_#00FF8830] hover:scale-[1.02]' 
                : 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/5'
              }`}
            >
              Submit Rating
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RateUs;
