/**
 * 核心数据类型定义
 * Type definitions for the volleyball statistics system
 */

// 球员信息
export interface Player {
  id: number;
  name: string;
  enName: string;
  team: string;
  teamCN?: string;
  position: string;
  number?: number;
  age?: number;
  height?: string;
  avatar?: string;
}

// 球员统计数据
export interface PlayerStats {
  points: number;
  attacks: number;
  successfulAttacks: number;
  blocks: number;
  attackSuccess: string;
  attackEfficiency: string;
  serves: number;
  aces: number;
  receptions: number;
  reception_pos_pct: number;
  reception_prf_pct: number;
  errors?: number;
  blocked?: number;
  playerRating?: string;
}

// 比赛信息
export interface Match {
  id: string;
  date: string;
  round: string;
  playerName: string;
  opponent: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  playerStats: PlayerStats;
}

// 赛季统计概览
export interface SeasonSummary {
  total_points: number;
  avg_points: number;
  total_attacks: number;
  total_attack_points: number;
  attack_success_rate: number;
  total_serves: number;
  total_aces: number;
  ace_rate: number;
}

// 官方赛季统计
export interface OfficialSeasonStats {
  playerName: string;
  playerNameEn: string;
  season: string;
  team: string;
  rank: number;
  official_stats: {
    matches_played: number;
    total_points: number;
    total_attacks: number;
    successful_attacks: number;
    attack_percentage: number;
    total_serves: number;
    aces: number;
    blocks: number;
    serve_errors: number;
    perfect_receptions: number;
  };
}

// 完整数据结构
export interface VBData {
  players: Player[];
  matches: Match[];
  summary?: SeasonSummary;
}

// 数据洞察
export interface DataInsight {
  icon: string;
  text: string;
  type?: 'info' | 'success' | 'warning';
}

// 图表数据点
export interface ChartDataPoint {
  date: string;
  points: number;
  round?: string;
}

// 球员筛选器选项
export type PlayerFilter = 'all' | string;

// API响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
