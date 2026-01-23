const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
// Serve static files (HTML, CSS, JS, images)
app.use(express.static(__dirname));

// Initialize Google Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'your-api-key-here');

const PORT = process.env.PORT || 3000;

// Tool 1: AI Skills Gap Analyzer
app.post('/api/analyze-skills-gap', async (req, res) => {
    try {
        const { answers, organizationInfo, language } = req.body;
        const lang = language === 'ar' ? 'ar' : 'en'; // Default to English if not specified
        
        // Validate input
        if (!answers || !Array.isArray(answers) || answers.length !== 14) {
            return res.status(400).json({ 
                error: 'Invalid input: answers must be an array of 14 numbers' 
            });
        }
        
        // Calculate base score
        const totalScore = answers.reduce((sum, score) => sum + score, 0);
        const readinessScore = Math.round(totalScore / answers.length);
        
        // Determine National AI Index maturity level
        const maturityLevel = getNAIIMaturityLevel(readinessScore);
        
        // Use LLM to generate personalized analysis based on National AI Index methodology
        const languageInstruction = lang === 'ar' ? 'IMPORTANT: Provide ALL responses in Arabic (العربية). All text including priority gaps, roadmap steps, and strategic insights must be in Arabic.' : 'IMPORTANT: Provide ALL responses in English.';
        const prompt = `As an AI consultant specializing in the SDAIA National AI Index methodology, analyze this organization's AI readiness assessment:

${languageInstruction}

National AI Index Readiness Score: ${readinessScore}/100
National AI Index Maturity Level: ${maturityLevel.level} - ${maturityLevel.name.en}

Assessment Answers (based on National AI Index three pillars - Directions, Enablers, Outputs):
- Strategic Planning & Performance: ${answers[0]}/100
- AI Initiatives: ${answers[1]}/100
- Budget Allocation: ${answers[2]}/100
- Frameworks & Policies: ${answers[3]}/100
- Regulatory Compliance: ${answers[4]}/100
- Data Availability & Access: ${answers[5]}/100
- Data Quality & Integration: ${answers[6]}/100
- Technical Infrastructure: ${answers[7]}/100
- Number & Diversity of AI Talent: ${answers[8]}/100
- Professional Development: ${answers[9]}/100
- AI Application Development & Deployment: ${answers[10]}/100
- Privacy & Security: ${answers[11]}/100
- Operational Efficiency: ${answers[12]}/100
- Service Quality & Improvement: ${answers[13]}/100

${organizationInfo ? `Organization Context: ${organizationInfo}` : ''}

Provide a professional analysis aligned with National AI Index methodology. IMPORTANT: Make the insights highly personalized and specific to the assessment scores provided. Do NOT use generic templates.

1. Top 5 priority gaps based on National AI Index domains (be specific and actionable, reference National AI Index pillars - Directions, Enablers, Outputs). Each gap should be detailed and include the specific National AI Index domain affected. Base gaps on the actual low scores provided.

2. An action roadmap with 4-5 concrete steps aligned with National AI Index maturity progression from current level ${maturityLevel.level} to level ${maturityLevel.level < 5 ? maturityLevel.level + 1 : 5}.

3. Comprehensive strategic insights (3-4 paragraphs) that MUST be personalized based on:
   - The specific maturity level ${maturityLevel.level} (${maturityLevel.name.en}) and what it means for this organization
   - The weakest performing pillar (calculate from the scores: Directions average=${Math.round((answers[0] + answers[1] + answers[2] + answers[3] + answers[4]) / 5)}, Enablers average=${Math.round((answers[5] + answers[6] + answers[7] + answers[8] + answers[9]) / 5)}, Outputs average=${Math.round((answers[10] + answers[11] + answers[12] + answers[13]) / 4)})
   - Specific low-scoring domains (scores below 40: ${answers.map((a, i) => a < 40 ? `Domain ${i}: ${a}` : null).filter(x => x).join(', ') || 'none'})
   - Current budget allocation score: ${answers[2]}/100
   - Current infrastructure score: ${answers[7]}/100
   - Current talent score: ${answers[8]}/100
   - Key opportunities for advancement to next level
   - Alignment with Vision 2030 objectives
   - Long-term strategic recommendations
   - Risk considerations and mitigation strategies based on actual scores

The insights MUST be unique and reflect the specific assessment results. Do not use generic statements.

Format as JSON:
{
    "priorityGaps": ["gap1", "gap2", "gap3", "gap4", "gap5"],
    "roadmap": ["step1", "step2", "step3", "step4"],
    "insights": "comprehensive strategic insights (3-4 paragraphs) that are personalized to the specific scores and maturity level provided"
}`;

        // Use gemini-2.5-flash (available model that supports generateContent)
        const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
        
        const systemPrompt = "You are an expert AI strategy consultant with deep knowledge of the SDAIA National AI Index methodology, organizational AI transformation aligned with Saudi Vision 2030, capacity building, and digital maturity. Provide professional, actionable insights based on the National AI Index three pillars: Directions (التوجهات), Enablers (الممكنات), and Outputs (المخرجات).";
        const fullPrompt = `${systemPrompt}\n\n${prompt}`;
        
        let analysis;
        try {
            const result = await model.generateContent(fullPrompt);
            const response = await result.response;
            let text = response.text();
            
            // Clean up the response - remove markdown code blocks if present
            text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            
            try {
                analysis = JSON.parse(text);
                console.log('AI Analysis received:', {
                    hasGaps: !!analysis.priorityGaps,
                    hasRoadmap: !!analysis.roadmap,
                    hasInsights: !!analysis.insights,
                    insightsLength: analysis.insights ? analysis.insights.length : 0
                });
            } catch (parseError) {
                console.error('JSON parse error:', parseError);
                console.log('Using fallback analysis');
                analysis = generateFallbackAnalysis(answers, readinessScore, lang);
            }
        } catch (aiError) {
            console.error('AI generation error (using fallback):', aiError.message);
            // Use fallback analysis if AI fails
            analysis = generateFallbackAnalysis(answers, readinessScore, lang);
        }
        
        // Always use dynamic insights to ensure personalization based on actual scores
        // Generate dynamic insights based on actual assessment results
        // Note: maturityLevel is already calculated above, reuse it
        const nextLevel = maturityLevel.level < 5 ? maturityLevel.level + 1 : 5;
        
        // Calculate pillar scores
        const directionsScore = (answers[0] + answers[1] + answers[2] + answers[3] + answers[4]) / 5;
        const enablersScore = (answers[5] + answers[6] + answers[7] + answers[8] + answers[9]) / 5;
        const outputsScore = (answers[10] + answers[11] + answers[12] + answers[13]) / 4;
        
        // Identify weakest pillar
        const pillarScores = [
            { name: 'Directions', score: directionsScore },
            { name: 'Enablers', score: enablersScore },
            { name: 'Outputs', score: outputsScore }
        ];
        const weakestPillar = pillarScores.reduce((min, pillar) => pillar.score < min.score ? pillar : min);
        
        // ALWAYS use dynamic insights to ensure personalization
        const dynamicInsights = generateDynamicInsights(readinessScore, maturityLevel, nextLevel, weakestPillar, answers, lang);
        
        // Generate fallback with proper language support
        const fallback = generateFallbackAnalysis(answers, readinessScore, lang);
        
        // When language is Arabic, prioritize fallback to ensure Arabic content
        // For English, try AI-generated first, then fallback
        if (lang === 'ar') {
            // Always use Arabic fallback for gaps and roadmap to ensure proper Arabic translation
            analysis = {
                priorityGaps: fallback.priorityGaps,
                roadmap: fallback.roadmap,
                insights: dynamicInsights // Always use dynamic insights for personalization
            };
        } else {
            // For English, use AI-generated if available, otherwise fallback
            analysis = {
                priorityGaps: analysis.priorityGaps || fallback.priorityGaps,
                roadmap: analysis.roadmap || fallback.roadmap,
                insights: dynamicInsights // Always use dynamic insights for personalization
            };
        }
        
        console.log('Final analysis:', {
            gapsCount: analysis.priorityGaps.length,
            roadmapCount: analysis.roadmap.length,
            insightsLength: analysis.insights.length,
            readinessScore: readinessScore,
            maturityLevel: maturityLevel.level
        });

        res.json({
            readinessScore,
            ...analysis
        });
    } catch (error) {
        console.error('Error in skills gap analysis:', error);
        // Fallback to static analysis
        const { answers, language } = req.body;
        const fallbackLang = language === 'ar' ? 'ar' : 'en';
        const totalScore = answers.reduce((sum, score) => sum + score, 0);
        const readinessScore = Math.round(totalScore / answers.length);
        res.json({
            readinessScore,
            ...generateFallbackAnalysis(answers, readinessScore, fallbackLang)
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

        // Use gemini-2.5-flash (available model that supports generateContent)
        const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
        
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
        const { jobTitle, responsibilities, industry, language } = req.body;
        const lang = language === 'ar' ? 'ar' : 'en';
        
        const languageInstruction = lang === 'ar' 
            ? 'IMPORTANT: Provide ALL responses in Arabic (العربية). All text including transformations, skills, career options, and upskilling plan must be in Arabic.'
            : 'IMPORTANT: Provide ALL responses in English.';
        
        const prompt = `You are analyzing a specific person's role. Analyze EXACTLY what they do and provide HIGHLY SPECIFIC insights.

PERSON'S INFORMATION:
Job Title: "${jobTitle}"
Key Responsibilities: "${responsibilities}"
Industry/Field: "${industry}"

${languageInstruction}

CRITICAL: You MUST analyze the EXACT field/domain from the job title and responsibilities above. 
- If job title contains "history" or "تاريخ" → This person studies/works in HISTORY. Focus ONLY on how AI helps with HISTORICAL RESEARCH, analyzing historical documents, understanding historical patterns, NOT general education.
- If job title contains "student" or "طالب" → This is a STUDENT. Look at what field they study from responsibilities. If responsibilities mention "history" or "تاريخ", they study HISTORY.
- Extract the EXACT field from the information provided above.

ANALYSIS REQUIREMENTS (MUST be specific to the EXACT field extracted above):

1. Transformations (4-5 insights): How AI helps in THIS EXACT FIELD based on "${jobTitle}" and "${responsibilities}"
   - If history: "AI can analyze thousands of historical documents to find patterns" 
   - If marketing: "AI can analyze customer behavior in marketing campaigns"
   - MUST reference the actual field, NOT generic statements

2. Transferable Skills (5-6): Skills from "${responsibilities}" that are valuable in THIS FIELD
   - Extract skills directly from the responsibilities text
   - Field-specific skills, NOT generic

3. New Skills: How to use AI tools in THIS EXACT FIELD
   - Technical: Specific AI tools for this field (e.g., "AI tools for historical document analysis" if history)
   - Soft: How to work with AI in this field context

4. Career Options (4-5): How to use AI to enhance work in THIS FIELD (NOT transition to AI careers)
   - Example for history: "History Researcher using AI tools for document analysis"
   - Example for marketing: "Marketing Professional using AI for customer insights"
   - MUST be about enhancing current field, NOT becoming AI engineer

5. Upskilling Plan (6-8 steps): Learning AI applications SPECIFIC to THIS FIELD
   - Field-specific tools and resources
   - NOT general AI learning

6. Opportunity Analysis: How AI improves work in THIS SPECIFIC FIELD based on "${responsibilities}"

IMPORTANT: Every response MUST reference the actual field from "${jobTitle}" and "${responsibilities}". Do NOT use generic templates.

Format as JSON:
{
    "transformations": ["specific insight about AI in this field", ...],
    "transferableSkills": ["skill from responsibilities", ...],
    "newSkills": {
        "technical": ["AI tool for this specific field", ...],
        "soft": ["skill for AI in this field", ...]
    },
    "careerOptions": [
        {
            "title": "Role in this field using AI",
            "description": "How to use AI in this specific field",
            "path": "step1 | step2 | step3"
        }
    ],
    "upskillingPlan": ["field-specific step", ...],
    "opportunityAnalysis": "How AI helps in this specific field based on responsibilities"
}`;

        // Use gemini-2.5-flash (available model that supports generateContent)
        const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
        
        const systemPrompt = lang === 'ar' 
            ? `أنت خبير في تحول القوى العاملة بالذكاء الاصطناعي. مهمتك: تحليل الدور المحدد بدقة بناءً على المسمى الوظيفي والمسؤوليات المقدمة. يجب أن تكون كل إجابة محددة جداً للمجال المذكور. إذا كان الشخص يدرس التاريخ، ركز على كيفية مساعدة الذكاء الاصطناعي في البحث التاريخي. إذا كان مطور برمجيات، ركز على الذكاء الاصطناعي في تطوير البرمجيات. لا تستخدم قوالب عامة.`
            : `You are an expert in AI workforce transformation. Your task: Analyze the EXACT role based on the job title and responsibilities provided. Every answer MUST be highly specific to the field mentioned. If the person studies history, focus on how AI helps with historical research. If they're a software developer, focus on AI in software development. Do NOT use generic templates.`;
        const fullPrompt = `${systemPrompt}\n\n${prompt}`;
        
        let analysis;
        
        // ALWAYS try AI-generated content first - let the AI agent generate personalized content
        try {
            console.log('=== CALLING AI AGENT ===');
            console.log('Job Title:', jobTitle);
            console.log('Responsibilities:', responsibilities);
            console.log('Industry:', industry);
            console.log('Language:', lang);
            
            const result = await model.generateContent(fullPrompt);
            const response = await result.response;
            let text = response.text();
            
            console.log('=== AI RESPONSE RECEIVED ===');
            console.log('Response length:', text.length);
            console.log('First 200 chars:', text.substring(0, 200));
            
            // Clean up the response - remove markdown code blocks if present
            text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            
            try {
                analysis = JSON.parse(text);
                console.log('=== AI RESPONSE PARSED SUCCESSFULLY ===');
                console.log('Has transformations:', !!analysis.transformations);
                console.log('Has careerOptions:', !!analysis.careerOptions);
                console.log('First transformation:', analysis.transformations?.[0]?.substring(0, 100));
                
                // VERY MINIMAL validation - only check if arrays exist, don't validate content
                if (!analysis.transformations || !Array.isArray(analysis.transformations)) {
                    console.log('WARNING: Missing transformations array, creating empty one');
                    analysis.transformations = [];
                }
                if (!analysis.careerOptions || !Array.isArray(analysis.careerOptions)) {
                    console.log('WARNING: Missing careerOptions array, creating empty one');
                    analysis.careerOptions = [];
                }
                if (!analysis.transferableSkills || !Array.isArray(analysis.transferableSkills)) {
                    console.log('WARNING: Missing transferableSkills, creating from responsibilities');
                    analysis.transferableSkills = [];
                }
                if (!analysis.newSkills) {
                    console.log('WARNING: Missing newSkills, creating default');
                    analysis.newSkills = { technical: [], soft: [] };
                }
                if (!analysis.upskillingPlan || !Array.isArray(analysis.upskillingPlan)) {
                    console.log('WARNING: Missing upskillingPlan, creating empty one');
                    analysis.upskillingPlan = [];
                }
                if (!analysis.opportunityAnalysis) {
                    console.log('WARNING: Missing opportunityAnalysis, creating default');
                    analysis.opportunityAnalysis = '';
                }
                
                // ALWAYS use AI response - don't fall back unless it's completely broken
                console.log('=== USING AI-GENERATED CONTENT ===');
                
            } catch (parseError) {
                console.error('=== JSON PARSE ERROR ===');
                console.error('Error:', parseError.message);
                console.error('Text that failed to parse:', text.substring(0, 500));
                console.log('Falling back to hardcoded function');
                analysis = generateFallbackJobAnalysis(jobTitle, responsibilities, industry, lang);
            }
        } catch (aiError) {
            console.error('=== AI GENERATION ERROR ===');
            console.error('Error message:', aiError.message);
            console.error('Error stack:', aiError.stack);
            console.log('Falling back to hardcoded function');
            analysis = generateFallbackJobAnalysis(jobTitle, responsibilities, industry, lang);
        }

        res.json(analysis);
    } catch (error) {
        console.error('Error in job skills analysis:', error);
        const { jobTitle, responsibilities, industry, language } = req.body;
        const lang = language === 'ar' ? 'ar' : 'en';
        res.json(generateFallbackJobAnalysis(jobTitle, responsibilities, industry, lang));
    }
});

// National AI Index Maturity Level Determination (based on SDAIA National AI Index)
function getNAIIMaturityLevel(score) {
    if (score >= 0 && score < 5) {
        return { level: 0, name: { en: "Absence of Capabilities", ar: "غياب القدرات" } };
    } else if (score >= 5 && score < 25) {
        return { level: 1, name: { en: "Building Phase", ar: "مرحلة البناء" } };
    } else if (score >= 25 && score < 50) {
        return { level: 2, name: { en: "Activation Phase", ar: "مرحلة التفعيل" } };
    } else if (score >= 50 && score < 80) {
        return { level: 3, name: { en: "Mastery Phase", ar: "مرحلة التمكن" } };
    } else if (score >= 80 && score < 95) {
        return { level: 4, name: { en: "Excellence Phase", ar: "مرحلة التميز" } };
    } else {
        return { level: 5, name: { en: "Leadership Phase", ar: "مرحلة الريادة" } };
    }
}

// Fallback functions (static responses if LLM fails) - aligned with National AI Index
function generateFallbackAnalysis(answers, score, lang = 'en') {
    const gaps = [];
    const domainNames = lang === 'ar' ? [
        "التخطيط الاستراتيجي والأداء",
        "مبادرات الذكاء الاصطناعي",
        "تخصيص الميزانية",
        "الأطر والسياسات",
        "الامتثال التنظيمي",
        "توفر البيانات وإمكانية الوصول",
        "جودة البيانات والتكامل",
        "البنية التحتية التقنية",
        "عدد وتنوع مواهب الذكاء الاصطناعي",
        "التطوير المهني",
        "تطوير ونشر تطبيقات الذكاء الاصطناعي",
        "الخصوصية والأمان",
        "الكفاءة التشغيلية",
        "جودة الخدمة والتحسين"
    ] : [
        "Strategic Planning & Performance",
        "AI Initiatives",
        "Budget Allocation",
        "Frameworks & Policies",
        "Regulatory Compliance",
        "Data Availability & Access",
        "Data Quality & Integration",
        "Technical Infrastructure",
        "Number & Diversity of AI Talent",
        "Professional Development",
        "AI Application Development & Deployment",
        "Privacy & Security",
        "Operational Efficiency",
        "Service Quality & Improvement"
    ];
    
    const pillarNames = lang === 'ar' ? {
        "Directions": "التوجهات",
        "Enablers": "الممكنات",
        "Outputs": "المخرجات"
    } : {
        "Directions": "Directions",
        "Enablers": "Enablers",
        "Outputs": "Outputs"
    };
    
    const pillarMapping = [
        { domain: 0, pillar: "Directions" },
        { domain: 1, pillar: "Directions" },
        { domain: 2, pillar: "Directions" },
        { domain: 3, pillar: "Directions" },
        { domain: 4, pillar: "Directions" },
        { domain: 5, pillar: "Enablers" },
        { domain: 6, pillar: "Enablers" },
        { domain: 7, pillar: "Enablers" },
        { domain: 8, pillar: "Enablers" },
        { domain: 9, pillar: "Enablers" },
        { domain: 10, pillar: "Outputs" },
        { domain: 11, pillar: "Outputs" },
        { domain: 12, pillar: "Outputs" },
        { domain: 13, pillar: "Outputs" }
    ];
    
    // Specific recommendations for each domain
    const domainRecommendations = lang === 'ar' ? [
        "تطوير استراتيجية شاملة للذكاء الاصطناعي تتماشى مع رؤية 2030 وإطار المؤشر الوطني للذكاء الاصطناعي",
        "تحديد وتنفيذ مبادرات ذكاء اصطناعي واضحة تتماشى مع الأولويات الوطنية والأهداف التنظيمية",
        "تخصيص ميزانية مخصصة للذكاء الاصطناعي (موصى به: 15%+ من ميزانية تكنولوجيا المعلومات)",
        "إنشاء أطر حوكمة وسياسات شاملة تتماشى مع لوائح الهيئة السعودية للبيانات والذكاء الاصطناعي",
        "ضمان الامتثال الكامل للوائح الوطنية للذكاء الاصطناعي ومتطلبات الحوكمة",
        "تحسين توفر البيانات وإمكانية الوصول لتمكين تطبيقات الذكاء الاصطناعي",
        "رفع جودة البيانات وتكاملها عبر الأنظمة المختلفة لدعم التحليلات المتقدمة",
        "الاستثمار في البنية التحتية التقنية السحابية القابلة للتوسع وخطوط البيانات",
        "بناء فريق مواهب متنوع في الذكاء الاصطناعي من خلال التوظيف والشراكات الأكاديمية",
        "تطوير برامج تدريبية مستمرة للموظفين تتماشى مع المعايير الوطنية للذكاء الاصطناعي",
        "تطوير ونشر تطبيقات ذكاء اصطناعي عملية لإثبات القيمة والأثر الملموس",
        "تعزيز إجراءات الخصوصية والأمان لحماية البيانات والأنظمة",
        "قياس وتحسين الكفاءة التشغيلية من خلال تطبيقات الذكاء الاصطناعي",
        "تحسين جودة الخدمة باستخدام حلول مدعومة بالذكاء الاصطناعي"
    ] : [
        "Develop a comprehensive AI strategy aligned with Vision 2030 and National AI Index framework",
        "Identify and implement clear AI initiatives aligned with national priorities and organizational goals",
        "Allocate dedicated budget for AI (recommended: 15%+ of IT budget)",
        "Establish comprehensive governance frameworks and policies aligned with SDAIA regulations",
        "Ensure full compliance with national AI regulations and governance requirements",
        "Improve data availability and accessibility to enable AI applications",
        "Enhance data quality and integration across different systems to support advanced analytics",
        "Invest in scalable cloud technical infrastructure and data pipelines",
        "Build a diverse AI talent team through recruitment and academic partnerships",
        "Develop continuous training programs for employees aligned with national AI standards",
        "Develop and deploy practical AI applications to demonstrate value and tangible impact",
        "Strengthen privacy and security measures to protect data and systems",
        "Measure and improve operational efficiency through AI applications",
        "Improve service quality using AI-enabled solutions"
    ];
    
    if (lang === 'ar') {
        answers.forEach((answerScore, index) => {
            if (answerScore < 50 && domainNames[index]) {
                const pillar = pillarMapping.find(p => p.domain === index)?.pillar || "";
                const pillarName = pillarNames[pillar] || pillar;
                gaps.push(`${domainNames[index]} (ركن ${pillarName}): ${domainRecommendations[index]}`);
            }
        });
        
        // Ensure we have at least 5 gaps, fill with general recommendations if needed
        while (gaps.length < 5) {
            if (gaps.length === 0) {
                gaps.push("التخطيط الاستراتيجي والأداء (ركن التوجهات): تطوير استراتيجية شاملة للذكاء الاصطناعي تتماشى مع رؤية 2030 وإطار المؤشر الوطني للذكاء الاصطناعي");
                gaps.push("أساس البيانات (ركن الممكنات): تحسين جودة البيانات والحوكمة وإمكانية الوصول لدعم مبادرات الذكاء الاصطناعي");
                gaps.push("المواهب التقنية (ركن الممكنات): بناء أو اكتساب خبرة في الذكاء الاصطناعي/التعلم الآلي من خلال برامج تدريبية تتماشى مع المعايير الوطنية");
                gaps.push("البنية التحتية (ركن الممكنات): الاستثمار في البنية التحتية السحابية القابلة للتوسع وخطوط البيانات");
                gaps.push("تطبيقات الذكاء الاصطناعي (ركن المخرجات): تطوير ونشر تطبيقات الذكاء الاصطناعي لإثبات الأثر الملموس");
            } else {
                // Add specific recommendations for remaining gaps
                const remainingDomains = domainNames.filter((_, idx) => !answers.some((score, i) => i === idx && score < 50));
                if (remainingDomains.length > 0) {
                    const randomDomain = remainingDomains[Math.floor(Math.random() * remainingDomains.length)];
                    const domainIndex = domainNames.indexOf(randomDomain);
                    if (domainIndex >= 0) {
                        const pillar = pillarMapping.find(p => p.domain === domainIndex)?.pillar || "";
                        const pillarName = pillarNames[pillar] || pillar;
                        gaps.push(`${randomDomain} (ركن ${pillarName}): ${domainRecommendations[domainIndex]}`);
                    } else {
                        gaps.push("الحوكمة والامتثال (ركن التوجهات): إنشاء أطر حوكمة شاملة تتماشى مع لوائح الهيئة السعودية للبيانات والذكاء الاصطناعي");
                    }
                } else {
                    gaps.push("الحوكمة والامتثال (ركن التوجهات): إنشاء أطر حوكمة شاملة تتماشى مع لوائح الهيئة السعودية للبيانات والذكاء الاصطناعي");
                }
            }
        }
    } else {
        answers.forEach((answerScore, index) => {
            if (answerScore < 50 && domainNames[index]) {
                const pillar = pillarMapping.find(p => p.domain === index)?.pillar || "";
                gaps.push(`${domainNames[index]} (${pillar} Pillar): ${domainRecommendations[index]}`);
            }
        });
        
        // Ensure we have at least 5 gaps, fill with general recommendations if needed
        while (gaps.length < 5) {
            if (gaps.length === 0) {
                gaps.push("Strategic Planning & Performance (Directions Pillar): Develop a comprehensive AI strategy aligned with Vision 2030 and National AI Index framework");
                gaps.push("Data Foundation (Enablers Pillar): Improve data quality, governance, and accessibility to support AI initiatives");
                gaps.push("Technical Talent (Enablers Pillar): Build or acquire AI/ML expertise through training programs aligned with national standards");
                gaps.push("Infrastructure (Enablers Pillar): Invest in scalable cloud infrastructure and data pipelines");
                gaps.push("AI Applications (Outputs Pillar): Develop and deploy AI applications to demonstrate tangible impact");
            } else {
                // Add specific recommendations for remaining gaps
                const remainingDomains = domainNames.filter((_, idx) => !answers.some((score, i) => i === idx && score < 50));
                if (remainingDomains.length > 0) {
                    const randomDomain = remainingDomains[Math.floor(Math.random() * remainingDomains.length)];
                    const domainIndex = domainNames.indexOf(randomDomain);
                    if (domainIndex >= 0) {
                        const pillar = pillarMapping.find(p => p.domain === domainIndex)?.pillar || "";
                        gaps.push(`${randomDomain} (${pillar} Pillar): ${domainRecommendations[domainIndex]}`);
                    } else {
                        gaps.push("Governance & Compliance (Directions Pillar): Establish comprehensive governance frameworks aligned with SDAIA regulations");
                    }
                } else {
                    gaps.push("Governance & Compliance (Directions Pillar): Establish comprehensive governance frameworks aligned with SDAIA regulations");
                }
            }
        }
    }
    
    const maturityLevel = getNAIIMaturityLevel(score);
    const nextLevel = maturityLevel.level < 5 ? maturityLevel.level + 1 : 5;
    
    // Calculate pillar scores
    const directionsScore = (answers[0] + answers[1] + answers[2] + answers[3] + answers[4]) / 5;
    const enablersScore = (answers[5] + answers[6] + answers[7] + answers[8] + answers[9]) / 5;
    const outputsScore = (answers[10] + answers[11] + answers[12] + answers[13]) / 4;
    
    // Identify weakest pillar
    const pillarScores = [
        { name: 'Directions', score: directionsScore },
        { name: 'Enablers', score: enablersScore },
        { name: 'Outputs', score: outputsScore }
    ];
    const weakestPillar = pillarScores.reduce((min, pillar) => pillar.score < min.score ? pillar : min);
    
    // Generate dynamic insights based on maturity level and scores
    const insights = generateDynamicInsights(score, maturityLevel, nextLevel, weakestPillar, answers, lang);
    
    return {
        priorityGaps: gaps.slice(0, 5),
        roadmap: getRoadmap(score, lang),
        insights: insights
    };
}

// Generate dynamic insights based on assessment results
function generateDynamicInsights(score, maturityLevel, nextLevel, weakestPillar, answers, lang = 'en') {
    if (lang === 'ar') {
        const levelSpecificInsights = {
            0: `منظمتك في المرحلة الأولية من تبني الذكاء الاصطناعي (المستوى 0: ${maturityLevel.name.ar}). تمثل هذه فرصة حرجة لإنشاء أساس قوي لتحول الذكاء الاصطناعي يتماشى مع رؤية 2030.`,
            1: `منظمتك في مرحلة البناء (المستوى 1: ${maturityLevel.name.ar})، معترفة بأهمية الذكاء الاصطناعي ولكنها تحتاج إلى نهج منظم للتنفيذ.`,
            2: `منظمتك قد فعّلت أطر الذكاء الاصطناعي (المستوى 2: ${maturityLevel.name.ar})، مع تطبيقات أولية عبر الإدارات. هذه مرحلة محورية للتوسع.`,
            3: `منظمتك تظهر التمكن في تكامل الذكاء الاصطناعي (المستوى 3: ${maturityLevel.name.ar})، مع دمج الذكاء الاصطناعي في العمليات واتخاذ القرار.`,
            4: `منظمتك تحقق التميز في الذكاء الاصطناعي (المستوى 4: ${maturityLevel.name.ar})، تقود التحول الاستراتيجي وتحقق أثراً قابلاً للقياس.`,
            5: `منظمتك رائدة وطنياً في تبني الذكاء الاصطناعي (المستوى 5: ${maturityLevel.name.ar})، تحدد معايير للابتكار والأثر.`
        };
        
        const pillarFocus = {
            'Directions': 'ركز على تطوير استراتيجيات شاملة للذكاء الاصطناعي، وضمان التزام القيادة، وإنشاء أطر حوكمة تتماشى مع لوائح الهيئة السعودية للبيانات والذكاء الاصطناعي.',
            'Enablers': 'أولوية بناء البنية التحتية للبيانات، وتحسين جودة البيانات وإمكانية الوصول، وتطوير القدرات التقنية، والاستثمار في تطوير المواهب البشرية.',
            'Outputs': 'ركز على تطوير ونشر تطبيقات الذكاء الاصطناعي، وقياس مكاسب الكفاءة التشغيلية، وتحسين جودة الخدمة من خلال حلول مدعومة بالذكاء الاصطناعي.'
        };
        
        const pillarNames = {
            'Directions': 'التوجهات',
            'Enablers': 'الممكنات',
            'Outputs': 'المخرجات'
        };
        
        const nextLevelGoals = {
            1: 'إنشاء الوعي الأساسي وبدء المشاريع التجريبية',
            2: 'تفعيل أطر الحوكمة وتوسيع التطبيقات الإدارية',
            3: 'تحقيق التكامل التنظيمي الشامل',
            4: 'قيادة التحول الاستراتيجي وتعظيم خلق القيمة',
            5: 'الحفاظ على الريادة الوطنية ودفع الابتكار المستمر'
        };
        
        const levelInsight = levelSpecificInsights[maturityLevel.level];
        const pillarAdvice = pillarFocus[weakestPillar.name] || '';
        const nextGoal = nextLevelGoals[nextLevel] || 'مواصلة التقدم';
        const weakestPillarName = pillarNames[weakestPillar.name] || weakestPillar.name;
        
        // Identify specific low-scoring areas
        const lowScores = [];
        const domainNames = [
            'التخطيط الاستراتيجي', 'مبادرات الذكاء الاصطناعي', 'الميزانية', 'الأطر', 'الامتثال',
            'توفر البيانات', 'جودة البيانات', 'البنية التحتية', 'المواهب', 'التطوير',
            'التطبيقات', 'الأمان', 'الكفاءة', 'جودة الخدمة'
        ];
        answers.forEach((ans, idx) => {
            if (ans < 40 && domainNames[idx]) {
                lowScores.push(domainNames[idx]);
            }
        });
        
        const specificAreas = lowScores.length > 0 
            ? `المجالات التي تتطلب اهتماماً فورياً تشمل: ${lowScores.join('، ')}.`
            : 'جميع المجالات الأساسية تتطلب تحسيناً متوازناً.';
        
        // Add score-specific context
        const scoreContext = score < 25 
            ? `بدرجة استعداد ${score}/100، منظمتك في المراحل المبكرة من تبني الذكاء الاصطناعي.`
            : score < 50
            ? `بدرجة استعداد ${score}/100، منظمتك لديها عناصر أساسية في مكانها ولكنها تحتاج إلى تسريع استراتيجي.`
            : score < 80
            ? `بدرجة استعداد ${score}/100، منظمتك تظهر قدرات قوية في الذكاء الاصطناعي مع مجال للتحسين.`
            : `بدرجة استعداد ${score}/100، منظمتك تقترب من التميز في نضج الذكاء الاصطناعي.`;
        
        // Calculate pillar scores from answers
        const directionsScore = (answers[0] + answers[1] + answers[2] + answers[3] + answers[4]) / 5;
        const enablersScore = (answers[5] + answers[6] + answers[7] + answers[8] + answers[9]) / 5;
        const outputsScore = (answers[10] + answers[11] + answers[12] + answers[13]) / 4;
        
        // Calculate specific pillar performance
        const directionsAvg = Math.round(directionsScore);
        const enablersAvg = Math.round(enablersScore);
        const outputsAvg = Math.round(outputsScore);
        
        const pillarAnalysis = `الأداء عبر أركان المؤشر الوطني للذكاء الاصطناعي الثلاثة يظهر: التوجهات عند ${directionsAvg}/100، الممكنات عند ${enablersAvg}/100، والمخرجات عند ${outputsAvg}/100.`;
        
        // Specific recommendations based on actual scores
        const budgetRecommendation = answers[2] < 30 
            ? `حرج: تخصيص الميزانية منخفض بشكل حرج (${answers[2]}/100). إجراء فوري مطلوب لتأمين ما لا يقل عن 10% من ميزانية تكنولوجيا المعلومات لمبادرات الذكاء الاصطناعي.`
            : answers[2] < 60
            ? `تخصيص الميزانية معتدل (${answers[2]}/100). فكر في الزيادة إلى 15%+ من ميزانية تكنولوجيا المعلومات لتسريع تحول الذكاء الاصطناعي.`
            : `تخصيص الميزانية قوي (${answers[2]}/100)، يوفر أساساً جيداً لمبادرات الذكاء الاصطناعي.`;
        
        const infrastructureRecommendation = answers[7] < 40
            ? `البنية التحتية تتطلب استثماراً كبيراً (النتيجة: ${answers[7]}/100). أولوية الهجرة السحابية وتطوير خطوط البيانات.`
            : answers[7] < 70
            ? `البنية التحتية قيد التطوير (النتيجة: ${answers[7]}/100). ركز على قابلية التوسع والتكامل مع المنصات الوطنية.`
            : `البنية التحتية قوية (النتيجة: ${answers[7]}/100)، تمكن تطبيقات الذكاء الاصطناعي المتقدمة.`;
        
        const talentRecommendation = answers[8] < 30
            ? `فجوة المواهب حرجة (النتيجة: ${answers[8]}/100). حاجة ملحة لتوظيف أو تدريب متخصصي الذكاء الاصطناعي. فكر في شراكات مع الجامعات.`
            : answers[8] < 60
            ? `تطوير المواهب قيد التقدم (النتيجة: ${answers[8]}/100). وسع برامج التدريب وأنشئ مسارات وظيفية واضحة.`
            : `قدرات المواهب قوية (النتيجة: ${answers[8]}/100). ركز على الاحتفاظ وتطوير المهارات المتقدمة.`;
        
        return `${scoreContext} ${levelInsight}

${pillarAnalysis} الركن الأضعف أداءً هو ${weakestPillarName} (النتيجة: ${Math.round(weakestPillar.score)}/100)، والذي يتطلب اهتماماً مركزاً. ${pillarAdvice}

${specificAreas}

${budgetRecommendation} ${infrastructureRecommendation} ${talentRecommendation}

للانتقال إلى المستوى ${nextLevel}، يجب على منظمتك ${nextGoal}. المواءمة مع رؤية 2030 تتطلب دمج تحول الذكاء الاصطناعي كأولوية استراتيجية، وضمان أن مبادرات الذكاء الاصطناعي تساهم مباشرة في الأهداف الوطنية. فكر في إنشاء شراكات مع المؤسسات الأكاديمية، والاستثمار في التطوير المهني المستمر يتماشى مع معايير الذكاء الاصطناعي الوطنية، وتنفيذ أطر قياس قوية لتتبع التقدم مقابل مؤشرات المؤشر الوطني للذكاء الاصطناعي.

المخاطر الرئيسية تشمل عدم كفاية التزام القيادة (${answers[2] < 50 ? 'حالياً مصدر قلق - النتيجة: ' + answers[2] + '/100' : 'تم معالجته بشكل كافٍ - النتيجة: ' + answers[2] + '/100'})، فجوات البنية التحتية للبيانات (${answers[7] < 50 ? 'يحتاج تحسين - النتيجة: ' + answers[7] + '/100' : 'كافٍ - النتيجة: ' + answers[7] + '/100'})، ونقص المهارات (${answers[8] < 50 ? 'فجوة حرجة محددة - النتيجة: ' + answers[8] + '/100' : 'قيد الإدارة - النتيجة: ' + answers[8] + '/100'}). يجب أن تشمل استراتيجيات التخفيف تأمين تخصيص ميزانية مخصصة (الحالي: ${answers[2]}% مكافئ، موصى به >15% من ميزانية تكنولوجيا المعلومات)، وبناء أطر حوكمة البيانات، وإنشاء مسارات وظيفية واضحة للاحتفاظ بمواهب الذكاء الاصطناعي.`;
    } else {
        const levelSpecificInsights = {
            0: `Your organization is at the initial stage of AI adoption (Level 0: ${maturityLevel.name.en}). This represents a critical opportunity to establish a strong foundation for AI transformation aligned with Vision 2030.`,
            1: `Your organization is in the Building Phase (Level 1: ${maturityLevel.name.en}), recognizing the importance of AI but requiring structured approach to implementation.`,
            2: `Your organization has activated AI frameworks (Level 2: ${maturityLevel.name.en}), with initial applications across departments. This is a pivotal stage for scaling.`,
            3: `Your organization demonstrates mastery in AI integration (Level 3: ${maturityLevel.name.en}), with AI embedded in operations and decision-making.`,
            4: `Your organization is achieving excellence in AI (Level 4: ${maturityLevel.name.en}), leading strategic transformation and delivering measurable impact.`,
            5: `Your organization is a national leader in AI adoption (Level 5: ${maturityLevel.name.en}), setting benchmarks for innovation and impact.`
        };
        
        const pillarFocus = {
            'Directions': 'Focus on developing comprehensive AI strategies, securing executive commitment, and establishing governance frameworks aligned with SDAIA regulations.',
            'Enablers': 'Prioritize building data infrastructure, improving data quality and accessibility, developing technical capabilities, and investing in human talent development.',
            'Outputs': 'Emphasize developing and deploying AI applications, measuring operational efficiency gains, and improving service quality through AI-enabled solutions.'
        };
        
        const nextLevelGoals = {
            1: 'establish foundational awareness and begin pilot projects',
            2: 'activate governance frameworks and expand departmental applications',
            3: 'achieve comprehensive organizational integration',
            4: 'lead strategic transformation and maximize value creation',
            5: 'maintain national leadership and drive continuous innovation'
        };
        
        const levelInsight = levelSpecificInsights[maturityLevel.level];
        const pillarAdvice = pillarFocus[weakestPillar.name] || '';
        const nextGoal = nextLevelGoals[nextLevel] || 'continue advancing';
        
        // Identify specific low-scoring areas
        const lowScores = [];
        const domainNames = [
            'Strategic Planning', 'AI Initiatives', 'Budget', 'Frameworks', 'Compliance',
            'Data Availability', 'Data Quality', 'Infrastructure', 'Talent', 'Development',
            'Applications', 'Security', 'Efficiency', 'Service Quality'
        ];
        answers.forEach((ans, idx) => {
            if (ans < 40 && domainNames[idx]) {
                lowScores.push(domainNames[idx]);
            }
        });
        
        const specificAreas = lowScores.length > 0 
            ? `Areas requiring immediate attention include: ${lowScores.join(', ')}.`
            : 'All core areas require balanced improvement.';
        
        // Add score-specific context
        const scoreContext = score < 25 
            ? `With a readiness score of ${score}/100, your organization is in the early stages of AI adoption.`
            : score < 50
            ? `With a readiness score of ${score}/100, your organization has foundational elements in place but needs strategic acceleration.`
            : score < 80
            ? `With a readiness score of ${score}/100, your organization demonstrates solid AI capabilities with room for optimization.`
            : `With a readiness score of ${score}/100, your organization is approaching excellence in AI maturity.`;
        
        // Calculate pillar scores from answers
        const directionsScore = (answers[0] + answers[1] + answers[2] + answers[3] + answers[4]) / 5;
        const enablersScore = (answers[5] + answers[6] + answers[7] + answers[8] + answers[9]) / 5;
        const outputsScore = (answers[10] + answers[11] + answers[12] + answers[13]) / 4;
        
        // Calculate specific pillar performance
        const directionsAvg = Math.round(directionsScore);
        const enablersAvg = Math.round(enablersScore);
        const outputsAvg = Math.round(outputsScore);
        
        const pillarAnalysis = `Performance across the three National AI Index pillars shows: Directions at ${directionsAvg}/100, Enablers at ${enablersAvg}/100, and Outputs at ${outputsAvg}/100.`;
        
        // Specific recommendations based on actual scores
        const budgetRecommendation = answers[2] < 30 
            ? `Critical: Budget allocation is critically low (${answers[2]}/100). Immediate action required to secure at least 10% of IT budget for AI initiatives.`
            : answers[2] < 60
            ? `Budget allocation is moderate (${answers[2]}/100). Consider increasing to 15%+ of IT budget to accelerate AI transformation.`
            : `Budget allocation is strong (${answers[2]}/100), providing good foundation for AI initiatives.`;
        
        const infrastructureRecommendation = answers[7] < 40
            ? `Infrastructure requires significant investment (score: ${answers[7]}/100). Prioritize cloud migration and data pipeline development.`
            : answers[7] < 70
            ? `Infrastructure is developing (score: ${answers[7]}/100). Focus on scalability and integration with national platforms.`
            : `Infrastructure is robust (score: ${answers[7]}/100), enabling advanced AI applications.`;
        
        const talentRecommendation = answers[8] < 30
            ? `Talent gap is critical (score: ${answers[8]}/100). Urgent need to recruit or train AI specialists. Consider partnerships with universities.`
            : answers[8] < 60
            ? `Talent development is progressing (score: ${answers[8]}/100). Expand training programs and create clear career paths.`
            : `Talent capabilities are strong (score: ${answers[8]}/100). Focus on retention and advanced skill development.`;
        
        return `${scoreContext} ${levelInsight}

${pillarAnalysis} The weakest performing pillar is ${weakestPillar.name} (score: ${Math.round(weakestPillar.score)}/100), which requires focused attention. ${pillarAdvice}

${specificAreas}

${budgetRecommendation} ${infrastructureRecommendation} ${talentRecommendation}

To progress to Level ${nextLevel}, your organization should ${nextGoal}. Alignment with Vision 2030 requires integrating AI transformation as a strategic priority, ensuring that AI initiatives contribute directly to national objectives. Consider establishing partnerships with academic institutions, investing in continuous professional development aligned with national AI standards, and implementing robust measurement frameworks to track progress against National AI Index indicators.

Key risks include insufficient executive commitment (${answers[2] < 50 ? 'currently a concern - score: ' + answers[2] + '/100' : 'adequately addressed - score: ' + answers[2] + '/100'}), data infrastructure gaps (${answers[7] < 50 ? 'needs improvement - score: ' + answers[7] + '/100' : 'sufficient - score: ' + answers[7] + '/100'}), and skills shortages (${answers[8] < 50 ? 'critical gap identified - score: ' + answers[8] + '/100' : 'being managed - score: ' + answers[8] + '/100'}). Mitigation strategies should include securing dedicated budget allocation (current: ${answers[2]}% equivalent, recommended >15% of IT budget), building data governance frameworks, and creating clear career pathways for AI talent retention.`;
    }
}

function getRoadmap(score, lang = 'en') {
    if (lang === 'ar') {
        if (score < 5) {
            return [
                "بدء ورش عمل التوعية بالذكاء الاصطناعي للقيادة تتماشى مع رؤية 2030",
                "إجراء تدقيق للبيانات لتقييم الحالة الحالية",
                "تحديد 2-3 حالات استخدام للذكاء الاصطناعي سريعة الفوز تتماشى مع الأولويات الوطنية",
                "بناء فريق تجريبي صغير مع تدريب أساسي على الذكاء الاصطناعي"
            ];
        } else if (score < 25) {
            return [
                "تطوير استراتيجية رسمية للذكاء الاصطناعي تتماشى مع رؤية 2030 وإطار المؤشر الوطني للذكاء الاصطناعي",
                "تحديد أولويات الذكاء الاصطناعي الوطنية ومواءمة المبادرات",
                "إنشاء هيكل تنظيمي أساسي لحوكمة الذكاء الاصطناعي",
                "إطلاق مشاريع تجريبية محدودة مع قياس واضح"
            ];
        } else if (score < 50) {
            return [
                "تفعيل الأطر التنظيمية وآليات الحوكمة وفق معايير المؤشر الوطني للذكاء الاصطناعي",
                "تحسين البنية التحتية للبيانات والتكامل",
                "إطلاق مشاريع تجريبية عبر عدة إدارات",
                "تطوير ممارسات قياس الأداء تتماشى مع المؤشر الوطني للذكاء الاصطناعي"
            ];
        } else if (score < 80) {
            return [
                "دمج الذكاء الاصطناعي في العمليات وعمليات اتخاذ القرار",
                "تكامل الاستراتيجية والبنية التحتية والمهارات بناءً على أركان المؤشر الوطني للذكاء الاصطناعي",
                "تطوير مؤشرات الأداء المتقدمة والحوكمة",
                "تحقيق التكامل الشامل على المستوى التنظيمي"
            ];
        } else if (score < 95) {
            return [
                "قيادة التحول الاستراتيجي بالذكاء الاصطناعي تتماشى مع الأهداف الوطنية",
                "تمكين الخدمات الرقمية المتقدمة مع أثر قابل للقياس",
                "تحقيق أثر ملموس وقابل للقياس يتجاوز تحسين 20%",
                "توسيع المبادرات وتقييمها بشكل دوري وفق إطار المؤشر الوطني للذكاء الاصطناعي"
            ];
        } else {
            return [
                "تحقيق الريادة الوطنية في تبني الذكاء الاصطناعي",
                "دفع الابتكار المستمر والتطوير المتقدم",
                "تحقيق أثر قابل للقياس على المستوى الوطني",
                "المساهمة في تطوير المعايير والممارسات الوطنية"
            ];
        }
    } else {
        if (score < 5) {
            return [
                "Start with AI awareness workshops for leadership aligned with Vision 2030",
                "Conduct a data audit to assess current state",
                "Identify 2-3 quick-win AI use cases aligned with national priorities",
                "Build a small pilot team with basic AI training"
            ];
        } else if (score < 25) {
            return [
                "Develop a formal AI strategy aligned with Vision 2030 and NAII framework",
                "Identify national AI priorities and align initiatives",
                "Establish basic organizational structure for AI governance",
                "Launch limited pilot projects with clear measurement"
            ];
        } else if (score < 50) {
            return [
                "Activate regulatory frameworks and governance mechanisms per National AI Index standards",
                "Improve data infrastructure and integration",
                "Launch pilot projects across several departments",
                "Develop performance measurement practices aligned with National AI Index"
            ];
        } else if (score < 80) {
            return [
                "Integrate AI into operations and decision-making processes",
                "Integrate strategy, infrastructure, and skills based on National AI Index pillars",
                "Develop advanced performance indicators and governance",
                "Achieve comprehensive integration at organizational level"
            ];
        } else if (score < 95) {
            return [
                "Lead strategic transformation with AI aligned with national goals",
                "Enable advanced digital services with measurable impact",
                "Achieve tangible and measurable impact exceeding 20% improvement",
                "Expand initiatives and evaluate them periodically per National AI Index framework"
            ];
        } else {
            return [
                "Achieve national leadership in AI adoption",
                "Drive continuous innovation and advanced development",
                "Achieve measurable impact at national level",
                "Contribute to developing national standards and practices"
            ];
        }
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

function generateFallbackJobAnalysis(jobTitle, responsibilities, industry, lang = 'en') {
    // Analyze the job title and responsibilities to generate dynamic content
    const titleLower = jobTitle.toLowerCase();
    const respLower = responsibilities.toLowerCase();
    
    // Detect key aspects from BOTH title AND responsibilities
    const isManagerial = titleLower.includes('manager') || titleLower.includes('director') || titleLower.includes('lead') || titleLower.includes('head') || 
                         titleLower.includes('مدير') || titleLower.includes('رئيس') || titleLower.includes('قائد') ||
                         respLower.includes('manage') || respLower.includes('lead') || respLower.includes('team') ||
                         respLower.includes('إدارة') || respLower.includes('قيادة') || respLower.includes('فريق');
    
    const isTechnical = titleLower.includes('developer') || titleLower.includes('engineer') || titleLower.includes('programmer') || titleLower.includes('technical') ||
                        titleLower.includes('مطور') || titleLower.includes('مهندس') || titleLower.includes('برمج') ||
                        respLower.includes('code') || respLower.includes('develop') || respLower.includes('program') ||
                        respLower.includes('برمجة') || respLower.includes('تطوير') || respLower.includes('كود');
    
    const isAnalytical = titleLower.includes('analyst') || titleLower.includes('data') || titleLower.includes('research') ||
                         titleLower.includes('محلل') || titleLower.includes('بيانات') || titleLower.includes('بحث') ||
                         respLower.includes('analyze') || respLower.includes('data') || respLower.includes('research') ||
                         respLower.includes('تحليل') || respLower.includes('بيانات') || respLower.includes('بحث');
    
    const isCreative = titleLower.includes('designer') || titleLower.includes('creative') || titleLower.includes('marketing') ||
                       titleLower.includes('مصمم') || titleLower.includes('إبداع') || titleLower.includes('تسويق') ||
                       respLower.includes('design') || respLower.includes('creative') || respLower.includes('marketing') ||
                       respLower.includes('تصميم') || respLower.includes('إبداع') || respLower.includes('تسويق');
    
    const isSales = titleLower.includes('sales') || titleLower.includes('account') || titleLower.includes('business development') ||
                    titleLower.includes('مبيعات') || titleLower.includes('حساب') || titleLower.includes('تطوير أعمال') ||
                    respLower.includes('sales') || respLower.includes('client') || respLower.includes('customer') ||
                    respLower.includes('مبيعات') || respLower.includes('عميل') || respLower.includes('زبون');
    
    // Detect specific tasks from responsibilities to customize transformations
    const hasBudgetManagement = respLower.includes('budget') || respLower.includes('ميزانية') || respLower.includes('مالي');
    const hasReporting = respLower.includes('report') || respLower.includes('تقرير') || respLower.includes('تقارير');
    const hasClientInteraction = respLower.includes('client') || respLower.includes('customer') || respLower.includes('عميل') || respLower.includes('زبون');
    const hasProjectManagement = respLower.includes('project') || respLower.includes('مشروع') || respLower.includes('مشاريع');
    const hasTraining = respLower.includes('train') || respLower.includes('تدريب') || respLower.includes('تعليم');
    const hasStrategy = respLower.includes('strategy') || respLower.includes('strategic') || respLower.includes('استراتيجية') || respLower.includes('استراتيجي');
    const hasTeam = respLower.includes('team') || respLower.includes('فريق') || respLower.includes('موظف') || respLower.includes('staff');
    const hasData = respLower.includes('data') || respLower.includes('بيانات') || respLower.includes('معلومات');
    
    // Detect specific field of study/work
    const isHistoryStudent = titleLower.includes('history') || titleLower.includes('تاريخ') || respLower.includes('history') || respLower.includes('تاريخ');
    const isStudent = titleLower.includes('student') || titleLower.includes('طالب') || titleLower.includes('طالبة');
    
    if (lang === 'ar') {
        // Arabic transformations based on role type, responsibilities, AND specific field
        let transformations = [];
        
        // Field-specific transformations (highest priority)
        if (isHistoryStudent || (isStudent && (titleLower.includes('history') || respLower.includes('history') || titleLower.includes('تاريخ') || respLower.includes('تاريخ')))) {
            transformations.push(`الذكاء الاصطناعي يمكن أن يساعدك في دراسة التاريخ من خلال تحليل آلاف الوثائق التاريخية والبحث في الأرشيف الرقمي بسرعة فائقة`);
            transformations.push(`أدوات الذكاء الاصطناعي يمكنها مساعدتك في فهم الأنماط التاريخية والاتجاهات من خلال تحليل البيانات التاريخية والبحث في المصادر`);
            transformations.push(`الذكاء الاصطناعي يمكن أن يساعدك في ترجمة وتحليل النصوص التاريخية القديمة واللغات الميتة التي قد تكون صعبة الفهم`);
            transformations.push(`أدوات تحليل النصوص بالذكاء الاصطناعي يمكنها مساعدتك في تحليل المصادر الأولية والثانوية بشكل أعمق واكتشاف الروابط الخفية`);
            transformations.push(`الذكاء الاصطناعي يمكن أن يساعدك في إنشاء خطوط زمنية تفاعلية وخرائط تاريخية بناءً على البيانات التاريخية`);
        } else if (isStudent) {
            // Generic student but detect field from responsibilities
            if (respLower.includes('research') || respLower.includes('بحث') || respLower.includes('دراسة')) {
                transformations.push(`الذكاء الاصطناعي يمكن أن يساعدك في البحث الأكاديمي من خلال تحليل كميات كبيرة من الأوراق العلمية والبحوث في مجال دراستك`);
                transformations.push(`أدوات الذكاء الاصطناعي يمكنها مساعدتك في تنظيم المعلومات وإنشاء ملخصات للبحوث والمراجع`);
                transformations.push(`الذكاء الاصطناعي يمكن أن يساعدك في تحليل النصوص والبيانات المتعلقة بمجال دراستك بشكل أسرع وأكثر دقة`);
            } else {
                transformations.push(`الذكاء الاصطناعي يمكن أن يساعدك في دراستك من خلال تحليل المواد التعليمية وإنشاء ملخصات ذكية`);
                transformations.push(`أدوات الذكاء الاصطناعي يمكنها مساعدتك في تنظيم المعلومات وإنشاء جداول دراسية فعالة`);
            }
        } else if (isManagerial) {
            transformations.push(`الذكاء الاصطناعي سيعزز قدراتك في اتخاذ القرارات الاستراتيجية كـ${jobTitle} من خلال تحليل البيانات المتقدمة والتنبؤات`);
            if (hasBudgetManagement) {
                transformations.push(`أدوات الذكاء الاصطناعي ستساعدك في إدارة الميزانية والتنبؤ المالي بشكل أكثر دقة`);
            }
            if (hasReporting) {
                transformations.push(`الأتمتة ستتعامل مع إنشاء التقارير الروتينية، مما يوفر لك الوقت للتركيز على التحليل الاستراتيجي`);
            }
            if (hasTeam) {
                transformations.push(`أدوات الذكاء الاصطناعي ستساعدك في تحليل أداء الفريق وتحديد فرص التحسين`);
            }
            if (hasStrategy) {
                transformations.push(`الذكاء الاصطناعي سيدعم عمليات التخطيط الاستراتيجي والتنبؤ في صناعة ${industry}`);
            }
            if (transformations.length < 4) {
                transformations.push(`الأتمتة ستتعامل مع المهام الإدارية الروتينية، مما يسمح لك بالتركيز على القيادة والتخطيط الاستراتيجي`);
            }
        } else if (isTechnical) {
            transformations.push(`الذكاء الاصطناعي سيغير طريقة تطوير البرمجيات، حيث ستستخدم أدوات التطوير المدعومة بالذكاء الاصطناعي`);
            if (hasProjectManagement) {
                transformations.push(`بناءً على مسؤولياتك في إدارة المشاريع، أدوات الذكاء الاصطناعي ستساعدك في تتبع التقدم وتحديد المشاكل المحتملة بشكل أكثر كفاءة`);
            }
            if (hasReporting) {
                transformations.push(`في إطار مسؤولياتك في إنشاء التقارير التقنية، الأتمتة ستساعدك في إنشاء تقارير الكود والأداء تلقائياً`);
            }
            transformations.push(`الأتمتة ستسرع من عمليات الاختبار والتصحيح في دورك كـ${jobTitle}`);
            transformations.push(`ستحتاج إلى فهم نماذج الذكاء الاصطناعي والتعلم الآلي لدمجها في حلولك`);
            if (transformations.length < 4) {
                transformations.push(`أدوات الذكاء الاصطناعي ستساعدك في كتابة كود أكثر كفاءة وتحسين الأداء`);
            }
        } else if (isAnalytical) {
            transformations.push(`الذكاء الاصطناعي سيعزز قدراتك التحليلية كـ${jobTitle} من خلال معالجة كميات كبيرة من البيانات`);
            if (hasReporting) {
                transformations.push(`بناءً على مسؤولياتك في إنشاء التقارير التحليلية، الأتمتة ستتعامل مع التقارير الروتينية تلقائياً، مما يسمح لك بالتركيز على الرؤى الاستراتيجية والتحليلات المتقدمة`);
            }
            if (hasData) {
                transformations.push(`في إطار مسؤولياتك في تحليل البيانات، أدوات التعلم الآلي ستساعدك في اكتشاف الأنماط والتنبؤات التي قد تفوتك في التحليل اليدوي`);
            }
            transformations.push(`أدوات التعلم الآلي ستساعدك في اكتشاف الأنماط والتنبؤات في البيانات`);
            if (hasStrategy) {
                transformations.push(`الذكاء الاصطناعي سيدعم مسؤولياتك في التخطيط الاستراتيجي من خلال تحليلات تنبؤية أكثر دقة في صناعة ${industry}`);
            }
            if (transformations.length < 4) {
                transformations.push(`الأتمتة ستتعامل مع تحليل البيانات الروتينية، مما يسمح لك بالتركيز على الرؤى الاستراتيجية`);
            }
        } else {
            transformations.push(`الذكاء الاصطناعي سيغير طريقة عملك كـ${jobTitle} في صناعة ${industry}`);
            if (hasClientInteraction) {
                transformations.push(`أدوات الذكاء الاصطناعي ستساعدك في تحسين تجربة العملاء والتفاعل معهم بشكل أكثر فعالية`);
            }
            if (hasTraining) {
                transformations.push(`الذكاء الاصطناعي سيدعم عمليات التدريب والتعليم، مما يجعلها أكثر تخصيصاً وفعالية`);
            }
            transformations.push(`الأتمتة ستتعامل مع المهام الروتينية، مما يسمح لك بالتركيز على القيمة المضافة`);
            if (transformations.length < 4) {
                transformations.push(`أدوات الذكاء الاصطناعي ستساعدك في تحسين الإنتاجية واتخاذ قرارات أفضل`);
            }
        }
        
        // Ensure we have at least 4 transformations
        while (transformations.length < 4) {
            transformations.push(`ستحتاج إلى تعلم كيفية التعاون مع أنظمة الذكاء الاصطناعي في دورك`);
        }
        
        // Extract transferable skills from responsibilities - more comprehensive detection
        const transferableSkills = [];
        if (respLower.includes('communicat') || respLower.includes('تعاون') || respLower.includes('تواصل') || respLower.includes('present') || respLower.includes('عرض')) {
            transferableSkills.push('التواصل الفعال');
        }
        if (respLower.includes('lead') || respLower.includes('manage') || respLower.includes('supervis') || respLower.includes('قيادة') || respLower.includes('إدارة') || respLower.includes('إشراف')) {
            transferableSkills.push('القيادة والإدارة');
        }
        if (respLower.includes('problem') || respLower.includes('solve') || respLower.includes('resolve') || respLower.includes('حل') || respLower.includes('مشكلة')) {
            transferableSkills.push('حل المشكلات');
        }
        if (respLower.includes('analyz') || respLower.includes('evaluat') || respLower.includes('assess') || respLower.includes('تحليل') || respLower.includes('تقييم')) {
            transferableSkills.push('التحليل النقدي');
        }
        if (respLower.includes('creativ') || respLower.includes('innov') || respLower.includes('design') || respLower.includes('إبداع') || respLower.includes('ابتكار') || respLower.includes('تصميم')) {
            transferableSkills.push('الإبداع والابتكار');
        }
        if (respLower.includes('team') || respLower.includes('collaborat') || respLower.includes('coordinat') || respLower.includes('فريق') || respLower.includes('تعاون') || respLower.includes('تنسيق')) {
            transferableSkills.push('العمل الجماعي');
        }
        if (respLower.includes('plan') || respLower.includes('strateg') || respLower.includes('تخطيط') || respLower.includes('استراتيجية')) {
            transferableSkills.push('التخطيط الاستراتيجي');
        }
        if (respLower.includes('client') || respLower.includes('customer') || respLower.includes('stakeholder') || respLower.includes('عميل') || respLower.includes('زبون')) {
            transferableSkills.push('إدارة العلاقات');
        }
        if (respLower.includes('train') || respLower.includes('teach') || respLower.includes('mentor') || respLower.includes('تدريب') || respLower.includes('تعليم')) {
            transferableSkills.push('التدريب والتطوير');
        }
        
        // Ensure we have at least 5 skills
        const defaultSkills = ['التفكير الاستراتيجي', 'التكيف مع التغيير', 'الذكاء العاطفي', 'إدارة الوقت', 'التفاوض'];
        defaultSkills.forEach(skill => {
            if (transferableSkills.length < 6 && !transferableSkills.includes(skill)) {
                transferableSkills.push(skill);
            }
        });
        
        // Technical and soft skills based on role AND field
        let technicalSkills = [];
        let softSkills = [];
        
        // Field-specific skills (highest priority)
        if (isHistoryStudent || (isStudent && (titleLower.includes('history') || respLower.includes('history') || titleLower.includes('تاريخ') || respLower.includes('تاريخ')))) {
            technicalSkills = ['استخدام أدوات الذكاء الاصطناعي لتحليل الوثائق التاريخية', 'أدوات البحث في الأرشيف الرقمي', 'أدوات ترجمة النصوص التاريخية', 'أدوات تحليل الأنماط التاريخية', 'أدوات إنشاء الخطوط الزمنية التفاعلية'];
            softSkills = ['التفكير النقدي في تحليل المصادر', 'التعامل مع أدوات الذكاء الاصطناعي في البحث التاريخي', 'التعلم المستمر في استخدام التقنيات الجديدة', 'التوازن بين التحليل الآلي والبشري'];
        } else if (isStudent) {
            technicalSkills = ['استخدام أدوات الذكاء الاصطناعي للبحث الأكاديمي', 'أدوات تحليل النصوص والبحوث', 'أدوات تنظيم المعلومات الأكاديمية', 'أدوات إنشاء الملخصات الذكية'];
            softSkills = ['التفكير النقدي في استخدام الذكاء الاصطناعي', 'التعلم المستمر', 'التعامل مع أدوات الذكاء الاصطناعي في الدراسة', 'التوازن بين المساعدة الآلية والفهم البشري'];
        } else if (isTechnical) {
            technicalSkills = ['استخدام أدوات التطوير المدعومة بالذكاء الاصطناعي في عملك', 'دمج نماذج التعلم الآلي في التطبيقات', 'أتمتة العمليات في التطوير', 'أدوات تحليل الكود بالذكاء الاصطناعي'];
            softSkills = ['التفكير الحسابي', 'حل المشكلات المعقدة', 'التعلم المستمر', 'التعاون مع أنظمة الذكاء الاصطناعي'];
        } else if (isAnalytical) {
            technicalSkills = ['استخدام أدوات الذكاء الاصطناعي في تحليل البيانات', 'أدوات التعلم الآلي للتحليل', 'أدوات تصور البيانات المتقدمة', 'أدوات التحليل التنبؤي'];
            softSkills = ['التفكير التحليلي', 'التفسير النقدي للنتائج', 'التواصل بالبيانات', 'الفضول الفكري'];
        } else if (isManagerial) {
            technicalSkills = ['استخدام أدوات اتخاذ القرار المدعومة بالذكاء الاصطناعي', 'تحليل البيانات للمديرين', 'أدوات إدارة المشاريع بالذكاء الاصطناعي', 'التحليلات التنبؤية'];
            softSkills = ['القيادة الاستراتيجية', 'إدارة التغيير', 'التفكير الاستراتيجي', 'اتخاذ القرارات المعقدة'];
        } else {
            technicalSkills = ['استخدام أدوات الذكاء الاصطناعي في مجال عملك', 'أدوات الإنتاجية المدعومة بالذكاء الاصطناعي', 'أدوات تحليل البيانات الأساسية', 'أتمتة المهام الروتينية'];
            softSkills = ['التكيف مع التكنولوجيا', 'التعلم المستمر', 'التعاون مع أنظمة الذكاء الاصطناعي', 'المرونة'];
        }
        
        // Career options - CHECK FIELD FIRST before role type
        const careerOptions = [];
        
        // Field-specific career options (highest priority)
        if (isHistoryStudent || (isStudent && (titleLower.includes('history') || respLower.includes('history') || titleLower.includes('تاريخ') || respLower.includes('تاريخ')))) {
            careerOptions.push({
                title: `باحث تاريخي يستخدم أدوات الذكاء الاصطناعي`,
                description: `استخدام أدوات الذكاء الاصطناعي لتحسين البحث التاريخي وتحليل الوثائق والبحث في الأرشيف`,
                path: 'تعلم أدوات تحليل الوثائق بالذكاء الاصطناعي | تطبيق على مشاريع تاريخية | تطوير مهارات البحث'
            });
            careerOptions.push({
                title: `مؤرخ رقمي متخصص`,
                description: `الجمع بين الخبرة التاريخية وأدوات الذكاء الاصطناعي لإنشاء مشاريع تاريخية تفاعلية وتحليلية`,
                path: 'تعلم أدوات الذكاء الاصطناعي للتاريخ | بناء مشاريع تاريخية رقمية | تطوير المحتوى التاريخي'
            });
            careerOptions.push({
                title: `أكاديمي في التاريخ يستخدم الذكاء الاصطناعي`,
                description: `استخدام الذكاء الاصطناعي في التدريس والبحث الأكاديمي في التاريخ`,
                path: 'تعلم تطبيقات الذكاء الاصطناعي في التعليم | تطبيق على البحث الأكاديمي | تطوير المناهج'
            });
            careerOptions.push({
                title: `محرر تاريخي رقمي`,
                description: `استخدام أدوات الذكاء الاصطناعي لتحرير ونشر المحتوى التاريخي الرقمي`,
                path: 'تعلم أدوات النشر الرقمي | تطبيق على المحتوى التاريخي | تطوير المهارات الرقمية'
            });
        } else if (isStudent) {
            // Generic student - use field from industry or responsibilities
            careerOptions.push({
                title: `${jobTitle} يستخدم أدوات الذكاء الاصطناعي`,
                description: `استخدام أدوات الذكاء الاصطناعي لتحسين الدراسة والبحث في مجال ${industry}`,
                path: 'تعلم أدوات الذكاء الاصطناعي في مجال دراستك | تطبيق على مشاريعك | تطوير المهارات'
            });
            careerOptions.push({
                title: `باحث أكاديمي في ${industry} يستخدم الذكاء الاصطناعي`,
                description: `استخدام أدوات الذكاء الاصطناعي في البحث الأكاديمي في مجال ${industry}`,
                path: 'تعلم أدوات البحث بالذكاء الاصطناعي | تطبيق على أبحاثك | تطوير المهارات البحثية'
            });
        } else if (isTechnical) {
            careerOptions.push({
                title: `${jobTitle} محسّن بأدوات الذكاء الاصطناعي`,
                description: `استخدام أدوات الذكاء الاصطناعي لتحسين التطوير والبرمجة في ${industry}`,
                path: 'تعلم أدوات التطوير بالذكاء الاصطناعي | تطبيق على مشاريعك | تحسين الإنتاجية'
            });
        } else if (isAnalytical) {
            careerOptions.push({
                title: `${jobTitle} يستخدم الذكاء الاصطناعي في التحليل`,
                description: `استخدام أدوات الذكاء الاصطناعي لتحسين التحليل في ${industry}`,
                path: 'تعلم أدوات التحليل بالذكاء الاصطناعي | تطبيق على بياناتك | تحسين الدقة'
            });
        } else if (isManagerial) {
            careerOptions.push({
                title: `${jobTitle} يستخدم الذكاء الاصطناعي في الإدارة`,
                description: `استخدام أدوات الذكاء الاصطناعي لتحسين القيادة واتخاذ القرارات في ${industry}`,
                path: 'تعلم أدوات القيادة بالذكاء الاصطناعي | تطبيق على قراراتك | تحسين الأداء'
            });
        } else {
            careerOptions.push({
                title: `${jobTitle} محسّن بأدوات الذكاء الاصطناعي`,
                description: `استخدام أدوات الذكاء الاصطناعي لتحسين العمل في ${industry}`,
                path: 'تعلم أدوات الذكاء الاصطناعي في مجالك | تطبيق على مهامك | تحسين الإنتاجية'
            });
        }
        
        // Add more field-specific options if needed
        while (careerOptions.length < 4) {
            if (isHistoryStudent || (isStudent && (titleLower.includes('history') || respLower.includes('history') || titleLower.includes('تاريخ') || respLower.includes('تاريخ')))) {
                careerOptions.push({
                    title: `محترف في التاريخ يستخدم الذكاء الاصطناعي`,
                    description: `استخدام أدوات الذكاء الاصطناعي لتحسين الأداء في مجال التاريخ`,
                    path: 'تعلم أدوات الذكاء الاصطناعي المخصصة للتاريخ | تطبيق عملي | التطوير المستمر'
                });
            } else {
                careerOptions.push({
                    title: `محترف في ${industry} يستخدم الذكاء الاصطناعي`,
                    description: `استخدام أدوات الذكاء الاصطناعي لتحسين الأداء في مجال ${industry}`,
                    path: 'تعلم أدوات الذكاء الاصطناعي المخصصة لمجالك | تطبيق عملي | التطوير المستمر'
                });
            }
        }
        
        // Upskilling plan - CHECK FIELD FIRST
        const upskillingPlan = [];
        if (isHistoryStudent || (isStudent && (titleLower.includes('history') || respLower.includes('history') || titleLower.includes('تاريخ') || respLower.includes('تاريخ')))) {
            upskillingPlan.push('تعلم استخدام أدوات الذكاء الاصطناعي لتحليل الوثائق التاريخية (مثل OCR للوثائق القديمة)');
            upskillingPlan.push('استكشف أدوات البحث في الأرشيف الرقمي المدعومة بالذكاء الاصطناعي');
            upskillingPlan.push('تعلم استخدام أدوات ترجمة النصوص التاريخية واللغات القديمة');
            upskillingPlan.push('مارس استخدام أدوات تحليل الأنماط التاريخية في مشاريعك الدراسية');
            upskillingPlan.push('انضم إلى مجتمعات الباحثين التاريخيين الذين يستخدمون التكنولوجيا');
            upskillingPlan.push('ابحث عن أدوات الذكاء الاصطناعي المخصصة للبحث التاريخي');
            upskillingPlan.push('طبق ما تتعلمه على أبحاثك التاريخية الحالية');
        } else if (isStudent) {
            upskillingPlan.push(`تعلم استخدام أدوات الذكاء الاصطناعي المخصصة لمجال ${industry}`);
            upskillingPlan.push('استكشف أدوات البحث الأكاديمي المدعومة بالذكاء الاصطناعي');
            upskillingPlan.push('تعلم استخدام أدوات تحليل النصوص والبحوث');
            upskillingPlan.push('مارس استخدام أدوات تنظيم المعلومات الأكاديمية');
            upskillingPlan.push(`انضم إلى مجتمعات طلابية في ${industry} تستخدم الذكاء الاصطناعي`);
            upskillingPlan.push('طبق ما تتعلمه على مشاريعك الدراسية الحالية');
        } else if (isTechnical) {
            upskillingPlan.push('تعلم استخدام أدوات التطوير المدعومة بالذكاء الاصطناعي في عملك اليومي');
            upskillingPlan.push('استكشف أدوات تحليل الكود والمساعدة في البرمجة');
            upskillingPlan.push('تعلم استخدام أدوات أتمتة الاختبار والتصحيح');
            upskillingPlan.push('مارس استخدام أدوات الذكاء الاصطناعي في مشاريعك الحالية');
            upskillingPlan.push('انضم إلى مجتمعات المطورين الذين يستخدمون أدوات الذكاء الاصطناعي');
            upskillingPlan.push('طبق ما تتعلمه مباشرة على مهامك اليومية');
        } else if (isAnalytical) {
            upskillingPlan.push('تعلم استخدام أدوات الذكاء الاصطناعي في تحليل البيانات في عملك');
            upskillingPlan.push('استكشف أدوات التحليل التنبؤي المتاحة لمجالك');
            upskillingPlan.push('تعلم استخدام أدوات تصور البيانات المتقدمة');
            upskillingPlan.push('مارس استخدام أدوات الذكاء الاصطناعي على بياناتك الحالية');
            upskillingPlan.push('انضم إلى مجتمعات المحللين الذين يستخدمون الذكاء الاصطناعي');
            upskillingPlan.push('طبق ما تتعلمه على تحليلاتك اليومية');
        } else {
            upskillingPlan.push(`تعلم استخدام أدوات الذكاء الاصطناعي المخصصة لمجال ${industry}`);
            upskillingPlan.push(`استكشف أدوات الذكاء الاصطناعي المتاحة في ${industry}`);
            upskillingPlan.push('تعلم استخدام أدوات الإنتاجية المدعومة بالذكاء الاصطناعي');
            upskillingPlan.push('احضر ورش عمل حول استخدام الذكاء الاصطناعي في مجالك');
            upskillingPlan.push(`انضم إلى مجتمعات مهنية في ${industry} تركز على الذكاء الاصطناعي`);
            upskillingPlan.push('طبق ما تتعلمه مباشرة على مهامك اليومية');
        }
        
        return {
            transformations: transformations.slice(0, 5),
            transferableSkills: transferableSkills.slice(0, 6),
            newSkills: {
                technical: technicalSkills,
                soft: softSkills
            },
            careerOptions: careerOptions.slice(0, 5),
            upskillingPlan: upskillingPlan.slice(0, 8),
            opportunityAnalysis: isHistoryStudent || (isStudent && (titleLower.includes('history') || respLower.includes('history') || titleLower.includes('تاريخ') || respLower.includes('تاريخ'))) 
                ? `كطالب تاريخ، لديك فرص ممتازة لاستخدام الذكاء الاصطناعي في دراستك. بناءً على مسؤولياتك (${responsibilities.substring(0, 80)}${responsibilities.length > 80 ? '...' : ''})، يمكن للذكاء الاصطناعي أن يساعدك في تحليل آلاف الوثائق التاريخية، البحث في الأرشيف الرقمي، فهم الأنماط التاريخية، وترجمة النصوص القديمة. المهارات القابلة للتحويل مثل ${transferableSkills.slice(0, 3).join(' و')} ستظل قيّمة جداً. ابدأ بتعلم أدوات الذكاء الاصطناعي المخصصة للبحث التاريخي وطبقها على مشاريعك الدراسية.`
                : isStudent
                ? `كطالب في ${industry}، لديك فرص ممتازة لاستخدام الذكاء الاصطناعي في دراستك. بناءً على مسؤولياتك (${responsibilities.substring(0, 80)}${responsibilities.length > 80 ? '...' : ''})، يمكن للذكاء الاصطناعي أن يساعدك في البحث الأكاديمي، تحليل النصوص، تنظيم المعلومات، وإنشاء ملخصات. المهارات القابلة للتحويل مثل ${transferableSkills.slice(0, 3).join(' و')} ستظل قيّمة. ابدأ بتعلم أدوات الذكاء الاصطناعي المخصصة لمجال دراستك.`
                : `كـ${jobTitle} في ${industry}، لديك فرص ممتازة لاستخدام الذكاء الاصطناعي في عملك. بناءً على مسؤولياتك (${responsibilities.substring(0, 80)}${responsibilities.length > 80 ? '...' : ''})، يمكن للذكاء الاصطناعي أن يحسن ${hasBudgetManagement ? 'إدارة الميزانية ' : ''}${hasReporting ? 'وإنشاء التقارير ' : ''}${hasTeam ? 'وإدارة الفريق ' : ''}${hasStrategy ? 'والتخطيط الاستراتيجي ' : ''}في مجالك. المهارات القابلة للتحويل مثل ${transferableSkills.slice(0, 3).join(' و')} ستظل قيّمة جداً. ابدأ بالتعلم التدريجي وطبق ما تتعلمه مباشرة في مهامك اليومية.`
        };
    } else {
        // English version - similar logic but in English
        let transformations = [];
        if (isManagerial) {
            transformations = [
                `AI will enhance your strategic decision-making capabilities as ${jobTitle} through advanced data analysis and predictions`,
                `Automation will handle routine administrative tasks, allowing you to focus on leadership and strategic planning`,
                `AI tools will help you analyze team performance and identify improvement opportunities`,
                `AI will support planning and forecasting processes in the ${industry} industry`
            ];
        } else if (isTechnical) {
            transformations = [
                `AI will change how software is developed, as you'll use AI-powered development tools`,
                `Automation will speed up testing and debugging processes in your role as ${jobTitle}`,
                `You'll need to understand AI and ML models to integrate them into your solutions`,
                `AI tools will help you write more efficient code and improve performance`
            ];
        } else if (isAnalytical) {
            transformations = [
                `AI will enhance your analytical capabilities as ${jobTitle} by processing large volumes of data`,
                `Machine learning tools will help you discover patterns and predictions in data`,
                `Automation will handle routine data analysis, allowing you to focus on strategic insights`,
                `You'll use AI tools to improve analysis accuracy in the ${industry} industry`
            ];
        } else {
            transformations = [
                `AI will transform how you work as ${jobTitle} in the ${industry} industry`,
                `Automation will handle routine tasks, allowing you to focus on value-added work`,
                `AI tools will help you improve productivity and make better decisions`,
                `You'll need to learn how to collaborate with AI systems in your role`
            ];
        }
        
        const transferableSkills = [];
        if (respLower.includes('communicat') || respLower.includes('collaborat')) {
            transferableSkills.push('Effective Communication');
        }
        if (respLower.includes('lead') || respLower.includes('manage')) {
            transferableSkills.push('Leadership & Management');
        }
        if (respLower.includes('problem') || respLower.includes('solve')) {
            transferableSkills.push('Problem-solving');
        }
        if (respLower.includes('analyz')) {
            transferableSkills.push('Critical Analysis');
        }
        if (respLower.includes('creativ') || respLower.includes('innov')) {
            transferableSkills.push('Creativity & Innovation');
        }
        if (respLower.includes('team') || respLower.includes('collaborat')) {
            transferableSkills.push('Teamwork');
        }
        
        const defaultSkills = ['Strategic Thinking', 'Adaptability', 'Emotional Intelligence', 'Time Management', 'Negotiation'];
        defaultSkills.forEach(skill => {
            if (transferableSkills.length < 6 && !transferableSkills.includes(skill)) {
                transferableSkills.push(skill);
            }
        });
        
        let technicalSkills = [];
        let softSkills = [];
        
        if (isTechnical) {
            technicalSkills = ['AI-Powered Development Tools', 'Machine Learning Models', 'Natural Language Processing', 'Computer Vision', 'Process Automation'];
            softSkills = ['Computational Thinking', 'Complex Problem-solving', 'Continuous Learning', 'AI Collaboration'];
        } else if (isAnalytical) {
            technicalSkills = ['Advanced Data Analysis', 'Machine Learning Tools', 'Statistical Programming', 'Data Visualization', 'AI Analytics Tools'];
            softSkills = ['Analytical Thinking', 'Critical Interpretation', 'Data Communication', 'Intellectual Curiosity'];
        } else if (isManagerial) {
            technicalSkills = ['AI-Powered Decision Tools', 'Data Analytics for Managers', 'AI Project Management Tools', 'Predictive Analytics'];
            softSkills = ['Strategic Leadership', 'Change Management', 'Strategic Thinking', 'Complex Decision-making'];
        } else {
            technicalSkills = ['AI Fundamentals', 'AI-Powered Productivity Tools', 'Basic Data Analysis', 'Task Automation'];
            softSkills = ['Tech Adaptability', 'Continuous Learning', 'AI Collaboration', 'Flexibility'];
        }
        
        const careerOptions = [];
        if (isTechnical) {
            careerOptions.push({
                title: `AI Engineer - ${industry}`,
                description: `Develop advanced AI systems in the ${industry} industry, focusing on ML models and practical applications`,
                path: 'Learn ML Fundamentals | Master Development Tools | Build Practical Projects'
            });
            careerOptions.push({
                title: `AI Solutions Developer`,
                description: `Design and develop custom AI solutions for businesses in the ${industry} industry`,
                path: 'Learn Frameworks | Understand Business Needs | Develop Custom Solutions'
            });
        } else if (isAnalytical) {
            careerOptions.push({
                title: `Advanced Data Analyst - ${industry}`,
                description: `Use AI and ML techniques to analyze complex data in the ${industry} industry`,
                path: 'Learn ML Techniques | Master Analytics Tools | Apply to Real Data'
            });
            careerOptions.push({
                title: `Data Scientist - ${industry}`,
                description: `Build advanced predictive and analytical models using AI`,
                path: 'Learn Advanced Statistics | Master Programming | Build Advanced Models'
            });
        } else if (isManagerial) {
            careerOptions.push({
                title: `Digital Transformation Manager - ${industry}`,
                description: `Lead digital transformation and AI initiatives in the ${industry} industry`,
                path: 'Understand Transformation Strategies | Learn Tech Project Management | Build Teams'
            });
            careerOptions.push({
                title: `AI Consultant`,
                description: `Help companies adopt and use AI technologies`,
                path: 'Learn AI Fundamentals | Understand Business Needs | Develop Strategies'
            });
        } else {
            careerOptions.push({
                title: `AI Specialist - ${industry}`,
                description: `Apply AI technologies in the ${industry} industry to improve processes and services`,
                path: 'Learn AI Fundamentals | Understand Industry Applications | Practical Application'
            });
        }
        
        while (careerOptions.length < 4) {
            careerOptions.push({
                title: `AI-Enhanced Professional - ${industry}`,
                description: `Enhanced role combining your current expertise as ${jobTitle} with AI technologies`,
                path: 'Learn AI Fundamentals | Apply to Current Role | Expand Skills'
            });
        }
        
        const upskillingPlan = [];
        if (isTechnical) {
            upskillingPlan.push('Start with a foundational course in machine learning and AI');
            upskillingPlan.push('Learn to use AI-powered development tools like GitHub Copilot');
            upskillingPlan.push('Practice building simple ML models using Python');
            upskillingPlan.push('Join developer communities focused on AI');
            upskillingPlan.push('Build a practical project combining your current expertise with AI');
            upskillingPlan.push('Earn a certification in machine learning or AI');
        } else if (isAnalytical) {
            upskillingPlan.push('Learn ML and AI fundamentals');
            upskillingPlan.push('Master advanced data analysis tools like Python and R');
            upskillingPlan.push('Learn to use ML libraries like scikit-learn and TensorFlow');
            upskillingPlan.push('Practice analyzing real datasets using AI techniques');
            upskillingPlan.push('Join data science communities');
            upskillingPlan.push('Build a portfolio showcasing your AI data analysis skills');
        } else {
            upskillingPlan.push('Learn AI fundamentals and its applications in the ' + industry + ' industry');
            upskillingPlan.push('Explore AI tools available in your field');
            upskillingPlan.push('Attend workshops and training courses on AI');
            upskillingPlan.push('Learn to use AI-powered productivity tools');
            upskillingPlan.push('Join professional communities focused on AI');
            upskillingPlan.push('Look for opportunities to apply what you learn in your current role');
        }
        
        return {
            transformations: transformations.slice(0, 5),
            transferableSkills: transferableSkills.slice(0, 6),
            newSkills: {
                technical: technicalSkills,
                soft: softSkills
            },
            careerOptions: careerOptions.slice(0, 5),
            upskillingPlan: upskillingPlan.slice(0, 8),
            opportunityAnalysis: `As a ${jobTitle} in the ${industry} industry, you have an excellent opportunity to leverage AI transformation. Transferable skills like ${transferableSkills.slice(0, 3).join(', ')} will remain valuable, while you'll need to develop new technical skills in AI. Start with gradual learning and apply what you learn in your current role to build practical experience.`
        };
    }
}

app.listen(PORT, () => {
    console.log(`AI Association Platform API server running on port ${PORT}`);
    console.log(`Using Google Gemini AI`);
    console.log(`Make sure to set GEMINI_API_KEY in your .env file`);
});

