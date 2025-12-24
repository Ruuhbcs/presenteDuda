
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Gift, Heart, Sparkles, ExternalLink, Brain, MousePointerClick } from 'lucide-react';
import { APP_DEFAULTS, DecorativeGoldLeaf, FloatingHeart } from './constants';

/**
 * Gold Dust Particles Component
 */
const GoldDust: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-gold rounded-full opacity-20 animate-particle"
          style={{
            width: Math.random() * 4 + 'px',
            height: Math.random() * 4 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 5 + 's',
            animationDuration: Math.random() * 10 + 10 + 's',
          }}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const giftSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToGift = () => {
    giftSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-emerald-950 text-emerald-50 overflow-x-hidden selection:bg-gold/30">
      
      {/* --- HERO / MESSAGE SECTION --- */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden bg-emerald-950">
        <GoldDust />
        
        {/* Radial Gradient for Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,78,59,0.4)_0%,transparent_70%)]"></div>

        {/* Floating Background Decorations */}
        <div className="absolute top-24 left-12 animate-float opacity-10 hidden md:block">
          <FloatingHeart />
        </div>
        <div className="absolute top-40 left-24 animate-float-delayed opacity-10 hidden md:block">
          <Brain size={24} className="text-[#bf953f]" />
        </div>
        <div className="absolute bottom-48 right-12 animate-float opacity-10 hidden md:block">
          <Brain size={28} className="text-[#bf953f]" />
        </div>

        {/* Top Branding */}
        <div className="absolute top-12 flex flex-col items-center z-10 animate-fade-in w-full px-4 text-center">
           <span className="font-display text-sm sm:text-lg tracking-[0.2em] gold-gradient font-bold uppercase opacity-80">
             {APP_DEFAULTS.BRANDING}
           </span>
        </div>

        {/* Message Card */}
        <div className="relative z-10 w-full max-w-sm mt-12 bg-parchment rounded-tr-[3rem] rounded-bl-[3rem] shadow-2xl p-8 border border-gold/20 animate-scale-up">
          <div className="absolute -top-4 -right-4 rotate-90 scale-x-[-1] pointer-events-none">
            <DecorativeGoldLeaf />
          </div>
          <div className="absolute -bottom-4 -left-4 pointer-events-none">
            <DecorativeGoldLeaf />
          </div>

          <div className="flex flex-col items-center text-center space-y-6">
            <h1 className="font-display text-2xl text-emerald-900 pt-4 leading-tight">
              {APP_DEFAULTS.CARD_TITLE}
            </h1>
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-[1px] bg-emerald-800/20"></div>
              <Heart size={16} className="text-emerald-800/30" />
              <div className="w-12 h-[1px] bg-emerald-800/20"></div>
            </div>

            <p className="font-serif italic text-lg leading-relaxed text-emerald-800 px-2 whitespace-pre-line">
              "{APP_DEFAULTS.MESSAGE}"
            </p>

            <div className="pt-4 flex flex-col items-center">
              <span className="text-emerald-700 font-semibold tracking-wide uppercase text-[10px]">Com profunda gratidão,</span>
              <span className="font-display text-xl text-[#bf953f] mt-1 relative">
                {APP_DEFAULTS.SENDER}
                <Sparkles size={10} className="absolute -top-2 -right-4 text-[#bf953f] animate-pulse" />
              </span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {!scrolled && (
          <button 
            onClick={scrollToGift}
            className="absolute bottom-8 z-10 flex flex-col items-center text-[#bf953f] animate-bounce cursor-pointer group"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] mb-2 opacity-60">Toque para ver o presente</span>
            <ChevronDown size={28} />
          </button>
        )}
      </section>

      {/* --- QR CODE & LINK SECTION --- */}
      <section 
        ref={giftSectionRef}
        className="w-full min-h-screen flex flex-col items-center justify-center p-6 bg-emerald-900 border-t border-gold/10 relative overflow-hidden"
      >
        <GoldDust />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,78,59,0.3)_0%,transparent_80%)]"></div>

        <div className="max-w-md w-full flex flex-col items-center space-y-10 relative z-10">
          
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4 group">
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full animate-pulse"></div>
              <Gift className="text-white relative z-10 w-12 h-12" strokeWidth={1.5} />
              <Sparkles className="absolute -top-2 -right-4 text-white animate-pulse" size={20} />
            </div>
            <h2 className="font-display text-3xl gold-gradient mb-2">Vale-Presente</h2>
            <p className="text-emerald-100/60 max-w-[280px] text-sm italic">Pode pegar sua lembrancinha diva</p>
          </div>

          {/* Interactive QR Code Container */}
          <div 
            onClick={() => setIsRevealed(true)}
            className={`relative p-8 bg-parchment rounded-3xl shadow-2xl border-2 border-gold/40 transition-all duration-700 cursor-pointer ${!isRevealed ? 'hover:scale-105' : ''}`}
          >
            {/* Reveal Overlay */}
            {!isRevealed && (
              <div className="absolute inset-0 z-20 bg-emerald-900/90 rounded-3xl flex flex-col items-center justify-center p-6 text-center animate-pulse-slow">
                <MousePointerClick className="text-gold mb-3 animate-bounce" size={32} />
                <span className="font-display text-gold text-sm tracking-widest uppercase">Toque para revelar</span>
              </div>
            )}

            <div className="absolute -top-4 -left-4">
              <span className="animate-pulse text-2xl">✨</span>
            </div>
            
            <div className={`w-56 h-56 bg-white p-3 rounded-lg overflow-hidden flex items-center justify-center border border-emerald-900/10 transition-all duration-1000 ${!isRevealed ? 'blur-md grayscale' : 'blur-0 grayscale-0'}`}>
               <img 
                 src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(APP_DEFAULTS.GIFT_URL)}&color=064e3b`} 
                 alt="QR Code do Presente"
                 className="w-full h-full object-contain"
               />
            </div>
            
            <div className="mt-4 text-center">
              <div className="flex justify-center gap-2 mb-1">
                 <Heart size={10} className="text-[#bf953f]" />
                 <Sparkles size={10} className="text-[#bf953f] animate-pulse" />
                 <Heart size={10} className="text-[#bf953f]" />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-emerald-900/60 font-bold mt-2">Vale 30 reais na Oboti!</p>
            </div>
          </div>

          {/* Action Link */}
          <div className={`relative transition-all duration-1000 delay-300 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a 
              href={APP_DEFAULTS.GIFT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-button flex items-center gap-3 px-12 py-5 rounded-full text-emerald-950 font-bold text-lg transition-all active:scale-95 hover:brightness-110 shadow-[0_10px_30px_rgba(191,149,63,0.4)]"
            >
              RESGATAR NO SITE
              <ExternalLink size={20} />
            </a>
          </div>

          <div className="pt-12 flex flex-col items-center opacity-40">
             <div className="flex items-center gap-3 mb-2">
                <Heart size={12} fill="#bf953f" className="text-[#bf953f]" />
                <span className="font-display text-xs tracking-[0.4em] text-[#bf953f] uppercase">Ruth & Duda</span>
                <Heart size={12} fill="#bf953f" className="text-[#bf953f]" />
             </div>
             <p className="text-[9px] uppercase tracking-widest text-center">Obrigada por me ajudar a não surtar em 2025</p>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes particle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          20% { opacity: 0.3; }
          80% { opacity: 0.3; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-10px) rotate(-5deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-particle {
          animation: particle linear infinite;
        }
        .animate-fade-in {
          animation: fade-in 1.2s ease-out forwards;
        }
        .animate-scale-up {
          animation: scale-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .gold-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(191, 149, 63, 0.5);
        }
      `}</style>
    </div>
  );
};

export default App;
