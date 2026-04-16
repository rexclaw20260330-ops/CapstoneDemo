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

interface Domain {
  id: string;
  name: string;
  icon: string;
}

// ============ Domain & Platform Data ============
const domains: Domain[] = [
  { id: 'cross_strait', name: '兩岸關係', icon: '🌏' },
  { id: 'bitcoin', name: '比特幣', icon: '₿' },
  { id: 'stocks', name: '股票', icon: '📈' },
];

const platforms: Domain[] = [
  { id: 'twitter', name: 'Twitter / X', icon: '𝕏' },
  { id: 'instagram', name: 'Instagram', icon: '📸' },
  { id: 'facebook', name: 'Facebook', icon: '📘' },
];

// ============ Demo Data ============
const getDemoData = (domainId: string, username: string): AnalysisResult => {
  const isGreenCase = username.toLowerCase().includes('real') || 
                      username.toLowerCase().includes('normal') || 
                      username.toLowerCase().includes('human') ||
                      username.toLowerCase().includes('genuine');
  
  if (isGreenCase) {
    return {
      username: username,
      suspiciousScore: 18,
      features: [
        { name: '帳號年齡', value: 12, weight: 0.20 },
        { name: '發文頻率', value: 15, weight: 0.25 },
        { name: '互動模式', value: 22, weight: 0.20 },
        { name: '內容相似度', value: 18, weight: 0.20 },
        { name: '網絡密度', value: 25, weight: 0.15 },
      ],
      posts: [
        {
          id: 'p1',
          content: "今天 market 波動比較大，建議大家理性看待，不要盲目跟風。投資有風險，決策需謹慎。",
          sentiment: 0.45,
          manipulativeScore: 12,
          explanation: "語氣中性理性，無過度情緒化或操控性語言",
        },
        {
          id: 'p2',
          content: "分享一點個人看法，這支股票的基本面還不錯，但短期可能有調整。僅供參考。",
          sentiment: 0.52,
          manipulativeScore: 15,
          explanation: "表達謙虛、聲明參考性質、無絕對化宣稱",
        },
        {
          id: 'p3',
          content: "感謝大家的討論，我學到了很多。投資路上互相學習，共同成長。",
          sentiment: 0.68,
          manipulativeScore: 8,
          explanation: "正面互動、無推銷意圖、社群導向",
        },
      ],
      network: [
        { id: 'n1', username: '@follower_real_01', score: 15, similarity: 12 },
        { id: 'n2', username: '@normal_user_99', score: 18, similarity: 15 },
        { id: 'n3', username: '@investor_human', score: 22, similarity: 18 },
      ],
      explanations: [
        "✅ 帳號已建立4年，有穩定的發文歷史",
        "✅ 95%互動來自真實用戶，互動質量正常",
        "✅ 內容多樣性高，無模板化特徵",
        "✅ 發文時間符合正常作息規律",
        "✅ 無與可疑帳號群體的異常關聯",
      ],
    };
  }

  const data: Record<string, AnalysisResult> = {
    cross_strait: {
      username: username || '@political_commentator_2024',
      suspiciousScore: 92,
      features: [
        { name: '帳號年齡異常', value: 95, weight: 0.20 },
        { name: '發文頻率', value: 88, weight: 0.25 },
        { name: '互動模式', value: 92, weight: 0.20 },
        { name: '內容相似度', value: 85, weight: 0.20 },
        { name: '網絡密度', value: 78, weight: 0.15 },
      ],
      posts: [
        {
          id: 'p1',
          content: "最新消息！某方勢力正在暗中操作輿論，大家一定要注意！轉發讓更多人知道！",
          sentiment: 0.15,
          manipulativeScore: 94,
          explanation: "使用情緒化語言、製造對立、呼籲轉發擴散",
        },
        {
          id: 'p2',
          content: "獨家爆料！內部人士透露真相，媒體都不敢報導！看完你就知道誰在說謊！",
          sentiment: 0.22,
          manipulativeScore: 91,
          explanation: "虛構消息來源、製造虛假權威、陰謀論調",
        },
        {
          id: 'p3',
          content: "緊急擴散！這件事關乎每個人的未來！不轉發就是幫兇！",
          sentiment: 0.18,
          manipulativeScore: 96,
          explanation: "製造緊急感、道德綁架、二元對立",
        },
      ],
      network: [
        { id: 'n1', username: '@political_bot_01', score: 96, similarity: 94 },
        { id: 'n2', username: '@opinion_spreader', score: 94, similarity: 91 },
        { id: 'n3', username: '@narrative_control', score: 91, similarity: 88 },
        { id: 'n4', username: '@fake_news_agent', score: 88, similarity: 85 },
        { id: 'n5', username: '@propaganda_node', score: 85, similarity: 82 },
      ],
      explanations: [
        "帳號建立僅7天，立即開始高頻率發布政治內容",
        "98%互動來自同質性極高的可疑帳號群體",
        "內容模板與已知網軍群組#23高度吻合",
        "發文時間顯示自動化排程特徵",
        "與32個已標記網軍帳號存在協同互動",
      ],
    },
    bitcoin: {
      username: username || '@crypto_guru_2024',
      suspiciousScore: 89,
      features: [
        { name: '帳號年齡異常', value: 92, weight: 0.20 },
        { name: '發文頻率', value: 95, weight: 0.25 },
        { name: '互動模式', value: 88, weight: 0.20 },
        { name: '內容相似度', value: 90, weight: 0.20 },
        { name: '網絡密度', value: 82, weight: 0.15 },
      ],
      posts: [
        {
          id: 'p1',
          content: "🚀 這個幣24小時內會漲1000倍！錯過這次要再等十年！私訊我取得內線消息！",
          sentiment: 0.88,
          manipulativeScore: 96,
          explanation: "誇大報酬、製造緊急感、詐騙式私訊引導",
        },
        {
          id: 'p2',
          content: "我靠這個策略一週賺了50萬！回覆『我要』帶你進VIP群組！",
          sentiment: 0.82,
          manipulativeScore: 93,
          explanation: "不實宣稱、話術操控、製造稀缺感",
        },
        {
          id: 'p3',
          content: "所有人都在買這個！最後機會錯過就沒了！馬上行動！💰💰💰",
          sentiment: 0.85,
          manipulativeScore: 94,
          explanation: "從眾效應、FOMO操弄、過度情緒化",
        },
      ],
      network: [
        { id: 'n1', username: '@crypto_shill_01', score: 95, similarity: 93 },
        { id: 'n2', username: '@pump_dump_bot', score: 93, similarity: 90 },
        { id: 'n3', username: '@fake_trader', score: 90, similarity: 87 },
        { id: 'n4', username: '@scam_promoter', score: 87, similarity: 84 },
        { id: 'n5', username: '@signal_spammer', score: 84, similarity: 81 },
      ],
      explanations: [
        "帳號創立5天內即發布大量加密貨幣推廣內容",
        "98%好友來自同質性極高的詐騙帳號網絡",
        "內容模板與已知加密詐騙群組#47高度吻合",
        "發文時間顯示自動化排程特徵",
        "與23個已標記詐騙帳號存在協同互動",
      ],
    },
    stocks: {
      username: username || '@stock_guru_insider',
      suspiciousScore: 85,
      features: [
        { name: '帳號年齡異常', value: 88, weight: 0.20 },
        { name: '發文頻率', value: 91, weight: 0.25 },
        { name: '互動模式', value: 86, weight: 0.20 },
        { name: '內容相似度', value: 83, weight: 0.20 },
        { name: '網絡密度', value: 79, weight: 0.15 },
      ],
      posts: [
        {
          id: 'p1',
          content: "獨家內線！這檔股票明天一定漲停！私訊我加入內部群組！名額有限！",
          sentiment: 0.78,
          manipulativeScore: 95,
          explanation: "聲稱內線、非法證券建議、製造稀缺感",
        },
        {
          id: 'p2',
          content: "跟著我操作三個月賺了200%！現在免費帶人，錯過就沒了！",
          sentiment: 0.75,
          manipulativeScore: 92,
          explanation: "不實報酬宣稱、話術操控、免費誘餌",
        },
        {
          id: 'p3',
          content: "緊急通知！大戶正在布局這檔！散戶趕快跟上！機會稍縱即逝！",
          sentiment: 0.72,
          manipulativeScore: 91,
          explanation: "製造緊急感、虛構大戶行為、從眾操控",
        },
      ],
      network: [
        { id: 'n1', username: '@fake_insider_01', score: 93, similarity: 91 },
        { id: 'n2', username: '@pump_group_bot', score: 91, similarity: 88 },
        { id: 'n3', username: '@stock_shiller', score: 88, similarity: 85 },
        { id: 'n4', username: '@signal_seller', score: 85, similarity: 82 },
        { id: 'n5', username: '@fake_analyst', score: 82, similarity: 79 },
      ],
      explanations: [
        "帳號創立不久即頻繁發布證券投資建議",
        "95%互動來自同質性極高的可疑帳號",
        "內容模板與已知股票操縱群組#15吻合",
        "發文時間顯示自動化排程特徵",
        "與18個已標記異常帳號存在協同互動",
      ],
    },
  };
  return data[domainId] || data.cross_strait;
};

// ============ Components ============

const CircularScore = ({ score, label }: { score: number; label: string }) => {
  const radius = 50;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? '#dc2626' : score >= 60 ? '#ea580c' : score >= 40 ? '#ca8a04' : '#16a34a';

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg width="128" height="128" className="transform -rotate-90">
          <circle cx="64" cy="64" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-slate-800">{score}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-slate-500 uppercase tracking-wide">{label}</span>
    </div>
  );
};

const FeatureBar = ({ feature }: { feature: Feature }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1.5">
      <span className="text-sm font-medium text-slate-700">{feature.name}</span>
      <span className="text-sm font-semibold text-slate-900">{feature.value}%</span>
    </div>
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${
          feature.value >= 80 ? 'bg-red-600' : feature.value >= 60 ? 'bg-amber-600' : 'bg-emerald-600'
        }`}
        style={{ width: `${feature.value}%` }}
      />
    </div>
    <div className="mt-1 text-xs text-slate-400">權重 {(feature.weight * 100).toFixed(0)}%</div>
  </div>
);

const PostCard = ({ post }: { post: Post }) => (
  <div className="bg-white rounded-lg p-5 border border-slate-200 hover:border-blue-200 hover:shadow-sm transition-all">
    <div className="mb-4 pb-4 border-b border-slate-100">
      <span className="text-xs font-medium text-blue-900 bg-blue-50 px-2 py-1 rounded">Post Analysis</span>
    </div>
    <p className="text-slate-700 text-sm leading-relaxed mb-4 min-h-[60px]">「{post.content}」</p>
    <div className="space-y-3">
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-500 uppercase tracking-wide">Sentiment</span>
          <span className="font-medium text-slate-700">{(post.sentiment * 100).toFixed(0)}%</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${post.sentiment * 100}%` }} />
        </div>
      </div>
      
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-500 uppercase tracking-wide">Manipulation</span>
          <span className="font-medium text-red-600">{post.manipulativeScore}%</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full">
          <div className="h-full bg-red-600 rounded-full" style={{ width: `${post.manipulativeScore}%` }} />
        </div>
      </div>
    </div>
    <div className="mt-4 pt-3 border-t border-slate-100">
      <span className="text-xs text-slate-500">Analysis: </span>
      <span className="text-xs text-slate-600">{post.explanation}</span>
    </div>
  </div>
);

const NetworkGraph = ({ nodes }: { nodes: NetworkNode[] }) => (
  <div className="bg-white rounded-lg p-6 border border-slate-200">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-4 bg-blue-900 rounded"></div>
      <span className="text-sm font-medium text-slate-700">Network Similarity Analysis</span>
    </div>
    <div className="relative h-64">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-800 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-sm">Target</span>
        </div>
        <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-slate-500 whitespace-nowrap">Subject</span>
      </div>

      <svg className="absolute inset-0 w-full h-full">
        {nodes.slice(0, 5).map((_, i) => {
          const angle = (i / 5) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + 30 * Math.cos(angle);
          const y = 50 + 30 * Math.sin(angle);
          return (
            <line key={i} x1="50%" y1="50%" x2={`${x}%`} y2={`${y}%`} stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
          );
        })}
      </svg>

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
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
              node.score >= 90 
                ? 'bg-red-50 border-red-400' 
                : node.score >= 70 
                  ? 'bg-amber-50 border-amber-400' 
                  : 'bg-emerald-50 border-emerald-400'
            }`}
            >
              <span className="text-xs font-bold text-slate-700">{node.score}%</span>
            </div>
            <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-slate-500 whitespace-nowrap">{node.username}</span>
          </div>
        );
      })}
    </div>
    <p className="text-center text-xs text-slate-400 mt-4">Similarity based on content patterns and interaction behaviors</p>
  </div>
);

// ============ Main Component ============
export default function BotHunterDashboard() {
  const [selectedDomain, setSelectedDomain] = useState('cross_strait');
  const [selectedPlatform, setSelectedPlatform] = useState('twitter');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    if (!input.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(getDemoData(selectedDomain, input));
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header - Ivy League Academic Style */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-amber-400 text-xl">🕸️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-900 tracking-tight">網軍調查器</h1>
                <p className="text-xs text-slate-500 font-medium tracking-wide">Bot Detection Research Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded font-medium">Ver. 2.1</span>
              <span className="text-slate-300">|</span>
              <span className="text-xs text-slate-500">Academic Demo</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-8">
        {/* Configuration Panel - Academic Card Style */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
            <div className="w-1 h-5 bg-blue-900 rounded-full"></div>
            <h2 className="text-base font-semibold text-slate-800">Configuration</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3 block">Research Domain</label>
              <div className="flex flex-wrap gap-2">
                {domains.map((domain) => (
                  <button
                    key={domain.id}
                    onClick={() => setSelectedDomain(domain.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                      selectedDomain === domain.id
                        ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <span>{domain.icon}</span>
                    <span>{domain.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3 block">Social Platform</label>
              <div className="flex flex-wrap gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border ${
                      selectedPlatform === platform.id
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <span>{platform.icon}</span>
                    <span>{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter @username to analyze..."
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 focus:outline-none transition-all text-sm"
              onKeyDown={(e) => e.key === 'Enter' && analyze()}
            />
            <button
              onClick={analyze}
              disabled={!input.trim() || loading}
              className="px-6 py-2.5 bg-blue-900 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-800 transition-all shadow-sm text-sm"
            >
              {loading ? 'Analyzing...' : 'Start Analysis'}
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-blue-900 rounded"></div>
                  <h3 className="text-sm font-medium text-slate-700">Suspicious Score</h3>
                </div>
                <CircularScore score={result.suspiciousScore} label="Risk Assessment" />
                <div className="mt-4 text-center">
                  <span className={`px-3 py-1 rounded text-xs font-semibold ${
                    result.suspiciousScore >= 60 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {result.suspiciousScore >= 60 ? 'BOT DETECTED' : 'NORMAL ACCOUNT'}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-blue-900 rounded"></div>
                  <h3 className="text-sm font-medium text-slate-700">Feature Analysis</h3>
                </div>
                {result.features.map((f) => (
                  <FeatureBar key={f.name} feature={f} />
                ))}
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-4 bg-blue-900 rounded"></div>
                  <h3 className="text-sm font-medium text-slate-700">Key Findings</h3>
                </div>
                <div className="space-y-3">
                  {result.explanations.slice(0, 4).map((exp, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="w-5 h-5 bg-blue-900 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                      <span className="text-slate-600 leading-relaxed">{exp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Post Analysis */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-5 bg-blue-900 rounded-full"></div>
                <h2 className="text-base font-semibold text-slate-800">Post-Level Analysis</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>

            {/* Network Analysis */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-5 bg-blue-900 rounded-full"></div>
                <h2 className="text-base font-semibold text-slate-800">Network Analysis</h2>
              </div>
              <div className="max-w-2xl mx-auto">
                <NetworkGraph nodes={result.network} />
              </div>
            </div>
          </div>
        )}

        {!result && !loading && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-200">
              <span className="text-2xl">🔍</span>
            </div>
            <h2 className="text-base font-medium text-slate-700 mb-2">Ready to Analyze</h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Configure parameters above and enter a target account to detect coordinated inauthentic behavior.
            </p>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-6xl mx-auto px-8 py-5">
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-500">網軍調查器 • Bot Detection Research Platform</p>
            <p className="text-xs text-slate-400">© 2024 Academic Demo</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
