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
  // Detect if it's a green case (normal user)
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
      username: '@crypto_guru_2024',
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
      username: '@stock_guru_insider',
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
  const color = score >= 80 ? '#ef4444' : score >= 60 ? '#f97316' : score >= 40 ? '#eab308' : '#10b981';

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg width="128" height="128" className="transform -rotate-90">
          <circle cx="64" cy="64" r={radius} fill="none" stroke="#334155" strokeWidth="10" />
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
          <span className="text-2xl font-bold text-white">{score}%</span>
        </div>
      </div>
      <span className="mt-2 text-sm text-slate-400">{label}</span>
    </div>
  );
};

const FeatureBar = ({ feature }: { feature: Feature }) => (
  <div className="mb-3">
    <div className="flex justify-between mb-1">
      <span className="text-sm text-slate-400">{feature.name}</span>
      <span className="text-sm font-semibold text-slate-300">{feature.value}% <span className="text-slate-500 font-normal">(權重 {(feature.weight * 100).toFixed(0)}%)</span></span>
    </div>
    <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
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
  <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50 hover:border-slate-600 transition-all">
    <p className="text-slate-300 text-sm leading-relaxed mb-4">「{post.content}」</p>
    <div className="grid grid-cols-2 gap-4 mb-3">
      <div>
        <span className="text-xs text-slate-500 uppercase">情緒傾向</span>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 h-2 bg-slate-700/50 rounded-full">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${post.sentiment * 100}%` }} />
          </div>
          <span className="text-sm font-semibold text-slate-400 w-12 text-right">
            {(post.sentiment * 100).toFixed(0)}%
          </span>
        </div>
      </div>
      
      <div>
        <span className="text-xs text-slate-500 uppercase">操控程度</span>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 h-2 bg-slate-700/50 rounded-full">
            <div className="h-full bg-amber-400 rounded-full" style={{ width: `${post.manipulativeScore}%` }} />
          </div>
          <span className="text-sm font-semibold text-amber-400 w-12 text-right">{post.manipulativeScore}%</span>
        </div>
      </div>
    </div>
    <div className="mt-4 pt-4 border-t border-slate-700/50">
      <span className="text-xs text-slate-500">標記原因：</span>
      <span className="text-sm text-slate-400">{post.explanation}</span>
    </div>
  </div>
);

const NetworkGraph = ({ nodes }: { nodes: NetworkNode[] }) => (
  <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
    <div className="relative h-72">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">目標</span>
        </div>
        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-400 whitespace-nowrap">調查對象</span>
      </div>

      <svg className="absolute inset-0 w-full h-full">
        {nodes.slice(0, 5).map((_, i) => {
          const angle = (i / 5) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + 32 * Math.cos(angle);
          const y = 50 + 32 * Math.sin(angle);
          return (
            <line key={i} x1="50%" y1="50%" x2={`${x}%`} y2={`${y}%`} stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
          );
        })}
      </svg>

      {nodes.slice(0, 5).map((node, i) => {
        const angle = (i / 5) * 2 * Math.PI - Math.PI / 2;
        const x = 50 + 32 * Math.cos(angle);
        const y = 50 + 32 * Math.sin(angle);
        return (
          <div
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${
              node.score >= 90 ? 'bg-red-500/20 border-red-400' : 'bg-amber-500/20 border-amber-400'
            }`}
            >
              <span className="text-xs font-bold text-slate-300">{node.score}%</span>
            </div>
            <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs text-slate-500 whitespace-nowrap">{node.username}</span>
          </div>
        );
      })}
    </div>
    <p className="text-center text-xs text-slate-500 mt-6">基於發文模式與互動行為的相似度網絡</p>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl">🕸️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">網軍調查器</h1>
              <p className="text-xs text-slate-400">社群媒體可疑帳號與協同行為偵測系統</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-10">
        {/* Domain & Platform Selector + Input */}
        <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700/50 mb-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-2">調查設定</h2>
            <p className="text-slate-400 text-sm mb-4">選擇調查主題、社群平台並輸入目標帳號</p>
            
            <div className="mb-4">
              <span className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">調查主題</span>
              <div className="flex gap-2">
                {domains.map((domain) => (
                  <button
                    key={domain.id}
                    onClick={() => setSelectedDomain(domain.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                      selectedDomain === domain.id
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 shadow-lg'
                        : 'bg-slate-700/50 text-slate-300 border border-slate-600 hover:border-amber-400/50'
                    }`}
                  >
                    <span>{domain.icon}</span>
                    <span>{domain.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <span className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">社群平台</span>
              <div className="flex gap-2">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
                      selectedPlatform === platform.id
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 shadow-lg'
                        : 'bg-slate-700/50 text-slate-300 border border-slate-600 hover:border-amber-400/50'
                    }`}
                  >
                    <span>{platform.icon}</span>
                    <span>{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="輸入 @使用者名稱..."
              className="flex-1 px-5 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
              onKeyDown={(e) => e.key === 'Enter' && analyze()}
            />
            <button
              onClick={analyze}
              disabled={!input.trim() || loading}
              className="px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-orange-500/25 transition-all"
            >
              {loading ? '分析中...' : '開始調查'}
            </button>
          </div>
        </div>

        {result && (
          <div className="space-y-8">
            {/* Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-sm font-medium text-slate-400 mb-4">可疑度評分</h3>
                <CircularScore score={result.suspiciousScore} label="風險等級" />
                <div className="mt-4 text-center">
                  <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    result.suspiciousScore >= 60 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {result.suspiciousScore >= 60 ? '網軍帳號偵測' : '正常帳號'}
                  </span>
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-sm font-medium text-slate-400 mb-4">特徵分析</h3>
                {result.features.map((f) => (
                  <FeatureBar key={f.name} feature={f} />
                ))}
              </div>

              <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-sm font-medium text-slate-400 mb-4">調查結論</h3>
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
              <h2 className="text-lg font-semibold text-white mb-6">貼文層級分析</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>

            {/* Network Analysis */}
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-lg font-semibold text-white mb-6">網絡關係分析</h2>
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
            <h2 className="text-lg font-medium text-slate-300 mb-2">準備開始調查</h2>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              選擇調查主題並輸入目標帳號，即可進行網軍行為與協同操控分析。
            </p>
          </div>
        )}
      </main>

      <footer className="border-t border-slate-700/50 mt-12">
        <div className="max-w-6xl mx-auto px-8 py-6 text-center">
          <p className="text-sm text-slate-500">網軍調查器 • 社群媒體可疑帳號偵測系統</p>
        </div>
      </footer>
    </div>
  );
}
