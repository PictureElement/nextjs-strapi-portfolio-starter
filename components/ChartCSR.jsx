"use client";

import { Sora } from 'next/font/google';
const sora = Sora({ subsets: ['latin'] });
import { useEffect, useRef, useMemo } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { SunburstChart } from 'echarts/charts';
import { SVGRenderer } from 'echarts/renderers';

// Register the required components
echarts.use(
  [SunburstChart, SVGRenderer]
);

export default function ChartCSR({ data, className, ariaHidden, ariaLabel, onClientReady }) {

  const chartRef = useRef(null);

  useEffect(() => {
    const echartInstance = chartRef.current.getEchartsInstance();

    // Resize the chart on window resize
    const handleResize = () => {
      echartInstance.resize();
    };

    window.addEventListener('resize', handleResize);

    // Notify parent that client-side chart is ready
    onClientReady();

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
            fontFamily: `${sora.style.fontFamily}`,
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
            fontFamily: `${sora.style.fontFamily}`,
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
                  fontFamily: `${sora.style.fontFamily}`,
                  fontWeight: '400',
                  color: '#0f172a',
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
                  fontFamily: `${sora.style.fontFamily}`,
                  fontWeight: '400',
                  color: '#334155',
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
    <div aria-hidden={ariaHidden} aria-label={ariaLabel}>
      <ReactEChartsCore
        className={className}
        ref={chartRef}
        echarts={echarts}
        option={option}
        opts={{ renderer: 'svg' }}
        lazyUpdate={true}
      />
    </div>
  );
}