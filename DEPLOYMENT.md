# 🚀 Deployment Guide

This guide covers deploying the Resume Builder application to production environments.

---

## 📋 Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrated and backed up
- [ ] Frontend built and optimized
- [ ] Backend security hardened
- [ ] HTTPS/SSL configured
- [ ] Error logging implemented
- [ ] Performance monitoring setup
- [ ] Backup strategy in place

---

## 🌐 Frontend Deployment Options

### Option 1: Vercel (Recommended for Vite + React)

**Advantages**: 
- Free tier available
- Automatic deployments from Git
- Fast CDN
- Built-in HTTPS

**Steps**:

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/resume-builder.git
git push -u origin main
```

2. Connect to Vercel:
   - Visit https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Configure build settings:
     - **Framework**: Vite
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. Set environment variables in Vercel:
   - `VITE_API_URL`: Your backend API URL

4. Deploy!

---

### Option 2: Netlify

**Steps**:

1. Build your frontend:
```bash
cd frontend
npm run build
```

2. Drag & drop `dist` folder to Netlify, or:
   - Connect GitHub repository
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/dist`

3. Configure environment variables:
   - Add `VITE_API_URL` in Netlify dashboard

---

### Option 3: Traditional Server (AWS EC2, DigitalOcean, etc.)

**Steps**:

1. Connect via SSH to your server

2. Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. Clone repository:
```bash
cd /var/www
git clone https://github.com/yourusername/resume-builder.git
cd resume-builder/frontend
```

4. Build and serve:
```bash
npm install
npm run build

# Install PM2 for process management
npm install -g pm2

# Serve with PM2
pm2 serve dist 3000 --name "resume-builder-frontend"
pm2 startup
pm2 save
```

5. Configure Nginx as reverse proxy:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

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

6. Enable HTTPS with Let's Encrypt:
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 🖥️ Backend Deployment Options

### Option 1: Heroku (Simple, Recommended)

**Note**: Heroku has discontinued free tier, but alternatives exist

**Steps**:

1. Install Heroku CLI

2. Create Heroku app:
```bash
heroku create resume-builder-api
```

3. Add PostgreSQL addon:
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

4. Set environment variables:
```bash
heroku config:set PORT=5000
heroku config:set JWT_SECRET=your_secret_key
# DB variables are auto-set by addon
```

5. Deploy:
```bash
git push heroku main
```

---

### Option 2: Railway.app (Modern Alternative)

**Steps**:

1. Visit https://railway.app
2. Create new project
3. Connect GitHub repository
4. Add PostgreSQL plugin
5. Set environment variables
6. Deploy automatically

---

### Option 3: DigitalOcean App Platform

**Steps**:

1. Create account on DigitalOcean

2. Create new App:
   - Connect GitHub repo
   - Select backend folder
   - Add PostgreSQL database

3. Configure environment variables

4. Deploy

---

### Option 4: AWS EC2 + RDS

**Steps**:

1. Launch EC2 instance (Ubuntu 22.04)

2. SSH into instance:
```bash
ssh -i your-key.pem ec2-user@your-instance-ip
```

3. Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. Install PM2:
```bash
npm install -g pm2
```

5. Clone and setup backend:
```bash
cd /home/ec2-user
git clone https://github.com/yourusername/resume-builder.git
cd resume-builder/Backend
npm install
```

6. Create RDS PostgreSQL database:
   - Use AWS Console to create RDS instance
   - Note: endpoint, port, database name, username, password

7. Update `.env`:
```env
DB_HOST=your-rds-endpoint.aws.amazonaws.com
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=resume_builder
DB_PORT=5432
```

8. Run migrations:
```bash
psql -U postgres -h your-rds-endpoint.aws.amazonaws.com -d resume_builder -f ../database/schema.sql
```

9. Start with PM2:
```bash
pm2 start server.js --name "resume-builder"
pm2 startup
pm2 save
```

10. Configure Security Group:
    - Allow inbound on port 5000
    - Allow inbound on port 443 (HTTPS)

---

## 🔒 Production Security Checklist

### Environment Variables
```env
# Never commit these!
NODE_ENV=production
PORT=5000
DB_USER=<secure-user>
DB_PASSWORD=<strong-password>
DB_HOST=<your-database-url>
JWT_SECRET=<very-long-random-string>
```

### Backend Security

1. **Enable HTTPS**:
```javascript
// server.js
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('path/to/private-key.pem'),
  cert: fs.readFileSync('path/to/certificate.pem')
};

https.createServer(options, app).listen(443);
```

2. **Add Security Headers**:
```javascript
import helmet from 'helmet';
app.use(helmet());
```

3. **Rate Limiting**:
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

4. **Input Validation**:
```javascript
import { body, validationResult } from 'express-validator';

app.post('/api/users', [
  body('email').isEmail(),
  body('password').isLength({ min: 8 })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process request
});
```

---

## 📊 Monitoring & Logging

### Log Aggregation (Winston + CloudWatch)

```javascript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger;
```

### Monitor Backend Health:
```bash
# Add to monitoring service
curl -X GET https://your-api.com/api/health

# Expected response:
# {"status":"OK","message":"Resume Builder API is running"}
```

---

## 🗄️ Database Backup Strategy

### Automated PostgreSQL Backup

**Using pg_dump**:
```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/resume_builder_$TIMESTAMP.sql"

pg_dump -U postgres -h localhost resume_builder > $BACKUP_FILE

# Compress
gzip $BACKUP_FILE

# Upload to S3
aws s3 cp "$BACKUP_FILE.gz" s3://your-bucket/backups/

# Keep only last 30 days
find $BACKUP_DIR -name "resume_builder_*.sql.gz" -mtime +30 -delete
```

**Schedule with Cron**:
```bash
crontab -e

# Daily backup at 2 AM
0 2 * * * /path/to/backup.sh
```

---

## 📈 Performance Optimization

### Frontend

1. **Optimize Images**:
```bash
npm install -D imagemin-webpack-plugin
```

2. **Code Splitting**:
```jsx
const ResumeBuilder = lazy(() => import('./components/ResumeBuilder'));
```

3. **Caching**:
```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'form-vendor': ['react-to-print', 'axios']
        }
      }
    }
  }
}
```

### Backend

1. **Connection Pooling**:
```javascript
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

2. **Query Optimization**:
   - Use indexes on foreign keys
   - Batch inserts when possible
   - Cache frequently accessed data

3. **Compression**:
```javascript
import compression from 'compression';
app.use(compression());
```

---

## 🔄 Deployment Workflow

### GitHub Actions CI/CD

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Resume Builder

on:
  push:
    branches: [main, production]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Build Frontend
        run: |
          cd frontend
          npm install
          npm run build
      
      - name: Deploy Frontend to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
      
      - name: Deploy Backend to Heroku
        run: |
          git remote add heroku https://git.heroku.com/resume-builder-api.git
          git push heroku main
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
```

---

## ✅ Post-Deployment Testing

1. **Frontend**:
   - Test all form inputs
   - Test real-time preview
   - Test PDF download
   - Test responsiveness on mobile

2. **Backend**:
   - Test all API endpoints
   - Test database connections
   - Load test with k6 or JMeter
   - Test error handling

3. **Integration**:
   - End-to-end tests with Cypress
   - Test full resume creation flow
   - Test data persistence

---

## 🆘 Troubleshooting Deployments

### Issue: Frontend can't reach backend
**Solution**:
- Verify CORS is enabled: `app.use(cors())`
- Check VITE_API_URL environment variable
- Verify backend is running and accessible

### Issue: Database connection fails
**Solution**:
- Check DB credentials in environment variables
- Verify database is accessible from server
- Check firewall/security groups

### Issue: Slow performance
**Solution**:
- Enable query caching
- Use CDN for static assets
- Implement rate limiting
- Monitor server resources

---

## 📞 Support Resources

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- AWS EC2 Docs: https://docs.aws.amazon.com/ec2/
- Let's Encrypt: https://letsencrypt.org/
- PM2 Docs: https://pm2.keymetrics.io/

---

**Remember**: Always test thoroughly before deploying to production! 🎯
