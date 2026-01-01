# 🚀 Render Environment Variables Setup

## CRITICAL: You MUST do this to fix the CORS error!

### Frontend Service Configuration

1. **Go to Render Dashboard**: https://dashboard.render.com/
2. **Click on your FRONTEND service**: `ai-powered-chatbot-for-customer-support-1`
3. **Click "Environment" in the left sidebar**
4. **Add these environment variables**:

   Click "Add Environment Variable" and add:
   
   **Variable 1:**
   - Key: `VITE_API_URL`
   - Value: `https://ai-powered-chatbot-for-customer-support.onrender.com`
   
   **Variable 2:**
   - Key: `VITE_SOCKET_URL`
   - Value: `https://ai-powered-chatbot-for-customer-support.onrender.com`

5. **Click "Save Changes"**
6. **Trigger Manual Deploy**:
   - Go to "Manual Deploy" section
   - Click "Clear build cache & deploy"
   - Wait for the build to complete (5-10 minutes)

### Backend Service Configuration

1. **Go to your BACKEND service**: `ai-powered-chatbot-for-customer-support`
2. **Click "Environment"**
3. **Verify/Add this variable**:
   
   - Key: `FRONTEND_URL`
   - Value: `https://ai-powered-chatbot-for-customer-support-1.onrender.com`

4. **Also verify these are set**:
   - `MONGO_URI` - Your MongoDB connection string
   - `OPENAI_API_KEY` - Your OpenAI API key
   - `PORT` - Should be `5000` or leave empty (Render sets this automatically)

5. **Save and redeploy if you made changes**

---

## After Setting Environment Variables:

1. Wait for both services to finish deploying
2. Open your frontend: https://ai-powered-chatbot-for-customer-support-1.onrender.com
3. Open browser DevTools (F12) → Console
4. Send a test message
5. ✅ You should see "Connected to socket server" with NO CORS errors!

---

## Why This Happens:

- Vite (your frontend build tool) only includes environment variables that exist **at build time**
- When you deploy to Render without setting env vars, it uses the fallback: `localhost:5000`
- The deployed frontend can't reach `localhost:5000` because that's YOUR computer, not the server
- Setting env vars on Render and rebuilding fixes this

---

## Quick Checklist:

- [ ] Set `VITE_API_URL` on frontend service
- [ ] Set `VITE_SOCKET_URL` on frontend service  
- [ ] Set `FRONTEND_URL` on backend service
- [ ] Clear build cache and deploy frontend
- [ ] Wait for deployment to complete
- [ ] Test the deployed app
