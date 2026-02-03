'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ANIMATION_DURATION, EASING } from '@/lib/constants';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'frosted' | 'elevated' | 'bordered';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Card({
  variant = 'default',
  hover = true,
  padding = 'md',
  className,
  children,
  ...props
}: CardProps) {
  const variants = {
    default: 'bg-white',
    frosted: 'bg-white/70 backdrop-blur-xl',
    elevated: 'bg-white shadow-apple-lg',
    bordered: 'bg-white border-2 border-apple-gray-200',
  };
  
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  return (
    <motion.div
      className={cn(
        'rounded-apple-lg border border-apple-gray-100/50 transition-all duration-300',
        variants[variant],
        paddings[padding],
        hover && 'hover:shadow-apple-xl hover:-translate-y-1 cursor-pointer',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: ANIMATION_DURATION.NORMAL,
        ease: EASING.STANDARD as any,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-2xl font-bold text-apple-gray-900', className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-apple-gray-600 mt-2', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-6 pt-6 border-t border-apple-gray-100', className)} {...props}>
      {children}
    </div>
  );
}

export default Card;
