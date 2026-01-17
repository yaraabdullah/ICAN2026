const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Google Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'your-api-key-here');

const PORT = process.env.PORT || 3000;

// Tool 1: AI Skills Gap Analyzer
app.post('/api/analyze-skills-gap', async (req, res) => {
    try {
        const { answers, organizationInfo } = req.body;
        
        // Calculate base score
        const totalScore = answers.reduce((sum, score) => sum + score, 0);
        const readinessScore = Math.round(totalScore / answers.length);
        
        // Use LLM to generate personalized analysis
        const prompt = `As an AI consultant, analyze this organization's AI readiness assessment:

Readiness Score: ${readinessScore}/100

Assessment Answers:
- AI Adoption Level: ${answers[0]}/100
- Data Quality: ${answers[1]}/100
- Technical Expertise: ${answers[2]}/100
- Infrastructure: ${answers[3]}/100
- Leadership Commitment: ${answers[4]}/100
- Change Management: ${answers[5]}/100
- Budget Allocation: ${answers[6]}/100
- Use Case Understanding: ${answers[7]}/100

${organizationInfo ? `Organization Context: ${organizationInfo}` : ''}

Provide a professional analysis with:
1. Top 3 priority skill gaps (be specific and actionable)
2. An action roadmap with 4-5 concrete steps
3. Industry benchmark comparison with context

Format as JSON:
{
    "priorityGaps": ["gap1", "gap2", "gap3"],
    "roadmap": ["step1", "step2", "step3", "step4"],
    "benchmark": {
        "industryAvg": number,
        "topPerformers": number,
        "message": "contextual message"
    },
    "insights": "additional professional insights"
}`;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const systemPrompt = "You are an expert AI strategy consultant with deep knowledge of organizational AI transformation, capacity building, and digital maturity. Provide professional, actionable insights.";
        const fullPrompt = `${systemPrompt}\n\n${prompt}`;
        
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        let text = response.text();
        
        // Clean up the response - remove markdown code blocks if present
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        let analysis;
        try {
            analysis = JSON.parse(text);
        } catch (parseError) {
            console.error('JSON parse error:', parseError);
            analysis = generateFallbackAnalysis(answers, readinessScore);
        }
        
        // Fallback to static analysis if LLM fails
        if (!analysis.priorityGaps || !analysis.roadmap) {
            analysis = generateFallbackAnalysis(answers, readinessScore);
        }

        res.json({
            readinessScore,
            ...analysis
        });
    } catch (error) {
        console.error('Error in skills gap analysis:', error);
        // Fallback to static analysis
        const { answers } = req.body;
        const totalScore = answers.reduce((sum, score) => sum + score, 0);
        const readinessScore = Math.round(totalScore / answers.length);
        res.json({
            readinessScore,
            ...generateFallbackAnalysis(answers, readinessScore)
        });
    }
});

// Tool 2: Learning Path Generator
app.post('/api/generate-learning-path', async (req, res) => {
    try {
        const { role, experience, goals, timePerWeek, industry } = req.body;
        
        const prompt = `As an AI education expert, create a personalized learning path for:

Role: ${role}
Experience Level: ${experience}
Learning Goals: ${goals}
Time Available: ${timePerWeek} hours per week
${industry ? `Industry: ${industry}` : ''}

Create a comprehensive, structured learning path that includes:
1. A custom curriculum with 5-7 topics (each with topic name, focus description, and recommended resources)
2. A week-by-week timeline based on time availability
3. Key milestones (6 specific milestones)
4. Career pathways (3-4 relevant paths with descriptions and required skills)

Format as JSON:
{
    "curriculum": [
        {
            "topic": "Topic Name",
            "focus": "What to focus on",
            "resources": "Recommended resources"
        }
    ],
    "timeline": [
        {
            "week": 1,
            "topic": "Topic name",
            "description": "What to do this week"
        }
    ],
    "milestones": ["milestone1", "milestone2", ...],
    "careerPaths": [
        {
            "title": "Career Title",
            "description": "Description",
            "skills": ["skill1", "skill2"]
        }
    ]
}`;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const systemPrompt = "You are an expert in AI education and professional development. Create detailed, actionable learning paths that help people achieve their AI career goals.";
        const fullPrompt = `${systemPrompt}\n\n${prompt}`;
        
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        let text = response.text();
        
        // Clean up the response - remove markdown code blocks if present
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        let learningPath;
        try {
            learningPath = JSON.parse(text);
        } catch (parseError) {
            console.error('JSON parse error:', parseError);
            learningPath = generateFallbackLearningPath(role, experience, goals, timePerWeek);
        }
        
        if (!learningPath.curriculum || !learningPath.timeline) {
            learningPath = generateFallbackLearningPath(role, experience, goals, timePerWeek);
        }

        res.json(learningPath);
    } catch (error) {
        console.error('Error in learning path generation:', error);
        const { role, experience, goals, timePerWeek } = req.body;
        res.json(generateFallbackLearningPath(role, experience, goals, timePerWeek));
    }
});

// Tool 3: Job Skills Translator
app.post('/api/analyze-job-skills', async (req, res) => {
    try {
        const { jobTitle, responsibilities, industry } = req.body;
        
        const prompt = `As a career transformation and AI workforce expert, analyze this role:

Job Title: ${jobTitle}
Key Responsibilities: ${responsibilities}
Industry: ${industry}

Provide a comprehensive career transformation analysis:
1. How AI will transform this specific role (4-5 concrete insights)
2. Transferable human-centric skills that remain valuable (5-6 skills)
3. New technical and soft skills needed (separate lists)
4. Career transition options (4-5 options with titles, descriptions, and transition paths)
5. Immediate upskilling plan (6-8 actionable steps)

Format as JSON:
{
    "transformations": ["insight1", "insight2", ...],
    "transferableSkills": ["skill1", "skill2", ...],
    "newSkills": {
        "technical": ["skill1", "skill2", ...],
        "soft": ["skill1", "skill2", ...]
    },
    "careerOptions": [
        {
            "title": "Career Title",
            "description": "Description",
            "path": "step1 | step2 | step3"
        }
    ],
    "upskillingPlan": ["step1", "step2", ...],
    "opportunityAnalysis": "detailed opportunity analysis"
}`;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const systemPrompt = "You are an expert in AI workforce transformation, career development, and skills mapping. Help professionals understand how AI transforms their roles and provide actionable career guidance.";
        const fullPrompt = `${systemPrompt}\n\n${prompt}`;
        
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        let text = response.text();
        
        // Clean up the response - remove markdown code blocks if present
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        let analysis;
        try {
            analysis = JSON.parse(text);
        } catch (parseError) {
            console.error('JSON parse error:', parseError);
            analysis = generateFallbackJobAnalysis(jobTitle, responsibilities, industry);
        }
        
        if (!analysis.transformations || !analysis.careerOptions) {
            analysis = generateFallbackJobAnalysis(jobTitle, responsibilities, industry);
        }

        res.json(analysis);
    } catch (error) {
        console.error('Error in job skills analysis:', error);
        const { jobTitle, responsibilities, industry } = req.body;
        res.json(generateFallbackJobAnalysis(jobTitle, responsibilities, industry));
    }
});

// Fallback functions (static responses if LLM fails)
function generateFallbackAnalysis(answers, score) {
    const gaps = [];
    if (answers[0] < 50) gaps.push("AI Strategy & Vision: Develop a clear AI strategy aligned with business objectives");
    if (answers[1] < 50) gaps.push("Data Foundation: Improve data quality, governance, and accessibility");
    if (answers[2] < 50) gaps.push("Technical Talent: Build or acquire AI/ML expertise through training or hiring");
    if (answers[3] < 50) gaps.push("Infrastructure: Invest in scalable cloud infrastructure and data pipelines");
    if (answers[4] < 50) gaps.push("Leadership Support: Secure executive commitment and allocate dedicated resources");
    
    return {
        priorityGaps: gaps.slice(0, 3),
        roadmap: getRoadmap(score),
        benchmark: getBenchmark(score),
        insights: "Focus on building foundational capabilities and securing executive buy-in for sustainable AI transformation."
    };
}

function getRoadmap(score) {
    if (score < 30) {
        return [
            "Start with AI awareness workshops for leadership",
            "Conduct a data audit to assess current state",
            "Identify 2-3 quick-win AI use cases",
            "Build a small pilot team with basic AI training"
        ];
    } else if (score < 60) {
        return [
            "Develop a formal AI strategy document",
            "Invest in data infrastructure improvements",
            "Launch pilot AI projects in low-risk areas",
            "Establish partnerships with AI solution providers"
        ];
    } else {
        return [
            "Scale successful pilots across the organization",
            "Build internal AI center of excellence",
            "Develop advanced AI capabilities and custom solutions",
            "Focus on AI ethics and governance frameworks"
        ];
    }
}

function getBenchmark(score) {
    if (score < 40) {
        return { industryAvg: 45, topPerformers: 85, message: "You're below industry average. Focus on building foundational capabilities first." };
    } else if (score < 70) {
        return { industryAvg: 55, topPerformers: 90, message: "You're near industry average. Accelerate your AI journey with strategic investments." };
    } else {
        return { industryAvg: 60, topPerformers: 95, message: "You're above average! Focus on scaling and advanced AI capabilities." };
    }
}

function generateFallbackLearningPath(role, experience, goals, timePerWeek) {
    // Fallback logic - similar to existing client-side code
    return {
        curriculum: [
            { topic: "AI Fundamentals", focus: "Understanding AI basics", resources: "Online courses" },
            { topic: "Machine Learning", focus: "ML algorithms", resources: "Hands-on tutorials" }
        ],
        timeline: [{ week: 1, topic: "AI Fundamentals", description: "Start learning basics" }],
        milestones: ["Complete fundamentals", "Build projects", "Get certified"],
        careerPaths: [{ title: "AI Professional", description: "AI career path", skills: ["AI", "ML"] }]
    };
}

function generateFallbackJobAnalysis(jobTitle, responsibilities, industry) {
    return {
        transformations: ["AI will augment decision-making", "Automation will handle routine tasks"],
        transferableSkills: ["Communication", "Leadership", "Problem-solving"],
        newSkills: {
            technical: ["AI Tools", "Data Literacy"],
            soft: ["AI Collaboration", "Adaptive Learning"]
        },
        careerOptions: [{ title: "AI-Enhanced Role", description: "Enhanced role", path: "Learn | Apply | Lead" }],
        upskillingPlan: ["Learn AI basics", "Apply to work", "Build portfolio"]
    };
}

app.listen(PORT, () => {
    console.log(`AI Association Platform API server running on port ${PORT}`);
    console.log(`Using Google Gemini AI`);
    console.log(`Make sure to set GEMINI_API_KEY in your .env file`);
});

