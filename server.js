const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('.'));

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Initialize Google Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'your-api-key-here');

const PORT = process.env.PORT || 4000;

// Tool 1: AI Skills Gap Analyzer
app.post('/api/analyze-skills-gap', async (req, res) => {
    try {
        const { answers, organizationInfo, language = 'en' } = req.body;
        
        // Calculate base score
        const totalScore = answers.reduce((sum, score) => sum + score, 0);
        const readinessScore = Math.round(totalScore / answers.length);
        
        // Use LLM to generate personalized analysis
        const isArabic = language === 'ar';
        
        let prompt, systemPrompt;
        
        if (isArabic) {
            systemPrompt = "أنت خبير استشاري في استراتيجية الذكاء الاصطناعي مع معرفة عميقة بتحول المنظمات في الذكاء الاصطناعي وبناء القدرات والنضج الرقمي. يجب أن تكون جميع إجاباتك باللغة العربية فقط. جميع النصوص في priorityGaps و roadmap و benchmark.message و insights يجب أن تكون بالعربية.";
            
            prompt = `كخبير استشاري في الذكاء الاصطناعي، حلل تقييم جاهزية هذه المنظمة للذكاء الاصطناعي:

نقاط الجاهزية: ${readinessScore}/100

إجابات التقييم:
- مستوى اعتماد الذكاء الاصطناعي: ${answers[0]}/100
- جودة البيانات: ${answers[1]}/100
- الخبرة التقنية: ${answers[2]}/100
- البنية التحتية: ${answers[3]}/100
- التزام القيادة: ${answers[4]}/100
- إدارة التغيير: ${answers[5]}/100
- تخصيص الميزانية: ${answers[6]}/100
- فهم حالات الاستخدام: ${answers[7]}/100

${organizationInfo ? `سياق المنظمة: ${organizationInfo}` : ''}

قدم تحليلاً مهنياً يتضمن:
1. أهم 3 فجوات مهارات ذات أولوية (كن محدداً وقابلاً للتنفيذ)
2. خارطة طريق عمل مع 4-5 خطوات ملموسة
3. مقارنة معيار الصناعة مع السياق

**مهم جداً: جميع الإجابات يجب أن تكون باللغة العربية فقط.**

التنسيق كـ JSON:
{
    "priorityGaps": ["الفجوة 1 بالعربية", "الفجوة 2 بالعربية", "الفجوة 3 بالعربية"],
    "roadmap": ["الخطوة 1 بالعربية", "الخطوة 2 بالعربية", "الخطوة 3 بالعربية", "الخطوة 4 بالعربية"],
    "benchmark": {
        "industryAvg": رقم,
        "topPerformers": رقم,
        "message": "رسالة بالعربية"
    },
    "insights": "رؤى إضافية مهنية بالعربية"
}`;
        } else {
            systemPrompt = "You are an expert AI strategy consultant with deep knowledge of organizational AI transformation, capacity building, and digital maturity. Provide professional, actionable insights.";
            
            prompt = `As an AI consultant, analyze this organization's AI readiness assessment:

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
        }
        
        // Try newer model names, fallback to gemini-pro if needed
        let model;
        try {
            model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        } catch (e) {
            try {
                model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
            } catch (e2) {
                model = genAI.getGenerativeModel({ model: "gemini-pro" });
            }
        }
        const fullPrompt = `${systemPrompt}\n\n${prompt}`;
        
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        let text = response.text();
        
        // Clean up the response - remove markdown code blocks if present
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        let analysis;
        try {
            analysis = JSON.parse(text);
            
            // If Arabic was requested, verify the response is actually in Arabic
            if (isArabic && analysis.priorityGaps && analysis.priorityGaps.length > 0) {
                const firstGap = analysis.priorityGaps[0];
                const hasArabic = /[\u0600-\u06FF]/.test(firstGap);
                if (!hasArabic) {
                    console.log('AI returned English instead of Arabic, using Arabic fallback');
                    analysis = generateFallbackAnalysis(answers, readinessScore, language);
                }
            }
        } catch (parseError) {
            console.error('JSON parse error:', parseError);
            analysis = generateFallbackAnalysis(answers, readinessScore, language);
        }
        
        // Fallback to static analysis if LLM fails
        if (!analysis.priorityGaps || !analysis.roadmap) {
            analysis = generateFallbackAnalysis(answers, readinessScore, language);
        }

        res.json({
            readinessScore,
            ...analysis
        });
    } catch (error) {
        console.error('Error in skills gap analysis:', error);
        // Fallback to static analysis
        const { answers, language = 'en' } = req.body;
        const totalScore = answers.reduce((sum, score) => sum + score, 0);
        const readinessScore = Math.round(totalScore / answers.length);
        res.json({
            readinessScore,
            ...generateFallbackAnalysis(answers, readinessScore, language)
        });
    }
});

// Tool 2: Learning Path Generator
app.post('/api/generate-learning-path', async (req, res) => {
    try {
        const { role, experience, goals, timePerWeek, industry, language = 'en' } = req.body;
        
        const isArabic = language === 'ar';
        
        // Calculate total weeks based on time per week (aim for 8-16 weeks for a focused path)
        const totalWeeks = Math.max(8, Math.min(16, Math.ceil(80 / timePerWeek))); // 80 hours total
        
        let prompt, systemPrompt;
        
        if (isArabic) {
            systemPrompt = "أنت خبير في تعليم الذكاء الاصطناعي والتطوير المهني. أنشئ مسارات تعلم مفصلة وعملية تساعد الناس على تحقيق أهدافهم المهنية في الذكاء الاصطناعي. يجب أن تكون جميع الإجابات باللغة العربية.";
            
            prompt = `كخبير في تعليم الذكاء الاصطناعي، أنشئ مسار تعلم مخصص ل:

الدور: ${role}
مستوى الخبرة: ${experience}
أهداف التعلم: ${goals}
الوقت المتاح: ${timePerWeek} ساعة في الأسبوع
${industry ? `القطاع: ${industry}` : ''}

أنشئ مسار تعلم شامل ومهني يتضمن:

1. منهج مخصص مع 8-12 موضوعاً (كل موضوع يجب أن يحتوي على):
   - اسم الموضوع (بالعربية)
   - وصف مفصل للمحتوى والتركيز (بالعربية)
   - موارد محددة وواقعية (دورات، كتب، منصات، مشاريع) مع روابط فعلية - يجب أن تكون جميع أسماء الموارد والوصف بالعربية، مع روابط URL صحيحة
   - المدة المتوقعة لكل موضوع (بالعربية)

2. جدول زمني أسبوعي تفصيلي لـ ${totalWeeks} أسبوع على الأقل، يتضمن:
   - الأسبوع
   - الموضوع/المواضيع لهذا الأسبوع
   - المهام والأنشطة المحددة
   - المشاريع العملية
   - الوقت المطلوب

3. معالم رئيسية (8-10 معالم) مع معايير واضحة للإنجاز

4. مسارات مهنية (4-5 مسارات) مع:
   - العنوان
   - الوصف التفصيلي
   - المهارات المطلوبة
   - الخطوات المحددة للوصول إلى هذا المسار

**مهم جداً - يجب التخصيص بناءً على المدخلات:**
- حلل دور المستخدم: ${role} - هذا يحدد نقطة البداية والعمق
- حلل مستوى الخبرة: ${experience} - المبتدئون يحتاجون أساسيات، المحترفون/المتقدمون يتخطون الأساسيات
- حلل أهداف التعلم: "${goals}" - هذا هو المجال الرئيسي للتركيز. إذا ذكروا "agentic AI" أو "أجنتيك"، ركز بشدة على ذلك. إذا ذكروا NLP، ركز على NLP. طابق المنهج مع أهدافهم المحددة.
- الوقت المتاح: ${timePerWeek} ساعة/أسبوع يعني ${totalWeeks} أسبوع إجمالي - أنشئ جدولاً زمنياً واقعياً
- يجب أن يكون المسار مخصصاً: محترف يريد agentic AI يجب أن يحصل على محتوى متقدم في agentic AI، وليس أساسيات ML
- جميع النصوص يجب أن تكون بالعربية (الموضوع، الوصف، الموارد، إلخ)
- قدم موارد حقيقية ومحددة مع روابط فعلية - استخدم أسماء عربية للموارد مع روابط URL (مثل: "دورة Coursera - Machine Learning - https://www.coursera.org/learn/machine-learning"، "كتاب Hands-On Machine Learning - https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/"، "منصة Kaggle Learn - https://www.kaggle.com/learn"، إلخ)
- يجب أن يكون الجدول الزمني واقعياً ويغطي ${totalWeeks} أسبوع بناءً على ${timePerWeek} ساعة/أسبوع
- ركز على التعلم العملي والمشاريع
- استخدم فاصلة عربية (،) أو شرطة (-) لفصل الموارد
- لا تعطي مسارات عامة - حلل المدخلات وأنشئ شيئاً محدداً

التنسيق كـ JSON:
{
    "curriculum": [
        {
            "topic": "اسم الموضوع بالعربية",
            "focus": "وصف مفصل بالعربية",
            "resources": "اسم المورد - https://url.com أو اسم المورد: https://url.com",
            "duration": "المدة المتوقعة"
        }
    ],
    "timeline": [
        {
            "week": 1,
            "topics": ["الموضوع 1", "الموضوع 2"],
            "description": "وصف تفصيلي للمهام والأنشطة",
            "projects": "المشاريع العملية",
            "hours": ${timePerWeek}
        }
    ],
    "milestones": ["معلم 1", "معلم 2", ...],
    "careerPaths": [
        {
            "title": "عنوان المسار",
            "description": "وصف تفصيلي",
            "skills": ["مهارة 1", "مهارة 2"],
            "steps": ["خطوة 1", "خطوة 2"]
        }
    ]
}`;
        } else {
            systemPrompt = "You are an expert in AI education and professional development. Create detailed, professional, and advanced learning paths that help people achieve their AI career goals. Provide real, specific resources with actual course names, books, and platforms.";
            
            prompt = `As an AI education expert, create a comprehensive, professional learning path for:

Role: ${role}
Experience Level: ${experience}
Learning Goals: ${goals}
Time Available: ${timePerWeek} hours per week
${industry ? `Industry: ${industry}` : ''}

Create a detailed, professional learning path that includes:

1. A custom curriculum with 8-12 topics (each topic must include):
   - Topic name
   - Detailed description of content and focus
   - Specific, real resources with actual URLs/links (format: "Resource Name - URL" or "Resource Name: URL")
   - Expected duration for each topic

2. A detailed week-by-week timeline for at least ${totalWeeks} weeks, including:
   - Week number
   - Topic(s) for this week
   - Specific tasks and activities
   - Hands-on projects
   - Time required

3. Key milestones (8-10 milestones) with clear achievement criteria

4. Career pathways (4-5 paths) with:
   - Title
   - Detailed description
   - Required skills
   - Specific steps to reach this pathway

**CRITICAL - YOU ARE AN INTELLIGENT AGENT. THINK AND REASON BASED ON ALL INPUTS:**

You must analyze and reason about ALL the following inputs together to generate a truly personalized learning path:

1. **ROLE ANALYSIS**: Current Role = "${role}"
   - Think: What does this role imply? Student needs job readiness, Professional needs career advancement, Researcher needs cutting-edge topics
   - This role should influence EVERY aspect: curriculum depth, milestones, career paths

2. **EXPERIENCE ANALYSIS**: Experience Level = "${experience}"
   - Think: Beginner needs fundamentals and building blocks. Intermediate needs practical application. Advanced/Professional can skip basics and dive deep
   - This determines starting point and complexity level

3. **GOALS ANALYSIS**: Learning Goals = "${goals}"
   - Think: What specific topics, skills, or outcomes are mentioned? Extract key themes
   - This is the PRIMARY focus - the curriculum MUST align with these goals
   - If goals mention "agentic AI" → focus heavily on agents, tools, planning
   - If goals mention "NLP" → focus on transformers, LLMs, language models
   - If goals mention "computer vision" → focus on CV, image processing
   - DO NOT add topics that aren't related to the goals

4. **TIME ANALYSIS**: Time Available = ${timePerWeek} hours/week = ${totalWeeks} weeks total
   - Think: How much can realistically be covered in this time?
   - Adjust timeline and curriculum depth accordingly
   - More time = deeper topics, more projects
   - Less time = focused, essential topics only

5. **REASONING REQUIREMENT**:
   - Combine ALL inputs above to create a coherent, personalized path
   - A student beginner wanting NLP with 5 hours/week needs different content than a professional advanced wanting NLP with 20 hours/week
   - Milestones should reflect the role (students get "job ready", professionals get "leadership" or "expertise")
   - Career paths should match the role and goals

6. **RESOURCE REQUIREMENT**:
   - Provide real, specific resources with actual URLs
   - Format: "Resource Name - URL" or "Resource Name: URL"
   - Examples: "Coursera - Machine Learning by Andrew Ng - https://www.coursera.org/learn/machine-learning"

**DO NOT USE HARDCODED RULES. REASON FROM THE INPUTS.**
**DO NOT GIVE GENERIC PATHS. EVERY PATH MUST BE UNIQUE BASED ON THESE SPECIFIC INPUTS.**

Format as JSON:
{
    "curriculum": [
        {
            "topic": "Topic Name",
            "focus": "Detailed description",
            "resources": "Resource Name - https://url.com or Resource Name: https://url.com",
            "duration": "Expected duration"
        }
    ],
    "timeline": [
        {
            "week": 1,
            "topics": ["Topic 1", "Topic 2"],
            "description": "Detailed tasks and activities",
            "projects": "Hands-on projects",
            "hours": ${timePerWeek}
        }
    ],
    "milestones": ["milestone1", "milestone2", ...],
    "careerPaths": [
        {
            "title": "Career Title",
            "description": "Detailed description",
            "skills": ["skill1", "skill2"],
            "steps": ["step1", "step2"]
        }
    ]
}`;
        }
        
        // Try to list available models first
        let model;
        let modelName;
        let availableModels = [];
        
        // Check API key first
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey || apiKey === 'your-api-key-here') {
            throw new Error('GEMINI_API_KEY is not set or is invalid in .env file. Please set a valid API key.');
        }
        
        try {
            // Try to get list of available models using the REST API
            const modelsResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`);
            if (modelsResponse.ok) {
                const modelsData = await modelsResponse.json();
                if (modelsData.models && Array.isArray(modelsData.models)) {
                    availableModels = modelsData.models
                        .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
                        .map(m => m.name.replace('models/', ''));
                    console.log('📋 Available models from API:', availableModels);
                } else {
                    console.log('⚠️ No models found in API response');
                }
            } else {
                const errorText = await modelsResponse.text();
                console.log('⚠️ Failed to list models:', modelsResponse.status, errorText.substring(0, 200));
                if (modelsResponse.status === 401 || modelsResponse.status === 403) {
                    throw new Error(`API key authentication failed (${modelsResponse.status}). Please check your GEMINI_API_KEY is valid.`);
                }
            }
        } catch (listError) {
            if (listError.message && listError.message.includes('authentication')) {
                throw listError;
            }
            console.log('⚠️ Could not list models via REST API, trying common model names...', listError.message);
            // Try common model names
            availableModels = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro", "gemini-1.0-pro"];
        }
        
        // If no models from list, try common names
        if (availableModels.length === 0) {
            availableModels = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro", "gemini-1.0-pro"];
        }
        
        let workingModel = null;
        let lastError = null;
        
        // Try each model - just initialize, don't test (testing might fail even if model works)
        for (const testModelName of availableModels) {
            try {
                const testModel = genAI.getGenerativeModel({ model: testModelName });
                workingModel = testModel;
                modelName = testModelName;
                console.log(`✅ Using model: ${testModelName}`);
                break;
            } catch (e) {
                lastError = e;
                console.log(`❌ Model ${testModelName} initialization failed:`, e.message?.substring(0, 100));
                continue;
            }
        }
        
        if (!workingModel) {
            throw new Error(`No working AI model found. Please check your GEMINI_API_KEY. Last error: ${lastError?.message || 'Unknown'}. Tried: ${availableModels.join(', ')}`);
        }
        
        model = workingModel;
        const fullPrompt = `${systemPrompt}\n\n${prompt}`;
        
        console.log(`🤖 Calling AI agent (${modelName}) to generate personalized learning path based on:`, { role, experience, goals, timePerWeek, language });
        console.log(`📝 Prompt length: ${fullPrompt.length} characters`);
        
        let result, response, text;
        try {
            result = await model.generateContent(fullPrompt);
            response = await result.response;
            text = response.text();
            console.log('✅ AI agent response received, length:', text.length, 'characters');
            console.log('📄 AI agent response preview:', text.substring(0, 200));
        } catch (apiError) {
            console.error('❌ AI API call failed:', apiError.message);
            throw new Error(`AI model call failed: ${apiError.message}. Please check your GEMINI_API_KEY.`);
        }
        
        // Clean up the response - remove markdown code blocks if present
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        let learningPath;
        try {
            learningPath = JSON.parse(text);
            console.log('✅ Successfully parsed AI response');
            
            // Validate AI response - throw error if invalid, NO FALLBACK
            if (!learningPath.curriculum || !Array.isArray(learningPath.curriculum) || learningPath.curriculum.length === 0) {
                // Try to extract curriculum from other fields
                if (learningPath.topics && Array.isArray(learningPath.topics)) {
                    learningPath.curriculum = learningPath.topics;
                }
                if (!learningPath.curriculum || learningPath.curriculum.length === 0) {
                    throw new Error('AI agent did not generate a valid curriculum. Response was invalid.');
                }
            }
            
            // Timeline check - try to fix but throw error if can't, NO FALLBACK
            if (!learningPath.timeline || !Array.isArray(learningPath.timeline)) {
                // Create a basic timeline from curriculum if possible
                if (learningPath.curriculum && learningPath.curriculum.length > 0) {
                    learningPath.timeline = learningPath.curriculum.map((item, idx) => ({
                        week: idx + 1,
                        topics: [item.topic || item.name || 'Topic'],
                        description: item.focus || item.description || '',
                        projects: item.projects || '',
                        hours: timePerWeek
                    }));
                } else {
                    throw new Error('AI agent did not generate a valid timeline. Response was invalid.');
                }
            }
            
            console.log('✅ Using AI agent-generated learning path (AI analyzed all inputs: role, experience, goals, time)');
            
        } catch (parseError) {
            console.error('❌ JSON parse error:', parseError);
            console.error('Raw AI response (first 1000 chars):', text.substring(0, 1000));
            
            // Try to extract JSON from the response
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                try {
                    learningPath = JSON.parse(jsonMatch[0]);
                    console.log('✅ Extracted JSON from AI response');
                } catch (e2) {
                    throw new Error(`AI agent response is not valid JSON. Raw response: ${text.substring(0, 200)}...`);
                }
            } else {
                throw new Error(`AI agent response does not contain valid JSON. Raw response: ${text.substring(0, 200)}...`);
            }
        }
        
        // Final validation - throw error if invalid, NO FALLBACK
        if (!learningPath || (!learningPath.curriculum && !learningPath.timeline && !learningPath.topics)) {
            throw new Error('AI agent generated invalid response - missing required fields');
        }
        
        console.log('✅ Returning AI agent-generated personalized learning path');

        res.json(learningPath);
    } catch (error) {
        console.error('❌ Error in learning path generation:', error);
        console.error('❌ AI agent failed - returning error instead of fallback');
        res.status(500).json({ 
            error: 'AI agent failed to generate learning path', 
            message: error.message,
            details: 'The AI model is not available. Please check your GEMINI_API_KEY and try again.'
        });
    }
});

// Tool 3: Job Skills Translator
app.post('/api/analyze-job-skills', async (req, res) => {
    try {
        const { jobTitle, responsibilities, industry, language = 'en' } = req.body;
        const isArabic = language === 'ar';
        
        let systemPrompt, prompt;
        
        if (isArabic) {
            systemPrompt = "أنت خبير في تحويل المسارات المهنية والذكاء الاصطناعي. قدم تحليلاً شاملاً ومفصلاً. يجب أن تكون جميع الإجابات باللغة العربية.";
            
            prompt = `كخبير في تحويل المسارات المهنية والذكاء الاصطناعي، حلل هذا الدور:

المسمى الوظيفي: ${jobTitle}
المسؤوليات الرئيسية: ${responsibilities}
القطاع: ${industry}

قدم تحليلاً شاملاً لتحول المسار المهني:
1. كيف سيحول الذكاء الاصطناعي هذا الدور المحدد (4-5 رؤى ملموسة)
2. المهارات القابلة للنقل المرتكزة على الإنسان التي تبقى قيّمة (5-6 مهارات)
3. المهارات التقنية واللينة الجديدة المطلوبة (قوائم منفصلة)
4. خيارات الانتقال المهني (4-5 خيارات مع العناوين والأوصاف ومسارات الانتقال)
5. خطة التطوير الفوري (6-8 خطوات قابلة للتنفيذ)

التنسيق كـ JSON:
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

        } else {
            systemPrompt = "You are an expert in AI workforce transformation, career development, and skills mapping. Help professionals understand how AI transforms their roles and provide actionable career guidance.";
            
            prompt = `As a career transformation and AI workforce expert, analyze this role:

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
        }

        // Use the same model selection logic as learning path
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey || apiKey === 'your-api-key-here') {
            throw new Error('GEMINI_API_KEY is not set or is invalid in .env file. Please set a valid API key.');
        }
        
        let availableModels = [];
        try {
            const modelsResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`);
            if (modelsResponse.ok) {
                const modelsData = await modelsResponse.json();
                if (modelsData.models && Array.isArray(modelsData.models)) {
                    availableModels = modelsData.models
                        .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
                        .map(m => m.name.replace('models/', ''));
                }
            }
        } catch (listError) {
            console.log('⚠️ Could not list models, using defaults');
        }
        
        if (availableModels.length === 0) {
            availableModels = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro", "gemini-1.0-pro"];
        }
        
        let model;
        let modelName;
        let workingModel = null;
        
        for (const testModelName of availableModels) {
            try {
                const testModel = genAI.getGenerativeModel({ model: testModelName });
                workingModel = testModel;
                modelName = testModelName;
                break;
            } catch (e) {
                continue;
            }
        }
        
        if (!workingModel) {
            throw new Error(`No working AI model found. Please check your GEMINI_API_KEY.`);
        }
        
        model = workingModel;
        const fullPrompt = `${systemPrompt}\n\n${prompt}`;
        
        console.log(`🤖 Calling AI agent (${modelName}) for job skills analysis, language: ${language}`);
        
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        let text = response.text();
        
        console.log('✅ AI agent response received, length:', text.length, 'characters');
        
        // Clean up the response - remove markdown code blocks if present
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        
        let analysis;
        try {
            analysis = JSON.parse(text);
            
            // Validate response
            if (!analysis.transformations || !Array.isArray(analysis.transformations)) {
                throw new Error('AI agent did not generate valid transformations');
            }
            if (!analysis.careerOptions || !Array.isArray(analysis.careerOptions)) {
                throw new Error('AI agent did not generate valid career options');
            }
            
            console.log('✅ Using AI agent-generated job skills analysis');
        } catch (parseError) {
            console.error('❌ JSON parse error:', parseError);
            console.error('Raw AI response (first 1000 chars):', text.substring(0, 1000));
            
            // Try to extract JSON from the response
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                try {
                    analysis = JSON.parse(jsonMatch[0]);
                    console.log('✅ Extracted JSON from AI response');
                } catch (e2) {
                    throw new Error(`AI agent response is not valid JSON. Raw response: ${text.substring(0, 200)}...`);
                }
            } else {
                throw new Error(`AI agent response does not contain valid JSON. Raw response: ${text.substring(0, 200)}...`);
            }
        }

        res.json(analysis);
    } catch (error) {
        console.error('❌ Error in job skills analysis:', error);
        console.error('❌ AI agent failed - returning error instead of fallback');
        res.status(500).json({ 
            error: 'AI agent failed to generate job skills analysis', 
            message: error.message,
            details: 'The AI model is not available. Please check your GEMINI_API_KEY and try again.'
        });
    }
});

// Fallback functions (static responses if LLM fails)
function generateFallbackAnalysis(answers, score, language = 'en') {
    const isArabic = language === 'ar';
    const gaps = [];
    
    if (answers[0] < 50) {
        gaps.push(isArabic 
            ? "استراتيجية ورؤية الذكاء الاصطناعي: تطوير استراتيجية واضحة للذكاء الاصطناعي تتماشى مع الأهداف التجارية"
            : "AI Strategy & Vision: Develop a clear AI strategy aligned with business objectives");
    }
    if (answers[1] < 50) {
        gaps.push(isArabic
            ? "الأساسيات البيانات: تحسين جودة البيانات والحوكمة وإمكانية الوصول"
            : "Data Foundation: Improve data quality, governance, and accessibility");
    }
    if (answers[2] < 50) {
        gaps.push(isArabic
            ? "المواهب التقنية: بناء أو اكتساب خبرة في الذكاء الاصطناعي/التعلم الآلي من خلال التدريب أو التوظيف"
            : "Technical Talent: Build or acquire AI/ML expertise through training or hiring");
    }
    if (answers[3] < 50) {
        gaps.push(isArabic
            ? "البنية التحتية: الاستثمار في البنية التحتية السحابية القابلة للتوسع وخطوط البيانات"
            : "Infrastructure: Invest in scalable cloud infrastructure and data pipelines");
    }
    if (answers[4] < 50) {
        gaps.push(isArabic
            ? "دعم القيادة: تأمين التزام التنفيذيين وتخصيص الموارد المخصصة"
            : "Leadership Support: Secure executive commitment and allocate dedicated resources");
    }
    
    return {
        priorityGaps: gaps.slice(0, 3),
        roadmap: getRoadmap(score, language),
        benchmark: getBenchmark(score, language),
        insights: isArabic
            ? "ركز على بناء القدرات الأساسية وتأمين دعم التنفيذيين لتحول مستدام في الذكاء الاصطناعي."
            : "Focus on building foundational capabilities and securing executive buy-in for sustainable AI transformation."
    };
}

function getRoadmap(score, language = 'en') {
    const isArabic = language === 'ar';
    
    if (score < 30) {
        return isArabic ? [
            "ابدأ بورش عمل التوعية بالذكاء الاصطناعي للقيادة",
            "إجراء تدقيق للبيانات لتقييم الحالة الحالية",
            "تحديد 2-3 حالات استخدام للذكاء الاصطناعي سريعة الفوز",
            "بناء فريق تجريبي صغير مع تدريب أساسي على الذكاء الاصطناعي"
        ] : [
            "Start with AI awareness workshops for leadership",
            "Conduct a data audit to assess current state",
            "Identify 2-3 quick-win AI use cases",
            "Build a small pilot team with basic AI training"
        ];
    } else if (score < 60) {
        return isArabic ? [
            "تطوير وثيقة استراتيجية رسمية للذكاء الاصطناعي",
            "الاستثمار في تحسينات البنية التحتية للبيانات",
            "إطلاق مشاريع تجريبية للذكاء الاصطناعي في مناطق منخفضة المخاطر",
            "إنشاء شراكات مع مزودي حلول الذكاء الاصطناعي"
        ] : [
            "Develop a formal AI strategy document",
            "Invest in data infrastructure improvements",
            "Launch pilot AI projects in low-risk areas",
            "Establish partnerships with AI solution providers"
        ];
    } else {
        return isArabic ? [
            "توسيع نطاق التجارب الناجحة عبر المنظمة",
            "بناء مركز التميز الداخلي للذكاء الاصطناعي",
            "تطوير قدرات الذكاء الاصطناعي المتقدمة والحلول المخصصة",
            "التركيز على أخلاقيات الذكاء الاصطناعي وأطر الحوكمة"
        ] : [
            "Scale successful pilots across the organization",
            "Build internal AI center of excellence",
            "Develop advanced AI capabilities and custom solutions",
            "Focus on AI ethics and governance frameworks"
        ];
    }
}

function getBenchmark(score, language = 'en') {
    const isArabic = language === 'ar';
    
    if (score < 40) {
        return { 
            industryAvg: 45, 
            topPerformers: 85, 
            message: isArabic 
                ? "أنت أقل من متوسط الصناعة. ركز على بناء القدرات الأساسية أولاً."
                : "You're below industry average. Focus on building foundational capabilities first." 
        };
    } else if (score < 70) {
        return { 
            industryAvg: 55, 
            topPerformers: 90, 
            message: isArabic
                ? "أنت قريب من متوسط الصناعة. سرّع رحلتك في الذكاء الاصطناعي من خلال الاستثمارات الاستراتيجية."
                : "You're near industry average. Accelerate your AI journey with strategic investments." 
        };
    } else {
        return { 
            industryAvg: 60, 
            topPerformers: 95, 
            message: isArabic
                ? "أنت أعلى من المتوسط! ركز على التوسع وقدرات الذكاء الاصطناعي المتقدمة."
                : "You're above average! Focus on scaling and advanced AI capabilities." 
        };
    }
}

function generateFallbackLearningPath(role, experience, goals, timePerWeek, language = 'en') {
    const isArabic = language === 'ar';
    // Calculate total weeks - shorter timeline (8-16 weeks instead of 12-24)
    const totalWeeks = Math.max(8, Math.min(16, Math.ceil(80 / timePerWeek)));
    
    // Debug logging
    console.log('Fallback function called with:', { role, experience, goals, timePerWeek, language });
    
    // Determine curriculum based on role, experience level and goals
    const roleStr = String(role || '').toLowerCase();
    const experienceStr = String(experience || '').toLowerCase();
    
    // Check role for professional indicators
    const roleIsProfessional = roleStr.includes('professional') || roleStr.includes('محترف') || roleStr.includes('executive') || roleStr.includes('researcher');
    const roleIsStudent = roleStr.includes('student') || roleStr.includes('طالب');
    
    // Check experience level
    const isBeginner = experienceStr === 'beginner' || experienceStr.includes('مبتدئ');
    const isIntermediate = experienceStr === 'intermediate' || experienceStr.includes('متوسط');
    const isAdvanced = experienceStr === 'advanced' || experienceStr.includes('متقدم');
    
    // Professional if role is professional OR experience is advanced/intermediate
    const isProfessional = roleIsProfessional || isAdvanced || (isIntermediate && !roleIsStudent);
    
    console.log('Detection:', { roleStr, experienceStr, roleIsProfessional, roleIsStudent, isBeginner, isIntermediate, isAdvanced, isProfessional });
    
    // Comprehensive goal analysis - check for specific topics mentioned
    const goalsStr = String(goals || '').toLowerCase();
    const goalsStrAr = String(goals || ''); // Keep original for Arabic detection
    
    // Topic detection - be very specific
    const mentionsAgentic = goalsStr.includes('agentic') || goalsStr.includes('agent') || goalsStrAr.includes('أجنتيك') || goalsStrAr.includes('وكيل') || goalsStr.includes('autonomous');
    const mentionsNLP = goalsStr.includes('nlp') || goalsStr.includes('natural language') || goalsStr.includes('language processing') || goalsStrAr.includes('معالجة لغة') || goalsStr.includes('llm') || goalsStr.includes('transformer') || goalsStr.includes('bert') || goalsStr.includes('gpt');
    const mentionsCV = goalsStr.includes('vision') || goalsStr.includes('computer vision') || goalsStrAr.includes('رؤية') || goalsStr.includes('image') || goalsStr.includes('object detection') || goalsStr.includes('segmentation');
    const mentionsML = goalsStr.includes('machine learning') || goalsStrAr.includes('تعلم آلي') || goalsStr.includes('ml ') || goalsStr.includes(' ml');
    const mentionsRL = goalsStr.includes('reinforcement') || goalsStr.includes('rl ') || goalsStrAr.includes('تعزيز');
    const mentionsRobotics = goalsStr.includes('robot') || goalsStrAr.includes('روبوت');
    const mentionsData = goalsStr.includes('data science') || goalsStr.includes('data engineering') || goalsStrAr.includes('بيانات') || goalsStr.includes('analytics');
    const mentionsMLOps = goalsStr.includes('mlops') || goalsStr.includes('deployment') || goalsStr.includes('production') || goalsStr.includes('pipeline');
    const mentionsGenAI = goalsStr.includes('generative') || goalsStr.includes('gen ai') || goalsStr.includes('gpt') || goalsStr.includes('chatgpt') || goalsStrAr.includes('توليدي');
    
    console.log('Goals detection:', { 
        goalsStr: goalsStr.substring(0, 100), 
        mentionsAgentic, mentionsNLP, mentionsCV, mentionsML, mentionsRL, 
        mentionsRobotics, mentionsData, mentionsMLOps, mentionsGenAI 
    });
    
    if (isArabic) {
        // Build curriculum based on experience and goals
        let curriculum = [];
        
        if (isBeginner || !isProfessional) {
            // Beginner path
            curriculum = [
                { topic: "أساسيات الذكاء الاصطناعي", focus: "فهم المفاهيم الأساسية للذكاء الاصطناعي والتعلم الآلي", resources: "Coursera - Machine Learning by Andrew Ng - https://www.coursera.org/learn/machine-learning، كتاب Hands-On Machine Learning - https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/", duration: "4-6 أسابيع" },
                { topic: "البرمجة للذكاء الاصطناعي", focus: "Python، NumPy، Pandas، Scikit-learn", resources: "Python for Data Science - IBM - https://www.coursera.org/learn/python-for-applied-data-science-ai، Kaggle Learn - https://www.kaggle.com/learn", duration: "3-4 أسابيع" },
                { topic: "التعلم العميق", focus: "الشبكات العصبية، TensorFlow، PyTorch", resources: "Deep Learning Specialization - https://www.coursera.org/specializations/deep-learning، Fast.ai Practical Deep Learning - https://course.fast.ai/، PyTorch Tutorials - https://pytorch.org/tutorials/", duration: "6-8 أسابيع" }
            ];
        } else if (isProfessional || isAdvanced) {
            // Professional/Advanced path - skip basics
            curriculum = [
                { topic: "التعلم العميق المتقدم", focus: "Architectures متقدمة، Transfer Learning، Fine-tuning", resources: "Advanced Deep Learning - https://www.coursera.org/specializations/deep-learning، Papers with Code - https://paperswithcode.com/", duration: "4-6 أسابيع" }
            ];
            
            // Only add topics that are actually mentioned in goals - don't default to agentic AI
            if (mentionsAgentic) {
                curriculum.push({ topic: "الذكاء الاصطناعي الوكيل (Agentic AI)", focus: "AI Agents، Multi-Agent Systems، Tool Use، Planning", resources: "LangChain Agents - https://python.langchain.com/docs/modules/agents/, AutoGPT - https://github.com/Significant-Gravitas/AutoGPT, Agentic AI Research Papers - https://arxiv.org/search/?query=agentic+ai", duration: "6-8 أسابيع" });
            }
            if (mentionsNLP) {
                curriculum.push({ topic: "معالجة اللغة الطبيعية المتقدمة", focus: "Transformers، LLMs، Fine-tuning، RAG", resources: "NLP Specialization - https://www.coursera.org/specializations/natural-language-processing، Hugging Face NLP Course - https://huggingface.co/learn/nlp-course", duration: "4-6 أسابيع" });
            }
            if (mentionsCV) {
                curriculum.push({ topic: "رؤية الحاسوب المتقدمة", focus: "Object Detection، Segmentation، Vision Transformers", resources: "CS231n Stanford - http://cs231n.stanford.edu/، Fast.ai Computer Vision - https://course.fast.ai/", duration: "4-6 أسابيع" });
            }
            // If no specific topic mentioned, create a custom topic based on the actual goals
            if (!mentionsAgentic && !mentionsNLP && !mentionsCV && !mentionsRL && !mentionsRobotics && !mentionsMLOps && !mentionsData && !mentionsML) {
                // Use the actual goals to create a personalized topic
                const goalWords = goalsStr.split(/\s+/).filter(w => w.length > 2);
                let customTopic = "تطبيقات الذكاء الاصطناعي المتقدمة";
                let customFocus = "Advanced AI applications، Real-world projects";
                
                // Detect business-related goals
                if (goalsStr.includes('business') || goalsStr.includes('commercial') || goalsStr.includes('enterprise') || goalsStr.includes('عمل') || goalsStr.includes('تجاري')) {
                    customTopic = "الذكاء الاصطناعي في الأعمال";
                    customFocus = `تطبيق الذكاء الاصطناعي في الأعمال: ${goals.substring(0, 80)}...`;
                } else if (goalsStr.length > 10) {
                    // Use the goals text directly
                    customTopic = `مسار تعلم مخصص: ${goals.substring(0, 40)}`;
                    customFocus = `التركيز على: ${goals.substring(0, 100)}...`;
                }
                
                curriculum.push({ 
                    topic: customTopic, 
                    focus: customFocus, 
                    resources: "Papers with Code - https://paperswithcode.com/, GitHub AI Projects - https://github.com/topics/artificial-intelligence, Coursera AI for Business - https://www.coursera.org/courses?query=ai%20business", 
                    duration: "6-8 أسابيع" 
                });
            } else if (!mentionsAgentic && !mentionsNLP && !mentionsCV) {
                // Some keywords detected but not the main ones
                if (goalsStr.includes('ml') || goalsStr.includes('machine learning') || goalsStr.includes('تعلم آلي')) {
                    curriculum.push({ topic: "التعلم الآلي المتقدم", focus: "Advanced ML algorithms، MLOps، Production systems", resources: "MLOps Specialization - https://www.coursera.org/specializations/mlops, Fast.ai - https://course.fast.ai/", duration: "4-6 أسابيع" });
                } else if (goalsStr.includes('data') || goalsStr.includes('بيانات')) {
                    curriculum.push({ topic: "علوم البيانات المتقدمة", focus: "Data Engineering، Big Data، Analytics", resources: "Data Engineering Specialization - https://www.coursera.org/specializations/data-engineering, Databricks Academy - https://www.databricks.com/learn", duration: "4-6 أسابيع" });
                }
            }
        } else {
            // Intermediate path
            curriculum = [
                { topic: "التعلم العميق", focus: "الشبكات العصبية، TensorFlow، PyTorch", resources: "Deep Learning Specialization - https://www.coursera.org/specializations/deep-learning، Fast.ai Practical Deep Learning - https://course.fast.ai/", duration: "6-8 أسابيع" }
            ];
        }
        
        curriculum.push({ topic: "مشاريع عملية", focus: "بناء محفظة مشاريع على GitHub", resources: "Kaggle Competitions - https://www.kaggle.com/competitions، GitHub - https://github.com/، Papers with Code - https://paperswithcode.com/", duration: "مستمر" });
        
    return {
            curriculum: curriculum,
            timeline: (() => {
                const timelineItems = [];
                let weekNum = 1;
                
                // Add weeks based on curriculum
                curriculum.forEach((item, idx) => {
                    const weeksForTopic = idx === curriculum.length - 1 ? Math.max(1, totalWeeks - weekNum + 1) : Math.max(2, Math.floor(totalWeeks / curriculum.length));
                    
                    for (let w = 0; w < weeksForTopic && weekNum <= totalWeeks; w++) {
                        timelineItems.push({
                            week: weekNum,
                            topics: [item.topic],
                            description: `${item.focus} - ${goals || 'تعلم متقدم'}`,
                            projects: weekNum > Math.floor(totalWeeks * 0.6) ? "مشروع عملي" : "تمارين",
                            hours: timePerWeek
                        });
                        weekNum++;
                    }
                });
                
                return timelineItems;
            })(),
            milestones: (() => {
                const milestones = [];
                if (isBeginner) {
                    milestones.push("إكمال أساسيات الذكاء الاصطناعي", "إتقان Python و NumPy", "بناء أول نموذج تعلم آلي");
                }
                if (mentionsAgentic) {
                    milestones.push("فهم مفاهيم AI Agents", "بناء أول Agent بسيط", "إكمال مشروع Multi-Agent System");
                } else if (mentionsNLP) {
                    milestones.push("إكمال دورة NLP", "بناء مشروع NLP", "Fine-tuning أول نموذج LLM");
                } else if (mentionsCV) {
                    milestones.push("إكمال دورة رؤية الحاسوب", "بناء مشروع Object Detection", "بناء مشروع Image Segmentation");
                } else if (isProfessional || isAdvanced) {
                    milestones.push("إكمال دورة التعلم العميق المتقدم", "بناء مشروع متقدم", "إتقان Transfer Learning");
                } else {
                    milestones.push("إكمال دورة التعلم العميق", "بناء أول مشروع", "إتقان أساسيات ML");
                }
                milestones.push("إكمال 3 مشاريع على Kaggle", "بناء محفظة GitHub", "الحصول على شهادة");
                // Only add "Job ready" milestone for students
                if (roleIsStudent) {
                    milestones.push("الاستعداد للوظيفة");
                }
                return milestones;
            })(),
            careerPaths: (() => {
                const paths = [];
                if (mentionsAgentic) {
                    paths.push({ 
                        title: "مهندس Agentic AI", 
                        description: "تطوير أنظمة AI Agents متقدمة للإنتاج", 
                        skills: ["Python", "LangChain", "Multi-Agent Systems", "Tool Use"], 
                        steps: ["تعلم LangChain", "بناء Agents", "تعلم Multi-Agent Systems", "مشاريع إنتاجية"] 
                    });
                }
                if (mentionsNLP) {
                    paths.push({ 
                        title: "مهندس NLP", 
                        description: "تطوير تطبيقات معالجة اللغة الطبيعية", 
                        skills: ["Transformers", "LLMs", "Fine-tuning", "RAG"], 
                        steps: ["تعلم Transformers", "Fine-tuning نماذج", "بناء تطبيقات RAG"] 
                    });
                }
                if (mentionsCV) {
                    paths.push({ 
                        title: "مهندس رؤية حاسوب", 
                        description: "تطوير تطبيقات رؤية الحاسوب", 
                        skills: ["CNNs", "Object Detection", "Vision Transformers"], 
                        steps: ["تعلم CNNs", "بناء مشاريع Detection", "تعلم Vision Transformers"] 
                    });
                }
                if (isProfessional || isAdvanced) {
                    paths.push({ 
                        title: "مهندس تعلم آلي متقدم", 
                        description: "تطوير نماذج ML متقدمة للإنتاج", 
                        skills: ["Advanced ML", "MLOps", "Production Systems"], 
                        steps: ["تعلم ML متقدم", "بناء مشاريع", "تعلم MLOps"] 
                    });
                }
                if (paths.length === 0) {
                    paths.push(
                        { title: "مهندس تعلم آلي", description: "تطوير نماذج ML للإنتاج", skills: ["Python", "ML", "MLOps"], steps: ["تعلم ML", "بناء مشاريع", "تعلم MLOps"] },
                        { title: "باحث في الذكاء الاصطناعي", description: "البحث والتطوير في الذكاء الاصطناعي", skills: ["Math", "Research", "Papers"], steps: ["تعلم متقدم", "قراءة أوراق", "بحث"] }
                    );
                }
                return paths;
            })()
        };
    } else {
        // Build curriculum based on experience and goals
        let curriculum = [];
        
        if (isBeginner || !isProfessional) {
            // Beginner path
            curriculum = [
                { topic: "AI Fundamentals", focus: "Understanding core AI and ML concepts", resources: "Coursera - Machine Learning by Andrew Ng - https://www.coursera.org/learn/machine-learning, Hands-On Machine Learning book - https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/", duration: "4-6 weeks" },
                { topic: "Programming for AI", focus: "Python, NumPy, Pandas, Scikit-learn", resources: "Python for Data Science - IBM - https://www.coursera.org/learn/python-for-applied-data-science-ai, Kaggle Learn - https://www.kaggle.com/learn", duration: "3-4 weeks" },
                { topic: "Deep Learning", focus: "Neural Networks, TensorFlow, PyTorch", resources: "Deep Learning Specialization - https://www.coursera.org/specializations/deep-learning, Fast.ai Practical Deep Learning - https://course.fast.ai/, PyTorch Tutorials - https://pytorch.org/tutorials/", duration: "6-8 weeks" }
            ];
        } else if (isProfessional || isAdvanced) {
            // Professional/Advanced path - skip basics
            curriculum = [
                { topic: "Advanced Deep Learning", focus: "Advanced architectures, Transfer Learning, Fine-tuning", resources: "Advanced Deep Learning - https://www.coursera.org/specializations/deep-learning, Papers with Code - https://paperswithcode.com/", duration: "4-6 weeks" }
            ];
            
            // Add topics based on what's ACTUALLY mentioned in goals - be very specific
            if (mentionsAgentic) {
                curriculum.push({ topic: "Agentic AI", focus: "AI Agents, Multi-Agent Systems, Tool Use, Planning, ReAct Pattern", resources: "LangChain Agents - https://python.langchain.com/docs/modules/agents/, AutoGPT - https://github.com/Significant-Gravitas/AutoGPT, Agentic AI Research Papers - https://arxiv.org/search/?query=agentic+ai, ReAct Paper - https://arxiv.org/abs/2210.03629", duration: "6-8 weeks" });
            }
            if (mentionsNLP || mentionsGenAI) {
                curriculum.push({ topic: "Natural Language Processing & Generative AI", focus: "Transformers, LLMs, Fine-tuning, RAG, Prompt Engineering", resources: "NLP Specialization - https://www.coursera.org/specializations/natural-language-processing, Hugging Face NLP Course - https://huggingface.co/learn/nlp-course, OpenAI API Docs - https://platform.openai.com/docs", duration: "6-8 weeks" });
            }
            if (mentionsCV) {
                curriculum.push({ topic: "Advanced Computer Vision", focus: "Object Detection, Segmentation, Vision Transformers, YOLO, R-CNN", resources: "CS231n Stanford - http://cs231n.stanford.edu/, Fast.ai Computer Vision - https://course.fast.ai/, YOLO Tutorial - https://github.com/ultralytics/yolov5", duration: "6-8 weeks" });
            }
            if (mentionsRL) {
                curriculum.push({ topic: "Reinforcement Learning", focus: "Q-Learning, Deep Q-Networks, Policy Gradients, PPO", resources: "Reinforcement Learning Specialization - https://www.coursera.org/specializations/reinforcement-learning, Spinning Up in Deep RL - https://spinningup.openai.com/", duration: "6-8 weeks" });
            }
            if (mentionsRobotics) {
                curriculum.push({ topic: "AI in Robotics", focus: "Robot Control, SLAM, Motion Planning, ROS", resources: "ROS Tutorials - https://wiki.ros.org/, Robotics Specialization - https://www.coursera.org/specializations/robotics", duration: "6-8 weeks" });
            }
            if (mentionsMLOps) {
                curriculum.push({ topic: "MLOps and Model Deployment", focus: "Model Deployment, CI/CD, Monitoring, Kubernetes, Docker", resources: "MLOps Specialization - https://www.coursera.org/specializations/mlops, MLflow - https://mlflow.org/, Kubeflow - https://www.kubeflow.org/", duration: "6-8 weeks" });
            }
            if (mentionsData) {
                curriculum.push({ topic: "Data Engineering", focus: "ETL, Apache Spark, Data Pipelines, Big Data", resources: "Data Engineering Specialization - https://www.coursera.org/specializations/data-engineering, Databricks Academy - https://www.databricks.com/learn, Apache Spark Guide - https://spark.apache.org/docs/latest/", duration: "6-8 weeks" });
            }
            if (mentionsML && !mentionsAgentic && !mentionsNLP && !mentionsCV && !mentionsRL) {
                curriculum.push({ topic: "Advanced Machine Learning", focus: "Advanced ML algorithms, Ensemble Methods, Feature Engineering, Model Optimization", resources: "Advanced Machine Learning Specialization - https://www.coursera.org/specializations/aml, Fast.ai - https://course.fast.ai/, Scikit-learn Advanced - https://scikit-learn.org/stable/", duration: "6-8 weeks" });
            }
            
            // If NO specific topic detected, create a custom topic based on the actual goals
            if (!mentionsAgentic && !mentionsNLP && !mentionsCV && !mentionsRL && !mentionsRobotics && !mentionsMLOps && !mentionsData && !mentionsML) {
                // Use the actual goals to create a personalized topic
                const goalWords = goalsStr.split(/\s+/).filter(w => w.length > 2);
                let customTopic = "Advanced AI Applications";
                let customFocus = "Advanced AI applications, Real-world projects";
                
                // Detect business-related goals
                if (goalsStr.includes('business') || goalsStr.includes('commercial') || goalsStr.includes('enterprise') || goalsStr.includes('industry')) {
                    customTopic = "AI in Business";
                    customFocus = `Applying AI in business contexts: ${goals.substring(0, 80)}...`;
                } else if (goalsStr.length > 10) {
                    // Use the goals text directly
                    customTopic = `Custom Learning Path: ${goals.substring(0, 40)}`;
                    customFocus = `Focus on: ${goals.substring(0, 100)}...`;
                }
                
                console.log('No specific topics detected, creating custom topic from goals:', { customTopic, customFocus });
                
                curriculum.push({ 
                    topic: customTopic, 
                    focus: customFocus, 
                    resources: "Papers with Code - https://paperswithcode.com/, GitHub AI Projects - https://github.com/topics/artificial-intelligence, Coursera AI for Business - https://www.coursera.org/courses?query=ai%20business", 
                    duration: "6-8 weeks" 
                });
            }
        } else {
            // Intermediate path
            curriculum = [
                { topic: "Deep Learning", focus: "Neural Networks, TensorFlow, PyTorch", resources: "Deep Learning Specialization - https://www.coursera.org/specializations/deep-learning, Fast.ai Practical Deep Learning - https://course.fast.ai/", duration: "6-8 weeks" }
            ];
        }
        
        curriculum.push({ topic: "Practical Projects", focus: "Building a portfolio on GitHub", resources: "Kaggle Competitions - https://www.kaggle.com/competitions, GitHub - https://github.com/, Papers with Code - https://paperswithcode.com/", duration: "Ongoing" });
        
        return {
            curriculum: curriculum,
            timeline: (() => {
                const timelineItems = [];
                let weekNum = 1;
                
                // Add weeks based on curriculum
                curriculum.forEach((item, idx) => {
                    const weeksForTopic = idx === curriculum.length - 1 ? Math.max(1, totalWeeks - weekNum + 1) : Math.max(2, Math.floor(totalWeeks / curriculum.length));
                    
                    for (let w = 0; w < weeksForTopic && weekNum <= totalWeeks; w++) {
                        timelineItems.push({
                            week: weekNum,
                            topics: [item.topic],
                            description: `${item.focus} - ${goals || 'Advanced learning'}`,
                            projects: weekNum > Math.floor(totalWeeks * 0.6) ? "Practical project" : "Exercises",
                            hours: timePerWeek
                        });
                        weekNum++;
                    }
                });
                
                return timelineItems;
            })(),
            milestones: (() => {
                const milestones = [];
                if (isBeginner) {
                    milestones.push("Complete AI fundamentals", "Master Python and NumPy", "Build first ML model");
                }
                if (mentionsAgentic) {
                    milestones.push("Understand AI Agents concepts", "Build first simple Agent", "Complete Multi-Agent System project");
                } else if (mentionsNLP) {
                    milestones.push("Complete NLP course", "Build NLP project", "Fine-tune first LLM");
                } else if (mentionsCV) {
                    milestones.push("Complete Computer Vision course", "Build Object Detection project", "Build Image Segmentation project");
                } else if (isProfessional || isAdvanced) {
                    milestones.push("Complete Advanced Deep Learning course", "Build advanced project", "Master Transfer Learning");
                } else {
                    milestones.push("Complete Deep Learning course", "Build first project", "Master ML fundamentals");
                }
                milestones.push("Complete 3 Kaggle competitions", "Build GitHub portfolio", "Earn certification");
                // Only add "Job ready" milestone for students
                if (roleIsStudent) {
                    milestones.push("Job ready");
                }
                return milestones;
            })(),
            careerPaths: (() => {
                const paths = [];
                if (mentionsAgentic) {
                    paths.push({ 
                        title: "Agentic AI Engineer", 
                        description: "Develop advanced AI Agent systems for production", 
                        skills: ["Python", "LangChain", "Multi-Agent Systems", "Tool Use"], 
                        steps: ["Learn LangChain", "Build Agents", "Learn Multi-Agent Systems", "Production projects"] 
                    });
                }
                if (mentionsNLP) {
                    paths.push({ 
                        title: "NLP Engineer", 
                        description: "Develop Natural Language Processing applications", 
                        skills: ["Transformers", "LLMs", "Fine-tuning", "RAG"], 
                        steps: ["Learn Transformers", "Fine-tune models", "Build RAG applications"] 
                    });
                }
                if (mentionsCV) {
                    paths.push({ 
                        title: "Computer Vision Engineer", 
                        description: "Develop Computer Vision applications", 
                        skills: ["CNNs", "Object Detection", "Vision Transformers"], 
                        steps: ["Learn CNNs", "Build Detection projects", "Learn Vision Transformers"] 
                    });
                }
                if (isProfessional || isAdvanced) {
                    paths.push({ 
                        title: "Advanced ML Engineer", 
                        description: "Develop advanced ML models for production", 
                        skills: ["Advanced ML", "MLOps", "Production Systems"], 
                        steps: ["Learn advanced ML", "Build projects", "Learn MLOps"] 
                    });
                }
                if (paths.length === 0) {
                    paths.push(
                        { title: "ML Engineer", description: "Develop ML models for production", skills: ["Python", "ML", "MLOps"], steps: ["Learn ML", "Build projects", "Learn MLOps"] },
                        { title: "AI Researcher", description: "Research and development in AI", skills: ["Math", "Research", "Papers"], steps: ["Advanced learning", "Read papers", "Research"] }
                    );
                }
                return paths;
            })()
        };
    }
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

// Email Configuration
let transporter;

// Initialize transporter only if credentials are provided
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    // Check if custom SMTP settings are provided
    if (process.env.SMTP_HOST && process.env.SMTP_PORT) {
        // Use custom SMTP server
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false // Allow self-signed certificates
            }
        });
        console.log(`Using custom SMTP server: ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`);
    } else {
        // Try Gmail service (for @gmail.com addresses)
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS // Use App Password for Gmail
            }
        });
        console.log('Using Gmail service');
    }
    
    // Verify transporter configuration (non-blocking)
    transporter.verify(function (error, success) {
        if (error) {
            console.error('Email transporter verification failed:', error.message);
            console.error('Please check your email credentials and SMTP settings in .env file');
        } else {
            console.log('✓ Email transporter is ready to send messages');
        }
    });
} else {
    console.warn('EMAIL_USER and EMAIL_PASS not set in .env file. Email functionality will be disabled.');
}

// Email sending endpoint
app.post('/api/send-results-email', async (req, res) => {
    try {
        // Check if email transporter is configured
        if (!transporter) {
            return res.status(500).json({ 
                error: 'Email service not configured', 
                details: 'EMAIL_USER and EMAIL_PASS must be set in .env file' 
            });
        }
        
        const { email, toolName, results, language = 'en' } = req.body;
        
        if (!email || !toolName || !results) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email address format' });
        }
        
        // Format email content based on tool
        let emailSubject, emailContent;
        
        if (language === 'ar') {
            emailSubject = `نتائج ${toolName} - جمعية الذكاء الاصطناعي | ICAN 2026`;
            emailContent = formatEmailContentArabic(toolName, results);
        } else {
            emailSubject = `Results of ${toolName} - AI Association | ICAN 2026`;
            emailContent = formatEmailContentEnglish(toolName, results);
        }
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: emailSubject,
            html: emailContent
        };
        
        await transporter.sendMail(mailOptions);
        
        console.log(`Email sent successfully to ${email}`);
        res.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        
        // Provide more specific error messages
        let errorMessage = 'Failed to send email';
        let userFriendlyMessage = 'فشل إرسال البريد الإلكتروني. يرجى المحاولة مرة أخرى.';
        
        if (error.code === 'EDNS' || error.code === 'ENOTFOUND') {
            errorMessage = 'SMTP server not found. Please check your SMTP_HOST setting in .env file.';
            userFriendlyMessage = 'خادم البريد الإلكتروني غير موجود. يرجى التحقق من إعدادات SMTP_HOST في ملف .env';
        } else if (error.code === 'EAUTH' || error.responseCode === 535) {
            if (process.env.EMAIL_USER && process.env.EMAIL_USER.includes('@') && !process.env.EMAIL_USER.includes('@gmail.com')) {
                errorMessage = 'Email authentication failed. For custom domain emails, you need to configure SMTP settings. Add SMTP_HOST, SMTP_PORT, and SMTP_SECURE to your .env file. Contact your email provider for SMTP settings.';
                userFriendlyMessage = 'فشل التحقق من البريد الإلكتروني. يرجى التحقق من إعدادات SMTP في ملف .env';
            } else {
                errorMessage = 'Email authentication failed. For Gmail, use an App Password (not your regular password). For custom domains, configure SMTP settings in .env file.';
                userFriendlyMessage = 'فشل التحقق من البريد الإلكتروني. يرجى التحقق من كلمة المرور وإعدادات SMTP';
            }
        } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
            errorMessage = 'Could not connect to email server. Please check your SMTP_HOST and SMTP_PORT settings, and your internet connection.';
            userFriendlyMessage = 'تعذر الاتصال بخادم البريد الإلكتروني. يرجى التحقق من إعدادات SMTP_HOST و SMTP_PORT';
        }
        
        res.status(500).json({ 
            error: errorMessage, 
            details: error.message,
            userMessage: userFriendlyMessage
        });
    }
});

function formatEmailContentEnglish(toolName, results) {
    let resultsSection = '';
    
    if (toolName === 'AI Skills Gap Analyzer') {
        resultsSection = `
            <h3>Your Assessment Results</h3>
            <p><strong>Readiness Score:</strong> ${results.readinessScore}/100</p>
            <h4>Priority Gaps:</h4>
            <ul>${results.priorityGaps.map(gap => `<li>${gap}</li>`).join('')}</ul>
            <h4>Action Roadmap:</h4>
            <ul>${results.roadmap.map(step => `<li>${step}</li>`).join('')}</ul>
            <h4>Industry Benchmark:</h4>
            <p>Your Score: ${results.readinessScore}/100 | Industry Avg: ${results.benchmark?.industryAvg || 'N/A'}/100 | Top Performers: ${results.benchmark?.topPerformers || 'N/A'}/100</p>
            ${results.benchmark?.message ? `<p>${results.benchmark.message}</p>` : ''}
            ${results.insights ? `<h4>Strategic Insights:</h4><p>${results.insights}</p>` : ''}
        `;
    } else if (toolName === 'Learning Path Generator') {
        resultsSection = `
            <h3>Your Personalized Learning Path</h3>
            <h4>Curriculum:</h4>
            ${results.curriculum ? results.curriculum.map(item => `
                <div style="margin-bottom: 15px;">
                    <strong>${item.topic}</strong><br>
                    <em>${item.focus}</em><br>
                    Resources: ${item.resources}
                </div>
            `).join('') : ''}
            <h4>Timeline:</h4>
            ${results.timeline ? results.timeline.map(item => {
                const topics = Array.isArray(item.topics) ? item.topics.join(', ') : (item.topic || '');
                const projects = item.projects ? ` | Projects: ${item.projects}` : '';
                const hours = item.hours ? ` | ${item.hours} hours/week` : '';
                return `<p><strong>Week ${item.week}:</strong> ${topics} - ${item.description || ''}${projects}${hours}</p>`;
            }).join('') : ''}
            <h4>Milestones:</h4>
            <ul>${results.milestones ? results.milestones.map(m => `<li>${m}</li>`).join('') : ''}</ul>
        `;
    } else if (toolName === 'Job Skills Translator') {
        resultsSection = `
            <h3>Your Career Transformation Analysis</h3>
            <h4>How AI Will Transform Your Role:</h4>
            <ul>${results.transformations ? results.transformations.map(t => `<li>${t}</li>`).join('') : ''}</ul>
            <h4>Transferable Skills:</h4>
            <ul>${results.transferableSkills ? results.transferableSkills.map(s => `<li>${s}</li>`).join('') : ''}</ul>
            <h4>New Skills Needed:</h4>
            <p><strong>Technical:</strong> ${results.newSkills?.technical ? results.newSkills.technical.join(', ') : ''}</p>
            <p><strong>Soft Skills:</strong> ${results.newSkills?.soft ? results.newSkills.soft.join(', ') : ''}</p>
            <h4>Career Transition Options:</h4>
            ${results.careerOptions ? results.careerOptions.map(opt => `
                <div style="margin-bottom: 15px;">
                    <strong>${opt.title}</strong><br>
                    ${opt.description}<br>
                    <em>Path: ${opt.path}</em>
                </div>
            `).join('') : ''}
            <h4>Immediate Upskilling Plan:</h4>
            <ul>${results.upskillingPlan ? results.upskillingPlan.map(step => `<li>${step}</li>`).join('') : ''}</ul>
        `;
    }
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #00A8DF 0%, #22A599 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .cta { background: #00A8DF; color: white; padding: 15px; text-align: center; border-radius: 10px; margin: 20px 0; }
                .cta a { color: white; text-decoration: none; font-weight: bold; }
                .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>AI Association | ICAN 2026</h1>
                </div>
                <div class="content">
                    <p>Dear User,</p>
                    <p>Thank you for using our <strong>${toolName}</strong> tool. Below are your personalized results:</p>
                    ${resultsSection}
                    <div class="cta">
                        <h3>Join AI Association Today!</h3>
                        <p>Become a member and access exclusive resources, networking opportunities, and stay updated with the latest in AI.</p>
                        <p><a href="https://aia.org.sa">Visit our website: https://aia.org.sa</a></p>
                    </div>
                    <p>Best regards,<br>AI Association Team</p>
                </div>
                <div class="footer">
                    <p>AI Association | ICAN 2026 Conference | Interactive AI Tools Platform</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

function formatEmailContentArabic(toolName, results) {
    let resultsSection = '';
    
    if (toolName === 'محلل فجوات المهارات' || toolName === 'AI Skills Gap Analyzer') {
        resultsSection = `
            <h3>نتائج تقييمك</h3>
            <p><strong>نقاط الجاهزية:</strong> ${results.readinessScore}/100</p>
            <h4>الفجوات ذات الأولوية:</h4>
            <ul>${results.priorityGaps.map(gap => `<li>${gap}</li>`).join('')}</ul>
            <h4>خارطة طريق العمل:</h4>
            <ul>${results.roadmap.map(step => `<li>${step}</li>`).join('')}</ul>
            <h4>معيار الصناعة:</h4>
            <p>نقاطك: ${results.readinessScore}/100 | متوسط الصناعة: ${results.benchmark?.industryAvg || 'غير متاح'}/100 | أفضل الأداء: ${results.benchmark?.topPerformers || 'غير متاح'}/100</p>
            ${results.benchmark?.message ? `<p>${results.benchmark.message}</p>` : ''}
            ${results.insights ? `<h4>الرؤى الاستراتيجية:</h4><p>${results.insights}</p>` : ''}
        `;
    } else if (toolName === 'مولد مسار التعلم' || toolName === 'Learning Path Generator') {
        resultsSection = `
            <h3>مسار التعلم المخصص الخاص بك</h3>
            <h4>المنهج:</h4>
            ${results.curriculum ? results.curriculum.map(item => `
                <div style="margin-bottom: 15px;">
                    <strong>${item.topic}</strong><br>
                    <em>${item.focus}</em><br>
                    الموارد: ${item.resources}
                </div>
            `).join('') : ''}
            <h4>الجدول الزمني:</h4>
            ${results.timeline ? results.timeline.map(item => {
                const topics = Array.isArray(item.topics) ? item.topics.join(', ') : (item.topic || '');
                const projects = item.projects ? ` | المشاريع: ${item.projects}` : '';
                const hours = item.hours ? ` | ${item.hours} ساعة/أسبوع` : '';
                return `<p><strong>الأسبوع ${item.week}:</strong> ${topics} - ${item.description || ''}${projects}${hours}</p>`;
            }).join('') : ''}
            <h4>المعالم:</h4>
            <ul>${results.milestones ? results.milestones.map(m => `<li>${m}</li>`).join('') : ''}</ul>
        `;
    } else if (toolName === 'مترجم مهارات الوظائف' || toolName === 'Job Skills Translator') {
        resultsSection = `
            <h3>تحليل تحول مسيرتك المهنية</h3>
            <h4>كيف سيحول الذكاء الاصطناعي دورك:</h4>
            <ul>${results.transformations ? results.transformations.map(t => `<li>${t}</li>`).join('') : ''}</ul>
            <h4>المهارات القابلة للنقل:</h4>
            <ul>${results.transferableSkills ? results.transferableSkills.map(s => `<li>${s}</li>`).join('') : ''}</ul>
            <h4>المهارات الجديدة المطلوبة:</h4>
            <p><strong>تقنية:</strong> ${results.newSkills?.technical ? results.newSkills.technical.join(', ') : ''}</p>
            <p><strong>المهارات الشخصية:</strong> ${results.newSkills?.soft ? results.newSkills.soft.join(', ') : ''}</p>
            <h4>خيارات الانتقال المهني:</h4>
            ${results.careerOptions ? results.careerOptions.map(opt => `
                <div style="margin-bottom: 15px;">
                    <strong>${opt.title}</strong><br>
                    ${opt.description}<br>
                    <em>المسار: ${opt.path}</em>
                </div>
            `).join('') : ''}
            <h4>خطة التطوير الفورية:</h4>
            <ul>${results.upskillingPlan ? results.upskillingPlan.map(step => `<li>${step}</li>`).join('') : ''}</ul>
        `;
    }
    
    return `
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; direction: rtl; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #00A8DF 0%, #22A599 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .cta { background: #00A8DF; color: white; padding: 15px; text-align: center; border-radius: 10px; margin: 20px 0; }
                .cta a { color: white; text-decoration: none; font-weight: bold; }
                .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>جمعية الذكاء الاصطناعي | ICAN 2026</h1>
                </div>
                <div class="content">
                    <p>عزيزي المستخدم،</p>
                    <p>شكراً لاستخدامك أداة <strong>${toolName}</strong>. فيما يلي نتائجك المخصصة:</p>
                    ${resultsSection}
                    <div class="cta">
                        <h3>انضم إلى جمعية الذكاء الاصطناعي اليوم!</h3>
                        <p>كن عضواً واحصل على موارد حصرية وفرص التواصل وابق على اطلاع بآخر أخبار الذكاء الاصطناعي.</p>
                        <p><a href="https://aia.org.sa">زر موقعنا: https://aia.org.sa</a></p>
                    </div>
                    <p>مع أطيب التحيات،<br>فريق جمعية الذكاء الاصطناعي</p>
                </div>
                <div class="footer">
                    <p>جمعية الذكاء الاصطناعي | مؤتمر ICAN 2026 | منصة أدوات الذكاء الاصطناعي التفاعلية</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

app.listen(PORT, () => {
    console.log(`AI Association Platform API server running on port ${PORT}`);
    console.log(`Using Google Gemini AI`);
    console.log(`Make sure to set GEMINI_API_KEY in your .env file`);
    console.log(`For email functionality, set EMAIL_USER and EMAIL_PASS in your .env file`);
});

