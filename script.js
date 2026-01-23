// API Base URL - automatically detects the current origin
const API_BASE_URL = window.location.origin;

// Translation System
const translations = {
    en: {
        'logo': 'AI ASSOCIATION',
        'subtitle': 'Interactive AI Tools Platform',
        'conference-info': '',
        'tab-skills-gap': 'National AI Index Readiness Assessment',
        'tab-learning-path': 'Learning Path Generator',
        'tab-job-translator': 'Job Skills Translator',
        'skills-gap-title': 'National AI Index Readiness Assessment',
        'skills-gap-description': 'Assess your organization\'s AI readiness based on SDAIA National AI Index methodology and identify critical skill gaps',
        'skills-gap-track': 'Track: Building National Capacities',
        'what-youll-get': 'What You\'ll Get',
        'benefit-1': 'National AI Index Readiness Score (0-100)',
        'benefit-2': 'Maturity Level Assessment (6 Levels)',
        'benefit-3': 'Priority Gaps & Action Roadmap',
        'benefit-4': 'Vision 2030 Alignment Insights',
        'start-assessment': 'Start Assessment',
        'assessment-results': 'Your Assessment Results',
        'readiness-score': 'Readiness Score',
        'take-again': 'Take Assessment Again',
        'learning-path-title': 'Learning Path Generator',
        'learning-path-description': 'Get a personalized AI learning plan tailored to your goals',
        'learning-path-track': 'Track: AI in Education',
        'current-role': 'Current Role',
        'select-role': 'Select your role',
        'role-student': 'Student',
        'role-professional': 'Professional',
        'role-executive': 'Executive/Manager',
        'role-educator': 'Academic',
        'role-researcher': 'Researcher',
        'experience-level': 'Experience Level',
        'select-experience': 'Select experience level',
        'exp-beginner': 'Beginner',
        'exp-intermediate': 'Intermediate',
        'exp-advanced': 'Advanced',
        'learning-goals': 'Learning Goals',
        'learning-goals-placeholder': 'Describe what you want to achieve with AI (e.g., build AI applications, understand ML fundamentals, apply AI in my field)',
        'time-available': 'Time Available per Week',
        'select-time': 'Select time commitment',
        'time-5': '5 hours',
        'time-10': '10 hours',
        'time-15': '15 hours',
        'time-20': '20+ hours',
        'generate-path': 'Generate Learning Path',
        'personalized-path': 'Your Personalized Learning Path',
        'generate-new': 'Generate New Path',
        'job-translator-title': 'Job Skills Translator',
        'job-translator-description': 'Discover how AI will transform your career and what skills you need',
        'job-translator-track': 'Track: AI-Powered Workforce',
        'job-title': 'Current Job Title',
        'job-title-placeholder': 'e.g., Marketing Manager, Software Developer, Data Analyst',
        'job-responsibilities': 'Key Responsibilities',
        'job-responsibilities-placeholder': 'Describe your main responsibilities and daily tasks',
        'industry': 'Industry',
        'select-industry': 'Select your industry',
        'ind-technology': 'Technology',
        'ind-healthcare': 'Healthcare',
        'ind-finance': 'Finance',
        'ind-education': 'Education',
        'ind-retail': 'Retail',
        'ind-manufacturing': 'Manufacturing',
        'ind-consulting': 'Consulting',
        'ind-other': 'Other',
        'analyze-career': 'Analyze My Career',
        'career-analysis': 'Your Career Transformation Analysis',
        'analyze-another': 'Analyze Another Role',
        'footer': 'AI Association | Interactive AI Tools Platform',
        'home-title': 'Empowering AI Excellence',
        'home-description': 'AI Association presents intelligent tools to bridge the gap between current capabilities and future AI readiness.',
        'tool-card-1-title': 'National AI Index Readiness Assessment',
        'tool-card-1-description': 'Assess your organization\'s AI readiness based on SDAIA National AI Index methodology. Get your maturity level, identify gaps, and receive a roadmap aligned with Vision 2030.',
        'tool-card-2-title': 'Learning Path Generator',
        'tool-card-2-description': 'Get a personalized AI learning plan tailored to your goals, experience level, and available time. Receive a structured curriculum with milestones and career pathways.',
        'tool-card-3-title': 'Job Skills Translator',
        'tool-card-3-description': 'Discover how AI will transform your career and what skills you need. Get personalized career transition options and an immediate upskilling plan.',
        'track-capacities': 'Building National Capacities',
        'track-education': 'AI in Education',
        'track-workforce': 'AI-Powered Workforce',
        'back-to-home': '← Back to Home',
        'question-of': 'Question',
        'of': 'of',
        'previous': 'Previous',
        'analyzing': 'Analyzing your organization\'s AI readiness with AI-powered insights...',
        'priority-gaps': 'Priority Gaps',
        'action-roadmap': 'Action Roadmap',
        'roadmap-intro': 'Based on your assessment, here\'s where to start:',
        'industry-benchmark': 'Industry Benchmark',
        'your-score': 'Your Score',
        'industry-avg': 'Industry Avg',
        'top-performers': 'Top Performers',
        'strategic-insights': 'Strategic Insights',
        'send-results-email': 'Send Results to Email',
        'email-placeholder': 'Enter your email address',
        'send-email': 'Send',
        'email-sending': 'Sending...',
        'email-success': 'Results sent successfully! Check your email.',
        'email-error': 'Failed to send email. Please try again.',
        'maturity-level': 'Maturity Level',
        'naii-based': 'This assessment is based on the SDAIA National AI Index methodology.'
    },
    ar: {
        'logo': 'جمعية الذكاء الاصطناعي',
        'subtitle': 'منصة أدوات الذكاء الاصطناعي التفاعلية',
        'conference-info': '',
        'tab-skills-gap': 'تقييم الجاهزية للمؤشر الوطني للذكاء الاصطناعي',
        'tab-learning-path': 'مولد مسار التعلم',
        'tab-job-translator': 'مترجم مهارات الوظائف',
        'skills-gap-title': 'تقييم الجاهزية للمؤشر الوطني للذكاء الاصطناعي',
        'skills-gap-description': 'قيم جاهزية منظمتك للذكاء الاصطناعي بناءً على منهجية المؤشر الوطني للذكاء الاصطناعي الصادرة عن سدايا وحدد فجوات المهارات الحرجة',
        'skills-gap-track': 'المسار: بناء القدرات الوطنية',
        'what-youll-get': 'ما ستحصل عليه',
        'benefit-1': 'نقاط الجاهزية للمؤشر الوطني للذكاء الاصطناعي (0-100)',
        'benefit-2': 'تقييم مستوى النضج (6 مستويات)',
        'benefit-3': 'الفجوات ذات الأولوية وخارطة طريق العمل',
        'benefit-4': 'رؤى تتماشى مع رؤية 2030',
        'start-assessment': 'بدء التقييم',
        'assessment-results': 'نتائج تقييمك',
        'readiness-score': 'نقاط الجاهزية',
        'take-again': 'إعادة التقييم',
        'learning-path-title': 'مولد مسار التعلم',
        'learning-path-description': 'احصل على خطة تعلم مخصصة للذكاء الاصطناعي مصممة حسب أهدافك',
        'learning-path-track': 'المسار: الذكاء الاصطناعي في التعليم',
        'current-role': 'الدور الحالي',
        'select-role': 'اختر دورك',
        'role-student': 'طالب',
        'role-professional': 'محترف',
        'role-executive': 'تنفيذي/مدير',
        'role-educator': 'أكاديمي',
        'role-researcher': 'باحث',
        'experience-level': 'مستوى الخبرة',
        'select-experience': 'اختر مستوى الخبرة',
        'exp-beginner': 'مبتدئ',
        'exp-intermediate': 'متوسط',
        'exp-advanced': 'متقدم',
        'learning-goals': 'أهداف التعلم',
        'learning-goals-placeholder': 'اوصف ما تريد تحقيقه مع الذكاء الاصطناعي (مثل: بناء تطبيقات الذكاء الاصطناعي، فهم أساسيات التعلم الآلي، تطبيق الذكاء الاصطناعي في مجالك)',
        'time-available': 'الوقت المتاح أسبوعياً',
        'select-time': 'اختر الالتزام الزمني',
        'time-5': '5 ساعات',
        'time-10': '10 ساعات',
        'time-15': '15 ساعة',
        'time-20': '20+ ساعة',
        'generate-path': 'إنشاء مسار التعلم',
        'personalized-path': 'مسار التعلم المخصص الخاص بك',
        'generate-new': 'إنشاء مسار جديد',
        'job-translator-title': 'مترجم مهارات الوظائف',
        'job-translator-description': 'اكتشف كيف سيحول الذكاء الاصطناعي مسيرتك المهنية وما هي المهارات التي تحتاجها',
        'job-translator-track': 'المسار: القوى العاملة المدعومة بالذكاء الاصطناعي',
        'job-title': 'المسمى الوظيفي الحالي',
        'job-title-placeholder': 'مثل: مدير التسويق، مطور برمجيات، محلل بيانات',
        'job-responsibilities': 'المسؤوليات الرئيسية',
        'job-responsibilities-placeholder': 'اوصف مسؤولياتك الرئيسية والمهام اليومية',
        'industry': 'القطاع',
        'select-industry': 'اختر قطاعك',
        'ind-technology': 'التكنولوجيا',
        'ind-healthcare': 'الرعاية الصحية',
        'ind-finance': 'المالية',
        'ind-education': 'التعليم',
        'ind-retail': 'التجزئة',
        'ind-manufacturing': 'التصنيع',
        'ind-consulting': 'الاستشارات',
        'ind-other': 'أخرى',
        'analyze-career': 'تحليل مسيرتي المهنية',
        'career-analysis': 'تحليل تحول مسيرتك المهنية',
        'analyze-another': 'تحليل دور آخر',
        'footer': 'جمعية الذكاء الاصطناعي | منصة أدوات الذكاء الاصطناعي التفاعلية',
        'home-title': 'تمكين التميز في الذكاء الاصطناعي',
        'home-description': 'تقدم جمعية الذكاء الاصطناعي أدوات ذكية لسد الفجوة بين القدرات الحالية والجاهزية المستقبلية للذكاء الاصطناعي.',
        'tool-card-1-title': 'تقييم الجاهزية للمؤشر الوطني للذكاء الاصطناعي',
        'tool-card-1-description': 'قيم جاهزية منظمتك للذكاء الاصطناعي بناءً على منهجية المؤشر الوطني للذكاء الاصطناعي الصادرة عن سدايا. احصل على مستوى النضج، وحدد الفجوات، وتلق خارطة طريق تتماشى مع رؤية 2030.',
        'tool-card-2-title': 'مولد مسار التعلم',
        'tool-card-2-description': 'احصل على خطة تعلم مخصصة للذكاء الاصطناعي مصممة حسب أهدافك ومستوى خبرتك والوقت المتاح. تلقى منهجًا منظمًا مع معالم ومسارات مهنية.',
        'tool-card-3-title': 'مترجم مهارات الوظائف',
        'tool-card-3-description': 'اكتشف كيف سيحول الذكاء الاصطناعي مسيرتك المهنية وما هي المهارات التي تحتاجها. احصل على خيارات انتقال مهني مخصصة وخطة تطوير فورية.',
        'track-capacities': 'بناء القدرات الوطنية',
        'track-education': 'الذكاء الاصطناعي في التعليم',
        'track-workforce': 'القوى العاملة المدعومة بالذكاء الاصطناعي',
        'back-to-home': '← العودة للصفحة الرئيسية',
        'question-of': 'السؤال',
        'of': 'من',
        'previous': 'السابق',
        'analyzing': 'جارٍ تحليل جاهزية منظمتك للذكاء الاصطناعي باستخدام رؤى مدعومة بالذكاء الاصطناعي...',
        'priority-gaps': 'الفجوات ذات الأولوية',
        'action-roadmap': 'خارطة طريق العمل',
        'roadmap-intro': 'بناءً على تقييمك، إليك من أين تبدأ:',
        'industry-benchmark': 'معيار الصناعة',
        'your-score': 'نقاطك',
        'industry-avg': 'متوسط الصناعة',
        'top-performers': 'أفضل الأداء',
        'strategic-insights': 'الرؤى الاستراتيجية',
        'send-results-email': 'إرسال النتائج إلى البريد الإلكتروني',
        'email-placeholder': 'أدخل عنوان بريدك الإلكتروني',
        'send-email': 'إرسال',
        'email-sending': 'جارٍ الإرسال...',
        'email-success': 'تم إرسال النتائج بنجاح! تحقق من بريدك الإلكتروني.',
        'email-error': 'فشل إرسال البريد الإلكتروني. يرجى المحاولة مرة أخرى.',
        'maturity-level': 'مستوى النضج',
        'naii-based': 'هذا التقييم مبني على منهجية المؤشر الوطني للذكاء الاصطناعي الصادرة عن سدايا.'
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    localStorage.setItem('language', currentLanguage);
    applyLanguage();
}

function applyLanguage() {
    const html = document.documentElement;
    const body = document.body;
    
    if (currentLanguage === 'ar') {
        html.lang = 'ar';
        html.dir = 'rtl';
        body.dir = 'rtl';
        document.getElementById('lang-text').textContent = 'English';
    } else {
        html.lang = 'en';
        html.dir = 'ltr';
        body.dir = 'ltr';
        document.getElementById('lang-text').textContent = 'العربية';
    }
    
    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Translate placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
    
    // Refresh current question if assessment is in progress
    if (document.getElementById('skills-gap-questions') && 
        document.getElementById('skills-gap-questions').style.display !== 'none') {
        showQuestion();
    }
    
    // Translate option elements
    document.querySelectorAll('option[data-i18n]').forEach(option => {
        const key = option.getAttribute('data-i18n');
        if (translations[currentLanguage][key]) {
            option.textContent = translations[currentLanguage][key];
        }
    });
}

// Navigation Functions
function navigateToTool(toolId) {
    // Hide home page
    document.getElementById('home-page').classList.remove('active');
    
    // Show tool pages
    document.getElementById('tool-pages').style.display = 'block';
    
    // Hide all tool sections
    document.querySelectorAll('.tool-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected tool section
    document.getElementById(toolId).style.display = 'block';
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToHome() {
    // Hide tool pages
    document.getElementById('tool-pages').style.display = 'none';
    
    // Show home page
    document.getElementById('home-page').classList.add('active');
    
    // Reset any tool states
    resetSkillsGap();
    resetLearningPath();
    resetJobTranslator();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Professional Animated Background Canvas
function initAnimatedBackground() {
    const canvas = document.getElementById('background-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create nodes for network visualization
    const nodes = [];
    const nodeCount = 15;
    
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 3 + 2
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update node positions
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
            
            // Keep within bounds
            node.x = Math.max(0, Math.min(canvas.width, node.x));
            node.y = Math.max(0, Math.min(canvas.height, node.y));
        });
        
        // Draw connections
        ctx.strokeStyle = 'rgba(0, 168, 223, 0.2)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.globalAlpha = 1 - distance / 150;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Draw nodes
        ctx.globalAlpha = 0.6;
        nodes.forEach(node => {
            const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius);
            gradient.addColorStop(0, 'rgba(0, 168, 223, 0.8)');
            gradient.addColorStop(1, 'rgba(34, 165, 153, 0.4)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(0, 168, 223, 0.5)';
            ctx.fill();
            ctx.shadowBlur = 0;
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Apply language on load
    applyLanguage();
    
    // Initialize animated background
    initAnimatedBackground();
    
    // Ensure home page is shown initially
    navigateToHome();
});

// ============================================
// TOOL 1: AI Skills Gap Analyzer
// ============================================

// National AI Index-based Questions aligned with SDAIA National AI Index methodology
// Three Pillars: Directions (التوجهات), Enablers (الممكنات), Outputs (المخرجات)
const skillsGapQuestions = [
    // Pillar 1: Directions - Strategy (الاستراتيجية)
    {
        pillar: { en: "Directions", ar: "التوجهات" },
        domain: { en: "Strategic Planning & Performance", ar: "التخطيط والأداء الاستراتيجي" },
        question: {
            en: "Does your organization have a clear AI strategy and vision aligned with national priorities?",
            ar: "هل تمتلك منظمتك استراتيجية ورؤية واضحة للذكاء الاصطناعي تتماشى مع الأولويات الوطنية؟"
        },
        options: [
            { text: { en: "No AI strategy exists", ar: "لا توجد استراتيجية للذكاء الاصطناعي" }, value: 0 },
            { text: { en: "Informal discussions about AI", ar: "مناقشات غير رسمية حول الذكاء الاصطناعي" }, value: 12 },
            { text: { en: "Draft strategy under development", ar: "استراتيجية مسودة قيد التطوير" }, value: 37 },
            { text: { en: "Formal strategy aligned with Vision 2030", ar: "استراتيجية رسمية تتماشى مع رؤية 2030" }, value: 65 },
            { text: { en: "Comprehensive strategy with clear KPIs and roadmap", ar: "استراتيجية شاملة مع مؤشرات أداء واضحة وخارطة طريق" }, value: 90 }
        ]
    },
    {
        pillar: { en: "Directions", ar: "التوجهات" },
        domain: { en: "AI Initiatives", ar: "المبادرات" },
        question: {
            en: "How many active AI initiatives or projects does your organization have?",
            ar: "كم عدد مبادرات أو مشاريع الذكاء الاصطناعي النشطة في منظمتك؟"
        },
        options: [
            { text: { en: "No AI initiatives", ar: "لا توجد مبادرات للذكاء الاصطناعي" }, value: 0 },
            { text: { en: "1-2 pilot projects", ar: "1-2 مشروع تجريبي" }, value: 15 },
            { text: { en: "3-5 operational initiatives", ar: "3-5 مبادرة تشغيلية" }, value: 40 },
            { text: { en: "6-10 integrated initiatives", ar: "6-10 مبادرة مدمجة" }, value: 70 },
            { text: { en: "More than 10 mature AI initiatives", ar: "أكثر من 10 مبادرات ذكاء اصطناعي ناضجة" }, value: 95 }
        ]
    },
    {
        pillar: { en: "Directions", ar: "التوجهات" },
        domain: { en: "Budget Allocation", ar: "الميزانية" },
        question: {
            en: "What percentage of your IT budget is allocated to AI initiatives?",
            ar: "ما هي نسبة ميزانية تكنولوجيا المعلومات المخصصة لمبادرات الذكاء الاصطناعي؟"
        },
        options: [
            { text: { en: "No dedicated budget", ar: "لا توجد ميزانية مخصصة" }, value: 0 },
            { text: { en: "Less than 5%", ar: "أقل من 5%" }, value: 20 },
            { text: { en: "5-10%", ar: "5-10%" }, value: 45 },
            { text: { en: "10-15%", ar: "10-15%" }, value: 75 },
            { text: { en: "More than 15%", ar: "أكثر من 15%" }, value: 100 }
        ]
    },
    // Pillar 1: Directions - Governance (الحوكمة)
    {
        pillar: { en: "Directions", ar: "التوجهات" },
        domain: { en: "Frameworks & Policies", ar: "الأطر والسياسات" },
        question: {
            en: "How comprehensive are your AI governance frameworks and policies?",
            ar: "ما مدى شمولية أطر وسياسات حوكمة الذكاء الاصطناعي لديك؟"
        },
        options: [
            { text: { en: "No governance framework", ar: "لا يوجد إطار حوكمة" }, value: 0 },
            { text: { en: "Basic policies under development", ar: "سياسات أساسية قيد التطوير" }, value: 25 },
            { text: { en: "Formal governance framework in place", ar: "إطار حوكمة رسمي قائم" }, value: 50 },
            { text: { en: "Comprehensive framework aligned with SDAIA standards", ar: "إطار شامل يتماشى مع معايير سدايا" }, value: 85 },
            { text: { en: "Advanced governance with continuous improvement", ar: "حوكمة متقدمة مع تحسين مستمر" }, value: 100 }
        ]
    },
    {
        pillar: { en: "Directions", ar: "التوجهات" },
        domain: { en: "Regulatory Compliance", ar: "الامتثال التنظيمي" },
        question: {
            en: "How well does your organization comply with SDAIA regulations and national AI standards?",
            ar: "ما مدى امتثال منظمتك للوائح سدايا والمعايير الوطنية للذكاء الاصطناعي؟"
        },
        options: [
            { text: { en: "Not aware of regulations", ar: "غير مدرك للوائح" }, value: 0 },
            { text: { en: "Aware but not compliant", ar: "مدرك لكن غير متوافق" }, value: 20 },
            { text: { en: "Partially compliant", ar: "متوافق جزئياً" }, value: 50 },
            { text: { en: "Fully compliant with periodic reviews", ar: "متوافق بالكامل مع مراجعات دورية" }, value: 85 },
            { text: { en: "Exceeds compliance requirements", ar: "يتجاوز متطلبات الامتثال" }, value: 100 }
        ]
    },
    // Pillar 2: Enablers - Data (البيانات)
    {
        pillar: { en: "Enablers", ar: "الممكنات" },
        domain: { en: "Data Availability & Access", ar: "التوافر والوصول" },
        question: {
            en: "How accessible and available is your organization's data for AI applications?",
            ar: "ما مدى إتاحة وتوفر بيانات منظمتك لتطبيقات الذكاء الاصطناعي؟"
        },
        options: [
            { text: { en: "Data is scattered and inaccessible", ar: "البيانات مبعثرة وغير قابلة للوصول" }, value: 0 },
            { text: { en: "Some data available but difficult to access", ar: "بعض البيانات متاحة لكن يصعب الوصول إليها" }, value: 25 },
            { text: { en: "Data catalog exists with moderate access", ar: "يوجد كتالوج بيانات مع وصول معتدل" }, value: 50 },
            { text: { en: "Comprehensive data catalog with easy access", ar: "كتالوج بيانات شامل مع وصول سهل" }, value: 80 },
            { text: { en: "Automated data discovery and real-time access", ar: "اكتشاف بيانات آلي ووصول في الوقت الفعلي" }, value: 100 }
        ]
    },
    {
        pillar: { en: "Enablers", ar: "الممكنات" },
        domain: { en: "Data Quality & Integration", ar: "الجودة والتكامل" },
        question: {
            en: "How would you rate the quality and integration of your organization's data?",
            ar: "كيف تقيم جودة وتكامل بيانات منظمتك؟"
        },
        options: [
            { text: { en: "Poor quality, no integration", ar: "جودة ضعيفة، لا يوجد تكامل" }, value: 0 },
            { text: { en: "Fair quality, limited integration", ar: "جودة متوسطة، تكامل محدود" }, value: 30 },
            { text: { en: "Good quality with documented sources", ar: "جودة جيدة مع مصادر موثقة" }, value: 60 },
            { text: { en: "High quality with integrated systems", ar: "جودة عالية مع أنظمة متكاملة" }, value: 85 },
            { text: { en: "Excellent quality with automated integration", ar: "جودة ممتازة مع تكامل آلي" }, value: 100 }
        ]
    },
    // Pillar 2: Enablers - Infrastructure (البنية التحتية)
    {
        pillar: { en: "Enablers", ar: "الممكنات" },
        domain: { en: "Technical Infrastructure", ar: "البنية التحتية التقنية" },
        question: {
            en: "How mature is your organization's technical infrastructure for AI?",
            ar: "ما مدى نضج البنية التحتية التقنية لمنظمتك للذكاء الاصطناعي؟"
        },
        options: [
            { text: { en: "Basic infrastructure, not AI-ready", ar: "بنية أساسية، غير جاهزة للذكاء الاصطناعي" }, value: 0 },
            { text: { en: "Some cloud services, limited AI support", ar: "بعض الخدمات السحابية، دعم محدود للذكاء الاصطناعي" }, value: 30 },
            { text: { en: "Cloud infrastructure with AI capabilities", ar: "بنية سحابية مع قدرات ذكاء اصطناعي" }, value: 60 },
            { text: { en: "Scalable infrastructure integrated with national platforms", ar: "بنية قابلة للتوسع متكاملة مع المنصات الوطنية" }, value: 85 },
            { text: { en: "Enterprise-grade infrastructure with high availability", ar: "بنية على مستوى المؤسسات مع توفر عالي" }, value: 100 }
        ]
    },
    // Pillar 2: Enablers - Human Capabilities (القدرات البشرية)
    {
        pillar: { en: "Enablers", ar: "الممكنات" },
        domain: { en: "Number & Diversity of AI Talent", ar: "العدد والتنوع" },
        question: {
            en: "How many AI/ML specialists does your organization have, and how diverse is the team?",
            ar: "كم عدد المتخصصين في الذكاء الاصطناعي/التعلم الآلي في منظمتك، وما مدى تنوع الفريق؟"
        },
        options: [
            { text: { en: "No AI specialists", ar: "لا يوجد متخصصون في الذكاء الاصطناعي" }, value: 0 },
            { text: { en: "1-3 specialists, limited diversity", ar: "1-3 متخصصون، تنوع محدود" }, value: 20 },
            { text: { en: "4-10 specialists, moderate diversity", ar: "4-10 متخصصون، تنوع معتدل" }, value: 50 },
            { text: { en: "11-20 specialists aligned with national standards", ar: "11-20 متخصصاً يتماشون مع المعايير الوطنية" }, value: 80 },
            { text: { en: "More than 20 specialists, highly diverse team", ar: "أكثر من 20 متخصصاً، فريق متنوع للغاية" }, value: 100 }
        ]
    },
    {
        pillar: { en: "Enablers", ar: "الممكنات" },
        domain: { en: "Professional Development", ar: "التطوير المهني" },
        question: {
            en: "What is the level of professional development and training for AI capabilities?",
            ar: "ما هو مستوى التطوير المهني والتدريب للقدرات في الذكاء الاصطناعي؟"
        },
        options: [
            { text: { en: "No training programs", ar: "لا توجد برامج تدريب" }, value: 0 },
            { text: { en: "Occasional workshops", ar: "ورش عمل عرضية" }, value: 25 },
            { text: { en: "Regular training with some certifications", ar: "تدريب منتظم مع بعض الشهادات" }, value: 55 },
            { text: { en: "Structured development program with certified courses", ar: "برنامج تطوير منظم مع دورات معتمدة" }, value: 80 },
            { text: { en: "Continuous learning culture with advanced certifications", ar: "ثقافة تعلم مستمر مع شهادات متقدمة" }, value: 100 }
        ]
    },
    // Pillar 3: Outputs - Applications (التطبيقات)
    {
        pillar: { en: "Outputs", ar: "المخرجات" },
        domain: { en: "AI Application Development & Deployment", ar: "التطوير والنشر" },
        question: {
            en: "How many AI applications has your organization developed and deployed?",
            ar: "كم عدد تطبيقات الذكاء الاصطناعي التي طورتها ونشرتها منظمتك؟"
        },
        options: [
            { text: { en: "No AI applications", ar: "لا توجد تطبيقات ذكاء اصطناعي" }, value: 0 },
            { text: { en: "1-2 applications in development", ar: "1-2 تطبيق قيد التطوير" }, value: 20 },
            { text: { en: "3-5 deployed applications", ar: "3-5 تطبيقات منشورة" }, value: 50 },
            { text: { en: "6-10 applications with MLOps practices", ar: "6-10 تطبيقات مع ممارسات MLOps" }, value: 80 },
            { text: { en: "More than 10 mature applications in production", ar: "أكثر من 10 تطبيقات ناضجة في الإنتاج" }, value: 100 }
        ]
    },
    {
        pillar: { en: "Outputs", ar: "المخرجات" },
        domain: { en: "Privacy & Security", ar: "الخصوصية والأمن" },
        question: {
            en: "How well does your organization implement privacy and security in AI applications?",
            ar: "ما مدى جودة تنفيذ منظمتك للخصوصية والأمن في تطبيقات الذكاء الاصطناعي؟"
        },
        options: [
            { text: { en: "No privacy/security measures", ar: "لا توجد إجراءات خصوصية/أمن" }, value: 0 },
            { text: { en: "Basic security measures", ar: "إجراءات أمنية أساسية" }, value: 30 },
            { text: { en: "Privacy by design with compliance", ar: "الخصوصية حسب التصميم مع الامتثال" }, value: 60 },
            { text: { en: "Comprehensive security aligned with national data protection laws", ar: "أمن شامل يتماشى مع قوانين حماية البيانات الوطنية" }, value: 85 },
            { text: { en: "Advanced security with continuous risk assessment", ar: "أمن متقدم مع تقييم مخاطر مستمر" }, value: 100 }
        ]
    },
    // Pillar 3: Outputs - Impact (الأثر)
    {
        pillar: { en: "Outputs", ar: "المخرجات" },
        domain: { en: "Operational Efficiency", ar: "كفاءة العمليات" },
        question: {
            en: "What percentage of tasks are supported by AI, and what productivity gains have been achieved?",
            ar: "ما نسبة المهام المدعومة بالذكاء الاصطناعي، وما هي مكاسب الإنتاجية المحققة؟"
        },
        options: [
            { text: { en: "Less than 5% of tasks, no measurable gains", ar: "أقل من 5% من المهام، لا توجد مكاسب قابلة للقياس" }, value: 0 },
            { text: { en: "5-15% of tasks, minimal productivity improvement", ar: "5-15% من المهام، تحسين إنتاجية ضئيل" }, value: 30 },
            { text: { en: "15-25% of tasks, 10-15% productivity gain", ar: "15-25% من المهام، مكسب إنتاجية 10-15%" }, value: 60 },
            { text: { en: "More than 25% of tasks, over 15% productivity gain", ar: "أكثر من 25% من المهام، مكسب إنتاجية أكثر من 15%" }, value: 90 },
            { text: { en: "Significant AI integration with measurable ROI", ar: "تكامل كبير للذكاء الاصطناعي مع عائد استثمار قابل للقياس" }, value: 100 }
        ]
    },
    {
        pillar: { en: "Outputs", ar: "المخرجات" },
        domain: { en: "Service Quality & Improvement", ar: "جودة وتحسين الخدمات" },
        question: {
            en: "How has AI improved service quality and user experience in your organization?",
            ar: "كيف حسّن الذكاء الاصطناعي جودة الخدمة وتجربة المستخدم في منظمتك؟"
        },
        options: [
            { text: { en: "No AI-enabled services", ar: "لا توجد خدمات مدعومة بالذكاء الاصطناعي" }, value: 0 },
            { text: { en: "Less than 10% of services use AI, minimal improvement", ar: "أقل من 10% من الخدمات تستخدم الذكاء الاصطناعي، تحسين ضئيل" }, value: 25 },
            { text: { en: "10-25% of services use AI, 10-15% improvement", ar: "10-25% من الخدمات تستخدم الذكاء الاصطناعي، تحسين 10-15%" }, value: 55 },
            { text: { en: "More than 25% of services use AI, over 20% improvement", ar: "أكثر من 25% من الخدمات تستخدم الذكاء الاصطناعي، تحسين أكثر من 20%" }, value: 85 },
            { text: { en: "Comprehensive AI services with proactive solutions", ar: "خدمات ذكاء اصطناعي شاملة مع حلول استباقية" }, value: 100 }
        ]
    }
];

let currentQuestionIndex = 0;
let skillsGapAnswers = [];
let currentResults = {
    'skills-gap': null,
    'learning-path': null,
    'job-translator': null
};

function startSkillsGapAssessment() {
    document.getElementById('skills-gap-intro').style.display = 'none';
    document.getElementById('skills-gap-questions').style.display = 'block';
    currentQuestionIndex = 0;
    skillsGapAnswers = [];
    showQuestion();
}

function showQuestion() {
    const question = skillsGapQuestions[currentQuestionIndex];
    const container = document.getElementById('question-container');
    const progress = ((currentQuestionIndex + 1) / skillsGapQuestions.length) * 100;
    const currentLang = document.documentElement.lang || 'en';
    
    document.getElementById('skills-gap-progress').style.width = progress + '%';
    
    const questionText = typeof question.question === 'object' ? question.question[currentLang] : question.question;
    const prevText = translations[currentLang]['previous'] || 'Previous';
    const questionOfText = translations[currentLang]['question-of'] || 'Question';
    const ofText = translations[currentLang]['of'] || 'of';
    
    container.innerHTML = `
        <div class="question-card">
            <h3>${questionOfText} ${currentQuestionIndex + 1} ${ofText} ${skillsGapQuestions.length}</h3>
            <h3>${questionText}</h3>
            <div class="answer-options">
                ${question.options.map((option, index) => {
                    const optionText = typeof option.text === 'object' ? option.text[currentLang] : option.text;
                    return `
                    <div class="answer-option" onclick="selectAnswer(${index})">
                        ${optionText}
                    </div>
                `;
                }).join('')}
            </div>
            <div class="question-nav">
                ${currentQuestionIndex > 0 ? `<button class="btn-secondary" onclick="previousQuestion()">${prevText}</button>` : '<div></div>'}
                <div></div>
            </div>
        </div>
    `;
}

function selectAnswer(optionIndex) {
    const question = skillsGapQuestions[currentQuestionIndex];
    const selectedOption = question.options[optionIndex];
    
    // Remove previous selection
    document.querySelectorAll('.answer-option').forEach(opt => opt.classList.remove('selected'));
    // Add selection to clicked option
    event.target.classList.add('selected');
    
    // Store answer
    skillsGapAnswers[currentQuestionIndex] = selectedOption.value;
    
    // Auto-advance after short delay
    setTimeout(() => {
        if (currentQuestionIndex < skillsGapQuestions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            showSkillsGapResults();
        }
    }, 500);
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

async function showSkillsGapResults() {
    document.getElementById('skills-gap-questions').style.display = 'none';
    document.getElementById('skills-gap-results').style.display = 'block';
    
    const currentLang = document.documentElement.lang || localStorage.getItem('language') || 'en';
    const analyzingText = translations[currentLang]['analyzing'] || 'Analyzing your organization\'s AI readiness with AI-powered insights...';
    
    // Show loading state
    document.getElementById('results-content').innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>${analyzingText}</p>
        </div>
    `;
    
    try {
        // Call AI-powered API
        const response = await fetch(`${API_BASE_URL}/api/analyze-skills-gap`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({
                answers: skillsGapAnswers,
                organizationInfo: null, // Can be enhanced to collect this
                language: currentLang
            })
        });
        
        const data = await response.json();
        
        // Animate score
        animateScore('readiness-score', data.readinessScore);
        
        // Get National AI Index maturity level
        const maturityLevel = getNAIIMaturityLevel(data.readinessScore);
        const maturityLevelName = maturityLevel.name[currentLang];
        const maturityDescription = maturityLevel.description[currentLang];
        const maturityGoal = maturityLevel.goal[currentLang];
        
        const priorityGapsText = translations[currentLang]['priority-gaps'] || 'Priority Gaps';
        const actionRoadmapText = translations[currentLang]['action-roadmap'] || 'Action Roadmap';
        const roadmapIntroText = translations[currentLang]['roadmap-intro'] || 'Based on your assessment, here\'s where to start:';
        const maturityLevelText = translations[currentLang]['maturity-level'] || 'Maturity Level';
        const naiiBasedText = translations[currentLang]['naii-based'] || 'This assessment is based on the SDAIA National AI Index (NAII) methodology.';
        const strategicInsightsText = translations[currentLang]['strategic-insights'] || 'Strategic Insights';
        
        // Create timeline HTML for National AI Index maturity levels
        const timelineHTML = createNAIITimeline(maturityLevel.level, currentLang);
        
        const resultsHTML = `
            <div class="result-section" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%); padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                <h4 style="color: var(--primary-color); margin-bottom: 15px;">${maturityLevelText}: ${maturityLevelName} (Level ${maturityLevel.level})</h4>
                <p style="color: var(--text-light-on-dark); margin-bottom: 10px;">${maturityDescription}</p>
                <p style="color: var(--text-muted-on-dark); font-size: 0.9em;"><strong>${currentLang === 'ar' ? 'الهدف:' : 'Goal:'}</strong> ${maturityGoal}</p>
            </div>
            
            ${timelineHTML}
            
            <div class="result-section">
                <h4>${priorityGapsText}</h4>
                <ul>
                    ${data.priorityGaps.map(gap => `<li>${gap}</li>`).join('')}
                </ul>
            </div>
            
            <div class="result-section">
                <h4>${actionRoadmapText}</h4>
                <p>${roadmapIntroText}</p>
                <ul>
                    ${data.roadmap.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            ${data.insights ? `
            <div class="result-section">
                <h4>${strategicInsightsText}</h4>
                <div style="color: var(--text-light-on-dark); white-space: pre-line; line-height: 1.8;">
                    ${data.insights.split('\n\n').map(paragraph => `<p style="margin-bottom: 15px;">${paragraph}</p>`).join('')}
                </div>
            </div>
            ` : ''}
            
            <div class="result-section" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <p style="color: var(--text-muted-on-dark); font-size: 0.85em; text-align: center; margin-bottom: 10px;">
                    ${naiiBasedText}
                </p>
                <p style="color: var(--text-muted-on-dark); font-size: 0.85em; text-align: center;">
                    ${currentLang === 'ar' ? 'للمزيد من المعلومات، راجع' : 'For more information, refer to'} 
                    <a href="https://sdaia.gov.sa/ar/SDAIA/about/Files/NAII.pdf" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color); text-decoration: underline;">
                        ${currentLang === 'ar' ? 'المؤشر الوطني للذكاء الاصطناعي (NAII)' : 'the National AI Index (NAII)'}
                    </a>
                </p>
            </div>
        `;
        
        document.getElementById('results-content').innerHTML = resultsHTML;
        
        // Store results for email sending
        currentResults['skills-gap'] = {
            toolName: currentLang === 'ar' ? 'محلل فجوات المهارات' : 'AI Skills Gap Analyzer',
            results: data,
            language: currentLang
        };
    } catch (error) {
        console.error('Error fetching analysis:', error);
        // Fallback to client-side analysis
        const totalScore = skillsGapAnswers.reduce((sum, score) => sum + score, 0);
        const readinessScore = Math.round(totalScore / skillsGapQuestions.length);
        animateScore('readiness-score', readinessScore);
        
        // Get National AI Index maturity level
        const maturityLevel = getNAIIMaturityLevel(readinessScore);
        const maturityLevelName = maturityLevel.name[currentLang];
        const maturityDescription = maturityLevel.description[currentLang];
        const maturityGoal = maturityLevel.goal[currentLang];
        
        // Create timeline HTML for National AI Index maturity levels
        const timelineHTML = createNAIITimeline(maturityLevel.level, currentLang);
        
        const gaps = identifyGaps(skillsGapAnswers);
        const roadmap = getRoadmap(readinessScore);
        
        const priorityGapsText = translations[currentLang]['priority-gaps'] || 'Priority Gaps';
        const actionRoadmapText = translations[currentLang]['action-roadmap'] || 'Action Roadmap';
        const roadmapIntroText = translations[currentLang]['roadmap-intro'] || 'Based on your assessment, here\'s where to start:';
        const maturityLevelText = translations[currentLang]['maturity-level'] || 'Maturity Level';
        const naiiBasedText = translations[currentLang]['naii-based'] || 'This assessment is based on the SDAIA National AI Index methodology.';
        const strategicInsightsText = translations[currentLang]['strategic-insights'] || 'Strategic Insights';
        
        document.getElementById('results-content').innerHTML = `
            <div class="result-section" style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%); padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                <h4 style="color: var(--primary-color); margin-bottom: 15px;">${maturityLevelText}: ${maturityLevelName} (Level ${maturityLevel.level})</h4>
                <p style="color: var(--text-light-on-dark); margin-bottom: 10px;">${maturityDescription}</p>
                <p style="color: var(--text-muted-on-dark); font-size: 0.9em;"><strong>${currentLang === 'ar' ? 'الهدف:' : 'Goal:'}</strong> ${maturityGoal}</p>
            </div>
            
            ${timelineHTML}
            
            <div class="result-section">
                <h4>${priorityGapsText}</h4>
                <ul>
                    ${gaps.map(gap => `<li>${gap}</li>`).join('')}
                </ul>
            </div>
            
            <div class="result-section">
                <h4>${actionRoadmapText}</h4>
                <p>${roadmapIntroText}</p>
                <ul>
                    ${roadmap.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="result-section">
                <h4>${strategicInsightsText}</h4>
                <div style="color: var(--text-light-on-dark); white-space: pre-line; line-height: 1.8;">
                    ${generateFallbackInsights(readinessScore, maturityLevel, currentLang, skillsGapAnswers).split('\n\n').filter(p => p.trim()).map(paragraph => `<p style="margin-bottom: 15px;">${paragraph.trim()}</p>`).join('')}
                </div>
            </div>
            
            <div class="result-section" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <p style="color: var(--text-muted-on-dark); font-size: 0.85em; text-align: center; margin-bottom: 10px;">
                    ${naiiBasedText}
                </p>
                <p style="color: var(--text-muted-on-dark); font-size: 0.85em; text-align: center;">
                    ${currentLang === 'ar' ? 'للمزيد من المعلومات، راجع' : 'For more information, refer to'} 
                    <a href="https://sdaia.gov.sa/ar/SDAIA/about/Files/NAII.pdf" target="_blank" rel="noopener noreferrer" style="color: var(--primary-color); text-decoration: underline;">
                        ${currentLang === 'ar' ? 'المؤشر الوطني للذكاء الاصطناعي (NAII)' : 'the National AI Index (NAII)'}
                    </a>
                </p>
            </div>
        `;
    }
}

// Generate fallback strategic insights - now dynamic based on assessment results
function generateFallbackInsights(score, maturityLevel, lang, answers = null) {
    const nextLevel = maturityLevel.level < 5 ? maturityLevel.level + 1 : 5;
    
    // Get answers from parameter or global scope if available
    const assessmentAnswers = answers && answers.length > 0 
        ? answers 
        : (typeof skillsGapAnswers !== 'undefined' && skillsGapAnswers.length > 0 
            ? skillsGapAnswers 
            : Array(14).fill(score)); // Fallback to average if not available
    
    // Calculate pillar scores
    const directionsScore = (assessmentAnswers[0] + assessmentAnswers[1] + assessmentAnswers[2] + assessmentAnswers[3] + assessmentAnswers[4]) / 5;
    const enablersScore = (assessmentAnswers[5] + assessmentAnswers[6] + assessmentAnswers[7] + assessmentAnswers[8] + assessmentAnswers[9]) / 5;
    const outputsScore = (assessmentAnswers[10] + assessmentAnswers[11] + assessmentAnswers[12] + assessmentAnswers[13]) / 4;
    
    // Identify weakest pillar
    const pillarScores = [
        { name: lang === 'ar' ? 'التوجهات' : 'Directions', score: directionsScore },
        { name: lang === 'ar' ? 'الممكنات' : 'Enablers', score: enablersScore },
        { name: lang === 'ar' ? 'المخرجات' : 'Outputs', score: outputsScore }
    ];
    const weakestPillar = pillarScores.reduce((min, pillar) => pillar.score < min.score ? pillar : min);
    
    const levelSpecificInsights = {
        0: {
            en: `Your organization is at the initial stage of AI adoption (Level 0: ${maturityLevel.name.en}). This represents a critical opportunity to establish a strong foundation for AI transformation aligned with Vision 2030.`,
            ar: `منظمتك في المرحلة الأولية لتبني الذكاء الاصطناعي (المستوى 0: ${maturityLevel.name.ar}). يمثل هذا فرصة حرجة لإنشاء أساس قوي لتحول الذكاء الاصطناعي المتماشي مع رؤية 2030.`
        },
        1: {
            en: `Your organization is in the Building Phase (Level 1: ${maturityLevel.name.en}), recognizing the importance of AI but requiring structured approach to implementation.`,
            ar: `منظمتك في مرحلة البناء (المستوى 1: ${maturityLevel.name.ar})، معترفة بأهمية الذكاء الاصطناعي لكنها تحتاج إلى نهج منظم للتنفيذ.`
        },
        2: {
            en: `Your organization has activated AI frameworks (Level 2: ${maturityLevel.name.en}), with initial applications across departments. This is a pivotal stage for scaling.`,
            ar: `منظمتك قد فعّلت أطر الذكاء الاصطناعي (المستوى 2: ${maturityLevel.name.ar})، مع تطبيقات أولية عبر الإدارات. هذه مرحلة محورية للتوسع.`
        },
        3: {
            en: `Your organization demonstrates mastery in AI integration (Level 3: ${maturityLevel.name.en}), with AI embedded in operations and decision-making.`,
            ar: `منظمتك تظهر التمكن في تكامل الذكاء الاصطناعي (المستوى 3: ${maturityLevel.name.ar})، مع دمج الذكاء الاصطناعي في العمليات واتخاذ القرار.`
        },
        4: {
            en: `Your organization is achieving excellence in AI (Level 4: ${maturityLevel.name.en}), leading strategic transformation and delivering measurable impact.`,
            ar: `منظمتك تحقق التميز في الذكاء الاصطناعي (المستوى 4: ${maturityLevel.name.ar})، تقود التحول الاستراتيجي وتحقق أثراً قابلاً للقياس.`
        },
        5: {
            en: `Your organization is a national leader in AI adoption (Level 5: ${maturityLevel.name.en}), setting benchmarks for innovation and impact.`,
            ar: `منظمتك رائدة وطنياً في تبني الذكاء الاصطناعي (المستوى 5: ${maturityLevel.name.ar})، تحدد معايير للابتكار والأثر.`
        }
    };
    
    const pillarFocus = {
        'Directions': {
            en: 'Focus on developing comprehensive AI strategies, securing executive commitment, and establishing governance frameworks aligned with SDAIA regulations.',
            ar: 'ركز على تطوير استراتيجيات شاملة للذكاء الاصطناعي، وتأمين التزام التنفيذيين، وإنشاء أطر حوكمة تتماشى مع لوائح سدايا.'
        },
        'Enablers': {
            en: 'Prioritize building data infrastructure, improving data quality and accessibility, developing technical capabilities, and investing in human talent development.',
            ar: 'أولوية بناء البنية التحتية للبيانات، وتحسين جودة البيانات وإتاحتها، وتطوير القدرات التقنية، والاستثمار في تطوير المواهب البشرية.'
        },
        'Outputs': {
            en: 'Emphasize developing and deploying AI applications, measuring operational efficiency gains, and improving service quality through AI-enabled solutions.',
            ar: 'أكد على تطوير ونشر تطبيقات الذكاء الاصطناعي، وقياس مكاسب الكفاءة التشغيلية، وتحسين جودة الخدمة من خلال الحلول المدعومة بالذكاء الاصطناعي.'
        },
        'التوجهات': {
            en: 'Focus on developing comprehensive AI strategies, securing executive commitment, and establishing governance frameworks aligned with SDAIA regulations.',
            ar: 'ركز على تطوير استراتيجيات شاملة للذكاء الاصطناعي، وتأمين التزام التنفيذيين، وإنشاء أطر حوكمة تتماشى مع لوائح سدايا.'
        },
        'الممكنات': {
            en: 'Prioritize building data infrastructure, improving data quality and accessibility, developing technical capabilities, and investing in human talent development.',
            ar: 'أولوية بناء البنية التحتية للبيانات، وتحسين جودة البيانات وإتاحتها، وتطوير القدرات التقنية، والاستثمار في تطوير المواهب البشرية.'
        },
        'المخرجات': {
            en: 'Emphasize developing and deploying AI applications, measuring operational efficiency gains, and improving service quality through AI-enabled solutions.',
            ar: 'أكد على تطوير ونشر تطبيقات الذكاء الاصطناعي، وقياس مكاسب الكفاءة التشغيلية، وتحسين جودة الخدمة من خلال الحلول المدعومة بالذكاء الاصطناعي.'
        }
    };
    
    const nextLevelGoals = {
        1: { en: 'establish foundational awareness and begin pilot projects', ar: 'إنشاء الوعي الأساسي وبدء المشاريع التجريبية' },
        2: { en: 'activate governance frameworks and expand departmental applications', ar: 'تفعيل أطر الحوكمة وتوسيع التطبيقات الإدارية' },
        3: { en: 'achieve comprehensive organizational integration', ar: 'تحقيق التكامل التنظيمي الشامل' },
        4: { en: 'lead strategic transformation and maximize value creation', ar: 'قيادة التحول الاستراتيجي وتعظيم خلق القيمة' },
        5: { en: 'maintain national leadership and drive continuous innovation', ar: 'الحفاظ على الريادة الوطنية ودفع الابتكار المستمر' }
    };
    
    const levelInsight = levelSpecificInsights[maturityLevel.level][lang];
    const pillarAdvice = pillarFocus[weakestPillar.name] ? pillarFocus[weakestPillar.name][lang] : '';
    const nextGoal = nextLevelGoals[nextLevel] ? nextLevelGoals[nextLevel][lang] : (lang === 'ar' ? 'الاستمرار في التقدم' : 'continue advancing');
    
    // Identify specific low-scoring areas
    const lowScores = [];
    const domainNames = lang === 'ar' ? [
        'التخطيط الاستراتيجي', 'مبادرات الذكاء الاصطناعي', 'الميزانية', 'الأطر والسياسات', 'الامتثال',
        'توافر البيانات', 'جودة البيانات', 'البنية التحتية', 'المواهب', 'التطوير المهني',
        'التطبيقات', 'الأمن', 'الكفاءة', 'جودة الخدمة'
    ] : [
        'Strategic Planning', 'AI Initiatives', 'Budget', 'Frameworks', 'Compliance',
        'Data Availability', 'Data Quality', 'Infrastructure', 'Talent', 'Development',
        'Applications', 'Security', 'Efficiency', 'Service Quality'
    ];
    
    assessmentAnswers.forEach((ans, idx) => {
        if (ans < 40 && domainNames[idx]) {
            lowScores.push(domainNames[idx]);
        }
    });
    
    const specificAreas = lowScores.length > 0 
        ? (lang === 'ar' 
            ? `المناطق التي تحتاج إلى تحسين فوري تشمل: ${lowScores.join('، ')}.`
            : `Areas requiring immediate attention include: ${lowScores.join(', ')}.`)
        : (lang === 'ar'
            ? 'جميع المجالات الأساسية تحتاج إلى تحسين متوازن.'
            : 'All core areas require balanced improvement.');
    
    const budgetStatus = assessmentAnswers[2] < 50 
        ? (lang === 'ar' ? 'مصدر قلق حالياً' : 'currently a concern')
        : (lang === 'ar' ? 'تم معالجته بشكل كافٍ' : 'adequately addressed');
    
    const infraStatus = assessmentAnswers[7] < 50 
        ? (lang === 'ar' ? 'يحتاج إلى تحسين' : 'needs improvement')
        : (lang === 'ar' ? 'كافٍ' : 'sufficient');
    
    const skillsStatus = assessmentAnswers[8] < 50 
        ? (lang === 'ar' ? 'تم تحديد فجوة حرجة' : 'critical gap identified')
        : (lang === 'ar' ? 'يتم إدارته' : 'being managed');
    
    if (lang === 'ar') {
        return `${levelInsight}

للانتقال إلى المستوى ${nextLevel}، يجب على منظمتك ${nextGoal}. الركيزة الأضعف أداءً هي ${weakestPillar.name} (النتيجة: ${Math.round(weakestPillar.score)}/100)، والتي تتطلب اهتماماً مركزاً. ${pillarAdvice}

${specificAreas}

التماشي مع رؤية 2030 يتطلب دمج تحول الذكاء الاصطناعي كأولوية استراتيجية، وضمان أن تساهم مبادرات الذكاء الاصطناعي مباشرة في الأهداف الوطنية. فكر في إنشاء شراكات مع المؤسسات الأكاديمية، والاستثمار في التطوير المهني المستمر المتماشي مع المعايير الوطنية للذكاء الاصطناعي، وتنفيذ أطر قياس قوية لتتبع التقدم مقابل مؤشرات المؤشر الوطني للذكاء الاصطناعي.

المخاطر الرئيسية تشمل عدم كفاية الالتزام التنفيذي (${budgetStatus})، وفجوات البنية التحتية للبيانات (${infraStatus})، ونقص المهارات (${skillsStatus}). يجب أن تشمل استراتيجيات التخفيف تأمين تخصيص ميزانية مخصصة (الحالي: ما يعادل ${assessmentAnswers[2]}%، يُنصح بأكثر من 15% من ميزانية تكنولوجيا المعلومات)، وبناء أطر حوكمة البيانات، وإنشاء مسارات مهنية واضحة للاحتفاظ بالمواهب في الذكاء الاصطناعي.`;
    } else {
        return `${levelInsight}

To progress to Level ${nextLevel}, your organization should ${nextGoal}. The weakest performing pillar is ${weakestPillar.name} (score: ${Math.round(weakestPillar.score)}/100), which requires focused attention. ${pillarAdvice}

${specificAreas}

Alignment with Vision 2030 requires integrating AI transformation as a strategic priority, ensuring that AI initiatives contribute directly to national objectives. Consider establishing partnerships with academic institutions, investing in continuous professional development aligned with national AI standards, and implementing robust measurement frameworks to track progress against National AI Index indicators.

Key risks include insufficient executive commitment (${budgetStatus}), data infrastructure gaps (${infraStatus}), and skills shortages (${skillsStatus}). Mitigation strategies should include securing dedicated budget allocation (current: ${assessmentAnswers[2]}% equivalent, recommended >15% of IT budget), building data governance frameworks, and creating clear career pathways for AI talent retention.`;
    }
}

// Create National AI Index Maturity Timeline Visualization
function createNAIITimeline(currentLevel, lang) {
    const levels = [
        { level: 0, name: { en: "Absence of Capabilities", ar: "غياب القدرات" }, range: "0-4.9%", color: "#ef4444" },
        { level: 1, name: { en: "Building Phase", ar: "مرحلة البناء" }, range: "5-24.9%", color: "#f59e0b" },
        { level: 2, name: { en: "Activation Phase", ar: "مرحلة التفعيل" }, range: "25-49.9%", color: "#3b82f6" },
        { level: 3, name: { en: "Mastery Phase", ar: "مرحلة التمكن" }, range: "50-79.9%", color: "#8b5cf6" },
        { level: 4, name: { en: "Excellence Phase", ar: "مرحلة التميز" }, range: "80-94.9%", color: "#10b981" },
        { level: 5, name: { en: "Leadership Phase", ar: "مرحلة الريادة" }, range: "95-100%", color: "#06b6d4" }
    ];
    
    const timelineTitle = lang === 'ar' ? 'خارطة النضج - المؤشر الوطني للذكاء الاصطناعي' : 'National AI Index Maturity Journey';
    const yourPositionText = lang === 'ar' ? 'موقعك الحالي' : 'Your Current Position';
    
    let timelineItems = '';
    levels.forEach((level, index) => {
        const isActive = level.level === currentLevel;
        const isPast = level.level < currentLevel;
        const opacity = isActive ? 1 : (isPast ? 0.6 : 0.3);
        const borderColor = isActive ? level.color : 'rgba(255, 255, 255, 0.2)';
        const bgColor = isActive ? `${level.color}20` : 'transparent';
        
        timelineItems += `
            <div class="timeline-item" style="
                position: relative;
                flex: 1;
                text-align: center;
                opacity: ${opacity};
                ${isActive ? 'transform: scale(1.05); z-index: 10;' : ''}
            ">
                <div style="
                    background: ${bgColor};
                    border: 2px solid ${borderColor};
                    border-radius: 12px;
                    padding: 15px;
                    margin-bottom: 10px;
                    min-height: 120px;
                    transition: all 0.3s ease;
                ">
                    <div style="
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background: ${isActive ? level.color : 'rgba(255, 255, 255, 0.1)'};
                        margin: 0 auto 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                        font-size: 18px;
                        color: ${isActive ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
                        border: 2px solid ${isActive ? level.color : 'rgba(255, 255, 255, 0.2)'};
                    ">${level.level}</div>
                    <h5 style="
                        color: ${isActive ? level.color : 'rgba(255, 255, 255, 0.7)'};
                        font-size: 14px;
                        font-weight: 600;
                        margin: 8px 0 5px;
                    ">${level.name[lang]}</h5>
                    <p style="
                        color: rgba(255, 255, 255, 0.6);
                        font-size: 11px;
                        margin: 0;
                    ">${level.range}</p>
                    ${isActive ? `<div style="
                        margin-top: 10px;
                        padding: 5px 10px;
                        background: ${level.color};
                        border-radius: 6px;
                        font-size: 11px;
                        font-weight: 600;
                        color: #fff;
                    ">${yourPositionText}</div>` : ''}
                </div>
                ${index < levels.length - 1 ? `
                <div style="
                    position: absolute;
                    top: 60px;
                    right: -50%;
                    width: 100%;
                    height: 2px;
                    background: ${isPast ? level.color : 'rgba(255, 255, 255, 0.1)'};
                    z-index: 1;
                "></div>
                ` : ''}
            </div>
        `;
    });
    
    return `
        <div class="result-section" style="margin-bottom: 30px;">
            <h4 style="margin-bottom: 25px; text-align: center;">${timelineTitle}</h4>
            <div style="
                display: flex;
                position: relative;
                padding: 20px 0;
                overflow-x: auto;
                gap: 10px;
            ">
                ${timelineItems}
            </div>
        </div>
    `;
}

// National AI Index Maturity Level Determination (based on SDAIA National AI Index)
function getNAIIMaturityLevel(score) {
    if (score >= 0 && score < 5) {
        return {
            level: 0,
            name: { en: "Absence of Capabilities", ar: "غياب القدرات" },
            description: {
                en: "AI has not yet been established within the organization. No efforts or capabilities in the field.",
                ar: "لم يتم بعد ترسيس الذكاء الاصطناعي داخل المنظمة. لا يوجد جهود أو قدرات في المجال."
            },
            goal: { en: "N/A", ar: "لا يوجد" }
        };
    } else if (score >= 5 && score < 25) {
        return {
            level: 1,
            name: { en: "Building Phase", ar: "مرحلة البناء" },
            description: {
                en: "The organization recognizes the importance of AI. Limited initiatives or pilot projects are being built without a clear organizational structure or comprehensive integration.",
                ar: "تعترف المنظمة بأهمية الذكاء الاصطناعي. يتم بناء مبادرات أو مشاريع تجريبية محدودة دون هيكل تنظيمي واضح أو تكامل شامل."
            },
            goal: { en: "Enhance awareness and start practical experimentation", ar: "تعزيز الوعي وبدء التجربة العملية" }
        };
    } else if (score >= 25 && score < 50) {
        return {
            level: 2,
            name: { en: "Activation Phase", ar: "مرحلة التفعيل" },
            description: {
                en: "Regulatory frameworks, strategies, and governance mechanisms for AI have been activated. Initial application begins at the level of several departments with emerging measurement practices.",
                ar: "تم تفعيل الأطر التنظيمية والاستراتيجيات وآليات الحوكمة للذكاء الاصطناعي. يبدأ التطبيق الأولي على مستوى عدة إدارات مع ممارسات قياس ناشئة."
            },
            goal: { en: "Build capabilities and implement controlled experiments", ar: "بناء القدرات وتنفيذ تجارب محكمة" }
        };
    } else if (score >= 50 && score < 80) {
        return {
            level: 3,
            name: { en: "Mastery Phase", ar: "مرحلة التمكن" },
            description: {
                en: "AI is integrated into operations and institutional decision-making. Strategy, infrastructure, and skills are integrated based on performance indicators and governance.",
                ar: "يتم دمج الذكاء الاصطناعي في العمليات واتخاذ القرار المؤسسي. وتتكامل الاستراتيجية والبنية التحتية والمهارات بناء على مؤشرات أداء وحوكمة."
            },
            goal: { en: "Comprehensive integration at the organizational level", ar: "تكامل شامل على مستوى المنظمة" }
        };
    } else if (score >= 80 && score < 95) {
        return {
            level: 4,
            name: { en: "Excellence Phase", ar: "مرحلة التميز" },
            description: {
                en: "AI contributes to leading strategic transformation, enabling digital services, and achieving tangible impact. Initiatives are expanded and evaluated periodically.",
                ar: "يسهم الذكاء الاصطناعي في قيادة التحول الاستراتيجي، وتمكين الخدمات الرقمية، وتحقيق أثر ملموس. يتم توسيع نطاق المبادرات وتقييمها بشكل دوري."
            },
            goal: { en: "Achieve strategic alignment and maximize value", ar: "تحقيق المواءمة الاستراتيجية وتعظيم القيمة" }
        };
    } else {
        return {
            level: 5,
            name: { en: "Leadership Phase", ar: "مرحلة الريادة" },
            description: {
                en: "The organization leads the national scene in AI adoption. It demonstrates an advanced level of adoption, continuous innovation, and measurable impact.",
                ar: "تتصدر المنظمة المشهد الوطني في تبني الذكاء الاصطناعي. وتظهر مستوى متقدماً من التبني، والابتكار المستمر، وتحقيق الأثر القابل للقياس."
            },
            goal: { en: "National leadership and sustainable institutional innovation", ar: "الريادة الوطنية والابتكار المؤسسي المستدام" }
        };
    }
}

function identifyGaps(answers) {
    const gaps = [];
    const currentLang = document.documentElement.lang || localStorage.getItem('language') || 'en';
    
    // Map answers to National AI Index domains with pillar information
    const domainNames = [
        { en: "Strategic Planning & Performance", ar: "التخطيط والأداء الاستراتيجي", pillar: { en: "Directions", ar: "التوجهات" } },
        { en: "AI Initiatives", ar: "المبادرات", pillar: { en: "Directions", ar: "التوجهات" } },
        { en: "Budget Allocation", ar: "الميزانية", pillar: { en: "Directions", ar: "التوجهات" } },
        { en: "Frameworks & Policies", ar: "الأطر والسياسات", pillar: { en: "Directions", ar: "التوجهات" } },
        { en: "Regulatory Compliance", ar: "الامتثال التنظيمي", pillar: { en: "Directions", ar: "التوجهات" } },
        { en: "Data Availability & Access", ar: "التوافر والوصول", pillar: { en: "Enablers", ar: "الممكنات" } },
        { en: "Data Quality & Integration", ar: "الجودة والتكامل", pillar: { en: "Enablers", ar: "الممكنات" } },
        { en: "Technical Infrastructure", ar: "البنية التحتية التقنية", pillar: { en: "Enablers", ar: "الممكنات" } },
        { en: "Number & Diversity of AI Talent", ar: "العدد والتنوع", pillar: { en: "Enablers", ar: "الممكنات" } },
        { en: "Professional Development", ar: "التطوير المهني", pillar: { en: "Enablers", ar: "الممكنات" } },
        { en: "AI Application Development & Deployment", ar: "التطوير والنشر", pillar: { en: "Outputs", ar: "المخرجات" } },
        { en: "Privacy & Security", ar: "الخصوصية والأمن", pillar: { en: "Outputs", ar: "المخرجات" } },
        { en: "Operational Efficiency", ar: "كفاءة العمليات", pillar: { en: "Outputs", ar: "المخرجات" } },
        { en: "Service Quality & Improvement", ar: "جودة وتحسين الخدمات", pillar: { en: "Outputs", ar: "المخرجات" } }
    ];
    
    answers.forEach((score, index) => {
        if (score < 50 && domainNames[index]) {
            const domain = domainNames[index];
            gaps.push(`${domain[currentLang]} (${domain.pillar[currentLang]}): ${currentLang === 'ar' ? 'يتطلب تحسين لتحقيق معايير المؤشر الوطني للذكاء الاصطناعي' : 'Requires improvement to meet National AI Index standards'}`);
        }
    });
    
    // Ensure we have at least 5 gaps
    if (gaps.length < 5) {
        const additionalGaps = currentLang === 'ar' ? [
            "التخطيط الاستراتيجي (التوجهات): تطوير استراتيجية شاملة للذكاء الاصطناعي تتماشى مع رؤية 2030",
            "البيانات (الممكنات): تحسين جودة البيانات وإتاحتها لدعم مبادرات الذكاء الاصطناعي",
            "القدرات البشرية (الممكنات): بناء أو اكتساب خبرة في الذكاء الاصطناعي من خلال برامج تدريبية",
            "البنية التحتية (الممكنات): الاستثمار في بنية سحابية قابلة للتوسع وخطوط بيانات",
            "التطبيقات (المخرجات): تطوير ونشر تطبيقات ذكاء اصطناعي لإظهار أثر ملموس"
        ] : [
            "Strategic Planning (Directions): Develop comprehensive AI strategy aligned with Vision 2030",
            "Data Foundation (Enablers): Improve data quality and availability to support AI initiatives",
            "Human Capabilities (Enablers): Build or acquire AI expertise through training programs",
            "Infrastructure (Enablers): Invest in scalable cloud infrastructure and data pipelines",
            "Applications (Outputs): Develop and deploy AI applications to demonstrate tangible impact"
        ];
        
        additionalGaps.forEach(gap => {
            if (gaps.length < 5 && !gaps.some(existing => existing.includes(gap.split(':')[0]))) {
                gaps.push(gap);
            }
        });
    }
    
    return gaps.slice(0, 5);
}

function getRoadmap(score) {
    const currentLang = document.documentElement.lang || localStorage.getItem('language') || 'en';
    
    if (score < 5) {
        return currentLang === 'ar' ? [
            "بدء ورش عمل توعوية للقيادة حول أهمية الذكاء الاصطناعي",
            "إجراء مراجعة للبيانات لتقييم الوضع الحالي",
            "تحديد 2-3 حالات استخدام سريعة للذكاء الاصطناعي",
            "بناء فريق تجريبي صغير مع تدريب أساسي على الذكاء الاصطناعي"
        ] : [
            "Start with AI awareness workshops for leadership",
            "Conduct a data audit to assess current state",
            "Identify 2-3 quick-win AI use cases",
            "Build a small pilot team with basic AI training"
        ];
    } else if (score < 25) {
        return currentLang === 'ar' ? [
            "تطوير استراتيجية رسمية للذكاء الاصطناعي تتماشى مع رؤية 2030",
            "تحديد أولويات وطنية للذكاء الاصطناعي",
            "إنشاء هيكل تنظيمي أساسي للذكاء الاصطناعي",
            "بدء مشاريع تجريبية محدودة"
        ] : [
            "Develop a formal AI strategy aligned with Vision 2030",
            "Identify national AI priorities",
            "Establish basic organizational structure for AI",
            "Launch limited pilot projects"
        ];
    } else if (score < 50) {
        return currentLang === 'ar' ? [
            "تفعيل الأطر التنظيمية وآليات الحوكمة",
            "تحسين البنية التحتية للبيانات",
            "إطلاق مشاريع تجريبية في عدة إدارات",
            "تطوير ممارسات قياس الأداء"
        ] : [
            "Activate regulatory frameworks and governance mechanisms",
            "Improve data infrastructure",
            "Launch pilot projects across several departments",
            "Develop performance measurement practices"
        ];
    } else if (score < 80) {
        return currentLang === 'ar' ? [
            "دمج الذكاء الاصطناعي في العمليات واتخاذ القرار",
            "تكامل الاستراتيجية والبنية التحتية والمهارات",
            "تطوير مؤشرات أداء وحوكمة متقدمة",
            "تكامل شامل على مستوى المنظمة"
        ] : [
            "Integrate AI into operations and decision-making",
            "Integrate strategy, infrastructure, and skills",
            "Develop advanced performance indicators and governance",
            "Comprehensive integration at organizational level"
        ];
    } else if (score < 95) {
        return currentLang === 'ar' ? [
            "قيادة التحول الاستراتيجي بالذكاء الاصطناعي",
            "تمكين الخدمات الرقمية المتقدمة",
            "تحقيق أثر ملموس وقابل للقياس",
            "توسيع نطاق المبادرات وتقييمها دورياً"
        ] : [
            "Lead strategic transformation with AI",
            "Enable advanced digital services",
            "Achieve tangible and measurable impact",
            "Expand initiatives and evaluate them periodically"
        ];
    } else {
        return currentLang === 'ar' ? [
            "الريادة الوطنية في تبني الذكاء الاصطناعي",
            "الابتكار المستمر والتطوير المتقدم",
            "تحقيق أثر قابل للقياس على المستوى الوطني",
            "المساهمة في تطوير المعايير والممارسات الوطنية"
        ] : [
            "National leadership in AI adoption",
            "Continuous innovation and advanced development",
            "Achieve measurable impact at national level",
            "Contribute to developing national standards and practices"
        ];
    }
}

// Removed getBenchmark - using National AI Index maturity levels instead

function animateScore(elementId, targetScore) {
    const element = document.getElementById(elementId);
    let currentScore = 0;
    const increment = targetScore / 50;
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            element.textContent = targetScore;
            clearInterval(timer);
        } else {
            element.textContent = Math.round(currentScore);
        }
    }, 30);
}

function resetSkillsGap() {
    document.getElementById('skills-gap-results').style.display = 'none';
    document.getElementById('skills-gap-questions').style.display = 'none';
    document.getElementById('skills-gap-intro').style.display = 'flex';
    currentQuestionIndex = 0;
    skillsGapAnswers = [];
    currentResults['skills-gap'] = null;
    document.getElementById('skills-gap-email').value = '';
    document.getElementById('skills-gap-email-status').textContent = '';
}

// ============================================
// TOOL 2: Learning Path Generator
// ============================================

async function generateLearningPath(event) {
    event.preventDefault();
    
    const role = document.getElementById('current-role').value;
    const experience = document.getElementById('experience-level').value;
    const goals = document.getElementById('learning-goals').value;
    const timePerWeek = parseInt(document.getElementById('time-available').value);
    const currentLang = document.documentElement.lang || localStorage.getItem('language') || 'en';
    
    document.getElementById('learning-path-form').style.display = 'none';
    document.getElementById('learning-path-results').style.display = 'block';
    
    // Show loading state
    const loadingText = currentLang === 'ar' ? 'جارٍ إنشاء مسار التعلم المخصص الخاص بك...' : 'Generating your personalized AI learning path...';
    document.getElementById('learning-path-content-display').innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>${loadingText}</p>
        </div>
    `;
    
    try {
        // Call AI-powered API
        const response = await fetch(`${API_BASE_URL}/api/generate-learning-path`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                role,
                experience,
                goals,
                timePerWeek,
                industry: null,
                language: currentLang
            })
        });
        
        const data = await response.json();
        
        // Check if the response is an error
        if (!response.ok || data.error) {
            throw new Error(data.message || data.error || 'AI agent failed to generate learning path');
        }
        
        // Validate that we have the required data structure
        if (!data.curriculum || !Array.isArray(data.curriculum)) {
            throw new Error('AI agent returned invalid response structure');
        }
        
        const curriculumTitle = currentLang === 'ar' ? 'المنهج المخصص' : 'Custom Curriculum';
        const timelineTitle = currentLang === 'ar' ? 'الجدول الزمني المقترح' : 'Suggested Learning Timeline';
        const timelineNote = currentLang === 'ar' ? 'ملاحظة: هذا جدول زمني مقترح ومرن. يمكنك التكيف معه حسب وتيرتك الخاصة.' : 'Note: This is a suggested and flexible timeline. You can adapt it to your own pace.';
        const milestonesTitle = currentLang === 'ar' ? 'المعالم الرئيسية' : 'Key Milestones';
        const pathwaysTitle = currentLang === 'ar' ? 'المسارات المهنية' : 'Career Pathways';
        const focusLabel = currentLang === 'ar' ? 'التركيز:' : 'Focus:';
        const resourcesLabel = currentLang === 'ar' ? 'الموارد:' : 'Resources:';
        const freeResourcesLabel = currentLang === 'ar' ? 'الموارد المجانية:' : 'Free Resources:';
        const paidResourcesLabel = currentLang === 'ar' ? 'الموارد المدفوعة:' : 'Paid Resources:';
        const durationLabel = currentLang === 'ar' ? 'المدة:' : 'Duration:';
        const weekLabel = currentLang === 'ar' ? 'الأسبوع' : 'Week';
        const skillsLabel = currentLang === 'ar' ? 'المهارات المطلوبة:' : 'Skills to develop:';
        const stepsLabel = currentLang === 'ar' ? 'الخطوات:' : 'Steps:';
        
        // Function to escape HTML entities
        const escapeHtml = (text) => {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        };
        
        // Function to format resources array (for free/paid sections)
        const formatResourcesArray = (resourcesArray) => {
            if (!resourcesArray || !Array.isArray(resourcesArray) || resourcesArray.length === 0) {
                return '';
            }
            
            return resourcesArray.map((resource, index) => {
                const text = String(resource);
                // Pattern to match "Resource Name - URL" or "Resource Name: URL"
                const resourcePattern = /([^-\n:،,\]]+?)\s*[-:،,]\s*(https?:\/\/[^\s\)،,\]]+|www\.[^\s\)،,\]]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/[^\s\)،,\]]*)/g;
                const match = resourcePattern.exec(text);
                
                if (match) {
                    let url = match[2];
                    if (url.startsWith('www.')) {
                        url = 'https://' + url;
                    } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
                        if (url.includes('.') && !url.includes(' ')) {
                            url = 'https://' + url;
                        } else {
                            return escapeHtml(text); // Not a valid URL
                        }
                    }
                    const escapedName = escapeHtml(match[1].trim());
                    const escapedUrl = url.replace(/"/g, '&quot;');
                    return `<a href="${escapedUrl}" target="_blank" rel="noopener noreferrer" class="resource-link">${escapedName}</a>`;
                } else {
                    // Try to find URL in text
                    const urlPattern = /(https?:\/\/[^\s\)،,\]]+)/g;
                    const urlMatch = urlPattern.exec(text);
                    if (urlMatch) {
                        const escapedUrl = urlMatch[0].replace(/"/g, '&quot;');
                        return `<a href="${escapedUrl}" target="_blank" rel="noopener noreferrer" class="resource-link">${escapeHtml(text)}</a>`;
                    }
                    return escapeHtml(text);
                }
            }).join(currentLang === 'ar' ? '، ' : ', ');
        };
        
        // Function to convert resources text to clickable links (backward compatibility)
        const formatResources = (resourcesText) => {
            // Check if resources is an object with free/paid structure
            if (resourcesText && typeof resourcesText === 'object' && !Array.isArray(resourcesText)) {
                let result = '';
                if (resourcesText.free && Array.isArray(resourcesText.free) && resourcesText.free.length > 0) {
                    result += `<div class="resources-section resources-free">
                        <strong>${freeResourcesLabel}</strong>
                        <div class="resources-list">${formatResourcesArray(resourcesText.free)}</div>
                    </div>`;
                }
                if (resourcesText.paid && Array.isArray(resourcesText.paid) && resourcesText.paid.length > 0) {
                    result += `<div class="resources-section resources-paid">
                        <strong>${paidResourcesLabel}</strong>
                        <div class="resources-list">${formatResourcesArray(resourcesText.paid)}</div>
                    </div>`;
                }
                return result || '';
            }
            
            if (!resourcesText) return '';
            
            // Convert to string if it's not already (handles arrays, objects, etc.)
            let text = '';
            if (typeof resourcesText === 'string') {
                text = resourcesText;
            } else if (Array.isArray(resourcesText)) {
                // If it's an array, join with commas
                text = resourcesText.join(', ');
            } else if (typeof resourcesText === 'object') {
                // If it's an object, try to stringify or extract meaningful value
                text = JSON.stringify(resourcesText);
            } else {
                // For any other type, convert to string
                text = String(resourcesText);
            }
            
            // Enhanced URL pattern - matches http://, https://, www., and common domains
            const urlPattern = /(https?:\/\/[^\s\)،,\]]+|www\.[^\s\)،,\]]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/[^\s\)،,\]]*)/g;
            
            // Try to match "Resource Name - URL" or "Resource Name: URL" or "Resource Name، URL"
            // This regex matches: text (name) followed by separator (-, :, ،, or ,) followed by URL
            const resourcePattern = /([^-\n:،,\]]+?)\s*[-:،,]\s*(https?:\/\/[^\s\)،,\]]+|www\.[^\s\)،,\]]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/[^\s\)،,\]]*)/g;
            
            let result = '';
            const matches = [];
            let match;
            
            // Find all matches
            resourcePattern.lastIndex = 0;
            while ((match = resourcePattern.exec(text)) !== null) {
                let url = match[2];
                // Add https:// if URL starts with www.
                if (url.startsWith('www.')) {
                    url = 'https://' + url;
                }
                // Ensure URL has protocol
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    // Check if it looks like a domain
                    if (url.includes('.') && !url.includes(' ')) {
                        url = 'https://' + url;
                    }
                }
                
                matches.push({
                    name: match[1].trim(),
                    url: url,
                    fullMatch: match[0],
                    index: match.index
                });
            }
            
            if (matches.length > 0) {
                // Build result with clickable links
                let lastIndex = 0;
                matches.forEach((matchItem, index) => {
                    // Add text before this match (escape HTML for security)
                    if (matchItem.index > lastIndex) {
                        result += escapeHtml(text.substring(lastIndex, matchItem.index));
                    }
                    
                    // Add the clickable link (escape the name but not the URL)
                    const escapedName = escapeHtml(matchItem.name);
                    const escapedUrl = matchItem.url.replace(/"/g, '&quot;'); // Escape quotes in URL
                    result += `<a href="${escapedUrl}" target="_blank" rel="noopener noreferrer" class="resource-link">${escapedName}</a>`;
                    
                    // Add separator if not last
                    if (index < matches.length - 1) {
                        result += currentLang === 'ar' ? '، ' : ', ';
                    }
                    
                    lastIndex = matchItem.index + matchItem.fullMatch.length;
                });
                
                // Add remaining text (escape HTML)
                if (lastIndex < text.length) {
                    result += escapeHtml(text.substring(lastIndex));
                }
            } else {
                // No structured format found, just make URLs clickable
                // Split text by URLs, escape non-URL parts
                const parts = [];
                let lastIndex = 0;
                let urlMatch;
                urlPattern.lastIndex = 0;
                
                while ((urlMatch = urlPattern.exec(text)) !== null) {
                    // Add text before URL (escaped)
                    if (urlMatch.index > lastIndex) {
                        parts.push(escapeHtml(text.substring(lastIndex, urlMatch.index)));
                    }
                    
                    // Normalize and add URL as link
                    let normalizedUrl = urlMatch[0];
                    if (normalizedUrl.startsWith('www.')) {
                        normalizedUrl = 'https://' + normalizedUrl;
                    } else if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
                        if (normalizedUrl.includes('.') && !normalizedUrl.includes(' ')) {
                            normalizedUrl = 'https://' + normalizedUrl;
                        } else {
                            parts.push(escapeHtml(urlMatch[0])); // Not a valid URL, escape as text
                            lastIndex = urlMatch.index + urlMatch[0].length;
                            continue;
                        }
                    }
                    const escapedUrl = normalizedUrl.replace(/"/g, '&quot;');
                    parts.push(`<a href="${escapedUrl}" target="_blank" rel="noopener noreferrer" class="resource-link">${escapeHtml(urlMatch[0])}</a>`);
                    lastIndex = urlMatch.index + urlMatch[0].length;
                }
                
                // Add remaining text (escaped)
                if (lastIndex < text.length) {
                    parts.push(escapeHtml(text.substring(lastIndex)));
                }
                
                result = parts.join('');
            }
            
            // If no links were found, return the text as-is (escaped, might be plain text resources)
            if (result === '' || (!result.includes('<a') && text.includes('http'))) {
                // Last attempt: try to find any URLs in the text
                const simpleUrlPattern = /(https?:\/\/[^\s\)،,\]]+)/g;
                const parts = [];
                let lastIndex = 0;
                let urlMatch;
                simpleUrlPattern.lastIndex = 0;
                
                while ((urlMatch = simpleUrlPattern.exec(text)) !== null) {
                    if (urlMatch.index > lastIndex) {
                        parts.push(escapeHtml(text.substring(lastIndex, urlMatch.index)));
                    }
                    const escapedUrl = urlMatch[0].replace(/"/g, '&quot;');
                    parts.push(`<a href="${escapedUrl}" target="_blank" rel="noopener noreferrer" class="resource-link">${escapeHtml(urlMatch[0])}</a>`);
                    lastIndex = urlMatch.index + urlMatch[0].length;
                }
                if (lastIndex < text.length) {
                    parts.push(escapeHtml(text.substring(lastIndex)));
                }
                result = parts.join('');
            }
            
            return result || escapeHtml(text); // Return formatted result or escaped original text if no URLs found
        };
        
        const resultsHTML = `
        <div class="result-section">
            <h4>${curriculumTitle}</h4>
            ${data.curriculum.map((item, index) => `
                <div class="learning-path-item">
                    <h5>${index + 1}. ${item.topic}</h5>
                    <p><strong>${focusLabel}</strong> ${item.focus}</p>
                    <div class="resources-container">
                        <strong>${resourcesLabel}</strong>
                        <div class="resources-content">${formatResources(item.resources || '')}</div>
                    </div>
                    ${item.duration ? `<p><strong>${durationLabel}</strong> ${item.duration}</p>` : ''}
                </div>
            `).join('')}
        </div>
        
        <div class="result-section">
            <h4>${timelineTitle}</h4>
            <p class="timeline-note">${timelineNote}</p>
            <div class="timeline">
                ${data.timeline.map((week, index) => `
                    <div class="timeline-item">
                        <div class="timeline-marker">
                            <div class="timeline-dot"></div>
                            ${index < data.timeline.length - 1 ? '<div class="timeline-line"></div>' : ''}
                        </div>
                        <div class="timeline-content">
                            <div class="timeline-week-badge">${weekLabel} ${week.week}</div>
                            <h5 class="timeline-topic">${Array.isArray(week.topics) ? week.topics.join(', ') : week.topic || week.topics}</h5>
                            <p class="timeline-description">${week.description}</p>
                            ${week.activities && Array.isArray(week.activities) && week.activities.length > 0 ? `
                                <div class="timeline-activities">
                                    <strong>${currentLang === 'ar' ? 'الأنشطة:' : 'Activities:'}</strong>
                                    <ul style="margin-top: 8px; padding-left: 20px;">
                                        ${week.activities.map(activity => `<li style="margin-bottom: 4px;">${activity}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            <div class="timeline-meta">
                                ${week.projects ? `<span class="timeline-tag timeline-tag-project">${currentLang === 'ar' ? 'مشروع' : 'Project'}: ${week.projects}</span>` : ''}
                                ${week.hours ? `<span class="timeline-tag timeline-tag-hours">${week.hours} ${currentLang === 'ar' ? 'ساعة/أسبوع' : 'hrs/week'}</span>` : ''}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="result-section">
            <h4>${milestonesTitle}</h4>
            <ul>
                ${data.milestones.map(m => {
                    if (typeof m === 'object' && m.title) {
                        return `<li><strong>${m.title}:</strong> ${m.description || ''}</li>`;
                    }
                    return `<li>${m}</li>`;
                }).join('')}
            </ul>
        </div>
        
        <div class="result-section">
            <h4>${pathwaysTitle}</h4>
            ${data.careerPaths.map(path => `
                <div class="career-path">
                    <h5>${path.title}</h5>
                    <p>${path.description}</p>
                    ${path.requirements ? `<p><strong>${currentLang === 'ar' ? 'المتطلبات:' : 'Requirements:'}</strong> ${path.requirements}</p>` : ''}
                    <p><strong>${skillsLabel}</strong></p>
                    <div>
                        ${(path.skills || []).map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
                    </div>
                    ${path.steps && path.steps.length > 0 ? `
                        <p><strong>${stepsLabel}</strong></p>
                        <ul>
                            ${path.steps.map(step => `<li>${step}</li>`).join('')}
                        </ul>
                    ` : ''}
                    ${path.growthOpportunities ? `<p><strong>${currentLang === 'ar' ? 'فرص النمو:' : 'Growth Opportunities:'}</strong> ${path.growthOpportunities}</p>` : ''}
                </div>
            `).join('')}
        </div>
    `;
    
        document.getElementById('learning-path-content-display').innerHTML = resultsHTML;
        
        // Store results for email sending
        currentResults['learning-path'] = {
            toolName: currentLang === 'ar' ? 'مولد مسار التعلم' : 'Learning Path Generator',
            results: data,
            language: currentLang
        };
    } catch (error) {
        console.error('Error generating learning path:', error);
        
        // Show error message to user - NO FALLBACK
        const errorTitle = currentLang === 'ar' ? 'خطأ في إنشاء مسار التعلم' : 'Error Generating Learning Path';
        const errorMessage = currentLang === 'ar' 
            ? `فشل الوكيل الذكي في إنشاء مسار التعلم. ${error.message || 'يرجى التحقق من إعدادات API والمحاولة مرة أخرى.'}`
            : `The AI agent failed to generate a learning path. ${error.message || 'Please check your API settings and try again.'}`;
        
        document.getElementById('learning-path-content-display').innerHTML = `
            <div class="error-state" style="text-align: center; padding: 40px; color: #ff4444;">
                <h3>${errorTitle}</h3>
                <p>${errorMessage}</p>
                <p style="margin-top: 20px; font-size: 0.9em; color: #666;">
                    ${currentLang === 'ar' 
                        ? 'يرجى التحقق من أن GEMINI_API_KEY صحيح في ملف .env'
                        : 'Please ensure GEMINI_API_KEY is correct in your .env file'}
                </p>
        </div>
    `;
        return;
    }
}

function generateCurriculum(role, experience, goals, timePerWeek) {
    const baseTopics = [
        {
            topic: "AI Fundamentals & Concepts",
            focus: "Understanding AI, ML, and DL basics",
            resources: "Online courses (Coursera, edX), AI Association workshops"
        },
        {
            topic: "Data Science Foundations",
            focus: "Statistics, data analysis, and visualization",
            resources: "Python for Data Science courses, Kaggle tutorials"
        },
        {
            topic: "Machine Learning Algorithms",
            focus: "Supervised, unsupervised, and reinforcement learning",
            resources: "Hands-on ML book, Scikit-learn tutorials"
        },
        {
            topic: "Deep Learning & Neural Networks",
            focus: "Neural networks, CNNs, RNNs, Transformers",
            resources: "Deep Learning Specialization, PyTorch/TensorFlow docs"
        },
        {
            topic: "AI Ethics & Responsible AI",
            focus: "Bias, fairness, transparency, and governance",
            resources: "AI Ethics courses, industry case studies"
        }
    ];
    
    if (experience === 'advanced') {
        baseTopics.push({
            topic: "Advanced AI Applications",
            focus: "LLMs, Computer Vision, NLP, or domain-specific AI",
            resources: "Research papers, advanced courses, project-based learning"
        });
    }
    
    if (goals.toLowerCase().includes('application') || goals.toLowerCase().includes('build')) {
        baseTopics.push({
            topic: "AI Implementation & MLOps",
            focus: "Deploying AI models, production systems, monitoring",
            resources: "MLOps courses, cloud platform certifications"
        });
    }
    
    return baseTopics.slice(0, 6);
}

function generateTimeline(curriculum, timePerWeek) {
    const timeline = [];
    let week = 1;
    const topicsPerWeek = timePerWeek >= 15 ? 1 : 2; // More time = deeper focus
    
    curriculum.forEach((item, index) => {
        if (index % topicsPerWeek === 0 && index > 0) week++;
        timeline.push({
            week: week,
            topic: item.topic,
            description: `Focus on ${item.focus}. Allocate ${timePerWeek} hours this week.`
        });
    });
    
    return timeline;
}

function generateMilestones(curriculum) {
    return [
        `Complete ${curriculum.length} core topics within the timeline`,
        "Build 2-3 practical AI projects to demonstrate skills",
        "Join AI communities and participate in discussions",
        "Earn relevant certifications or complete course certificates",
        "Create a portfolio showcasing your AI work",
        "Apply AI skills to solve real-world problems in your domain"
    ];
}

function generateCareerPaths(role, experience) {
    const paths = [];
    
    if (role === 'student' || role === 'professional') {
        paths.push({
            title: "AI/ML Engineer",
            description: "Build and deploy AI systems and models",
            skills: ["Python", "TensorFlow/PyTorch", "MLOps", "Cloud Platforms"]
        });
        paths.push({
            title: "Data Scientist",
            description: "Analyze data and build predictive models",
            skills: ["Statistics", "Data Analysis", "Machine Learning", "Visualization"]
        });
    }
    
    if (role === 'executive' || role === 'manager') {
        paths.push({
            title: "AI Strategy Leader",
            description: "Lead AI transformation initiatives",
            skills: ["AI Strategy", "Change Management", "Business Acumen", "AI Ethics"]
        });
    }
    
    if (role === 'educator') {
        paths.push({
            title: "AI Education Specialist",
            description: "Teach and develop AI curriculum",
            skills: ["Pedagogy", "AI Fundamentals", "Curriculum Design", "Educational Technology"]
        });
    }
    
    paths.push({
        title: "AI-Enhanced Professional",
        description: "Apply AI tools to enhance your current role",
        skills: ["AI Tools", "Domain Expertise", "Problem-Solving", "Innovation"]
    });
    
    return paths;
}

function resetLearningPath() {
    document.getElementById('learning-path-results').style.display = 'none';
    document.getElementById('learning-path-form').style.display = 'block';
    document.getElementById('learning-form').reset();
    currentResults['learning-path'] = null;
    document.getElementById('learning-path-email').value = '';
    document.getElementById('learning-path-email-status').textContent = '';
}

// ============================================
// TOOL 3: Job Skills Translator
// ============================================

async function analyzeJobSkills(event) {
    event.preventDefault();
    
    const jobTitle = document.getElementById('job-title').value;
    const responsibilities = document.getElementById('job-responsibilities').value;
    const industry = document.getElementById('industry').value;
    // Get language from localStorage or document, default to 'en'
    const currentLang = localStorage.getItem('language') || (document.documentElement.lang === 'ar' ? 'ar' : 'en');
    
    document.getElementById('job-translator-form').style.display = 'none';
    document.getElementById('job-translator-results').style.display = 'block';
    
    // Show loading state
    const loadingMessage = currentLang === 'ar' 
        ? 'جارٍ تحليل تحول مسيرتك المهنية برؤى مدعومة بالذكاء الاصطناعي...'
        : 'Analyzing your career transformation with AI-powered insights...';
    document.getElementById('job-translator-content-display').innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>${loadingMessage}</p>
        </div>
    `;
    
    try {
        // Call AI-powered API
        const response = await fetch(`${API_BASE_URL}/api/analyze-job-skills`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jobTitle,
                responsibilities,
                industry,
                language: currentLang
            })
        });
        
        console.log('API Request sent with language:', currentLang);
        const data = await response.json();
        console.log('API Response received:', {
            language: currentLang,
            hasTransformations: !!data.transformations,
            firstTransformation: data.transformations?.[0]?.substring(0, 80),
            hasTransferableSkills: !!data.transferableSkills,
            firstSkill: data.transferableSkills?.[0]
        });
        
        // Check if the response is an error
        if (!response.ok || data.error) {
            console.error('API Error:', data.error || data.message);
            throw new Error(data.message || data.error || 'AI agent failed to generate job skills analysis');
        }
        
        // Validate that we have the required data structure
        if (!data.transformations || !Array.isArray(data.transformations)) {
            console.error('Invalid response structure:', data);
            throw new Error('AI agent returned invalid response structure');
        }
        
        console.log('API Response received:', {
            hasTransformations: !!data.transformations,
            hasSkills: !!data.transferableSkills,
            hasCareerOptions: !!data.careerOptions,
            language: currentLang,
            firstTransformation: data.transformations[0]?.substring(0, 50)
        });
        
        // Get labels based on language
        const labels = currentLang === 'ar' ? {
            transformations: 'رؤى تحول الذكاء الاصطناعي',
            transformationsSub: 'كيف سيغير الذكاء الاصطناعي دورك:',
            transferableSkills: 'المهارات القابلة للتحويل',
            transferableSkillsSub: 'هذه المهارات المتمحورة حول الإنسان ستظل قيّمة:',
            newSkills: 'المهارات الجديدة المطلوبة',
            technicalSkills: 'المهارات التقنية:',
            softSkills: 'المهارات الشخصية:',
            careerOptions: 'خيارات الانتقال المهني',
            transitionPath: 'مسار الانتقال:',
            upskillingPlan: 'خطة التطوير الفوري',
            opportunityAnalysis: 'تحليل الفرص'
        } : {
            transformations: 'AI Transformation Insights',
            transformationsSub: 'How AI will change your role:',
            transferableSkills: 'Transferable Skills',
            transferableSkillsSub: 'These human-centric skills will remain valuable:',
            newSkills: 'New Skills Required',
            technicalSkills: 'Technical Skills:',
            softSkills: 'Soft Skills:',
            careerOptions: 'Career Transition Options',
            transitionPath: 'Transition path:',
            upskillingPlan: 'Immediate Upskilling Plan',
            opportunityAnalysis: 'Opportunity Analysis'
        };
        
        const resultsHTML = `
        <div class="result-section">
            <h4>${labels.transformations}</h4>
            <p><strong>${labels.transformationsSub}</strong></p>
            <ul>
                ${data.transformations.map(t => `<li>${t}</li>`).join('')}
            </ul>
        </div>
        
        <div class="result-section">
            <h4>${labels.transferableSkills}</h4>
            <p>${labels.transferableSkillsSub}</p>
            <div style="margin-top: 15px;">
                ${data.transferableSkills.map(skill => `<span class="skill-badge" style="background: var(--teal);">${skill}</span>`).join('')}
            </div>
        </div>
        
        <div class="result-section">
            <h4>${labels.newSkills}</h4>
            <p><strong>${labels.technicalSkills}</strong></p>
            <div style="margin-bottom: 15px;">
                ${data.newSkills.technical.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
            </div>
            <p><strong>${labels.softSkills}</strong></p>
            <div>
                ${data.newSkills.soft.map(skill => `<span class="skill-badge" style="background: var(--dark-blue);">${skill}</span>`).join('')}
            </div>
        </div>
        
        <div class="result-section">
            <h4>${labels.careerOptions}</h4>
            ${data.careerOptions.map(option => `
                <div class="career-path">
                    <h5>${option.title}</h5>
                    <p>${option.description}</p>
                    <p><strong>${labels.transitionPath}</strong> ${option.path}</p>
                </div>
            `).join('')}
        </div>
        
        <div class="result-section">
            <h4>${labels.upskillingPlan}</h4>
            <ul>
                ${data.upskillingPlan.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        ${data.opportunityAnalysis ? `
        <div class="result-section">
            <h4>${labels.opportunityAnalysis}</h4>
            <p style="color: var(--text-light-on-dark);">${data.opportunityAnalysis}</p>
        </div>
        ` : ''}
    `;
    
        document.getElementById('job-translator-content-display').innerHTML = resultsHTML;
        
        // Store results for email sending
        // Use the same currentLang variable from the beginning of the function
        currentResults['job-translator'] = {
            toolName: currentLang === 'ar' ? 'مترجم مهارات الوظائف' : 'Job Skills Translator',
            results: data,
            language: currentLang
        };
    } catch (error) {
        console.error('Error analyzing job skills:', error);
        // Fallback to client-side analysis
        const transformations = analyzeTransformations(jobTitle, responsibilities, industry);
        const transferableSkills = identifyTransferableSkills(responsibilities);
        const newSkills = identifyNewSkills(jobTitle, industry);
        const careerOptions = generateCareerOptions(jobTitle, industry);
        const upskillingPlan = generateUpskillingPlan(jobTitle, newSkills);
        
        document.getElementById('job-translator-content-display').innerHTML = `
        <div class="result-section">
            <h4>AI Transformation Insights</h4>
            <p><strong>How AI will change your role:</strong></p>
            <ul>
                ${transformations.map(t => `<li>${t}</li>`).join('')}
            </ul>
        </div>
        
        <div class="result-section">
            <h4>Transferable Skills</h4>
            <p>These human-centric skills will remain valuable:</p>
            <div style="margin-top: 15px;">
                ${transferableSkills.map(skill => `<span class="skill-badge" style="background: var(--teal);">${skill}</span>`).join('')}
            </div>
        </div>
        
        <div class="result-section">
            <h4>New Skills Required</h4>
            <p><strong>Technical Skills:</strong></p>
            <div style="margin-bottom: 15px;">
                ${newSkills.technical.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
            </div>
            <p><strong>Soft Skills:</strong></p>
            <div>
                ${newSkills.soft.map(skill => `<span class="skill-badge" style="background: var(--dark-blue);">${skill}</span>`).join('')}
            </div>
        </div>
        
        <div class="result-section">
            <h4>Career Transition Options</h4>
            ${careerOptions.map(option => `
                <div class="career-path">
                    <h5>${option.title}</h5>
                    <p>${option.description}</p>
                    <p><strong>Transition path:</strong> ${option.path}</p>
                </div>
            `).join('')}
        </div>
        
        <div class="result-section">
            <h4>Immediate Upskilling Plan</h4>
            <ul>
                ${upskillingPlan.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `;
    }
}

function analyzeTransformations(jobTitle, responsibilities, industry) {
    const transformations = [];
    const titleLower = jobTitle.toLowerCase();
    const respLower = responsibilities.toLowerCase();
    
    if (titleLower.includes('manager') || titleLower.includes('director')) {
        transformations.push("AI will augment decision-making with data-driven insights");
        transformations.push("Automated reporting and analytics will free up time for strategic work");
        transformations.push("AI tools will enhance team productivity and performance tracking");
    }
    
    if (titleLower.includes('analyst') || respLower.includes('analyze')) {
        transformations.push("AI will automate routine data analysis, allowing focus on insights");
        transformations.push("Predictive analytics will become a core capability");
        transformations.push("Real-time data processing will replace batch analysis");
    }
    
    if (titleLower.includes('developer') || titleLower.includes('engineer')) {
        transformations.push("AI-assisted coding will become standard practice");
        transformations.push("Focus will shift to AI integration and model deployment");
        transformations.push("Understanding AI/ML pipelines will be essential");
    }
    
    transformations.push("AI tools will handle repetitive tasks, enabling focus on creative problem-solving");
    transformations.push("Collaboration with AI systems will become a daily part of work");
    transformations.push("Continuous learning and adaptation will be crucial for staying relevant");
    
    return transformations.slice(0, 5);
}

function identifyTransferableSkills(responsibilities) {
    const skills = [];
    const respLower = responsibilities.toLowerCase();
    
    if (respLower.includes('communicat') || respLower.includes('present')) {
        skills.push("Communication");
    }
    if (respLower.includes('team') || respLower.includes('collaborat')) {
        skills.push("Collaboration");
    }
    if (respLower.includes('problem') || respLower.includes('solve')) {
        skills.push("Problem-Solving");
    }
    if (respLower.includes('strateg') || respLower.includes('plan')) {
        skills.push("Strategic Thinking");
    }
    if (respLower.includes('creat') || respLower.includes('innov')) {
        skills.push("Creativity");
    }
    
    // Always include these
    skills.push("Critical Thinking", "Emotional Intelligence", "Ethical Judgment", "Leadership");
    
    return [...new Set(skills)].slice(0, 6);
}

function identifyNewSkills(jobTitle, industry) {
    const technical = [
        "AI Tool Proficiency",
        "Data Literacy",
        "Prompt Engineering",
        "AI Ethics Understanding"
    ];
    
    const soft = [
        "AI Collaboration",
        "Adaptive Learning",
        "Digital Fluency",
        "Change Management"
    ];
    
    const titleLower = jobTitle.toLowerCase();
    
    if (titleLower.includes('manager') || titleLower.includes('director')) {
        technical.push("AI Strategy", "ROI Analysis for AI");
    }
    
    if (titleLower.includes('analyst') || titleLower.includes('data')) {
        technical.push("Machine Learning Basics", "Statistical Modeling");
    }
    
    if (titleLower.includes('developer') || titleLower.includes('engineer')) {
        technical.push("MLOps", "AI Model Deployment", "Python/R for AI");
    }
    
    return { technical, soft };
}

function generateCareerOptions(jobTitle, industry) {
    const options = [];
    const titleLower = jobTitle.toLowerCase();
    
    if (titleLower.includes('manager') || titleLower.includes('director')) {
        options.push({
            title: "AI Transformation Leader",
            description: "Lead AI initiatives and digital transformation in your organization",
            path: "Start with AI strategy courses | Lead pilot projects | Build AI center of excellence"
        });
    }
    
    if (titleLower.includes('analyst')) {
        options.push({
            title: "AI-Powered Data Analyst",
            description: "Evolve into an AI-enhanced analyst using advanced analytics and AI tools",
            path: "Learn AI analytics tools | Master predictive modeling | Specialize in AI-driven insights"
        });
    }
    
    options.push({
        title: "AI Product Manager",
        description: "Manage AI products and services, bridging technical and business domains",
        path: "Understand AI fundamentals | Learn product management | Specialize in AI products"
    });
    
    options.push({
        title: "AI Consultant",
        description: "Help organizations adopt and implement AI solutions",
        path: "Build AI expertise | Gain industry experience | Develop consulting skills"
    });
    
    options.push({
        title: "AI-Enhanced [Your Current Role]",
        description: "Stay in your field but become the AI expert in your domain",
        path: "Apply AI to your current role | Become internal AI champion | Lead AI adoption in your area"
    });
    
    return options.slice(0, 4);
}

function generateUpskillingPlan(jobTitle, newSkills) {
    return [
        "Complete AI fundamentals course (2-4 weeks)",
        `Learn ${newSkills.technical[0]} through hands-on practice (4-6 weeks)`,
        "Join AI communities and attend workshops",
        "Apply AI tools to current work projects",
        "Build a portfolio demonstrating AI-enhanced capabilities",
        "Seek mentorship from AI practitioners in your industry",
        "Consider AI certifications relevant to your role",
        "Stay updated with AI trends through continuous learning"
    ];
}

function resetJobTranslator() {
    document.getElementById('job-translator-results').style.display = 'none';
    document.getElementById('job-translator-form').style.display = 'block';
    document.getElementById('job-form').reset();
    currentResults['job-translator'] = null;
}

// Email sending function
async function sendResultsEmail(toolId) {
    const emailInput = document.getElementById(`${toolId}-email`);
    const statusElement = document.getElementById(`${toolId}-email-status`);
    const sendButton = emailInput.nextElementSibling;
    
    const email = emailInput.value.trim();
    const currentLang = document.documentElement.lang || 'en';
    
    if (!email) {
        statusElement.textContent = currentLang === 'ar' ? 'يرجى إدخال عنوان بريد إلكتروني صحيح' : 'Please enter a valid email address';
        statusElement.style.color = 'var(--sky-blue)';
        return;
    }
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        statusElement.textContent = currentLang === 'ar' ? 'عنوان البريد الإلكتروني غير صحيح' : 'Invalid email address format';
        statusElement.style.color = 'var(--sky-blue)';
        return;
    }
    
    const results = currentResults[toolId];
    if (!results) {
        statusElement.textContent = currentLang === 'ar' ? 'لا توجد نتائج لإرسالها' : 'No results to send';
        statusElement.style.color = 'var(--sky-blue)';
        return;
    }
    
    // Disable button and show loading
    sendButton.disabled = true;
    sendButton.textContent = translations[currentLang]['email-sending'] || 'Sending...';
    statusElement.textContent = '';
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/send-results-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                toolName: results.toolName,
                results: results.results,
                language: results.language
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            statusElement.textContent = translations[currentLang]['email-success'] || 'Results sent successfully! Check your email.';
            statusElement.style.color = '#22A599';
            emailInput.value = '';
        } else {
            // Use user-friendly message if available, otherwise use error message
            const errorMsg = data.userMessage || data.error || 'Failed to send email';
            throw new Error(errorMsg);
        }
    } catch (error) {
        console.error('Error sending email:', error);
        // Display the error message from server if available
        const errorText = error.message || translations[currentLang]['email-error'] || 'Failed to send email. Please try again.';
        statusElement.textContent = errorText;
        statusElement.style.color = '#ff6b6b';
    } finally {
        sendButton.disabled = false;
        sendButton.textContent = translations[currentLang]['send-email'] || 'Send';
    }
}

