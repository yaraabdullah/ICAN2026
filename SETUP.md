# Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

This will install:
- express (web server)
- cors (cross-origin resource sharing)
- @google/generative-ai (Google Gemini API client)
- dotenv (environment variables)

## Step 2: Configure OpenAI API Key

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Google Gemini API key:
```
GEMINI_API_KEY=your-gemini-api-key-here
PORT=3000
```

**Get your Google Gemini API key:**
- Visit https://makersuite.google.com/app/apikey
- Sign in with your Google account
- Create a new API key
- Copy it to your `.env` file

## Step 3: Start the Backend Server

```bash
npm start
```

You should see:
```
AI Association Platform API server running on port 3000
Make sure to set OPENAI_API_KEY in your .env file
```

## Step 4: Start the Frontend

Open a new terminal window and run:

```bash
# Option 1: Python (if installed)
python3 -m http.server 8000

# Option 2: Node.js http-server (if installed)
npx http-server -p 8000

# Option 3: Open index.html directly in browser
# (Note: CORS might prevent API calls, so use a server)
```

Then open your browser to: `http://localhost:8000`

## Testing the Platform

1. The backend server should be running on `http://localhost:3000`
2. The frontend should be accessible on `http://localhost:8000`
3. Try each tool:
   - **Skills Gap Analyzer**: Answer 8 questions and get AI-powered analysis
   - **Learning Path Generator**: Fill in your details and get a personalized learning plan
   - **Job Skills Translator**: Enter your role and get career transformation insights

## Troubleshooting

### API Key Issues
- Make sure your `.env` file has the correct API key
- Verify your Google account has access to Gemini API
- Check that the API key is valid and not expired

### CORS Issues
- Make sure you're running the frontend through a web server (not just opening the HTML file)
- The backend includes CORS middleware to allow cross-origin requests

### Port Conflicts
- If port 3000 is in use, change `PORT` in `.env`
- Update the API URL in `script.js` if you change the port

### API Rate Limits
- Google Gemini has rate limits on API usage
- If you hit limits, the platform will fall back to static analysis

## Production Deployment

For production:
1. Set environment variables on your hosting platform
2. Use a production-grade Node.js server (PM2, etc.)
3. Enable HTTPS
4. Set up proper error logging
5. Consider caching for frequently requested analyses

