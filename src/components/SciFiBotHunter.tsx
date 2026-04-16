"use client";

import React, { useState, useEffect, useRef } from 'react';

// Sci-Fi Bot Hunter Dashboard
// A cyberpunk-style social media bot detection interface
// Inspired by Blade Runner, Minority Report, and Cyberpunk 2077

interface BotScore {
  score: number;
  confidence: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

interface FeatureData {
  name: string;
  value: number;
  max: number;
  icon: string;
}

interface PostData {
  id: string;
  content: string;
  timestamp: string;
  engagement: {
    likes: number;
    replies: number;
    reposts: number;
  };
  botProbability: number;
}

interface NetworkNode {
  id: string;
  x: number;
  y: number;
  type: 'target' | 'suspicious' | 'normal';
  connections: string[];
}

const SciFiBotHunter: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<'political' | 'crypto' | 'stocks'>('political');
  const [selectedPlatform, setSelectedPlatform] = useState<'twitter' | 'instagram' | 'facebook'>('twitter');
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [scanLine, setScanLine] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mock data
  const botScore: BotScore = { score: 87, confidence: 94, riskLevel: 'CRITICAL' };
  
  const features: FeatureData[] = [
    { name: 'ACTIVITY_PATTERN', value: 92, max: 100, icon: '⚡' },
    { name: 'NETWORK_DENSITY', value: 78, max: 100, icon: '◈' },
    { name: 'CONTENT_SIMILARITY', value: 89, max: 100, icon: '◉' },
    { name: 'TEMPORAL_ANALYSIS', value: 65, max: 100, icon: '◐' },
    { name: 'ENGAGEMENT_RATIO', value: 71, max: 100, icon: '◇' },
  ];

  const posts: PostData[] = [
    {
      id: 'P-7834',
      content: 'Amazing opportunity! Check out this revolutionary platform! 🚀🚀🚀 #crypto #btc #invest',
      timestamp: '2024.01.15 14:23:45',
      engagement: { likes: 2, replies: 0, reposts: 45 },
      botProbability: 94
    },
    {
      id: 'P-7835',
      content: 'Join thousands of successful traders today! DM for exclusive access! Limited spots! 🔥',
      timestamp: '2024.01.15 14:24:12',
      engagement: { likes: 1, replies: 0, reposts: 67 },
      botProbability: 91
    },
    {
      id: 'P-7836',
      content: 'This is the future of finance! Don\'t miss out! Reply YES for more info! 💰💰💰',
      timestamp: '2024.01.15 14:25:33',
      engagement: { likes: 0, replies: 0, reposts: 89 },
      botProbability: 97
    }
  ];

  const networkNodes: NetworkNode[] = [
    { id: 'TARGET', x: 50, y: 50, type: 'target', connections: ['N1', 'N2', 'N3', 'N4'] },
    { id: 'N1', x: 20, y: 30, type: 'suspicious', connections: ['N5', 'N6'] },
    { id: 'N2', x: 80, y: 25, type: 'suspicious', connections: ['N7', 'N8'] },
    { id: 'N3', x: 75, y: 70, type: 'normal', connections: ['N9'] },
    { id: 'N4', x: 25, y: 65, type: 'suspicious', connections: ['N10'] },
    { id: 'N5', x: 10, y: 15, type: 'suspicious', connections: [] },
    { id: 'N6', x: 35, y: 10, type: 'suspicious', connections: [] },
    { id: 'N7', x: 90, y: 45, type: 'normal', connections: [] },
    { id: 'N8', x: 85, y: 10, type: 'suspicious', connections: [] },
    { id: 'N9', x: 60, y: 85, type: 'normal', connections: [] },
    { id: 'N10', x: 15, y: 80, type: 'suspicious', connections: [] },
  ];

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Scanline animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Canvas animation for network graph - only run when showResults is true
  useEffect(() => {
    if (!showResults) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrame: number;
    let time = 0;

    const drawNetwork = () => {
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Draw connections
      networkNodes.forEach(node => {
        node.connections.forEach(targetId => {
          const target = networkNodes.find(n => n.id === targetId);
          if (target) {
            const x1 = (node.x / 100) * canvas.width;
            const y1 = (node.y / 100) * canvas.height;
            const x2 = (target.x / 100) * canvas.width;
            const y2 = (target.y / 100) * canvas.height;

            // Animated pulse effect on lines
            const pulse = Math.sin(time * 0.05 + (x1 + y1) * 0.01) * 0.5 + 0.5;
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.2 + pulse * 0.3})`;
            ctx.lineWidth = 1 + pulse;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            // Animated data packet
            const packetPos = (time * 0.02 + (x1 + y1) * 0.001) % 1;
            const packetX = x1 + (x2 - x1) * packetPos;
            const packetY = y1 + (y2 - y1) * packetPos;
            ctx.fillStyle = '#00f5ff';
            ctx.beginPath();
            ctx.arc(packetX, packetY, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      });

      // Draw nodes
      networkNodes.forEach(node => {
        const x = (node.x / 100) * canvas.width;
        const y = (node.y / 100) * canvas.height;

        // Glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
        if (node.type === 'target') {
          gradient.addColorStop(0, 'rgba(255, 0, 64, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 0, 64, 0)');
        } else if (node.type === 'suspicious') {
          gradient.addColorStop(0, 'rgba(255, 0, 255, 0.6)');
          gradient.addColorStop(1, 'rgba(255, 0, 255, 0)');
        } else {
          gradient.addColorStop(0, 'rgba(0, 245, 255, 0.4)');
          gradient.addColorStop(1, 'rgba(0, 245, 255, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fill();

        // Node circle
        ctx.beginPath();
        ctx.arc(x, y, node.type === 'target' ? 8 : 5, 0, Math.PI * 2);
        if (node.type === 'target') {
          ctx.fillStyle = '#ff0040';
        } else if (node.type === 'suspicious') {
          ctx.fillStyle = '#ff00ff';
        } else {
          ctx.fillStyle = '#00f5ff';
        }
        ctx.fill();

        // Node label
        if (node.type === 'target') {
          ctx.fillStyle = '#ff0040';
          ctx.font = '10px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(node.id, x, y + 20);
        }
      });

      time++;
      animationFrame = requestAnimationFrame(drawNetwork);
    };

    drawNetwork();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, [showResults]);

  const handleAnalyze = () => {
    if (!inputValue) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW': return '#00ff9d';
      case 'MEDIUM': return '#ffff00';
      case 'HIGH': return '#ff8c00';
      case 'CRITICAL': return '#ff0040';
      default: return '#00f5ff';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#ff0040';
    if (score >= 60) return '#ff8c00';
    if (score >= 40) return '#ffff00';
    return '#00ff9d';
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 font-mono overflow-hidden relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        {/* Scanlines */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 0, 0, 0.3) 2px,
              rgba(0, 0, 0, 0.3) 4px
            )`
          }}
        />
        {/* Animated scan beam */}
        <div 
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f5ff] to-transparent opacity-50"
          style={{
            top: `${scanLine}%`,
            boxShadow: '0 0 20px #00f5ff, 0 0 40px #00f5ff'
          }}
        />
        {/* Vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 15, 0.8) 70%, rgba(10, 10, 15, 1) 100%)'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 border-2 border-[#00f5ff] rounded-lg flex items-center justify-center animate-pulse">
                  <span className="text-2xl">◈</span>
                </div>
                <div className="absolute -inset-1 border border-[#00f5ff] rounded-lg opacity-50 animate-ping" />
              </div>
              <div>
                <h1 
                  className="text-3xl font-bold tracking-wider uppercase"
                  style={{
                    textShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 40px #00f5ff',
                    background: 'linear-gradient(90deg, #00f5ff, #ff00ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Bot Hunter
                </h1>
                <p className="text-sm text-[#00f5ff]/70 tracking-[0.3em] uppercase">
                  // Neural Detection System
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#00ff9d] rounded-full animate-pulse" />
                <span className="text-[#00ff9d]">SYSTEM_ONLINE</span>
              </div>
              <div className="text-gray-500">
                v.2.0.4.{Math.floor(Math.random() * 999)}
              </div>
            </div>
          </div>
          
          {/* Decorative line */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#00f5ff]/50 to-transparent" />
        </header>

        {/* Domain & Platform Selectors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Domain Selector */}
          <div className="p-6 rounded-xl border border-[#00f5ff]/20 bg-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#00f5ff]">▸</span>
              <span className="text-xs uppercase tracking-widest text-gray-400">Target Domain</span>
            </div>
            <div className="flex gap-2">
              {(['political', 'crypto', 'stocks'] as const).map((domain) => (
                <button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`relative px-6 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-300 overflow-hidden group ${
                    selectedDomain === domain 
                      ? 'text-[#0a0a0f]' 
                      : 'text-gray-400 hover:text-[#00f5ff]'
                  }`}
                >
                  {/* Background */}
                  <div 
                    className={`absolute inset-0 transition-all duration-300 ${
                      selectedDomain === domain 
                        ? 'bg-[#00f5ff]' 
                        : 'bg-transparent border border-[#00f5ff]/30 hover:border-[#00f5ff]/60'
                    }`}
                  />
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current opacity-50" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-current opacity-50" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-current opacity-50" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current opacity-50" />
                  <span className="relative z-10">{domain}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Platform Selector */}
          <div className="p-6 rounded-xl border border-[#ff00ff]/20 bg-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#ff00ff]">▸</span>
              <span className="text-xs uppercase tracking-widest text-gray-400">Platform</span>
            </div>
            <div className="flex gap-4">
              {([
                { id: 'twitter', label: 'Twitter', icon: '𝕏' },
                { id: 'instagram', label: 'Instagram', icon: '◉' },
                { id: 'facebook', label: 'Facebook', icon: 'f' }
              ] as const).map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`relative flex items-center gap-3 px-6 py-3 transition-all duration-300 group ${
                    selectedPlatform === platform.id 
                      ? 'text-[#ff00ff]' 
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {/* Glow effect */}
                  {selectedPlatform === platform.id && (
                    <div className="absolute inset-0 bg-[#ff00ff]/10 blur-xl" />
                  )}
                  {/* Border */}
                  <div 
                    className={`absolute inset-0 border transition-all duration-300 ${
                      selectedPlatform === platform.id 
                        ? 'border-[#ff00ff] shadow-[0_0_15px_rgba(255,0,255,0.5)]' 
                        : 'border-gray-700 group-hover:border-[#ff00ff]/50'
                    }`}
                    style={{
                      clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)'
                    }}
                  />
                  <span className="relative z-10 text-lg">{platform.icon}</span>
                  <span className="relative z-10 text-sm uppercase tracking-wider">{platform.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="mb-8">
          <div className="p-6 rounded-xl border border-[#00f5ff]/30 bg-black/50 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#00f5ff] animate-pulse">❯</span>
              <span className="text-xs uppercase tracking-widest text-gray-400">Enter Target Handle / URL / Post ID</span>
            </div>
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                placeholder="@username or https://..."
                className="w-full bg-transparent border-b-2 border-[#00f5ff]/50 focus:border-[#00f5ff] outline-none py-4 text-lg text-[#00f5ff] placeholder-gray-600 transition-all"
                style={{ fontFamily: 'JetBrains Mono, monospace' }}
              />
              {/* Terminal cursor */}
              <div 
                className={`absolute right-4 top-1/2 -translate-y-1/2 text-[#00f5ff] text-2xl transition-opacity duration-100 ${
                  cursorVisible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                ▮
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>[ TAB ] autocomplete</span>
                <span>[ ENTER ] execute</span>
                <span>[ ESC ] clear</span>
              </div>
              <button
                onClick={handleAnalyze}
                disabled={!inputValue || isAnalyzing}
                className={`relative px-8 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden ${
                  inputValue && !isAnalyzing
                    ? 'text-[#0a0a0f] hover:scale-105'
                    : 'text-gray-600 cursor-not-allowed'
                }`}
              >
                <div 
                  className={`absolute inset-0 transition-all duration-300 ${
                    inputValue && !isAnalyzing
                      ? 'bg-[#00f5ff]'
                      : 'bg-gray-800'
                  }`}
                  style={{
                    clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)'
                  }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  {isAnalyzing ? (
                    <>
                      <span className="animate-spin">◐</span>
                      ANALYZING...
                    </>
                  ) : (
                    <>
                      <span>◈</span>
                      INITIATE_SCAN
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {showResults && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Score Gauge & Features Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Circular Score Gauge */}
              <div className="p-8 rounded-xl border border-[#ff0040]/30 bg-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[#ff0040]">⚠</span>
                  <span className="text-xs uppercase tracking-widest text-gray-400">Bot Probability Score</span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    {/* Background circle */}
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="128"
                        cy="128"
                        r="110"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="8"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="128"
                        cy="128"
                        r="110"
                        fill="none"
                        stroke={getScoreColor(botScore.score)}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 110}`}
                        strokeDashoffset={`${2 * Math.PI * 110 * (1 - botScore.score / 100)}`}
                        className="transition-all duration-1000"
                        style={{
                          filter: `drop-shadow(0 0 10px ${getScoreColor(botScore.score)})`
                        }}
                      />
                    </svg>
                    {/* Center content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span 
                        className="text-6xl font-bold"
                        style={{ 
                          color: getScoreColor(botScore.score),
                          textShadow: `0 0 20px ${getScoreColor(botScore.score)}`
                        }}
                      >
                        {botScore.score}%
                      </span>
                      <span className="text-sm text-gray-500 mt-2">CONFIDENCE: {botScore.confidence}%</span>
                    </div>
                    {/* Decorative rings */}
                    <div 
                      className="absolute inset-4 border border-dashed rounded-full animate-spin"
                      style={{ 
                        borderColor: `${getScoreColor(botScore.score)}40`,
                        animationDuration: '20s'
                      }}
                    />
                    <div 
                      className="absolute inset-8 border border-dotted rounded-full animate-spin"
                      style={{ 
                        borderColor: `${getScoreColor(botScore.score)}20`,
                        animationDuration: '15s',
                        animationDirection: 'reverse'
                      }}
                    />
                  </div>
                </div>
                <div className="text-center mt-4">
                  <span 
                    className="inline-block px-4 py-2 text-sm font-bold uppercase tracking-widest border-2"
                    style={{ 
                      color: getRiskColor(botScore.riskLevel),
                      borderColor: getRiskColor(botScore.riskLevel),
                      boxShadow: `0 0 20px ${getRiskColor(botScore.riskLevel)}40`,
                      background: `${getRiskColor(botScore.riskLevel)}10`
                    }}
                  >
                    {botScore.riskLevel} RISK
                  </span>
                </div>
              </div>

              {/* Feature Bars */}
              <div className="p-6 rounded-xl border border-[#00f5ff]/20 bg-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[#00f5ff]">◉</span>
                  <span className="text-xs uppercase tracking-widest text-gray-400">Detection Features</span>
                </div>
                <div className="space-y-5">
                  {features.map((feature, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-[#00f5ff]/60">{feature.icon}</span>
                          <span className="uppercase tracking-wider text-gray-400">{feature.name}</span>
                        </div>
                        <span 
                          className="font-bold"
                          style={{ color: getScoreColor(feature.value) }}
                        >
                          {feature.value}%
                        </span>
                      </div>
                      <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                        {/* Animated fill */}
                        <div 
                          className="absolute inset-y-0 left-0 transition-all duration-1000 rounded-full"
                          style={{
                            width: `${feature.value}%`,
                            background: `linear-gradient(90deg, ${getScoreColor(feature.value)}, ${getScoreColor(feature.value)}80)`,
                            boxShadow: `0 0 10px ${getScoreColor(feature.value)}`
                          }}
                        >
                          {/* Scanning effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Posts & Network Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Suspicious Posts */}
              <div className="p-6 rounded-xl border border-[#ff00ff]/20 bg-white/5 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[#ff00ff]">⚡</span>
                    <span className="text-xs uppercase tracking-widest text-gray-400">Flagged Content</span>
                  </div>
                  <span className="text-xs text-[#ff0040]">● LIVE FEED</span>
                </div>
                <div className="space-y-4">
                  {posts.map((post, idx) => (
                    <div 
                      key={post.id}
                      className="p-4 border border-gray-800 hover:border-[#ff00ff]/50 transition-all duration-300 group relative overflow-hidden"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'
                      }}
                    >
                      {/* Hover glow */}
                      <div className="absolute inset-0 bg-[#ff00ff]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-[#ff00ff]/70 font-mono">ID: {post.id}</span>
                          <span className="text-xs text-gray-600">{post.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-3 leading-relaxed">{post.content}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>♥ {post.engagement.likes}</span>
                            <span>↩ {post.engagement.replies}</span>
                            <span>↗ {post.engagement.reposts}</span>
                          </div>
                          <span 
                            className="text-xs font-bold px-2 py-1 rounded"
                            style={{
                              color: getScoreColor(post.botProbability),
                              background: `${getScoreColor(post.botProbability)}20`
                            }}
                          >
                            {post.botProbability}% BOT
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Network Graph */}
              <div className="p-6 rounded-xl border border-[#00f5ff]/20 bg-white/5 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[#00f5ff]">◈</span>
                    <span className="text-xs uppercase tracking-widest text-gray-400">Connection Network</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#ff0040]" />
                      TARGET
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#ff00ff]" />
                      SUSPICIOUS
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#00f5ff]" />
                      NORMAL
                    </span>
                  </div>
                </div>
                <div className="relative aspect-square">
                  <canvas 
                    ref={canvasRef}
                    className="w-full h-full rounded-lg"
                  />
                  {/* Overlay stats */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs">
                    <div className="bg-black/80 backdrop-blur px-3 py-2 rounded border border-[#00f5ff]/30">
                      <span className="text-gray-500">NODES: </span>
                      <span className="text-[#00f5ff]">{networkNodes.length}</span>
                    </div>
                    <div className="bg-black/80 backdrop-blur px-3 py-2 rounded border border-[#ff00ff]/30">
                      <span className="text-gray-500">SUSPICIOUS: </span>
                      <span className="text-[#ff00ff]">{networkNodes.filter(n => n.type === 'suspicious').length}</span>
                    </div>
                    <div className="bg-black/80 backdrop-blur px-3 py-2 rounded border border-[#ff0040]/30">
                      <span className="text-gray-500">CLUSTERING: </span>
                      <span className="text-[#ff0040]">0.87</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="flex items-center justify-between p-4 border-t border-[#00f5ff]/20 text-xs">
              <div className="flex items-center gap-6">
                <span className="text-gray-500">
                  SCAN_ID: <span className="text-[#00f5ff]">BOT-{Date.now().toString(36).toUpperCase()}</span>
                </span>
                <span className="text-gray-500">
                  STATUS: <span className="text-[#00ff9d]">COMPLETE</span>
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <span className="animate-pulse">◐</span>
                <span>MONITORING_ACTIVE</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default SciFiBotHunter;
