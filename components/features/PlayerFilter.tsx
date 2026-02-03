'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ANIMATION_DURATION } from '@/lib/constants';

interface PlayerFilterProps {
  players: Array<{ name: string; id: number | string }>;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  className?: string;
}

export function PlayerFilter({
  players,
  activeFilter,
  onFilterChange,
  className,
}: PlayerFilterProps) {
  const filters = [
    { id: 'all', name: '全部球员' },
    ...players.map(p => ({ id: p.name, name: p.name })),
  ];

  return (
    <div className={cn('flex flex-wrap items-center justify-center gap-2', className)}>
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          className={cn(
            'px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-blue-500/30',
            activeFilter === filter.id
              ? 'bg-blue-600 text-white shadow-glow-blue'
              : 'bg-white text-apple-gray-700 hover:bg-apple-gray-50 border border-apple-gray-200'
          )}
          onClick={() => onFilterChange(filter.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: ANIMATION_DURATION.FAST }}
        >
          {filter.name}
        </motion.button>
      ))}
    </div>
  );
}

export default PlayerFilter;
