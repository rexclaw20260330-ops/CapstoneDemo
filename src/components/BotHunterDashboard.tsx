"use client";

import React, { useState } from 'react';

// ============ Types ============
interface Post {
  id: string;
  content: string;
  sentiment: number;
  manipulativeScore: number;
  explanation: string;
}

interface Feature {
  name: string;
  value: number;
  weight: number;
}

interface NetworkNode {
  id: string;
  username: string;
  score: number;
  similarity: number;
}

interface AnalysisResult {
  username: string;
  suspiciousScore: number;
  features: Feature[];
  posts: Post[];
  network: NetworkNode[];
  explanations: string[];
}

// ============ Demo Data ============
const demoData: AnalysisResult = {
  username: '@crypto_promoter_2024',
  suspiciousScore: 87,
  features: [
    { name: 'Account Age Anomaly', value: 95, weight: 0.20 },
    { name: 'Post Frequency', value: 88, weight: 0.25 },
    { name: 'Engagement Pattern', value: 92, weight: 0.20 },
    { name: 'Content Similarity', value: 85, weight: 0.20 },
    { name: 'Network Density', value: 78, weight: 0.15 },
  ],
  posts: [
    {
      id: 'p1',
      content: "This coin will 1000x in 24 hours! Don't miss out! DM for exclusive info!",
      sentiment: 0.85,
      manipulativeScore: 94,
      explanation: "Uses urgency, false scarcity, and excessive hype",
    },
    {
      id: 'p2',
      content: "I made $50K in one week. Reply 'YES' if you want my secrets!",
      sentiment: 0.72,
      manipulativeScore: 91,
      explanation: "Unrealistic claims with call-to-action manipulation",
    },
    {
      id: 'p3',
      content: "Everyone is buying now! Last chance before it explodes!",
      sentiment: 0.78,
      manipulativeScore: 89,
      explanation: "FOMO tactics and artificial urgency",
    },
  ],
  network: [
    { id: 'n1', username: '@bot_follower_01', score: 96, similarity: 94 },
    { id: 'n2', username: '@auto_liker_99', score: 94, similarity: 91 },
    { id: 'n3', username: '@engagement_bot', score: 91, similarity: 88 },
    { id: 'n4', username: '@promo_spammer', score: 88, similarity: 85 },
    { id: 'n5', username: '@fake_influencer', score: 85, similarity: 82 },
  ],
  explanations: [
    "Account created 5 days ago with immediate high-frequency posting",
    "98% of engagement from accounts with similar creation patterns",
    "Content templates match known bot network #47",
    "Posting schedule shows automated cron-like behavior",
    "Cross-promotes with 23 identified bot accounts",
  ],
};

// ============ Components ============

const CircularScore = ({ score, label }: { score: number; label: string }) => {
  const radius = 50;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? '#ef4444' : score >= 60 ? '#f97316' : score >= 40 ? '#eab308' : '#10b981';

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg width="128" height="128" className="transform -rotate-90">
          <circle cx="64" cy="64" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="10" />
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold" style={{ color }}>{score}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm text-slate-600">{label}</span>
    </div>
  );
};

const FeatureBar = ({ feature }: { feature: Feature }) => (
  <div className="mb-3">
    <div className="flex justify-between mb-1">
      <span className="text-sm text-slate-600">{feature.name}</span>
      <span className="text-sm font-semibold text-slate-800">{feature.value}%</span>
    </div>
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all ${
          feature.value >= 80 ? 'bg-red-500' : feature.value >= 60 ? 'bg-orange-500' : 'bg-emerald-500'
        }`}
        style={{ width: `${feature.value}%` }}
      />
    </div>
  </div>
);

const PostCard = ({ post }: { post: Post }) => (
  <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
    <p className="text-slate-700 text-sm mb-4">&ldquo;{post.content}&rdquo;</p>
    <div className="grid grid-cols-2 gap-4 mb-3">
      <div>
        <span className="text-xs text-slate-400 uppercase">Sentiment</span>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 h-2 bg-slate-100 rounded-full">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${post.sentiment * 100}%` }} />
          </div>
          <span className="text-sm font-semibold text-slate-600">{(post.sentiment * 100).toFixed(0)}%</span>
        </div>
      </div>
      <div>
        <span className="text-xs text-slate-400 uppercase">Manipulative</span>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 h-2 bg-slate-100 rounded-full">
            <div className="h-full bg-red-500 rounded-full" style={{ width: `${post.manipulativeScore}%` }} />
          </div>
          <span className="text-sm font-semibold text-red-600">{post.manipulativeScore}%</span>
        </div>
      </div>
    </div>
    <p className="text-xs text-slate-500"><span className="text-slate-400">Why:</span> {post.explanation}</p>
  </div>
);

const NetworkGraph = ({ nodes }: { nodes: NetworkNode[] }) => (
  <div className="bg-white rounded-xl p-6 border border-slate-200">
    <div className="relative h-80">
      {/* Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">87%</span>
        </div>
        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-600 whitespace-nowrap">Target</span>
      </div>

      {/* Lines */}
      <svg className="absolute inset-0 w-full h-full">
        {nodes.slice(0, 5).map((_, i) => {
          const angle = (i / 5) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + 30 * Math.cos(angle);
          const y = 50 + 30 * Math.sin(angle);
          return (
            <line key={i} x1="50%" y1="50%" x2={`${x}%`} y2={`${y}%`} stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
          );
        })}
      </svg>

      {/* Satellite nodes */}
      {nodes.slice(0, 5).map((node, i) => {
        const angle = (i / 5) * 2 * Math.PI - Math.PI / 2;
        const x = 50 + 30 * Math.cos(angle);
        const y = 50 + 30 * Math.sin(angle);
        return (
          <div
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
              node.score >= 90 ? 'bg-red-100 border-red-400' : 'bg-orange-100 border-orange-400'
            }`}>
              <span className="text-xs font-bold text-slate-700">{node.score}%</span>
            </div>
            <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-slate-500 whitespace-nowrap">{node.username}</span>
          </div>
        );
      })}
    </div>
    <p className="text-center text-xs text-slate-400 mt-6">Similarity network based on posting patterns</p>
  </div>
);

// ============ Main Component ============
export default function BotHunterDashboard() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    if (!input.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(demoData);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🕸️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Bot Hunter</h1>
              <p className="text-xs text-slate-400">Financial Social Media Bot Detection Demo</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-10">
        {/* Input Section */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700/50 mb-8">
          <h2 className="text-lg font-semibold text-white mb-2">Account Analysis</h2>
          <p className="text-slate-400 text-sm mb-6">Enter a social media account to detect bot activity and coordinated behavior.</p>
          
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter @username..."
              className="flex-1 px-5 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
              onKeyDown={(e) => e.key === 'Enter' && analyze()}
            />
            <button
              onClick={analyze}
              disabled={!input.trim() || loading}
              className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-orange-500/25 transition-all"
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-8">
            {/* Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-sm font-medium text-slate-400 mb-4">Suspicious Score</h3>
                <CircularScore score={result.suspiciousScore} label="Risk Level" />
                <div className="mt-4 text-center">
                  <span className="px-4 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-semibold">BOT DETECTED</span>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-sm font-medium text-slate-400 mb-4">Feature Breakdown</h3>
                {result.features.map((f) => (
                  <FeatureBar key={f.name} feature={f} />
                ))}
              </div>

              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-sm font-medium text-slate-400 mb-4">Why Flagged?</h3>
                <div className="space-y-3">
                  {result.explanations.slice(0, 4).map((exp, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="w-5 h-5 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                      <span className="text-slate-300">{exp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Post Analysis */}
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-lg font-semibold text-white mb-6">Post-Level Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>

            {/* Network Analysis */}
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-lg font-semibold text-white mb-6">Network Analysis</h2>
              <div className="max-w-2xl mx-auto">
                <NetworkGraph nodes={result.network} />
              </div>
            </div>
          </div>
        )}

        {!result && !loading && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <h2 className="text-lg font-medium text-slate-300 mb-2">Ready to Analyze</h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Enter an account above to detect bot activity and coordinated inauthentic behavior.
            </p>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-700/50 mt-12">
        <div className="max-w-6xl mx-auto px-8 py-6 text-center">
          <p className="text-sm text-slate-500">Bot Hunter Demo • Financial Social Media Bot Detection</p>
        </div>
      </footer>
    </div>
  );
}
