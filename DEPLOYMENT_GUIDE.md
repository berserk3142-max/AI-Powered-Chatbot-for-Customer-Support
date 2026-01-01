# CORS Fix - Deployment Instructions

## ✅ Changes Implemented

1. **Created `.env.example`** in `frontend/` directory with template configuration
2. **Created `.env`** in `frontend/` directory with local development settings
3. **Updated `ChatPage.jsx`** to use environment variables instead of hardcoded URLs
4. **Updated `README.md`** with frontend environment variable documentation

## 🚀 Next Steps for Production Deployment

### Step 1: Deploy Your Backend (if not already deployed)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Create a new **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables in Render:
   - `MONGO_URI`: Your MongoDB connection string
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `FRONTEND_URL`: `https://ai-powered-chatbot-for-customer-support-1.onrender.com`
6. **Copy the deployed backend URL** (e.g., `https://your-backend-name.onrender.com`)

### Step 2: Configure Frontend Environment Variables on Render

1. Go to your **frontend service** on Render
2. Navigate to **Environment** tab
3. Add these environment variables:
   ```
   VITE_API_URL=https://your-backend-name.onrender.com
   VITE_SOCKET_URL=https://your-backend-name.onrender.com
   ```
   *(Replace with your actual backend URL from Step 1)*
4. Click **Save Changes**
5. Trigger a **Manual Deploy** to rebuild with new environment variables

### Step 3: Verify the Fix

1. Open your deployed frontend: `https://ai-powered-chatbot-for-customer-support-1.onrender.com`
2. Open browser DevTools (F12) → Console tab
3. Send a test message
4. **Expected Results**:
   - ✅ No CORS errors in console
   - ✅ Message "Connected to socket server" appears
   - ✅ Chat messages send and receive successfully
   - ✅ Network tab shows requests going to your backend URL (not localhost)

## 🔍 Troubleshooting

### Issue: Still seeing CORS errors
**Solution**: 
- Verify environment variables are set correctly on Render
- Check that backend `FRONTEND_URL` matches your deployed frontend URL
- Ensure you triggered a manual deploy after adding env vars

### Issue: "Cannot connect to server"
**Solution**:
- Verify your backend is running (check backend service logs on Render)
- Confirm backend URL is correct in frontend env vars
- Check backend health endpoint: `https://your-backend-url.onrender.com/api/health`

### Issue: Environment variables not working locally
**Solution**:
- Restart the Vite dev server: Stop and run `npm run dev` again
- Verify `.env` file exists in `frontend/` directory
- Check that variable names start with `VITE_`

## 📝 Local Development

For local development, the `.env` file is already configured:
```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

Just make sure both backend and frontend servers are running:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

## 🎯 Summary

The CORS issue was caused by the deployed frontend trying to connect to `localhost:5000` instead of the deployed backend. We fixed this by:

1. Using environment variables (`VITE_API_URL` and `VITE_SOCKET_URL`)
2. Setting different values for development (localhost) and production (deployed backend URL)
3. Configuring these variables in your hosting platform

Once you set the environment variables on Render and redeploy, your chatbot will work perfectly! 🎉
