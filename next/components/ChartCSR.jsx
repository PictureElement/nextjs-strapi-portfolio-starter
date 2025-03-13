'use client';

import { useEffect, useRef, useMemo } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { SunburstChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';

// Register the required components
echarts.use(
  [SunburstChart, SVGRenderer]
);

export default function ChartCSR({ data, onClientReady }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const echartInstance = chartRef.current.getEchartsInstance();

    // Resize the chart on window resize
    const handleResize = () => {
      echartInstance.resize();
    };

    window.addEventListener('resize', handleResize);

    // Notify parent that client-side chart is ready
    if (onClientReady) {
      onClientReady();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [onClientReady]);

  const option = useMemo(() => ({
    series: {
      type: 'sunburst',
      data,
      radius: [0, '95%'],
      sort: undefined,
      emphasis: {
        // focus: 'ancestor'
      },
      levels: [
        {},
        {
          r0: '8%',
          r: '48%',
          label: {
            position: 'inside',
            fontSize: 12,
            fontWeight: '400',
            color: '#111827',
            padding: 0,
            align: 'center',
          }
        },
        {
          r0: '48%',
          r: '51%',
          label: {
            position: 'outside',
            fontSize: 12,
            fontWeight: '400',
            color: '#374151',
            padding: 0,
            silent: false
          }
        }
      ]
    },
    media: [
      {
        query: {
          minWidth: 608
        },
        option: {
          series: {
            levels: [
              {},
              {
                r0: '8%',
                r: '45%',
                label: {
                  position: 'inside',
                  fontSize: 16,
                  fontWeight: '400',
                  color: '#111827',
                  padding: 2,
                  align: 'center',
                }
              },
              {
                r0: '45%',
                r: '48%',
                label: {
                  position: 'outside',
                  fontSize: 16,
                  fontWeight: '400',
                  color: '#374151',
                  padding: 2,
                  silent: false
                }
              }
            ]
          }
        }
      }
    ],

    animation: true,
  }), [data]);

  return (
    <ReactEChartsCore
      className="overflow-hidden flex items-center justify-center width-full !h-[480px] sm:!h-[600px]"
      ref={chartRef}
      echarts={echarts}
      option={option}
      opts={{ renderer: 'svg' }}
      lazyUpdate={true}
    />
  );
}