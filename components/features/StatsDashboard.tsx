'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { VBData } from '@/lib/types';

interface StatsDashboardProps {
  data: VBData;
  activeFilter: string;
}

export function StatsDashboard({ data, activeFilter }: StatsDashboardProps) {
  const filteredMatches = activeFilter === 'all' 
    ? data.matches 
    : data.matches.filter(m => m.playerName === activeFilter);

  // 计算关键指标
  const totalMatches = filteredMatches.length;
  const totalPoints = filteredMatches.reduce((sum, m) => sum + (m.playerStats?.points || 0), 0);
  const avgPoints = totalMatches > 0 ? (totalPoints / totalMatches).toFixed(1) : 0;
  const totalAces = filteredMatches.reduce((sum, m) => sum + (m.playerStats?.aces || 0), 0);
  const wins = filteredMatches.filter(m => {
    const isHome = m.homeTeam.includes('San Giovanni');
    return isHome ? m.homeScore > m.awayScore : m.awayScore > m.homeScore;
  }).length;
  const winRate = totalMatches > 0 ? ((wins / totalMatches) * 100).toFixed(0) : 0;

  // 最近表现趋势
  const recentMatches = filteredMatches.slice(0, 3);
  const recentAvg = recentMatches.length > 0 
    ? (recentMatches.reduce((sum, m) => sum + (m.playerStats?.points || 0), 0) / recentMatches.length).toFixed(1)
    : 0;
  const trend = parseFloat(recentAvg as string) > parseFloat(avgPoints as string) ? 'up' : 'down';

  const stats = [
    {
      label: '总场次',
      value: totalMatches,
      unit: '场',
      color: 'blue',
      subtext: `胜率 ${winRate}%`,
    },
    {
      label: '总得分',
      value: totalPoints,
      unit: '分',
      color: 'indigo',
      subtext: `场均 ${avgPoints}分`,
      trend: trend,
    },
    {
      label: '发球Ace',
      value: totalAces,
      unit: '个',
      color: 'cyan',
      subtext: `场均 ${(totalAces / (totalMatches || 1)).toFixed(1)}个`,
    },
    {
      label: '近期表现',
      value: recentAvg,
      unit: '分',
      color: 'sky',
      subtext: trend === 'up' ? '状态上升' : '有待提升',
      trend: trend,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="relative group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="bg-white rounded-2xl p-5 shadow-apple border border-gray-100 hover:shadow-apple-lg transition-all duration-300 hover:-translate-y-1">
            {/* 趋势指示器 */}
            {stat.trend && (
              <div className="absolute top-3 right-3">
                <span className={cn(
                  'text-xs font-bold px-2 py-1 rounded-full',
                  stat.trend === 'up' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-blue-100 text-blue-600'
                )}>
                  {stat.trend === 'up' ? '↑' : '↓'}
                </span>
              </div>
            )}

            {/* Header */}
            <div className="mb-3">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                {stat.label}
              </p>
            </div>

            {/* Value */}
            <div className="flex items-baseline gap-2 mb-2">
              <span className={cn(
                'text-3xl font-bold',
                stat.color === 'blue' && 'text-blue-600',
                stat.color === 'indigo' && 'text-indigo-600',
                stat.color === 'cyan' && 'text-cyan-600',
                stat.color === 'sky' && 'text-sky-600',
              )}>
                {stat.value}
              </span>
              <span className="text-sm text-gray-500 font-medium">
                {stat.unit}
              </span>
            </div>

            {/* Subtext */}
            <p className="text-xs text-gray-500 font-medium">
              {stat.subtext}
            </p>

            {/* Hover effect bar */}
            <div className={cn(
              'absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-all duration-300 opacity-0 group-hover:opacity-100',
              stat.color === 'blue' && 'bg-gradient-to-r from-blue-400 to-blue-600',
              stat.color === 'indigo' && 'bg-gradient-to-r from-indigo-400 to-indigo-600',
              stat.color === 'cyan' && 'bg-gradient-to-r from-cyan-400 to-cyan-600',
              stat.color === 'sky' && 'bg-gradient-to-r from-sky-400 to-sky-600',
            )} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default StatsDashboard;
