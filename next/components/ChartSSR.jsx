import * as echarts from 'echarts';

function generateChartSVG(data) {
  // Initialize the chart for SSR
  const chart = echarts.init(null, null, {
    renderer: 'svg',
    ssr: true,
    width: 328,
    height: 480,
  });

  // Set the chart options
  chart.setOption({
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
    animation: false,
  });

  // Render the chart to an SVG string
  const svgStr = chart.renderToSVGString();

  // Dispose of the chart to free memory
  chart.dispose();

  return svgStr;
}

export default function ChartSSR({ data }) {
  return (
    <div className="overflow-hidden flex items-center justify-center width-full !h-[480px] sm:!h-[600px]" dangerouslySetInnerHTML={{ __html: generateChartSVG(data) }} suppressHydrationWarning />
  )
}
