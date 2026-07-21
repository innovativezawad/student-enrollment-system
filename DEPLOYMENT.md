# Deployment Guide

## Quick Deploy (GitHub Pages + Supabase)

### Frontend (GitHub Pages)

1. **Set GitHub Secrets** (for auto-deployment):
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Add:
     - `VITE_SUPABASE_URL` = Your Supabase URL
     - `VITE_SUPABASE_ANON_KEY` = Your Supabase Anon Key

2. **Enable GitHub Pages**:
   - Go to **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: `gh-pages`
   - Click **Save**

3. **Deploy**:
   ```bash
   git push origin main
   ```
   GitHub Actions will automatically:
   - Install dependencies
   - Build the project
   - Deploy to `gh-pages` branch
   - Your app will be live at: `https://username.github.io/student-enrollment-system`

### Backend (Supabase - Already Deployed!)

Supabase handles everything:
- ✅ Database hosting
- ✅ Authentication
- ✅ Real-time API
- ✅ Automatic backups
- ✅ SSL/TLS certificates

---

## Alternative Deployments

### Deploy to Vercel

1. Import repository on [vercel.com](https://vercel.com)
2. Set environment variables (same as above)
3. Deploy with one click
4. Auto-deploys on push to main

### Deploy to Netlify

1. Connect repository on [netlify.com](https://netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variables
5. Deploy

### Deploy to AWS S3 + CloudFront

```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name/ --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

---

## Production Checklist

- [ ] Environment variables configured
- [ ] Supabase project in production
- [ ] Database backups enabled
- [ ] Authentication configured
- [ ] HTTPS enabled (automatic)
- [ ] Frontend deployed and accessible
- [ ] Test login works
- [ ] Test CRUD operations
- [ ] Monitor error logs
- [ ] Setup monitoring/analytics

---

## Monitoring

### Check Deployment Status
- GitHub: **Actions** tab
- Vercel: Dashboard → Deployments
- Netlify: Dashboard → Deploys

### Monitor Application
- Check browser console for errors
- Review Supabase logs for API issues
- Monitor database performance

### View Logs

**Supabase Logs**:
1. Go to Supabase Dashboard
2. Click **Logs** (bottom left)
3. View API requests, auth events, etc.

---

## Scaling

As you grow:
1. **Upgrade Supabase plan** for higher rate limits
2. **Enable Supabase Edge Functions** for custom logic
3. **Setup CDN** for faster content delivery
4. **Add monitoring** with Datadog/Sentry

---

## Troubleshooting

### Deployment Failed
- Check GitHub Actions logs
- Verify environment variables
- Ensure build passes locally

### App Not Loading
- Check browser console errors
- Verify Supabase credentials
- Check network requests

### Database Errors
- Verify RLS policies
- Check table permissions
- Review Supabase logs

---

## Domain Setup

### GitHub Pages Custom Domain

1. Add `CNAME` file to `public/` directory:
   ```
   yourdomain.com
   ```

2. Configure DNS:
   ```
   yourdomain.com A 185.199.108.153
   yourdomain.com A 185.199.109.153
   yourdomain.com A 185.199.110.153
   yourdomain.com A 185.199.111.153
   ```

3. Enable HTTPS in GitHub Pages settings

---

Your app is now production-ready! 🎉
