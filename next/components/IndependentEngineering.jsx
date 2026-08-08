import Services from '@/components/Services';

const data = {
  headline: 'INDEPENDENT FULL-STACK ENGINEERING & DEVOPS',
  supportiveText:
    'Architecting decoupled web systems, self-hosted infrastructure, and open-source software',
  serviceList: [
    {
      id: 1,
      title: 'DevOps & infrastructure',
      description:
        'Provisioned a self-hosted cloud server using <code>Coolify</code> to deploy full-stack environments and open-source tools, ensuring strict data sovereignty. The system integrates directly with <code>Git</code> repositories to enable automated, zero-downtime deployments across multiple production web applications.',
    },
    {
      id: 2,
      title: 'Headless architecture',
      description:
        'Engineered fully decoupled JAMstack websites utilizing API-driven <code>Strapi</code> and Git-based <code>Decap</code> CMS platforms. Built with <code>Next.js</code> and <code>Astro</code>, these architectures feature Static Site Generation, interaction-driven telemetry, and deep frontend optimizations achieving 0ms Total Blocking Time.',
    },
    {
      id: 3,
      title: 'React & client-side apps',
      description:
        'Developed robust Single-Page Applications that seamlessly integrate into legacy monolithic systems to bypass server-rendering constraints. These applications leverage client-side state management, frontend image processing, and serverless databases like <code>Firebase</code> to deliver secure, zero-latency user experiences.',
    },
    {
      id: 4,
      title: 'Marketplace & open-source',
      description:
        'Engineered custom themes and plugins for official CMS marketplaces that successfully passed strict public code-review standards. With over 500 active installations across <code>WordPress</code> and <code>October CMS</code>, these open-source extensions provide robust, highly customizable business solutions.',
    },
  ],
};

export default function IndependentEngineering() {
  return <Services data={data} />;
}
