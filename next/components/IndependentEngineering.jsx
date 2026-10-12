import Services from '@/components/Services';

const data = {
  headline: 'INDEPENDENT INFRASTRUCTURE & ENGINEERING',
  supportiveText:
    'Running, securing and recovering self-hosted systems, alongside client web development',
  serviceList: [
    {
      id: 1,
      title: 'Server administration',
      description:
        'I run a self-hosted Linux server on `Hetzner`, managed with `Coolify`, for full data sovereignty. It hosts my public website and private services: `Forgejo` (Git), `Vaultwarden` (passwords), `WireGuard` (VPN), `LibreChat` (AI chat), `Strapi` (CMS) and `Duplicati` (backups). Deployments run automatically from `Git`.',
    },
    {
      id: 2,
      title: 'Network security & access control',
      description:
        'No web or SSH ports are open to the internet. Web traffic reaches the server through an outbound-only `Cloudflare Tunnel`, and private services are reachable only over the VPN, enforced by firewall rules. Admin panels and public sign-ups are disabled, and every service requires authentication.',
    },
    {
      id: 3,
      title: 'Identity & account recovery',
      description:
        "I designed a risk-segmented email and account structure on my own domain to limit the impact of any breach. Accounts that control the domain, DNS and hosting use an independent recovery address, so a domain failure can't lock me out. Passkeys and two-factor codes are centralized in `Vaultwarden`.",
    },
    {
      id: 4,
      title: 'Backups, monitoring & recovery',
      description:
        'Layered backups go to private `S3` storage, including AES-256 encrypted volume backups with `Duplicati`. A custom `Bash` script copies everything to an encrypted local drive. `Healthchecks.io` alerts me to both failed and missed jobs, and an offline recovery kit allows a full rebuild from backups.',
    },
    {
      id: 5,
      title: 'Web development',
      description:
        'I build headless websites with `Next.js` and `Astro`, using `Strapi` and `Decap CMS`, with a focus on performance, accessibility and GDPR-compliant analytics. I also build `React` single-page applications, including apps embedded in `WordPress` and apps using `Firebase` for authentication and storage.',
    },
    {
      id: 6,
      title: 'Marketplace & open-source',
      description:
        'I have published custom themes and plugins on the official `WordPress` and `October CMS` marketplaces, all of which passed public code review. Together they have over 500 active installations. Examples include the Rapido theme for October CMS and the JobLister plugin for WordPress.',
    },
  ],
};

export default function IndependentEngineering() {
  return <Services data={data} />;
}
