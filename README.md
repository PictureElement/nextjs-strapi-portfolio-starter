# Next.js, Strapi Portfolio

## Description

## Features

## Development setup guide

### Step 1: Clone & install

```
git clone https://github.com/PictureElement/next-strapi-portfolio.git
cd next-strapi-portfolio
npm run setup  # Installs dependencies for both Next.js and Strapi
```

### Step 2: Configure Strapi

i. Navigate to Strapi directory:

```
cd strapi
```

ii. Create `.env` file (use `.env.example` as template):

```
HOST=localhost
PORT=1337
APP_KEYS="generatedKey1,generatedKey2,generatedKey3,generatedKey4"
API_TOKEN_SALT=your_random_salt
ADMIN_JWT_SECRET=your_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_salt
JWT_SECRET=your_jwt_secret
```

For development: Keep the default placeholder values (no need to modify them).

### Step 3: Start Strapi

```
npm run develop
```

Access admin at `http://localhost:1337/admin` and create your first admin user.

### Step 4: Create API tokens

In Strapi Admin (`http://localhost:1337/admin`):

i. Read-only token

- Go to *Settings → API Tokens → Create New*
- Name: API-TOKEN
- Type: Read-only
- Duration: Unlimited
- Save and note the token.

ii. Form submission token

- Go to *Settings → API Tokens → Create New*
- Name: FORM-SUBMISSION-TOKEN
- Type: Custom
- Permissions: Grant *Create* access only to *Lead* content type.
- Save and note the token.

### Step 5: Configure Next.js

i. Navigate to Next.js directory:

```
cd next
```

ii. Create `.env` file:

```
NEXT_PUBLIC_STRAPI=http://localhost:1337
NEXT_PUBLIC_WEBSITE=http://localhost:3000
STRAPI_API_TOKEN=<API-TOKEN> # Paste your read-only token
STRAPI_FORM_SUBMISSION_TOKEN=<FORM-SUBMISSION-TOKEN> # Paste form token
```

### Step 6: Start Next.js

```
npm run dev
```

App will run at `http://localhost:3000`.

### Quick start (optional)

To launch both Strapi and Next.js simultaneously from the root directory:

```
npm run dev  # Starts both apps in parallel
```

## Production setup guide

### Introduction

This guide demonstrates configuring a production environment using Coolify—an open-source, self-hosted Platform-as-a-Service (PaaS) alternative to managed platforms like Netlify, Vercel, and Heroku. Designed for developers seeking full infrastructure control, Coolify simplifies deployment workflows while eliminating reliance on third-party cloud services.

### Disclaimer

- Coolify is currently in public Beta, so while it offers powerful CI/CD automation and deployment workflows, carefully evaluate its stability for critical production workloads.

- For this tutorial, we'll use a Hetzner Cloud VPS as our hosting platform. I'm not affiliated with Hetzner—it's chosen purely for its cost-effective performance-to-price ratio, though alternatives like AWS Lightsail or DigitalOcean would work similarly. Coolify's self-hosted nature allows flexibility in VPS provider selection.

### Step 1: VPS & Coolify setup

Follow CJ Reynolds' [Coolify Crash Course](https://youtu.be/taJlPG82Ucw) on the [Syntax](https://www.youtube.com/@syntaxfm) YouTube channel to configure Coolify on a Hetzner Cloud VPS server. The tutorial covers essential steps such as SSH setup, firewall configuration, reverse proxy settings, SSL termination, and more.

### Step 2: Strapi backend deployment

i. Create a Strapi resource

In Coolify dashboard navigate to *Projects* and create a new project (or select an existing one). Under the project, add a new resource. Search for the *Strapi* template (based on the `elestio/strapi-development` image).

ii. Production configuration

- Set "Strapi Node Environment" to `production`
- Configure the Strapi domain(s). Remove explicit ports (e.g., `:1337`) from domain entries.
  
  Why?

  - Using non-standard ports (like `1337`) in a production environment is unnecessary and can expose your application to potential security risks. It's a best practice to configure your firewall to block traffic on all ports except the essential ones (e.g., `80` for HTTP, `443` for HTTPS, and `22` for SSH).
  - Coolify's built-in reverse proxy automatically handles SSL termination (HTTPS on port `443`) and forwards traffic to Strapi's internal port `1337`.

iii. Deploy Strapi

Click *Deploy* to deploy Strapi in production.

### Step 3: Strapi admin setup

i. Access admin UI: `https://<your-strapi-domain>/admin`

ii. Create admin user

iii. Generate API Tokens (*Settings → API Tokens*):

| Token Name              | Type       | Permissions               |
|-------------------------|------------|---------------------------|
| `API-TOKEN`             | Read-only  | All content types         |
| `FORM-SUBMISSION-TOKEN` | Custom     | Leads → Create only       |

iv. Note down the tokens for later use.

### Step 4: GitHub integration

i. In Coolify dashboard navigate to *Sources* and add a new GitHub App. Name the app and register the webhook endpoint (make sure to use `https://`).

ii. Proceed with the creation of the GitHub App on GitHub's authorization page.

iii. After returning to Coolify, click *Install Repositories on GitHub* and select the `next-strapi-portfolio` repository to authorize access.

### Step 5: Next.js frontend deployment

i. Create a Next.js resource

In Coolify dashboard navigate to *Projects* and create a new project (or select an existing one). Under the project, add a new resource. Select the *Private Repository (with GitHub App)* type, choose the `next-strapi-portfolio` repository and load it.

ii. Production configuration

- Under *Configuration/General* configure the following settings:
  - Build Pack: Nixpacks
  - Domains: `https://<your-nextjs-domain>`
  - Install Command: `npm install`
  - Build Command: `npm run build`
  - Start Command: `npm run start`
  - Base Directory: `/next`
  - Publish Directory: `/next`

- Under *Configuration/Environment Variables* add the following variables:
  - `NEXT_PUBLIC_STRAPI=https://<your-strapi-domain>`
  - `NEXT_PUBLIC_WEBSITE=https://<your-nextjs-domain>`
  - `STRAPI_API_TOKEN=<api-token-from-step-3>`
  - `STRAPI_FORM_SUBMISSION_TOKEN=<form-token-from-step-3>`

iii. Deploy Next.js

Click *Deploy* to deploy Next.js in production.

## Guide 1: Transfer Strapi schemas & configuration to production

*A one-time transfer of content types (strapi/src/) and configuration (dump.json) from localhost to production.*

### Prerequisites

✅ Remote Strapi instance on Coolify:

- Your production Strapi is already deployed via Coolify (You've followed the *Production setup guide*).

✅ Matching Strapi versions:

- Local and Remote Strapi versions must be identical.
- Verify with `strapi version` in both environments.

✅ SSH access to Coolify server:

- You have SSH credentials (username + key/password) to the host running Coolify.
- Test access: `ssh deploy@your-coolify-server-ip`.

✅ Directory permissions on Coolify host:

- Ensure you can create/modify directories on the Coolify server (e.g., `/home/strapi/src`).

### Step 1: Prepare the remote Strapi instance

Stop the remote Strapi service on Coolify.

### Step 2: Update Docker volume binding

i. In your Coolify Strapi configuration modify the Docker Compose file.

Replace the named volume `strapi-src:/opt/app/src` with a bind mount:

```
volumes:
  - /home/strapi/src:/opt/app/src
```

Why? Bind mounts allow direct file access between host and container.

ii. Create the host directory:

```
mkdir -p /home/strapi/src
```

### Step 3: Copy schema files to remote host

Transfer files from local to remote using `rsync`:

```
# Basic rsync (password/auth prompt):
rsync -avz --progress strapi/src/ deploy@<server-ip>:/home/strapi/src/
```

OR

```
# SSH key-based rsync (replace paths):
rsync -avz -e "ssh -i ~/.ssh/id_ed25519" strapi/src/ root@<server-ip>:/home/strapi/src/
```

Replace `<server-ip>` and `~/.ssh/id_ed25519` with your server IP and private key path.

### Step 4: Restore Strapi configuration on production instance

i. Restart the remote Strapi service (via Coolify dashboard).

ii. Access the Strapi container's terminal (via Coolify) and restore the configuration dump:

```
npm run strapi configuration:restore -- -f src/dump.json
```

### Key notes

- Schema/configurations only: This only transfers schemas/configs (no content data).  
- One-time transfer: Repeat steps manually if schemas change (no automatic sync).

## Guide 2: Migrate Strapi content to production

*Securely migrate content (entries, media) from local Strapi to a Coolify-hosted production instance.*

### Prerequisites

✅ Remote Strapi instance on Coolify:

- Your production Strapi is already deployed via Coolify (You've followed the *Production setup guide*).

✅ Matching Strapi versions:

- Local and Remote Strapi versions must be identical.
- Verify with `strapi version` in both environments.

✅ Matching schemas:

- Content types (schemas) must be identical between local and production.
- Follow the *Transfer of Strapi schemas & configuration to a Coolify-hosted production instance* guide to align them first.

✅ Transfer token permissions:

- You have admin access to the production Strapi's admin panel to generate a transfer token.

### Step 1: Generate a transfer token in production

i. Log in to your production Strapi admin panel (`https://your-domain.com/admin`).

ii. Go to *Settings → Transfer Tokens → Create New Transfer Token*.

iii. Name the token (e.g., "Local to Prod Transfer"), set an expiration date and give it full access.

iv. Copy the generated token.

### Step 2: Transfer data from local to production

i. Navigate to your local Strapi project:

```
cd strapi
```

ii. Run the transfer command:

```
npm run strapi transfer -- --to https://your-domain.com/admin ‑‑to‑token YOUR_TRANSFER_TOKEN
```

Replace `YOUR_TRANSFER_TOKEN` with the token from Step 1.

### Key notes

- Transfer tokens expire automatically—set short-lived tokens for safety.
- Use HTTPS for production Strapi to encrypt data in transit.

## Future enhancements

1. Implement pagination to Blog and Projects pages.  
2. Add a CAPTCHA solution.  
3. Add a breadcrumb component, including breadcrumbs and breadcrumbs-related schema for SEO.  
4. Limit media upload to specific file types if possible.  
5. Implement an RSS feed.

## Acknowledgements

Special thanks to the amazing contributors and open-source communities behind the tools that made this project possible:

- The [Strapi](https://strapi.io/) team for their incredible headless CMS, which powers the backend of this application.
- The [Next.js](https://nextjs.org/) team for providing a robust framework that simplifies building modern web applications.
- The [Tailwind CSS](https://tailwindcss.com/) community for their elegant and efficient utility-first CSS framework.
- The [React](https://react.dev/) ecosystem and its contributors for enabling seamless UI development.

Your dedication to open-source innovation inspires developers worldwide. Thank you!

## Contributing

Your contributions are highly appreciated! If you wish to contribute to this project, please adhere to the following steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature`.
3. Make your modifications and commit them: `git commit -m 'Add a new feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.
