import Services from '@/components/Services';

const data = {
  headline: 'INDEPENDENT INFRASTRUCTURE & ENGINEERING',
  supportiveText:
    'Running, securing and recovering self-hosted systems, alongside client web development',
  serviceList: [
    {
      id: 1,
      title: 'Web development',
      description:
        'I build headless websites with `Next.js` and `Astro`, using `Strapi` and `Decap CMS`, with a focus on performance, accessibility and GDPR-compliant analytics. I also develop client-side rendered `React` frontends as `WordPress` plugins, built with `@wordpress/scripts`, with `ACF` data models, embedded via shortcodes.',
    },
    {
      id: 2,
      title: 'Server administration',
      description:
        'I run a self-hosted `Linux` server, managed with `Coolify`, for full data sovereignty. It hosts my public website and custom apps with automatic deployments, alongside private services such as a Git server, password manager, VPN tunnel, AI chat platform, AI automation platform, task manager, and backup solution.',
    },
    {
      id: 3,
      title: 'Network security & access control',
      description:
        'No web or SSH ports are open to the internet. Web traffic reaches the server through an outbound-only `Cloudflare Tunnel`, and private services are reachable only over the VPN, enforced by firewall rules. Admin panels and public sign-ups are disabled, and every service requires authentication.',
    },
    {
      id: 4,
      title: 'Identity & account recovery',
      description:
        "I designed a risk-segmented email and account structure on my own domain to limit the impact of any breach. Accounts that control the domain, DNS and hosting use an independent recovery address, so a domain failure can't lock me out. Passkeys and two-factor codes are centralized in my password manager.",
    },
    {
      id: 5,
      title: 'Backups, monitoring & recovery',
      description:
        'Layered backups go to private `S3` storage, including AES-256 encrypted volume backups with `Duplicati`. A custom `Bash` script copies everything to an encrypted local drive. `Healthchecks.io` alerts me to both failed and missed jobs, and an offline recovery kit allows a full rebuild from backups.',
    },
    {
      id: 6,
      title: 'Open-source & marketplace',
      description:
        'I publish open-source work on GitHub, including a `Next.js` and `Strapi` portfolio template with static site generation, JSON-LD and a spam-protected contact form; it also powers this website. I also published JobLister, a `React`-based job board plugin for `WordPress` that passed the official plugin review.',
    },
  ],
};

export default function IndependentEngineering() {
  return <Services data={data} />;
}
