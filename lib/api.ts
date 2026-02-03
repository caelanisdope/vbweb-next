/**
 * API客户端
 * API Client for fetching volleyball data
 */

import { VBData, OfficialSeasonStats } from './types';

// 获取球员和比赛数据
export async function getVBData(): Promise<VBData> {
  try {
    const response = await fetch('/data/data.json', {
      cache: 'no-store', // 确保获取最新数据
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch VB data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching VB data:', error);
    throw error;
  }
}

// 获取官方赛季统计
export async function getOfficialSeasonStats(): Promise<OfficialSeasonStats> {
  try {
    const response = await fetch('/data/official_season_stats.json', {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch official season stats');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching official season stats:', error);
    throw error;
  }
}

// 按球员名称筛选比赛
export function filterMatchesByPlayer(data: VBData, playerName: string) {
  if (playerName === 'all') {
    return data.matches;
  }
  return data.matches.filter(match => match.playerName === playerName);
}

// 计算球员总得分
export function calculatePlayerTotalPoints(data: VBData, playerName: string): number {
  const matches = filterMatchesByPlayer(data, playerName);
  return matches.reduce((total, match) => total + (match.playerStats?.points || 0), 0);
}

// 生成数据洞察
export function generateInsights(data: VBData) {
  const insights = [];
  
  // 遍历每个球员
  const playerNames = [...new Set(data.matches.map(m => m.playerName))];
  
  playerNames.forEach(playerName => {
    const matches = filterMatchesByPlayer(data, playerName);
    const points = matches.map(m => m.playerStats?.points || 0);
    
    if (points.length === 0) return;
    
    const totalPoints = points.reduce((a, b) => a + b, 0);
    const avgPoints = (totalPoints / points.length).toFixed(1);
    const maxPoints = Math.max(...points);
    
    // 洞察1: 场均得分
    insights.push({
      icon: '📈',
      text: `${playerName}本赛季场均${avgPoints}分，共${matches.length}场比赛`,
      type: 'info' as const,
    });
    
    // 洞察2: 最高得分
    if (maxPoints > 0) {
      insights.push({
        icon: '🏆',
        text: `${playerName}单场最高${maxPoints}分，表现出色`,
        type: 'success' as const,
      });
    }
    
    // 洞察3: 近期趋势
    const recentMatches = matches.slice(-3);
    const recentPoints = recentMatches.map(m => m.playerStats?.points || 0);
    const recentAvg = (recentPoints.reduce((a, b) => a + b, 0) / recentPoints.length).toFixed(1);
    
    if (parseFloat(recentAvg) > parseFloat(avgPoints)) {
      insights.push({
        icon: '🔥',
        text: `${playerName}近3场场均${recentAvg}分，状态上升`,
        type: 'success' as const,
      });
    }
  });
  
  return insights;
}
