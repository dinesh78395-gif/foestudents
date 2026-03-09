# Deployment Guide

This guide will help you deploy Opportunity Navigator to production for free!

## Prerequisites

- GitHub account
- Vercel account (sign up at https://vercel.com)
- Render account (sign up at https://render.com)

## Step 1: Push to GitHub

1. Initialize git and push your code:
```bash
git init
git add .
git commit -m "Initial commit: Opportunity Navigator"
git remote add origin https://github.com/YOUR_USERNAME/opportunity-navigator.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend to Render

1. Go to https://render.com/dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: opportunity-navigator-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Add environment variable:
   - **Key**: `NODE_ENV`
   - **Value**: `production`
6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. **Copy your backend URL** (e.g., `https://opportunity-navigator-backend.onrender.com`)

## Step 3: Deploy Frontend to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
5. Add environment variable:
   - **Key**: `VITE_API_URL`
   - **Value**: Your backend URL from Step 2 (e.g., `https://opportunity-navigator-backend.onrender.com`)
6. Click "Deploy"
7. Wait for deployment (2-3 minutes)
8. **Your site is live!** 🎉

## Step 4: Update Backend CORS

After deployment, update your backend to allow requests from your Vercel domain:

1. Go to your Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Add environment variable:
   - **Key**: `FRONTEND_URL`
   - **Value**: Your Vercel URL (e.g., `https://opportunity-navigator.vercel.app`)
5. Update `backend/src/index.ts`:

```typescript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins
}));
```

6. Commit and push changes - Render will auto-deploy

## Step 5: Test Your Live Site

1. Visit your Vercel URL
2. Try all features:
   - Category selection
   - Profile forms
   - Opportunity matching
   - AI Chatbot
3. Share with friends! 🚀

## Troubleshooting

### Backend not responding
- Check Render logs for errors
- Verify environment variables are set
- Ensure build completed successfully

### Frontend can't connect to backend
- Verify `VITE_API_URL` is set correctly in Vercel
- Check browser console for CORS errors
- Ensure backend URL is accessible

### Chatbot not working
- Check backend logs
- Verify `/api/chatbot/query` endpoint is accessible
- Test backend API directly with curl/Postman

## Free Tier Limitations

**Render Free Tier:**
- Service spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free

**Vercel Free Tier:**
- Unlimited deployments
- 100GB bandwidth/month
- Automatic HTTPS

## Upgrading to Paid Plans

For production use with high traffic:
- **Render**: $7/month for always-on service
- **Vercel**: $20/month for Pro features

## Custom Domain (Optional)

### Vercel (Frontend):
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Render (Backend):
1. Go to Service Settings → Custom Domain
2. Add your custom domain
3. Update DNS records as instructed

---

## 🎉 Congratulations!

Your Opportunity Navigator is now live and accessible to anyone on the internet!

Share your URL:
- Frontend: `https://your-project.vercel.app`
- Backend API: `https://your-backend.onrender.com`

## Next Steps

- Add analytics (Google Analytics, Plausible)
- Set up monitoring (Sentry for error tracking)
- Add a custom domain
- Integrate real AI (OpenAI/Anthropic)
- Add a database (PostgreSQL on Render)
