import { type ClassValue, clsx } from 'clsx';
import { format, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';

/**
 * 工具函数库
 * Utility functions
 */

// 合并类名
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// 日期格式化
export function formatDate(dateStr: string, formatStr: string = 'MM月dd日 EEEE'): string {
  try {
    const date = parseISO(dateStr);
    return format(date, formatStr, { locale: zhCN });
  } catch (error) {
    return dateStr;
  }
}

// 格式化日期为简短格式
export function formatDateShort(dateStr: string): string {
  try {
    const date = parseISO(dateStr);
    return format(date, 'M/d', { locale: zhCN });
  } catch (error) {
    return dateStr;
  }
}

// 计算百分比
export function calculatePercentage(value: number, total: number, decimals: number = 1): string {
  if (total === 0) return '0%';
  return `${((value / total) * 100).toFixed(decimals)}%`;
}

// 格式化数字
export function formatNumber(num: number, decimals: number = 0): string {
  return num.toFixed(decimals);
}

// 延迟函数
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 防抖
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 节流
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// 生成随机ID
export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// 安全的JSON解析
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return fallback;
  }
}

// 判断是否为移动设备
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// 获取响应式断点
export function getBreakpoint(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

// 复制到剪贴板
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
}

// 滚动到元素
export function scrollToElement(
  elementId: string,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' }
): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView(options);
  }
}

// 格式化文件大小
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// 获取环境变量
export function getEnv(key: string, fallback: string = ''): string {
  return process.env[key] || fallback;
}

// 判断是否为生产环境
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

// 安全地获取对象属性
export function get<T>(obj: any, path: string, defaultValue?: T): T {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue as T;
    }
    result = result[key];
  }
  
  return (result === undefined ? defaultValue : result) as T;
}
