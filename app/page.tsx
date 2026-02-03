'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PlayerCard } from '@/components/features/PlayerCard';
import { MatchCard } from '@/components/features/MatchCard';
import { StatsChart } from '@/components/features/StatsChart';
import { PlayerFilter } from '@/components/features/PlayerFilter';
import { PlayerStatsBanner } from '@/components/features/PlayerStatsBanner';
import { Loading } from '@/components/ui/Loading';
import { Badge } from '@/components/ui/Badge';
import { VBData, OfficialSeasonStats, Match } from '@/lib/types';
import { getVBData, getOfficialSeasonStats, filterMatchesByPlayer, calculatePlayerTotalPoints, generateInsights } from '@/lib/api';
import { ANIMATION_DURATION, EASING } from '@/lib/constants';

export default function HomePage() {
  const [data, setData] = useState<VBData | null>(null);
  const [seasonStats, setSeasonStats] = useState<OfficialSeasonStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);

  // 加载数据
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [vbData, officialStats] = await Promise.all([
          getVBData(),
          getOfficialSeasonStats().catch(() => null), // 如果没有官方统计也没关系
        ]);
        
        setData(vbData);
        setSeasonStats(officialStats);
        setFilteredMatches(vbData.matches);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // 筛选比赛（只用于比赛卡片展示）
  useEffect(() => {
    if (!data) return;
    
    const matches = filterMatchesByPlayer(data, activeFilter);
    setFilteredMatches(matches);
  }, [activeFilter, data]);

  if (loading) {
    return <Loading fullScreen text="加载数据中..." />;
  }

  if (!data) {
    return (
      <div className="container-apple py-20 text-center">
        <h2 className="text-2xl font-bold text-apple-gray-900 mb-4">
          ⚠️ 数据未找到
        </h2>
        <p className="text-apple-gray-600">
          请确保数据文件存在于 public/data/ 目录下
        </p>
      </div>
    );
  }

  const insights = generateInsights(data);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Enhanced */}
      <section className="gradient-volleyball py-8 sm:py-12 md:py-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 border-2 sm:border-4 border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-20 sm:w-32 md:w-40 h-20 sm:h-32 md:h-40 border-2 sm:border-4 border-white rounded-full" />
          <div className="absolute top-1/2 left-1/4 w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 border-2 sm:border-4 border-white rounded-full" />
        </div>

        <div className="container-apple relative z-10">
          <motion.div
            className="text-center text-white max-w-5xl mx-auto px-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASING.STANDARD as any }}
          >
            {/* Season Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-xs sm:text-sm font-semibold">2025-2026 赛季</span>
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm">实时更新</span>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 tracking-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              中国女排球员在意大利
            </motion.h1>
            <motion.p
              className="text-base sm:text-xl md:text-2xl opacity-95 mb-6 sm:mb-8 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Serie A1 职业球员数据追踪平台
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{data.matches.length}</span>
                <span className="text-sm">场比赛</span>
              </div>
              <div className="w-px h-6 bg-white/30" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{data.players.length}</span>
                <span className="text-sm">位球员</span>
              </div>
              <div className="w-px h-6 bg-white/30" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{data.summary?.total_points || 0}</span>
                <span className="text-sm">总得分</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="container-apple py-8 space-y-8">
        {/* Player Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <PlayerFilter
            players={data.players}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </motion.div>

        {/* Player Stats Banner - Full Width */}
        {activeFilter !== 'all' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {(() => {
              const player = data.players.find(p => p.name === activeFilter);
              if (!player) return null;
              
              const playerMatches = data.matches.filter(m => m.playerName === player.name);
              const totalMatches = playerMatches.length;
              const totalPoints = calculatePlayerTotalPoints(data, player.name);
              const avgPoints = totalMatches > 0 ? Number((totalPoints / totalMatches).toFixed(1)) : 0;
              const totalAces = playerMatches.reduce((sum, m) => sum + (m.playerStats?.aces || 0), 0);
              const wins = playerMatches.filter(m => {
                const isHome = m.homeTeam.includes('San Giovanni');
                return isHome ? m.homeScore > m.awayScore : m.awayScore > m.homeScore;
              }).length;
              const winRate = totalMatches > 0 ? Number(((wins / totalMatches) * 100).toFixed(0)) : 0;
              
              // Calculate attack stats
              const totalAttackPoints = playerMatches.reduce((sum, m) => sum + (m.playerStats?.successfulAttacks || 0), 0);
              const avgAttackSuccess = totalMatches > 0 
                ? Number((playerMatches.reduce((sum, m) => {
                    const successRate = parseFloat(m.playerStats?.attackSuccess?.replace('%', '') || '0');
                    return sum + successRate;
                  }, 0) / totalMatches).toFixed(1))
                : 0;
              const avgAttackEfficiency = totalMatches > 0
                ? Number((playerMatches.reduce((sum, m) => {
                    const efficiency = parseFloat(m.playerStats?.attackEfficiency?.replace('%', '') || '0');
                    return sum + efficiency;
                  }, 0) / totalMatches).toFixed(1))
                : 0;
              
              // Calculate defense stats
              const totalBlocks = playerMatches.reduce((sum, m) => sum + (m.playerStats?.blocks || 0), 0);
              const totalReceptions = playerMatches.reduce((sum, m) => sum + (m.playerStats?.receptions || 0), 0);
              const avgReceptionPosPct = totalMatches > 0
                ? Number((playerMatches.reduce((sum, m) => sum + (m.playerStats?.reception_pos_pct || 0), 0) / totalMatches).toFixed(0))
                : 0;

              return (
                <PlayerStatsBanner
                  player={player}
                  totalPoints={totalPoints}
                  totalMatches={totalMatches}
                  winRate={winRate}
                  totalAces={totalAces}
                  avgPoints={avgPoints}
                  avgReceptionPosPct={avgReceptionPosPct}
                  totalAttackPoints={totalAttackPoints}
                  avgAttackSuccess={avgAttackSuccess}
                  avgAttackEfficiency={avgAttackEfficiency}
                  totalBlocks={totalBlocks}
                  totalReceptions={totalReceptions}
                  seasonStats={player.name === '庄宇珊' ? seasonStats : null}
                />
              );
            })()}
          </motion.section>
        )}

        {/* Stats Chart - Enhanced Header */}
        {data.matches.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="mb-6">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    得分趋势分析
                  </h2>
                  <p className="text-gray-600 text-sm">逐场比赛得分表现 · 季度走势可视化</p>
                </div>
                <Badge variant="info" size="sm">实时数据</Badge>
              </div>
            </div>
            <StatsChart matches={data.matches} />
          </motion.section>
        )}




        {/* Data Insights - Enhanced */}
        {insights.length > 0 && (
          <motion.section
            className="relative rounded-2xl p-8 text-white overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    智能数据洞察
                  </h2>
                  <p className="text-white/80 text-xs sm:text-sm">基于赛季表现的深度分析</p>
                </div>
                <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm">
                  AI 分析
                </Badge>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/15 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-5 border border-white/20 hover:bg-white/20 transition-all"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-2 h-2 bg-white rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                      <p className="text-white/95 text-sm sm:text-base font-medium leading-relaxed">{insight.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Match Cards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-end justify-between mb-4 sm:mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                比赛记录
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm">完整比赛统计 · 个人技术数据</p>
            </div>
            <Badge variant="primary" size="lg" className="px-3 sm:px-4 text-xs sm:text-sm">
              {filteredMatches.length} 场
            </Badge>
          </div>
          
          {filteredMatches.length === 0 ? (
            <div className="text-center py-12 sm:py-20">
              <p className="text-lg sm:text-xl text-gray-500">暂无比赛数据</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
              {filteredMatches.map((match, index) => (
                <motion.div
                  key={`${match.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.05 }}
                >
                  <MatchCard match={match} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
