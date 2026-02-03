'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { OfficialSeasonStats } from '@/lib/types';
import { cn } from '@/lib/utils';

interface SeasonOverviewProps {
  stats: OfficialSeasonStats;
  className?: string;
}

export function SeasonOverview({ stats, className }: SeasonOverviewProps) {
  const officialStats = stats.official_stats;

  return (
    <motion.div
      className={cn('', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card variant="elevated" className="overflow-hidden">
        {/* Header with Gradient */}
        <div className="gradient-volleyball-fire p-6 text-white">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-2xl font-bold mb-1">
                {stats.season} 赛季官方统计
              </h2>
              <p className="text-white/90 text-sm">
                数据来源：意大利女排官网 | {stats.team}
              </p>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              队内排名 #{stats.rank}
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatCard
              label="出场次数"
              value={officialStats.matches_played}
              unit="场"
            />
            <StatCard
              label="总得分"
              value={officialStats.total_points}
              unit="分"
              highlight
            />
            <StatCard
              label="扣球成功率"
              value={officialStats.attack_percentage}
              unit="%"
            />
            <StatCard
              label="发球Ace"
              value={officialStats.aces}
              unit="个"
            />
            <StatCard
              label="拦网得分"
              value={officialStats.blocks}
              unit="分"
            />
            <StatCard
              label="完美一传"
              value={officialStats.perfect_receptions}
              unit="次"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  unit: string;
  highlight?: boolean;
}

function StatCard({ label, value, unit, highlight = false }: StatCardProps) {
  return (
    <motion.div
      className={cn(
        'p-4 rounded-apple-lg transition-all duration-200',
        highlight
          ? 'bg-blue-500/10 border-2 border-blue-500/30'
          : 'bg-apple-gray-50 border-2 border-transparent'
      )}
      whileHover={{ scale: 1.05, y: -2 }}
    >
      <div className="mb-2">
        <span className="text-xs text-apple-gray-600 font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span
          className={cn(
            'text-2xl font-bold',
            highlight ? 'text-blue-600' : 'text-apple-gray-900'
          )}
        >
          {value}
        </span>
        <span className="text-sm text-apple-gray-500">{unit}</span>
      </div>
    </motion.div>
  );
}

export default SeasonOverview;
