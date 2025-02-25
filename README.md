# When connecting Strapi to a PostgreSQL database, the database user requires SCHEMA permissions. While the database admin has this permission by default, a new database user explicitly created for the Strapi application will not. This would result in a 500 error when trying to load the admin console.

To create a new PostgreSQL user with the SCHEMA permission, use the following steps:

## Step 1: Log in to PostgreSQL
psql -U postgres

## Step 2: Create a new database (if not already created)
CREATE DATABASE my_strapi_db_name;

## Step 3: Create a new user with a secure password
CREATE USER my_strapi_db_user WITH PASSWORD 'password';

## Step 4: Connect to the target database
\c my_strapi_db_name postgres

## Step 5: Grant schema privileges to the new user
GRANT ALL ON SCHEMA public TO my_strapi_db_user;

---

## Transfer files securely over SSH.
scp /path/to/local/file username@remote_host:/path/to/remote/directory

## ssh root@xxx.xxx.xxx.xxx

# Upgrade Strapi to the latest version
npx @strapi/upgrade latest

---

# Install Strapi using the elestio/strapi-development image

1. Create a Strapi resource in Coolify (based on elestio/strapi-development image)
2. Change Strapi Node Environment to "production".
4. Under the Strapi service remove the port 1337 from the domain.
5. Deploy the resource.
6. Afer deployment don't register and stop the service. Follow the next instructions.

---

# 1. The source and target schemas must match to successfully use strapi import, meaning all content types must be identical. To achieve that we need to replace the remote Strapi src directory with our local Strapi src directory.

1. Make sure both target and source Strapi instances have the same version.
2. Stop the remote Strapi service.
3. Update the Docker Compose file to replace the named volume `strapi-src` with a bind mount that maps the host directory `/home/strapi/src` to the container path `/opt/app/src`. This allows direct synchronization between the host's source code and the container. The change replaces:
`- strapi-src:/opt/app/src`
with:
`- /home/strapi/src:/opt/app/src`
4. Create the directory on the host: `mkdir -p /home/strapi/src`
5. Copy files (using rsync):
- `rsync -avz --progress strapi/src/ deploy@your-server-ip:/home/strapi/src/`
- `rsync -avz -e "ssh -i ~/.ssh/your_private_key" strapi/src/ root@<server-ip>:/home/strapi/src/`, Replace `~/.ssh/your_private_key` with the path to your private key (e.g., `id_ed25519`).
6. Restart remote Strapi service.
7. Access remote Strapi container temrinal and restore the configuration dump: `npm run strapi configuration:restore -- -f src/dump.json`






# 2. Data transfer from local to remote

1. Make sure both target and source Strapi instances have the same version.
2. Generate a transfer token on remote Strapi instace.
3. Make sure the source and target schemas match. (see The source and target schemas must match to successfully use strapi import, meaning all content types must be identical. Let's do that)
4. Push data to remote: cd strapi & npm run strapi transfer -- --to destinationURL/admin
