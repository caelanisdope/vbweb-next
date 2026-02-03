'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export function Loading({
  size = 'md',
  text,
  fullScreen = false,
  className,
}: LoadingProps) {
  const sizes = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };
  
  const spinnerElement = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={cn(
          'border-apple-gray-200 border-t-apple-blue rounded-full animate-spin',
          sizes[size]
        )}
      />
      {text && (
        <p className="text-apple-gray-600 text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
  
  if (fullScreen) {
    return (
      <motion.div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm',
          className
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {spinnerElement}
      </motion.div>
    );
  }
  
  return (
    <div className={cn('flex items-center justify-center p-8', className)}>
      {spinnerElement}
    </div>
  );
}

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('skeleton', className)} />
  );
}

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn('loading-spinner', className)}
    />
  );
}

export default Loading;
