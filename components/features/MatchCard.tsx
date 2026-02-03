'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Match } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface MatchCardProps {
  match: Match;
  onClick?: () => void;
  className?: string;
}

export function MatchCard({ match, onClick, className }: MatchCardProps) {
  const stats = match.playerStats;
  const isHome = match.homeTeam.includes('San Giovanni');
  const isWin = isHome ? match.homeScore > match.awayScore : match.awayScore > match.homeScore;
  
  return (
    <Card
      className={cn('overflow-hidden group rounded-xl', className)}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-2.5 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium opacity-90">
              {formatDate(match.date, 'MM/dd')}
            </span>
            <span className="text-xs opacity-75">·</span>
            {match.round && (
              <span className="text-xs font-semibold">{match.round}</span>
            )}
          </div>
          {/* Win/Loss Badge */}
          <div className={cn(
            'px-2 py-0.5 rounded text-xs font-bold',
            isWin 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          )}>
            {isWin ? '胜' : '负'}
          </div>
        </div>
      </div>

      <CardContent className="p-3 bg-gray-50">
        {/* Teams & Score - Compact */}
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
          <div className="flex-1 pr-2">
            <p className="text-xs text-gray-900 mb-1 truncate font-semibold">
              {match.homeTeam.includes('San Giovanni') ? '圣乔瓦尼 San Giovanni' : match.homeTeam}
            </p>
            <p className="text-2xl font-bold text-blue-600">{match.homeScore}</p>
          </div>

          <div className="flex-shrink-0 px-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-500">VS</span>
            </div>
          </div>

          <div className="flex-1 pl-2 text-right">
            <p className="text-xs text-gray-900 mb-1 truncate font-semibold">
              {match.awayTeam.includes('San Giovanni') ? '圣乔瓦尼 San Giovanni' : match.awayTeam}
            </p>
            <p className="text-2xl font-bold text-blue-600">{match.awayScore}</p>
          </div>
        </div>

        {/* Player Stats - Detailed Layout */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
              <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
              {match.playerName} 个人数据
            </h4>
            {stats.playerRating && (
              <Badge variant="success" size="sm">⭐ {stats.playerRating}</Badge>
            )}
          </div>

          {/* Main Stats - Highlighted */}
          <div className="mb-2 p-2 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 font-medium">总得分</span>
              <span className="text-3xl font-bold text-blue-600">{stats.points}</span>
            </div>
          </div>

          {/* Detailed Stats List */}
          <div className="space-y-2">
            {/* Spike/Attack Stats */}
            {(stats.attacks !== null && stats.attacks !== undefined) && (
              <div className="pb-2 border-b border-gray-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-gray-700">扣球</span>
                  <span className="text-sm font-bold text-blue-600">{stats.successfulAttacks}分</span>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>总扣球次数</span>
                    <span className="font-semibold">{stats.attacks}次</span>
                  </div>
                  {((stats.errors !== undefined && stats.errors > 0) || (stats.blocked !== undefined && stats.blocked > 0)) && (
                    <div className="flex justify-between">
                      <span>失误 & 被拦</span>
                      <span className="font-semibold">
                        <span className="text-red-600">{stats.errors || 0}失误</span>
                        <span className="text-gray-400 mx-1">·</span>
                        <span className="text-orange-600">{stats.blocked || 0}被拦</span>
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span>双率</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-blue-600">成功率 {stats.attackSuccess}</span>
                      <span className="text-gray-400">|</span>
                      <span className="font-semibold text-green-600">效率 {stats.attackEfficiency}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Serve Stats - Compact */}
            {(stats.serves !== null && stats.serves !== undefined) && (
              <div className="pb-2 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">发球</span>
                  <span className="text-sm text-gray-600">
                    {stats.serves}次发球，<span className="font-bold text-blue-600">{stats.aces}个Ace</span>
                  </span>
                </div>
              </div>
            )}

            {/* Block Stats */}
            {(stats.blocks !== null && stats.blocks !== undefined) && (
              <div className="pb-2 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">拦网得分</span>
                  <span className="text-sm font-bold text-blue-600">{stats.blocks}分</span>
                </div>
              </div>
            )}

            {/* Reception Stats - Compact */}
            {(stats.receptions !== null && stats.receptions !== undefined) && (
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-700">一传</span>
                  <span className="text-sm text-gray-600">
                    {stats.receptions}次，到位率 <span className="font-bold text-blue-600">{stats.reception_pos_pct}%</span>，完美率 <span className="font-bold text-green-600">{stats.reception_prf_pct}%</span>
                  </span>
                </div>
              </div>
            )}
            
            {!stats.points && !stats.attacks && !stats.playerRating && (
              <div className="text-center text-gray-400 py-4 text-sm">
                详细数据待更新
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default MatchCard;
