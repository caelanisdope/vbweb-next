'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Match } from '@/lib/types';
import { formatDateShort } from '@/lib/utils';

interface StatsChartProps {
  matches: Match[];
}

export function StatsChart({ matches }: StatsChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<any>(null);
  const [echartsLoaded, setEchartsLoaded] = useState(false);

  // 动态加载 ECharts
  useEffect(() => {
    let mounted = true;

    import('echarts').then((echarts) => {
      if (mounted && chartRef.current && !chartInstance.current) {
        chartInstance.current = echarts.init(chartRef.current);
        setEchartsLoaded(true);
      }
    }).catch((error) => {
      console.error('Failed to load echarts:', error);
    });

    return () => {
      mounted = false;
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!chartRef.current || matches.length === 0 || !echartsLoaded) return;

    // 按球员分组数据
    const playerData: Record<string, Array<{date: string; points: number; round: string}>> = {};
    matches.forEach(match => {
      if (!playerData[match.playerName]) {
        playerData[match.playerName] = [];
      }
      playerData[match.playerName].push({
        date: match.date,
        points: match.playerStats?.points || 0,
        round: match.round
      });
    });

    // 排序每个球员的数据
    Object.keys(playerData).forEach(playerName => {
      playerData[playerName].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    });

    // 准备图表数据 - 使用第一个球员的日期作为X轴
    const firstPlayer = Object.keys(playerData)[0];
    const dates = playerData[firstPlayer]?.map(d => formatDateShort(d.date)) || [];

    // 为每个球员创建series - San Giovanni 配色
    const colors = ['#2563EB', '#3B82F6', '#60A5FA'];
    const series: any[] = [];
    
    Object.keys(playerData).forEach((playerName, index) => {
      const data = playerData[playerName];
      const points = data.map(d => d.points);
      const avgPoints = points.reduce((a, b) => a + b, 0) / points.length;
      
      series.push({
        name: playerName,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        data: points,
        itemStyle: {
          color: colors[index % colors.length],
        },
        lineStyle: {
          width: 3,
          color: colors[index % colors.length],
        },
        markPoint: {
          data: [
            { type: 'max', name: '最高' },
            { type: 'min', name: '最低' },
          ],
          label: {
            formatter: '{c}分',
            color: '#fff',
            fontWeight: 600,
          },
        },
        markLine: {
          silent: true,
          lineStyle: {
            type: 'dashed',
            color: '#999',
            width: 2,
          },
          data: [
            {
              type: 'average',
              name: '平均值',
              label: {
                formatter: `场均 {c}分`,
                color: '#666',
                fontWeight: 500,
              },
            },
          ],
        },
      });
    });

    // 配置选项
    const option: any = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e8e8ed',
        borderWidth: 1,
        textStyle: {
          color: '#1d1d1f',
        },
        formatter: function (params: any) {
          let result = `<div style="font-weight: 600; margin-bottom: 4px;">${params[0].axisValue}</div>`;
          params.forEach((item: any) => {
            result += `
              <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                ${item.marker}
                <span style="font-weight: 500;">${item.seriesName}: ${item.value}分</span>
              </div>
            `;
          });
          return result;
        },
      },
      legend: {
        data: Object.keys(playerData),
        bottom: 10,
        textStyle: {
          fontSize: 13,
          color: '#666',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: dates,
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#d2d2d7',
          },
        },
        axisLabel: {
          color: '#6e6e73',
          fontSize: 12,
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        },
      },
      yAxis: {
        type: 'value',
        name: '得分',
        nameTextStyle: {
          color: '#6e6e73',
          fontSize: 12,
        },
        axisLabel: {
          formatter: '{value}分',
          color: '#6e6e73',
          fontSize: 12,
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#e8e8ed',
          },
        },
      },
      series: series,
    };

    chartInstance.current.setOption(option);

    // 响应式处理
    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [matches, echartsLoaded]);

  if (matches.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center text-apple-gray-500">
          暂无数据
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-gray-100 shadow-lg">
      <CardContent className="p-0">
        <div ref={chartRef} className="w-full h-[450px] p-6" />
      </CardContent>
    </Card>
  );
}

export default StatsChart;
