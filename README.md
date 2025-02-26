## **Guide 1: How to deploy Strapi on Coolify**

### **Prerequisites**

✅ **A running Coolify instance on your server**

### **Step 1: Create a Strapi resource**

1. Go to your Coolify dashboard.
2. Create a new project (or select an existing one).
3. Under the project, add a new resource.
4. Search for the **Strapi** template (based on the `elestio/strapi-development` Docker image).

### **Step 2: Configure for production**

1. In the resource configuration, locate the **Strapi Node Environment** field.
2. Change the environment from `development` to `production`.

### **Step 3: Set up domains**

1. The resource includes two services:
	- **Strapi (elestio/strapi-development:latest)**
	- **Postgresql (elestio/postgres:latest)**

2. Under the settings of the Strapi service:
	- In the **Domains** field, remove the default `:1337` port from the URL.
	- *Why?*  
		- Non-standard ports (like `1337`) are unnecessary in production.
		- Coolify’s built-in reverse proxy automatically handles SSL termination (HTTPS on port 443) and forwards traffic to Strapi’s internal port 1337.

### **Step 4: Deploy**

1. Click **Deploy** to deploy the resource.
2. Coolify will:
	- Provision the Postgres database.
	- Deploy Strapi in production mode.

---

## **Guide 2: Transfer of Strapi schemas & configuration to a Coolify-hosted production instance**

*A one-time transfer of content types (strapi/src/) and configuration (dump.json) from localhost to production.*

### **Prerequisites**

✅ **Remote Strapi instance on Coolify**:
- Your production Strapi is already deployed via Coolify.

✅ **Matching Strapi versions**:
- Local and Remote Strapi versions must be identical.
- Verify with `strapi version` in both environments.

✅ **SSH access to Coolify server**:
- You have SSH credentials (username + key/password) to the host running Coolify.
- Test access: `ssh deploy@your-coolify-server-ip`.

✅ **Directory permissions on Coolify host**:
- Ensure you can create/modify directories on the Coolify server (e.g., `/home/strapi/src`).

### **Step 1: Prepare the remote Strapi instance**

Stop the remote Strapi service on Coolify.

### **Step 2: Update Docker volume binding**

1. In your Coolify Strapi configuration modify the Docker Compose file.
	- Replace the named volume `strapi-src:/opt/app/src` with a bind mount:
	```yaml
	volumes:
		- /home/strapi/src:/opt/app/src
	```  
	 - *Why?* Bind mounts allow direct file access between host and container.
2. Create the host directory:
	```bash
	mkdir -p /home/strapi/src
	```

### **Step 3: Copy schema files to remote host**

Transfer files from local to remote using `rsync`:
   ```bash
   # Basic rsync (password/auth prompt):
   rsync -avz --progress strapi/src/ deploy@<server-ip>:/home/strapi/src/
   ```

**OR**

   ```bash
   # SSH key-based rsync (replace paths):
   rsync -avz -e "ssh -i ~/.ssh/id_ed25519" strapi/src/ root@<server-ip>:/home/strapi/src/
   ```
Replace `<server-ip>` and `~/.ssh/id_ed25519` with your server IP and private key path.

### **Step 4: Restore Strapi configuration on production instance**

1. Restart the remote Strapi service (via Coolify dashboard).
2. Access the Strapi container’s terminal (via Coolify) and restore the configuration dump:
	```bash
	npm run strapi configuration:restore -- -f src/dump.json
	```  

### **Key notes**

- 🚫 **Schema/configurations only**: This only transfers schemas/configs (no content data).  
- 🔄 **One-time transfer**: Repeat steps manually if schemas change (no automatic sync).

---

## **Guide 3: How to transfer Strapi data to a Coolify-hosted production instance**

*Securely migrate content (entries, media) from local Strapi to a Coolify-hosted production instance.*

### **Prerequisites**

✅ **Remote Strapi instance on Coolify**:
- Your production Strapi is already deployed via Coolify.

✅ **Matching Strapi versions**:
- Local and Remote Strapi versions must be identical.
- Verify with `strapi version` in both environments.

✅ **Matching schemas**:
- Content types (schemas) must be identical between local and production.
- Follow the *Transfer of Strapi schemas & configuration to a Coolify-hosted production instance* guide to align them first.

✅ **Transfer token permissions**:
- You have admin access to the production Strapi’s admin panel to generate a transfer token.

### **Step 1: Generate a transfer token in production**

1. Log in to your production Strapi admin panel (`https://your-domain.com/admin`).
2. Go to Settings → Transfer Tokens → Create New Transfer Token.
3. Name the token (e.g., “Local to Prod Transfer”), set an expiration date and give it full access.
4. Copy the generated token.

### **Step 2: Transfer data from local to production**

1. Navigate to your local Strapi project:
	```bash
	cd strapi
	```
2. Run the transfer command:
	```bash
	npm run strapi transfer -- --to https://your-domain.com/admin ‑‑to‑token YOUR_TRANSFER_TOKEN
	```
	Replace `YOUR_TRANSFER_TOKEN` with the token from Step 1.

### **Key notes**

🔒 **Security**:
- Transfer tokens expire automatically—set short-lived tokens for safety.
- Use HTTPS for production Strapi to encrypt data in transit.
