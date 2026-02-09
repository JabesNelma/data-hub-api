# Deployment Guide - Data Hub API

This guide covers deployment options for the Data Hub API.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Deployment Options](#deployment-options)
- [Post-Deployment Setup](#post-deployment-setup)
- [Security Considerations](#security-considerations)
- [Monitoring & Maintenance](#monitoring--maintenance)

---

## 🚀 Prerequisites

Before deploying, ensure you have:

- A GitHub repository with the code
- Strong JWT secrets generated (at least 32 characters each)
- A domain name (recommended)
- SSL/TLS certificate (recommended)

---

## 🔧 Environment Variables

### Required Variables

```env
DATABASE_URL="your-database-url"
JWT_SECRET="strong-random-secret-min-32-chars"
JWT_REFRESH_SECRET="another-strong-random-secret-min-32-chars"
SEED_KEY="unique-key-for-initial-admin-setup"
NODE_ENV="production"
```

### Generate Secure Secrets

Use a secure method to generate secrets:

```bash
# Generate JWT secret
openssl rand -base64 32

# Or use this Node.js command
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**IMPORTANT:** Never commit secrets to version control!

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the recommended deployment platform for Next.js applications.

#### Steps

1. **Push Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/data-hub-api.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure environment variables:
     - `DATABASE_URL` = `file:./db/custom.db` (for SQLite)
     - `JWT_SECRET` = your generated secret
     - `JWT_REFRESH_SECRET` = your generated secret
     - `SEED_KEY` = your setup key
     - `NODE_ENV` = `production`
   - Click "Deploy"

3. **Access Your API**
   - Vercel will provide a URL (e.g., `https://data-hub-api.vercel.app`)
   - API is available at `https://your-domain.vercel.app/api`

4. **Custom Domain** (Optional)
   - Go to project settings → Domains
   - Add your custom domain
   - Configure DNS records as instructed

#### Vercel-specific Considerations

- SQLite database is stored on Vercel's filesystem (ephemeral)
- For persistent storage, use an external database (PostgreSQL, Neon, Supabase)
- Update `DATABASE_URL` to use external database in production

---

### Option 2: Railway

Railway provides easy deployment with built-in PostgreSQL.

#### Steps

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app) and sign in

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Services**
   - Add a PostgreSQL service (optional but recommended)
   - Configure environment variables:
     - `DATABASE_URL` = PostgreSQL connection string
     - `JWT_SECRET`, `JWT_REFRESH_SECRET`, `SEED_KEY`
     - `NODE_ENV` = `production`

4. **Deploy**
   - Railway will automatically deploy
   - Access your API via the provided Railway URL

---

### Option 3: Render

Render offers free and paid hosting options.

#### Steps

1. **Create Render Account**
   - Go to [render.com](https://render.com) and sign in

2. **Create New Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository

3. **Configure**
   - Build command: `bun run build`
   - Start command: `bun start`
   - Add environment variables
   - Select instance type (Free or Paid)

4. **Deploy**
   - Render will build and deploy
   - Access via the provided Render URL

---

### Option 4: Docker Self-Hosted

Deploy using Docker on your own server.

#### Steps

1. **Prepare Server**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Docker and Docker Compose
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   ```

2. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/data-hub-api.git
   cd data-hub-api
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   nano .env  # Edit with your values
   ```

4. **Build and Start**
   ```bash
   docker-compose up -d --build
   ```

5. **Setup Reverse Proxy** (Nginx example)
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **SSL Certificate** (Let's Encrypt)
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d your-domain.com
   ```

---

### Option 5: Kubernetes

For enterprise-grade deployments.

#### Create Deployment Manifest

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: data-hub-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: data-hub-api
  template:
    metadata:
      labels:
        app: data-hub-api
    spec:
      containers:
      - name: app
        image: ghcr.io/your-username/data-hub-api:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: data-hub-secrets
              key: database-url
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: data-hub-secrets
              key: jwt-secret
        - name: JWT_REFRESH_SECRET
          valueFrom:
            secretKeyRef:
              name: data-hub-secrets
              key: jwt-refresh-secret
        - name: SEED_KEY
          valueFrom:
            secretKeyRef:
              name: data-hub-secrets
              key: seed-key
        - name: NODE_ENV
          value: "production"
        resources:
          limits:
            memory: "512Mi"
            cpu: "500m"
          requests:
            memory: "256Mi"
            cpu: "250m"
---
apiVersion: v1
kind: Service
metadata:
  name: data-hub-api
spec:
  selector:
    app: data-hub-api
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

---

## 🎯 Post-Deployment Setup

### 1. Create Admin User

After deployment, create your first admin user:

```bash
curl -X POST https://your-domain.com/api/admin/seed \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your-secure-password",
    "seedKey": "your-seed-key"
  }'
```

### 2. Test API Endpoints

```bash
# Test data retrieval
curl https://your-domain.com/api/data

# Test categories
curl https://your-domain.com/api/categories

# Test types
curl https://your-domain.com/api/types
```

### 3. Verify Documentation

Visit your deployed URL to verify the documentation is accessible:
- https://your-domain.com

---

## 🔒 Security Considerations

### Critical Security Measures

1. **Strong Secrets**
   - Use cryptographically secure random secrets (32+ characters)
   - Never reuse secrets across projects
   - Rotate secrets regularly

2. **HTTPS Only**
   - Always use HTTPS in production
   - Configure SSL/TLS certificates
   - Redirect HTTP to HTTPS

3. **Environment Variables**
   - Never commit secrets to Git
   - Use platform's secret management
   - Limit access to secrets

4. **Database Security**
   - Use strong database passwords
   - Restrict database access
   - Enable database backups
   - Consider connection pooling

5. **Rate Limiting**
   - Implement rate limiting on public endpoints
   - Use Vercel's built-in rate limiting or a dedicated service

6. **CORS Configuration**
   - Configure CORS for your frontend domains
   - Don't use wildcard (`*`) in production

7. **Logging & Monitoring**
   - Enable comprehensive logging
   - Monitor for suspicious activity
   - Set up alerts for errors

---

## 📊 Monitoring & Maintenance

### Health Checks

The application includes a health check endpoint. Configure your platform to monitor:

```bash
curl https://your-domain.com/api/data
```

### Database Backups

#### For SQLite
```bash
# Backup script
cp db/custom.db backups/custom-$(date +%Y%m%d).db
```

#### For PostgreSQL
```bash
# Backup script
pg_dump -U username -h host data_hub > backup-$(date +%Y%m%d).sql
```

### Update Process

1. Update code
2. Run database migrations
3. Deploy changes
4. Monitor logs
5. Test functionality

---

## 🐛 Troubleshooting

### Common Issues

**Issue: 504 Gateway Timeout**
- Solution: Increase timeout or optimize database queries

**Issue: Database connection errors**
- Solution: Check `DATABASE_URL` and database accessibility

**Issue: Authentication failures**
- Solution: Verify JWT secrets are correct and consistent

**Issue: Build failures**
- Solution: Check logs for specific errors, ensure all dependencies are installed

---

## 📞 Support

For deployment issues:

1. Check this guide's troubleshooting section
2. Review platform-specific documentation
3. Open an issue on GitHub

---

**Happy Deploying! 🚀**
