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

🛠️ For development: Keep the default placeholder values (no need to modify them).

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

## Guide 1: How to deploy Strapi on Coolify

### Prerequisites

✅ A running Coolify instance on your server

### Step 1: Create a Strapi resource

i. Go to your Coolify dashboard.

ii. Create a new project (or select an existing one).

iii. Under the project, add a new resource.

iv. Search for the *Strapi* template (based on the `elestio/strapi-development` Docker image).

### Step 2: Configure for production

i. In the resource configuration, locate the *Strapi Node Environment* field.

ii. Change the environment from `development` to `production`.

### Step 3: Set up domains

i. The resource includes two services:

- `Strapi (elestio/strapi-development:latest)`
- `Postgresql (elestio/postgres:latest)`

ii. Under the settings of the Strapi service remove the default `:1337` port from *Domains* field.

Why?

- Non-standard ports (like `1337`) are unnecessary in production.
- Coolify’s built-in reverse proxy automatically handles SSL termination (HTTPS on port `443`) and forwards traffic to Strapi’s internal port `1337`.

### Step 4: Deploy

i. Click *Deploy* to deploy the resource.

ii. Coolify will:

- Provision the Postgres database.
- Deploy Strapi in production mode.

## Guide 2: Transfer of Strapi schemas & configuration to a Coolify-hosted production instance

*A one-time transfer of content types (strapi/src/) and configuration (dump.json) from localhost to production.*

### Prerequisites

✅ Remote Strapi instance on Coolify:

- Your production Strapi is already deployed via Coolify.

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

ii. Access the Strapi container’s terminal (via Coolify) and restore the configuration dump:

```
npm run strapi configuration:restore -- -f src/dump.json
```

### Key notes

- 🚫 Schema/configurations only: This only transfers schemas/configs (no content data).  
- 🔄 One-time transfer: Repeat steps manually if schemas change (no automatic sync).

## Guide 3: How to transfer Strapi data to a Coolify-hosted production instance

*Securely migrate content (entries, media) from local Strapi to a Coolify-hosted production instance.*

### Prerequisites

✅ Remote Strapi instance on Coolify:

- Your production Strapi is already deployed via Coolify.

✅ Matching Strapi versions:

- Local and Remote Strapi versions must be identical.
- Verify with `strapi version` in both environments.

✅ Matching schemas:

- Content types (schemas) must be identical between local and production.
- Follow the *Transfer of Strapi schemas & configuration to a Coolify-hosted production instance* guide to align them first.

✅ Transfer token permissions:

- You have admin access to the production Strapi’s admin panel to generate a transfer token.

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
