'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Player } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PlayerCardProps {
  player: Player;
  totalPoints?: number;
  onClick?: () => void;
  className?: string;
}

export function PlayerCard({
  player,
  totalPoints = 0,
  onClick,
  className,
}: PlayerCardProps) {
  return (
    <Card
      className={cn('group cursor-pointer overflow-hidden relative', className)}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400" />
      
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            {/* Avatar with ring */}
            <div className="relative">
              <motion.div
                className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-blue-200"
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                {player.avatar ? (
                  <img 
                    src={player.avatar} 
                    alt={player.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white text-3xl font-bold">
                    {player.name.charAt(0)}
                  </div>
                )}
              </motion.div>
              {/* Active indicator */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            </div>
            
            {/* Name */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                {player.name}
              </h3>
              <p className="text-sm text-gray-500 font-medium">{player.enName}</p>
            </div>
          </div>
          
          {/* Number Badge - Enhanced */}
          {player.number && (
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <Badge variant="primary" size="lg" className="relative text-lg font-bold">
                #{player.number}
              </Badge>
            </div>
          )}
        </div>

        {/* Stats Grid - Enhanced */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <StatItem label="位置" value={player.position} />
          <StatItem label="身高" value={player.height || '-'} />
          <StatItem 
            label="球队" 
            value={player.teamCN ? `${player.teamCN} ${player.team}` : player.team} 
            className="col-span-2" 
          />
        </div>

        {/* Total Points Highlight - Enhanced */}
        {totalPoints > 0 && (
          <motion.div
            className="mt-5 pt-5 border-t border-gray-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full blur-2xl opacity-30" />
              
              <div className="relative">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">赛季总得分</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-blue-600">
                    {totalPoints}
                  </span>
                  <span className="text-lg text-gray-500 font-semibold">分</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}

function StatItem({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn('bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors border border-gray-100', className)}>
      <p className="text-xs text-gray-500 font-medium mb-1.5 uppercase tracking-wide">{label}</p>
      <p className="text-base font-bold text-gray-900">{value}</p>
    </div>
  );
}

export default PlayerCard;
