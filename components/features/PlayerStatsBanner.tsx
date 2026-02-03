'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Player, OfficialSeasonStats } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PlayerStatsBannerProps {
  player: Player;
  totalPoints: number;
  totalMatches: number;
  winRate: number;
  totalAces: number;
  avgPoints: number;
  avgReceptionPosPct: number;
  totalAttackPoints: number;
  avgAttackSuccess: number;
  avgAttackEfficiency: number;
  totalBlocks: number;
  totalReceptions: number;
  seasonStats?: OfficialSeasonStats | null;
  className?: string;
}

export function PlayerStatsBanner({
  player,
  totalPoints,
  totalMatches,
  winRate,
  totalAces,
  avgPoints,
  avgReceptionPosPct,
  totalAttackPoints,
  avgAttackSuccess,
  avgAttackEfficiency,
  totalBlocks,
  totalReceptions,
  seasonStats,
  className,
}: PlayerStatsBannerProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Left: Player Background Image - 50% Width */}
          <motion.div 
            className="relative w-full lg:w-1/2 h-80 lg:h-auto flex-shrink-0"
            whileHover={{ scale: 1.01 }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              {player.avatar ? (
                <>
                  <img 
                    src={player.avatar} 
                    alt={player.name}
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Gradient Overlay - Subtle */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-400" />
              )}
            </div>

            {/* Floating Info - Bottom Only */}
            <div className="absolute inset-x-0 bottom-0 p-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* Compact Info Bar */}
                <div className="bg-black/40 backdrop-blur-xl rounded-xl p-2.5 border border-white/20">
                  <div className="flex items-center justify-between mb-1.5">
                    <h2 className="text-xl font-bold text-white leading-tight">
                      {player.name}
                    </h2>
                    {player.number && (
                      <div className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/30">
                        <span className="text-sm font-bold text-white">#{player.number}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-200 mb-2">{player.enName}</p>
                  
                  {/* Info Pills - Horizontal One Line */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-200">
                    <span className="font-semibold text-white">{player.position}</span>
                    {player.age && (
                      <>
                        <span className="text-white/40">|</span>
                        <span className="font-semibold text-white">{player.age}岁</span>
                      </>
                    )}
                    <span className="text-white/40">|</span>
                    <span className="font-semibold text-white">{player.height || '-'}</span>
                    <span className="text-white/40">|</span>
                    <span className="font-semibold text-white">{player.teamCN || player.team}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Stats Dashboard - 50% Width */}
          <div className="w-full lg:w-1/2 p-4 sm:p-6 bg-white flex flex-col justify-center">
            {/* Row 1: Core Stats - 3 items */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-blue-200">
                <div className="text-[10px] sm:text-xs text-blue-700 font-semibold mb-0.5 sm:mb-1">赛季总得分</div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                  <div className="text-xl sm:text-3xl font-bold text-blue-600 leading-tight">
                    {totalPoints}<span className="text-xs sm:text-base ml-0.5 sm:ml-1">分</span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-blue-600">
                    场均 <span className="font-bold">{avgPoints}</span>分
                  </div>
                </div>
              </div>
              <StatBox label="比赛场次" value={totalMatches} unit="场" color="text-gray-900" />
              <StatBox label="胜率" value={winRate} unit="%" color="text-green-600" />
            </div>

            {/* Row 2: Attack Stats - Highlighted Group */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg sm:rounded-xl p-2 sm:p-3 mb-2 sm:mb-3 border border-orange-200">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <div className="text-xs sm:text-sm text-orange-700 font-bold">扣球数据</div>
                <div className="text-[10px] sm:text-xs text-orange-600 hidden sm:block">Attack Stats</div>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <StatBox label="扣球总得分" value={totalAttackPoints} unit="分" color="text-red-600" size="sm" />
                <StatBox label="平均成功率" value={avgAttackSuccess} unit="%" color="text-orange-600" size="sm" />
                <StatBox label="平均效率" value={avgAttackEfficiency} unit="%" color="text-amber-600" size="sm" />
              </div>
            </div>

            {/* Row 3: Defense & Serve Stats - 2x2 on mobile, 4 on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              <StatBox label="发球Ace" value={totalAces} unit="个" color="text-cyan-600" />
              <StatBox label="拦网得分" value={totalBlocks} unit="分" color="text-purple-600" />
              <StatBox label="一传总次数" value={totalReceptions} unit="次" color="text-indigo-600" />
              <StatBox label="一传到位率" value={avgReceptionPosPct} unit="%" color="text-teal-600" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface StatBoxProps {
  label: string;
  value: number;
  unit: string;
  color?: string;
  size?: 'sm' | 'md';
}

function StatBox({ label, value, unit, color = 'text-gray-900', size = 'md' }: StatBoxProps) {
  return (
    <div className="bg-gray-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-gray-200 text-center hover:shadow-md transition-shadow">
      <div className="text-[10px] sm:text-xs text-gray-600 font-semibold mb-0.5 sm:mb-1 line-clamp-1">{label}</div>
      <div className={`${size === 'sm' ? 'text-lg sm:text-2xl' : 'text-xl sm:text-3xl'} font-bold ${color} leading-tight`}>
        {value}<span className="text-xs sm:text-sm ml-0.5 sm:ml-1">{unit}</span>
      </div>
    </div>
  );
}

export default PlayerStatsBanner;
