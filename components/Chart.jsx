"use client";

import { Sora } from 'next/font/google';
const sora = Sora({ subsets: ['latin'] });
import { useEffect, useRef } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { SunburstChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

export default function Chart() {

  const chartRef = useRef(null);

  useEffect(() => {
    const echartInstance = chartRef.current.getEchartsInstance();

    // Access the ECharts instance here
    // console.log(echartInstance);

    // Resize the chart on window resize
    const handleResize = () => {
      console.log("Chart resizing ...")
      echartInstance.resize();
    };

    // window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  // Register the required components
  echarts.use(
    [SunburstChart, CanvasRenderer]
  );

  const data = [
    {
      "name": "Frontend",
      "children": [
        { "name": "HTML", "value": 1 },
        { "name": "CSS", "value": 1 },
        { "name": "JavaScript", "value": 1 },
        { "name": "Sass", "value": 1 },
        { "name": "TypeScript", "value": 1 },
        { "name": "React", "value": 1 },
        { "name": "Next.js", "value": 1 },
        { "name": "Tailwind CSS", "value": 1 },
        { "name": "Bootstrap", "value": 1 },
        { "name": "jQuery", "value": 1 }
      ]
    },
    {
      "name": "Backend",
      "children": [
        { "name": "Supabase", "value": 1 },
        { "name": "Firebase", "value": 1 },
        { "name": "Strapi", "value": 1 },
        { "name": "WordPress", "value": 1 },
        { "name": "October CMS", "value": 1 },
        { "name": "PHP", "value": 1 }
      ]
    },
    {
      "name": "Practices",
      "children": [
        { "name": "RWD", "value": 1 },
        { "name": "A11y", "value": 1 },
        { "name": "Sem. HTML", "value": 1 },
        { "name": "BEM", "value": 1 },
        { "name": "SEO", "value": 1 },
        { "name": "Data privacy", "value": 1 },
        { "name": "Web perf.", "value": 1 },
        { "name": "UI/UX", "value": 1 }
      ]
    },
    {
      "name": "Tools",
      "children": [
        { "name": "Git", "value": 1 },
        { "name": "GitHub", "value": 1 },
        { "name": "npm", "value": 1 },
        { "name": "composer", "value": 1 },
        { "name": "Webpack", "value": 1 },
        { "name": "Vite", "value": 1 },
        { "name": "Gulp", "value": 1 },
        { "name": "VS Code", "value": 1 },
        { "name": "Netlify", "value": 1 },
        { "name": "ChatGPT", "value": 1 },
        { "name": "Docker", "value": 1 },
        { "name": "Figma", "value": 1 }
      ]
    },
    {
      "name": "Soft skills",
      "children": [
        { "name": "Comm.", "value": 1 },
        { "name": "Teamwork", "value": 1 },
        { "name": "Problem solving", "value": 1 },
        { "name": "Listening", "value": 1 }
      ]
    }
  ]

  const option = {
    series: {
      type: 'sunburst',
      data: data,
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
    ]
  };

  return (
    <ReactEChartsCore
      className="width-full !h-[480px] sm:!h-[600px]"
      ref={chartRef}
      echarts={echarts}
      option={option}
    />
  );
}