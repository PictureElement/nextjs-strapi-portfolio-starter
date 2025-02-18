## 1. Start Strapi

- `cd strapi`
- `npm install`
- `npm run develop`

## 2. Start Next.js

- `cd next`
- `npm install`
- `npm run dev`

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




# transfer files securely over SSH.
scp /path/to/local/file username@remote_host:/path/to/remote/directory



# ssh root@xxx.xxx.xxx.xxx


# Upgrade Strapi to the latest version
npx @strapi/upgrade latest







# Installing Strapi.

1. Choose the Strapi image for Coolify
2. Change Strapi Node Env. to production
3. Edit Compose File.
Under volumes change: - 'strapi-uploads:/opt/app/public/uploads' to - 'strapi-public:/opt/app/public'
4. For Strapi Domains remove the port 1337 from the domain.
5. Deploy.
6. Afer deployment don't register and stop the service. Follow the next instructions.

# The source and target schemas must match to successfully use strapi import, meaning all content types must be identical. Let's do that:

0. Make sure both target and source Strapi instances have the same version.
1. Stop the container/service.
2. Identify Strapi src volume name under Storages. In my case is i0wggsgwkw4gwokc8cg0k8w8_strapi-src
3. Access the Volume on the Host Server: cd /var/lib/docker/volumes/i0wggsgwkw4gwokc8cg0k8w8_strapi-src/_data/
4. Remove Old Files: rm -rf *
5. Copy new files:
scp -r /path/to/local/src/* root@<your-server-ip>:/var/lib/docker/volumes/i0wggsgwkw4gwokc8cg0k8w8_strapi-src/_data/
6. Restart the Application in Coolify

# Data transfer from local to remote
0. Make sure both target and source Strapi instances have the same version. (see Upgrade Strapi to the latest version)
1. Generate a transfer token on remote Strapi instace.
2. Make sure the source and target schemas match. (see The source and target schemas must match to successfully use strapi import, meaning all content types must be identical. Let's do that)
3. Push data to remote: npm run strapi transfer -- --to destinationURL/admin
