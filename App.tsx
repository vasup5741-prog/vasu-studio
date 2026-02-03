
import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ToolCard from './components/ToolCard';
import ToolDetail from './components/ToolDetail';
import GuideModal from './components/GuideModal';
import { TOOLS } from './constants';
import { Tool, Favorite } from './types';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [isShowingFavorites, setIsShowingFavorites] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hasApiKey, setHasApiKey] = useState(false);
  const [isCheckingKey, setIsCheckingKey] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    try {
      const saved = localStorage.getItem('vasu_studio_gallery_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Scroll Detection for Sticky Header
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const threshold = 50;
      const scrolled = container.scrollTop > threshold;
      setIsScrolled(scrolled);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeTool]);

  useEffect(() => {
    const checkApiKey = async () => {
      // Cast to any to avoid type conflict with existing window.aistudio declaration
      const win = window as any;
      if (win.aistudio) {
        try {
          const hasKey = await win.aistudio.hasSelectedApiKey();
          setHasApiKey(hasKey);
        } catch (e) {
          console.error("Failed to check API key", e);
          setHasApiKey(false);
        }
      } else {
        // Assume true if not in the specific environment with aistudio injected
        setHasApiKey(true);
      }
      setIsCheckingKey(false);
    };
    checkApiKey();
  }, []);

  useEffect(() => {
    localStorage.setItem('vasu_studio_gallery_v2', JSON.stringify(favorites));
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [favorites]);

  // 3D Canvas Animation Logic
  useEffect(() => {
    if (activeTool) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId: number;
    let time = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    // Configuration for the 3D Fabric
    const cols = 40;
    const rows = 25;
    const pointDist = 40; // Distance between points in 3D space
    
    const project = (x: number, y: number, z: number) => {
      // Camera params
      const fov = 800;
      const viewDist = 600;
      
      // Rotate based on mouse
      const angleX = mousePos.y * 0.5 * (Math.PI / 180);
      const angleY = mousePos.x * 0.5 * (Math.PI / 180);

      // Simple Y-rotation
      const x1 = x * Math.cos(angleY) - z * Math.sin(angleY);
      const z1 = z * Math.cos(angleY) + x * Math.sin(angleY);

      // Simple X-rotation
      const y2 = y * Math.cos(angleX) - z1 * Math.sin(angleX);
      const z2 = z1 * Math.cos(angleX) + y * Math.sin(angleX);

      const scale = fov / (viewDist + z2);
      return {
        x: width / 2 + x1 * scale,
        y: height / 2 + y2 * scale,
        scale: scale,
        z: z2
      };
    };

    const draw = () => {
      ctx.fillStyle = '#020408';
      ctx.fillRect(0, 0, width, height);

      // Digital Grid Background
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.03)';
      ctx.beginPath();
      for(let i=0; i<width; i+=40) { ctx.moveTo(i,0); ctx.lineTo(i,height); }
      for(let i=0; i<height; i+=40) { ctx.moveTo(0,i); ctx.lineTo(width,i); }
      ctx.stroke();

      time += 0.015;

      const points = [];

      // Generate Wave Points
      for (let r = 0; r < rows; r++) {
        const rowPoints = [];
        for (let c = 0; c < cols; c++) {
          const x = (c - cols / 2) * pointDist;
          const z = (r - rows / 2) * pointDist;
          
          // Double sine wave for complex fabric ripple
          const distance = Math.sqrt(x*x + z*z);
          const y = Math.sin(distance * 0.03 - time) * 50 + Math.sin(x * 0.05 + time) * 30;

          rowPoints.push(project(x, y, z));
        }
        points.push(rowPoints);
      }

      // Draw Connections (Weaving)
      ctx.lineWidth = 1;
      
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];
          
          // Opacity based on depth
          const alpha = Math.max(0, Math.min(1, (p.scale * 0.5) - 0.1));
          
          if (c < cols - 1) {
            const pNext = points[r][c + 1];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pNext.x, pNext.y);
            ctx.strokeStyle = `rgba(45, 212, 191, ${alpha})`; // Teal Horizontal
            ctx.stroke();
          }

          if (r < rows - 1) {
            const pNext = points[r + 1][c];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(pNext.x, pNext.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`; // Blue Vertical
            ctx.stroke();
          }
          
          // Glowing Intersections
          if (alpha > 0.3) {
             ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
             ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [activeTool, mousePos]); // Re-run if mousePos changes? Ideally keep mousePos in ref for perf, but React state is fine for this frame rate

  const handleMouseMove = (e: React.MouseEvent) => {
    if (activeTool) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Map to degrees for rotation (-15 to 15 degrees)
    const x = (clientX / innerWidth - 0.5) * 30;
    const y = (clientY / innerHeight - 0.5) * 30;
    setMousePos({ x, y });
  };

  const toggleFavorite = (url: string, prompt?: string, toolId?: string, category?: string, toolName?: string) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.url === url);
      if (exists) return prev.filter(f => f.url !== url);
      return [{ 
        id: Date.now().toString(), 
        url, 
        timestamp: Date.now(), 
        prompt,
        toolId,
        category,
        toolName
      }, ...prev];
    });
  };

  const handleToolSelect = (tool: Tool | null) => {
    setIsShowingFavorites(false);
    setActiveTool(tool);
  };

  const handleSelectKey = async () => {
    const win = window as any;
    if (win.aistudio) {
      try {
        await win.aistudio.openSelectKey();
        setHasApiKey(true);
      } catch (e) {
        console.error("Failed to select key", e);
      }
    }
  };

  if (isCheckingKey) {
     return <div className="h-screen w-full bg-[#020408]" />;
  }

  if (!hasApiKey) {
    return (
      <div className="flex h-[100dvh] w-full bg-[#020408] text-slate-300 items-center justify-center font-sans">
         <div className="text-center space-y-8 max-w-lg px-8 py-12 bg-[#0a0f1c] rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(45,212,191,0.1)]">
            <div className="w-24 h-24 bg-[#1e293b] rounded-[2rem] border border-white/10 flex items-center justify-center text-5xl mx-auto shadow-inner">
               <span className="animate-pulse">🔑</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-white uppercase tracking-[0.2em]">Access Required</h1>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Paid API Key Selection</p>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
               This application utilizes Veo video generation models which require a selected API key from a billing-enabled project.
            </p>
            <div className="flex flex-col gap-4">
              <button 
                 onClick={handleSelectKey}
                 className="w-full py-4 bg-[#2dd4bf] hover:bg-[#20b2a0] text-black font-black uppercase tracking-[0.2em] rounded-xl transition-all shadow-[0_0_30px_rgba(45,212,191,0.3)] active:scale-95"
              >
                 Select API Key
              </button>
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-[10px] text-slate-500 hover:text-white uppercase tracking-widest transition-colors">
                 View Billing Documentation
              </a>
            </div>
         </div>
      </div>
    );
  }

  // Define dynamic header classes based on scroll and active state
  const headerClasses = activeTool
    ? 'bg-[#0a0f1c]/95 backdrop-blur-xl border-b border-white/5 py-3 shadow-lg'
    : isScrolled
      ? 'bg-[#0a0f1c]/80 backdrop-blur-md border-b border-white/5 py-4 shadow-xl'
      : 'bg-transparent py-6';

  return (
    <div 
      className={`flex h-[100dvh] w-full bg-[#020408] text-slate-300 overflow-hidden font-sans antialiased selection:bg-[#2dd4bf]/20 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      onMouseMove={handleMouseMove}
    >
      <Sidebar 
        onSelectTool={handleToolSelect} 
        onShowFavorites={() => setIsShowingFavorites(true)}
        activeToolId={activeTool?.id || null} 
        isShowingFavorites={isShowingFavorites}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      <main className="flex-1 min-w-0 bg-[#020408] relative flex flex-col overflow-hidden">
        {/* Cinematic Header Overlay */}
        <div className={`fixed top-0 right-0 left-0 lg:left-72 z-[100] flex items-center justify-between px-6 lg:px-10 transition-all duration-500 ease-in-out ${headerClasses}`}>
          <div className="flex items-center gap-6">
             {activeTool && (
               <button onClick={() => setActiveTool(null)} className="group flex items-center justify-center w-10 h-10 bg-white/5 rounded-xl border border-white/10 hover:border-[#2dd4bf] hover:bg-[#2dd4bf] hover:text-black transition-all active:scale-90">
                 <span className="text-xl leading-none">←</span>
               </button>
             )}
             <div className="flex flex-col">
                <h2 className={`text-[13px] font-black text-white uppercase tracking-[0.4em] transition-all duration-700 ${activeTool ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  {activeTool ? activeTool.name : ''}
                </h2>
                {activeTool && activeTool.id === 'color-matching' ? (
                     <p className="text-[8px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-1 animate-in fade-in slide-in-from-left-4 duration-700">Generate color variations from your PSD design file</p>
                ) : activeTool && (
                     <p className="text-[8px] text-[#2dd4bf] font-black uppercase tracking-[0.5em] mt-1 animate-pulse">Live Interface Active</p>
                )}
             </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-[#1e293b]/50 backdrop-blur-md rounded-2xl flex items-center justify-center text-xl cursor-pointer border border-white/10 hover:border-[#2dd4bf] transition-all group overflow-hidden shadow-inner active:scale-95">
               <span className="group-hover:scale-110 transition-transform">👤</span>
            </div>
          </div>
        </div>

        <div className={`flex-1 relative ${activeTool ? 'overflow-hidden' : 'overflow-y-auto scrollbar-hide'}`} ref={containerRef}>
          {activeTool ? (
            <ToolDetail 
              tool={activeTool} 
              onBack={() => setActiveTool(null)} 
              onToggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          ) : (
            <div className="relative">
              {/* FULL-PAGE LIVE 3D HERO CANVAS */}
              <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                
                {/* 3D Canvas Background */}
                <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-[#020408] z-0 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020408]/50 via-transparent to-[#020408]/50 z-0 pointer-events-none" />

                {/* Content - Interactive Tilt */}
                <div 
                  className="relative z-20 text-center px-10 flex flex-col items-center"
                >
                  <div className="mb-14 relative group animate-in zoom-in duration-1000">
                    {/* Glowing Aura */}
                    <div className="absolute inset-0 bg-[#2dd4bf]/10 blur-[100px] rounded-full animate-pulse scale-150" />
                    
                    {/* Main Core Icon */}
                    <div className="w-44 h-44 lg:w-56 lg:h-56 bg-[#0a0f1c]/40 backdrop-blur-md rounded-[4rem] flex items-center justify-center shadow-[0_0_100px_rgba(45,212,191,0.1)] border border-white/10 relative overflow-hidden group-hover:border-[#2dd4bf]/30 transition-colors">
                       <svg viewBox="0 0 100 100" className="w-32 h-32 z-10 group-hover:scale-110 transition-transform duration-1000 drop-shadow-[0_0_20px_rgba(45,212,191,0.5)]">
                          <defs>
                            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#2dd4bf" />
                              <stop offset="100%" stopColor="#3b82f6" />
                            </linearGradient>
                          </defs>
                          <path d="M25,25 L50,80 L75,25" fill="none" stroke="url(#logoGradient)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M50,80 L50,45" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeLinecap="round" />
                          <circle cx="50" cy="80" r="3" fill="#ffffff" />
                       </svg>
                       
                       {/* Real-time HUD elements */}
                       <div className="absolute inset-4 border border-white/5 rounded-[3.5rem] animate-[spin_15s_linear_infinite]" />
                       <div className="absolute inset-8 border border-[#2dd4bf]/10 rounded-[3rem] animate-[spin_20s_linear_infinite_reverse]" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h1 className="text-7xl lg:text-[120px] font-black text-white tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-10 duration-1000 drop-shadow-2xl">
                      VASU <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2dd4bf] via-blue-400 to-[#2dd4bf] animate-[gradient-shift_8s_linear_infinite]">STUDIO</span>
                    </h1>
                    <p className="text-slate-400 text-sm lg:text-base font-black uppercase tracking-[1.5em] opacity-80 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                      Neural Interface v4.0.5
                    </p>
                  </div>
                  
                  {/* Dashboard Reveal Link - Updated Button */}
                  <div className="mt-24 relative group animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#2dd4bf] to-blue-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                    <button 
                      onClick={() => containerRef.current?.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                      className="relative px-12 py-5 bg-[#0a0f1c] ring-1 ring-white/10 rounded-full leading-none flex items-center gap-4 hover:bg-[#1e293b] transition-all active:scale-95"
                    >
                      <span className="text-[11px] font-black text-slate-300 group-hover:text-white uppercase tracking-[0.4em] transition-colors">
                        Access Tools
                      </span>
                      <span className="text-[#2dd4bf] group-hover:translate-y-1 transition-transform duration-300">
                        ↓
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* DYNAMIC CONTENT GRID */}
              <div className="px-12 lg:px-24 max-w-[1800px] mx-auto pb-64 space-y-56 pt-24 bg-[#020408] relative z-10">
                
                {/* Stats Overlay for the whole section */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { label: 'Neural Resolution', val: '8K Ultra' },
                    { label: 'Active Renders', val: '2,408' },
                    { label: 'Uptime Score', val: '99.9%' },
                    { label: 'Engine Load', val: 'Optimized' }
                  ].map((s, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/[0.05] p-8 rounded-[2.5rem] backdrop-blur-md hover:border-[#2dd4bf]/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/[0.04] group cursor-default">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">{s.label}</p>
                       <p className="text-3xl font-black text-white group-hover:text-[#2dd4bf] transition-colors">{s.val}</p>
                    </div>
                  ))}
                </div>

                {/* TOOLS SECTION */}
                <div className="space-y-48">
                  {['GETTING STARTED', 'DESIGN MAKING', 'SEPARATION TOOLS', 'EFFECTS & OUTLINES'].map((cat, idx) => (
                    <div key={cat} className="group/section">
                        <div className="flex flex-col gap-4 mb-20 animate-in fade-in slide-in-from-left-12 duration-1000" style={{ animationDelay: `${idx * 150}ms` }}>
                          <div className="flex items-center gap-8">
                            <h3 className="text-2xl font-black text-white uppercase tracking-[0.4em] group-hover/section:text-[#2dd4bf] transition-colors">
                              {cat}
                            </h3>
                            <div className="h-px flex-1 bg-gradient-to-r from-[#2dd4bf]/30 to-transparent scale-x-50 origin-left group-hover/section:scale-x-100 transition-transform duration-700" />
                          </div>
                          <p className="text-[11px] text-slate-600 font-black uppercase tracking-[0.3em] ml-1">Sequence {idx + 1} / Laboratory Protocols</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-12">
                          {TOOLS.filter(t => t.category === cat).map((tool, tIdx) => (
                            <div 
                              key={tool.id} 
                              className="animate-in fade-in slide-in-from-bottom-12 duration-700 fill-mode-backwards" 
                              style={{ animationDelay: `${(idx * 150) + (tIdx * 80)}ms` }}
                            >
                              <ToolCard tool={tool} onClick={handleToolSelect} />
                            </div>
                          ))}
                        </div>
                    </div>
                  ))}
                </div>

                {/* ACADEMY SECTION - Immersive Tiles */}
                <div className="pt-32 border-t border-white/5">
                  <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20">
                    <div className="space-y-4">
                      <h3 className="text-6xl font-black text-white tracking-tighter uppercase italic">Academy</h3>
                      <p className="text-slate-500 text-[13px] max-w-xl font-bold uppercase tracking-[0.3em] leading-relaxed">Level up your studio production with our masterclasses.</p>
                    </div>
                    <button className="px-12 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.5em] rounded-2xl hover:bg-[#2dd4bf] transition-all transform hover:scale-105 active:scale-95 shadow-[0_30px_60px_rgba(255,255,255,0.1)]">
                      Portal ↗
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
                    {[1, 2, 3].map(v => (
                      <div key={v} className="group bg-[#0a0f1c]/50 rounded-[3.5rem] overflow-hidden border border-white/5 hover:border-[#2dd4bf]/40 transition-all duration-700 cursor-pointer shadow-2xl relative hover:-translate-y-2">
                        <div className="aspect-[16/11] relative overflow-hidden">
                          <img src={`https://images.unsplash.com/photo-${v === 1 ? '1520032484190-e5ef81d87978' : v === 2 ? '1550684848-fac1c5b4e853' : '1513364776144-60967b0f800f'}?auto=format&fit=crop&q=80&w=800`} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000" alt="" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] to-transparent z-10" />
                          <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                                <span className="text-3xl ml-1">▶</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-12 relative z-20">
                          <span className="text-[10px] font-black text-[#2dd4bf] uppercase tracking-[0.5em] mb-4 block">Series 0{v}</span>
                          <h4 className="text-white font-black text-2xl mb-4 uppercase tracking-tighter group-hover:text-[#2dd4bf] transition-colors">Neural Fabric Design</h4>
                          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">Exploring deep learning integration in professional jacquard and digital print production workflows.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center py-64 border-t border-white/5 opacity-40">
                   <p className="text-sm font-black text-white uppercase tracking-[1.5em] mb-4">VASU STUDIO</p>
                   <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.6em]">The definitive AI textile laboratory. Since 2024.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {isGuideOpen && (
          <GuideModal tool={activeTool} onClose={() => setIsGuideOpen(false)} />
        )}
      </main>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .bg-clip-text {
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
};

export default App;
