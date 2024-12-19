## 1. Start Strapi

- `cd strapi`
- `npm install`
- `npm run develop`

## 2. Start Next.js

- `cd next`
- `npm install`
- `npm run dev`


psql postgres://msof@localhost:5432/msof




When connecting Strapi to a PostgreSQL database, the database user requires SCHEMA permissions. While the database admin has this permission by default, a new database user explicitly created for the Strapi application will not. This would result in a 500 error when trying to load the admin console.

To create a new PostgreSQL user with the SCHEMA permission, use the following steps:

# Step 1: Log in to PostgreSQL
psql -U postgres

# Step 2: Create a new database (if not already created)
CREATE DATABASE my_strapi_db_name;

# Step 3: Create a new user with a secure password
CREATE USER my_strapi_db_user WITH PASSWORD 'password';

# Step 4: Connect to the target database
\c my_strapi_db_name postgres

# Step 5: Grant schema privileges to the new user
GRANT ALL ON SCHEMA public TO my_strapi_db_user;


# transfer files securely over SSH.
scp /path/to/local/file username@remote_host:/path/to/remote/directory


tar -czvf archive_name.tar.gz file_or_directory



Upgrade Strapi to the latest version

npx @strapi/upgrade latest










Make sure the target Strapi instance has the same schema as the src:

1. Deploy Strapi for the first time. Don't register.
2. Stop the container/service.
3. Identify Strapi srv volume name under Storages. In my case is vg4k80ks8ks800coog48ccg0_strapi-src
4. Access the Volume on the Host Server: cd /var/lib/docker/volumes/vg4k80ks8ks800coog48ccg0_strapi-src/_data/
5. Remove Old Files: rm -rf *
6. Copy new files:
scp -r /path/to/local/src/* root@49.13.221.53:/var/lib/docker/volumes/vg4k80ks8ks800coog48ccg0_strapi-src/_data/
7. Restart the Application in Coolify

