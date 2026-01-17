# AI Association Interactive Tools Platform

A professional, AI-powered interactive web platform featuring three intelligent tools for the ICAN 2026 Conference booth.

## Features

### 1. AI Skills Gap Analyzer
- **Track:** Building National Capacities
- Interactive 8-question assessment
- **AI-Powered Analysis:** Uses GPT-4 to generate personalized insights
- Provides readiness score (0-100)
- Identifies top 3 priority gaps with AI-generated recommendations
- Generates actionable roadmap with AI insights
- Industry benchmark comparison

### 2. Learning Path Generator
- **Track:** AI in Education
- **AI-Powered Personalization:** GPT-4 generates custom learning paths
- Personalized learning plans based on:
  - Current role
  - Experience level
  - Learning goals
  - Time availability
- Custom curriculum with AI-recommended topics and resources
- Week-by-week timeline
- Career pathway insights

### 3. Job Skills Translator
- **Track:** AI-Powered Workforce
- **AI-Powered Analysis:** GPT-4 analyzes career transformations
- Analyzes how AI transforms specific roles
- Identifies transferable skills
- Recommends new skills needed
- Provides career transition options with AI-generated paths
- Immediate upskilling plan

## Technology Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **AI Engine:** Google Gemini Pro
- **Styling:** Professional dark theme with Association color palette

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone or navigate to the project directory:**
```bash
cd ai-association-platform
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env
```

4. **Edit `.env` file and add your Google Gemini API key:**
```
GEMINI_API_KEY=your-gemini-api-key-here
PORT=3000
```

5. **Start the backend server:**
```bash
npm start
```

The server will run on `http://localhost:3000`

6. **Open the frontend:**
- Open `index.html` in a browser, or
- Use a simple HTTP server (Python: `python -m http.server 8000`)
- Or use `npx http-server` if you have it installed

## API Endpoints

### POST `/api/analyze-skills-gap`
Analyzes organization AI readiness based on assessment answers.

**Request Body:**
```json
{
  "answers": [25, 50, 30, 40, 60, 45, 35, 50],
  "organizationInfo": "Optional organization context"
}
```

**Response:**
```json
{
  "readinessScore": 42,
  "priorityGaps": ["Gap 1", "Gap 2", "Gap 3"],
  "roadmap": ["Step 1", "Step 2", ...],
  "benchmark": {
    "industryAvg": 45,
    "topPerformers": 85,
    "message": "Contextual message"
  },
  "insights": "Additional insights"
}
```

### POST `/api/generate-learning-path`
Generates personalized AI learning path.

**Request Body:**
```json
{
  "role": "professional",
  "experience": "intermediate",
  "goals": "Build AI applications",
  "timePerWeek": 10,
  "industry": "technology"
}
```

### POST `/api/analyze-job-skills`
Analyzes how AI transforms a specific job role.

**Request Body:**
```json
{
  "jobTitle": "Marketing Manager",
  "responsibilities": "Manage campaigns, analyze data",
  "industry": "retail"
}
```

## Design

The platform uses the official AI Association color palette:
- **Teal:** #22A599
- **Sky Blue:** #00A8DF
- **Dark Blue:** #044869
- **Very Dark Blue:** #08223F

## Development

For development with auto-reload:
```bash
npm run dev
```

## Error Handling

The platform includes fallback mechanisms:
- If the API is unavailable, tools use client-side static analysis
- Loading states provide user feedback
- Error messages are handled gracefully

## Conference Use

This platform is designed for the ICAN 2026 Conference booth at King Saud University, Riyadh (January 28-29, 2026). It provides immediate value to visitors through AI-powered personalized insights and generates engagement through intelligent recommendations.

## License

MIT

## Support

For issues or questions, please contact the AI Association development team.
