// API Base URL - automatically detects the current origin
const API_BASE_URL = window.location.origin;

// Translation System
const translations = {
    en: {
        'logo': 'AI ASSOCIATION',
        'subtitle': 'Interactive AI Tools Platform',
        'conference-info': 'ICAN 2026 | King Saud University, Riyadh | January 28-29, 2026',
        'tab-skills-gap': 'Skills Gap Analyzer',
        'tab-learning-path': 'Learning Path Generator',
        'tab-job-translator': 'Job Skills Translator',
        'skills-gap-title': 'AI Skills Gap Analyzer',
        'skills-gap-description': 'Assess your organization\'s AI readiness and identify critical skill gaps',
        'skills-gap-track': 'Track: Building National Capacities',
        'what-youll-get': 'What You\'ll Get',
        'benefit-1': 'Readiness Score (0-100)',
        'benefit-2': 'Top 3 Priority Gaps',
        'benefit-3': 'Action Roadmap',
        'benefit-4': 'Industry Benchmark Comparison',
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
        'footer': 'AI Association | ICAN 2026 Conference | Interactive AI Tools Platform',
        'home-title': 'Empowering AI Excellence',
        'home-description': 'AI Association and ICAN 2026 present intelligent tools to bridge the gap between current capabilities and future AI readiness.',
        'tool-card-1-title': 'Skills Gap Analyzer',
        'tool-card-1-description': 'Assess your organization\'s AI readiness and identify critical skill gaps. Get a comprehensive analysis with actionable insights and industry benchmarks.',
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
        'email-error': 'Failed to send email. Please try again.'
    },
    ar: {
        'logo': 'جمعية الذكاء الاصطناعي',
        'subtitle': 'منصة أدوات الذكاء الاصطناعي التفاعلية',
        'conference-info': 'ICAN 2026 | جامعة الملك سعود، الرياض | 28-29 يناير 2026',
        'tab-skills-gap': 'محلل فجوات المهارات',
        'tab-learning-path': 'مولد مسار التعلم',
        'tab-job-translator': 'مترجم مهارات الوظائف',
        'skills-gap-title': 'محلل فجوات مهارات الذكاء الاصطناعي',
        'skills-gap-description': 'قيم جاهزية منظمتك للذكاء الاصطناعي وحدد فجوات المهارات الحرجة',
        'skills-gap-track': 'المسار: بناء القدرات الوطنية',
        'what-youll-get': 'ما ستحصل عليه',
        'benefit-1': 'نقاط الجاهزية (0-100)',
        'benefit-2': 'أهم 3 فجوات أولوية',
        'benefit-3': 'خارطة طريق العمل',
        'benefit-4': 'مقارنة معايير الصناعة',
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
        'footer': 'جمعية الذكاء الاصطناعي | مؤتمر ICAN 2026 | منصة أدوات الذكاء الاصطناعي التفاعلية',
        'home-title': 'تمكين التميز في الذكاء الاصطناعي',
        'home-description': 'تقدم جمعية الذكاء الاصطناعي ومؤتمر ICAN 2026 أدوات ذكية لسد الفجوة بين القدرات الحالية والجاهزية المستقبلية للذكاء الاصطناعي.',
        'tool-card-1-title': 'محلل فجوات المهارات',
        'tool-card-1-description': 'قيم جاهزية منظمتك للذكاء الاصطناعي وحدد فجوات المهارات الحرجة. احصل على تحليل شامل مع رؤى قابلة للتنفيذ ومعايير الصناعة.',
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
        'email-error': 'فشل إرسال البريد الإلكتروني. يرجى المحاولة مرة أخرى.'
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

const skillsGapQuestions = [
    {
        question: {
            en: "What is your organization's current level of AI adoption?",
            ar: "ما هو مستوى اعتماد منظمتك الحالي للذكاء الاصطناعي؟"
        },
        options: [
            { text: { en: "No AI initiatives yet", ar: "لا توجد مبادرات ذكاء اصطناعي بعد" }, value: 10 },
            { text: { en: "Exploring AI possibilities", ar: "استكشاف إمكانيات الذكاء الاصطناعي" }, value: 25 },
            { text: { en: "Pilot projects in progress", ar: "مشاريع تجريبية قيد التنفيذ" }, value: 50 },
            { text: { en: "AI integrated in some processes", ar: "الذكاء الاصطناعي مدمج في بعض العمليات" }, value: 75 },
            { text: { en: "AI is core to our operations", ar: "الذكاء الاصطناعي أساسي في عملياتنا" }, value: 100 }
        ]
    },
    {
        question: {
            en: "How would you rate your organization's data quality and availability?",
            ar: "كيف تقيم جودة البيانات وتوفرها في منظمتك؟"
        },
        options: [
            { text: { en: "Poor - Data is scattered and unreliable", ar: "ضعيف - البيانات مبعثرة وغير موثوقة" }, value: 10 },
            { text: { en: "Fair - Some data available but needs cleaning", ar: "متوسط - بعض البيانات متاحة لكنها تحتاج تنظيف" }, value: 30 },
            { text: { en: "Good - Most data is accessible and clean", ar: "جيد - معظم البيانات قابلة للوصول ونظيفة" }, value: 60 },
            { text: { en: "Excellent - Comprehensive, clean, and accessible data", ar: "ممتاز - بيانات شاملة ونظيفة وقابلة للوصول" }, value: 100 }
        ]
    },
    {
        question: {
            en: "What is the level of AI/ML expertise in your organization?",
            ar: "ما هو مستوى الخبرة في الذكاء الاصطناعي/التعلم الآلي في منظمتك؟"
        },
        options: [
            { text: { en: "No AI/ML expertise", ar: "لا توجد خبرة في الذكاء الاصطناعي/التعلم الآلي" }, value: 10 },
            { text: { en: "Few individuals with basic knowledge", ar: "قلة من الأفراد لديهم معرفة أساسية" }, value: 30 },
            { text: { en: "Several team members with intermediate skills", ar: "عدة أعضاء في الفريق لديهم مهارات متوسطة" }, value: 60 },
            { text: { en: "Dedicated AI team with advanced expertise", ar: "فريق مخصص للذكاء الاصطناعي بخبرة متقدمة" }, value: 100 }
        ]
    },
    {
        question: {
            en: "How mature is your organization's data infrastructure?",
            ar: "ما مدى نضج البنية التحتية للبيانات في منظمتك؟"
        },
        options: [
            { text: { en: "Basic - Limited data storage and processing", ar: "أساسي - تخزين ومعالجة بيانات محدودة" }, value: 15 },
            { text: { en: "Developing - Some cloud infrastructure", ar: "نامي - بعض البنية التحتية السحابية" }, value: 40 },
            { text: { en: "Advanced - Robust cloud and data pipelines", ar: "متقدم - بنية سحابية قوية وخطوط بيانات" }, value: 70 },
            { text: { en: "Enterprise-grade - Fully automated data infrastructure", ar: "مستوى المؤسسات - بنية تحتية للبيانات مؤتمتة بالكامل" }, value: 100 }
        ]
    },
    {
        question: {
            en: "What is your leadership's commitment to AI transformation?",
            ar: "ما هو التزام قيادتك بتحول الذكاء الاصطناعي؟"
        },
        options: [
            { text: { en: "No clear commitment or strategy", ar: "لا يوجد التزام أو استراتيجية واضحة" }, value: 10 },
            { text: { en: "Some interest but no formal strategy", ar: "بعض الاهتمام لكن لا توجد استراتيجية رسمية" }, value: 30 },
            { text: { en: "Clear strategy with moderate investment", ar: "استراتيجية واضحة مع استثمار معتدل" }, value: 60 },
            { text: { en: "Strong commitment with significant investment", ar: "التزام قوي مع استثمار كبير" }, value: 100 }
        ]
    },
    {
        question: {
            en: "How well does your organization handle change management?",
            ar: "ما مدى جودة تعامل منظمتك مع إدارة التغيير؟"
        },
        options: [
            { text: { en: "Struggles with change", ar: "تواجه صعوبات مع التغيير" }, value: 20 },
            { text: { en: "Moderate change management capabilities", ar: "قدرات معتدلة في إدارة التغيير" }, value: 50 },
            { text: { en: "Good at managing organizational change", ar: "جيدة في إدارة التغيير التنظيمي" }, value: 80 },
            { text: { en: "Excellent change management culture", ar: "ثقافة ممتازة في إدارة التغيير" }, value: 100 }
        ]
    },
    {
        question: {
            en: "What is your organization's budget allocation for AI initiatives?",
            ar: "ما هي تخصيصات ميزانية منظمتك لمبادرات الذكاء الاصطناعي؟"
        },
        options: [
            { text: { en: "No dedicated budget", ar: "لا توجد ميزانية مخصصة" }, value: 10 },
            { text: { en: "Limited budget (< 5% of IT budget)", ar: "ميزانية محدودة (< 5% من ميزانية تكنولوجيا المعلومات)" }, value: 30 },
            { text: { en: "Moderate budget (5-15% of IT budget)", ar: "ميزانية معتدلة (5-15% من ميزانية تكنولوجيا المعلومات)" }, value: 60 },
            { text: { en: "Significant budget (> 15% of IT budget)", ar: "ميزانية كبيرة (> 15% من ميزانية تكنولوجيا المعلومات)" }, value: 100 }
        ]
    },
    {
        question: {
            en: "How would you rate your organization's understanding of AI use cases?",
            ar: "كيف تقيم فهم منظمتك لحالات استخدام الذكاء الاصطناعي؟"
        },
        options: [
            { text: { en: "Limited understanding of AI applications", ar: "فهم محدود لتطبيقات الذكاء الاصطناعي" }, value: 15 },
            { text: { en: "Basic understanding of potential use cases", ar: "فهم أساسي لحالات الاستخدام المحتملة" }, value: 40 },
            { text: { en: "Good understanding with identified opportunities", ar: "فهم جيد مع فرص محددة" }, value: 70 },
            { text: { en: "Deep understanding with clear implementation roadmap", ar: "فهم عميق مع خارطة طريق تنفيذ واضحة" }, value: 100 }
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
        
        const priorityGapsText = translations[currentLang]['priority-gaps'] || 'Priority Gaps';
        const actionRoadmapText = translations[currentLang]['action-roadmap'] || 'Action Roadmap';
        const roadmapIntroText = translations[currentLang]['roadmap-intro'] || 'Based on your assessment, here\'s where to start:';
        const industryBenchmarkText = translations[currentLang]['industry-benchmark'] || 'Industry Benchmark';
        const yourScoreText = translations[currentLang]['your-score'] || 'Your Score';
        const industryAvgText = translations[currentLang]['industry-avg'] || 'Industry Avg';
        const topPerformersText = translations[currentLang]['top-performers'] || 'Top Performers';
        const strategicInsightsText = translations[currentLang]['strategic-insights'] || 'Strategic Insights';
        
        const resultsHTML = `
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
            
            <div class="result-section">
                <h4>${industryBenchmarkText}</h4>
                <div class="benchmark-comparison">
                    <div class="benchmark-item">
                        <strong>${yourScoreText}</strong>
                        <div>${data.readinessScore}/100</div>
                    </div>
                    <div class="benchmark-item">
                        <strong>${industryAvgText}</strong>
                        <div>${data.benchmark.industryAvg}/100</div>
                    </div>
                    <div class="benchmark-item">
                        <strong>${topPerformersText}</strong>
                        <div>${data.benchmark.topPerformers}/100</div>
                    </div>
                </div>
                <p style="margin-top: 20px; color: var(--text-muted-on-dark);">
                    ${data.benchmark.message}
                </p>
            </div>
            ${data.insights ? `
            <div class="result-section">
                <h4>${strategicInsightsText}</h4>
                <p style="color: var(--text-light-on-dark);">${data.insights}</p>
            </div>
            ` : ''}
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
        
        const gaps = identifyGaps(skillsGapAnswers);
        const benchmark = getBenchmark(readinessScore);
        
        const priorityGapsText = translations[currentLang]['priority-gaps'] || 'Priority Gaps';
        const actionRoadmapText = translations[currentLang]['action-roadmap'] || 'Action Roadmap';
        const roadmapIntroText = translations[currentLang]['roadmap-intro'] || 'Based on your assessment, here\'s where to start:';
        const industryBenchmarkText = translations[currentLang]['industry-benchmark'] || 'Industry Benchmark';
        const yourScoreText = translations[currentLang]['your-score'] || 'Your Score';
        const industryAvgText = translations[currentLang]['industry-avg'] || 'Industry Avg';
        const topPerformersText = translations[currentLang]['top-performers'] || 'Top Performers';
        
        document.getElementById('results-content').innerHTML = `
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
                    ${getRoadmap(readinessScore).map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="result-section">
                <h4>${industryBenchmarkText}</h4>
                <div class="benchmark-comparison">
                    <div class="benchmark-item">
                        <strong>${yourScoreText}</strong>
                        <div>${readinessScore}/100</div>
                    </div>
                    <div class="benchmark-item">
                        <strong>${industryAvgText}</strong>
                        <div>${benchmark.industryAvg}/100</div>
                    </div>
                    <div class="benchmark-item">
                        <strong>${topPerformersText}</strong>
                        <div>${benchmark.topPerformers}/100</div>
                    </div>
                </div>
                <p style="margin-top: 20px; color: var(--text-muted-on-dark);">
                    ${benchmark.message}
                </p>
            </div>
        `;
    }
}

function identifyGaps(answers) {
    const gaps = [];
    const avgScore = answers.reduce((a, b) => a + b, 0) / answers.length;
    
    if (answers[0] < 50) gaps.push("AI Strategy & Vision: Develop a clear AI strategy aligned with business objectives");
    if (answers[1] < 50) gaps.push("Data Foundation: Improve data quality, governance, and accessibility");
    if (answers[2] < 50) gaps.push("Technical Talent: Build or acquire AI/ML expertise through training or hiring");
    if (answers[3] < 50) gaps.push("Infrastructure: Invest in scalable cloud infrastructure and data pipelines");
    if (answers[4] < 50) gaps.push("Leadership Support: Secure executive commitment and allocate dedicated resources");
    
    return gaps.slice(0, 3);
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
        return {
            industryAvg: 45,
            topPerformers: 85,
            message: "You're below industry average. Focus on building foundational capabilities first."
        };
    } else if (score < 70) {
        return {
            industryAvg: 55,
            topPerformers: 90,
            message: "You're near industry average. Accelerate your AI journey with strategic investments."
        };
    } else {
        return {
            industryAvg: 60,
            topPerformers: 95,
            message: "You're above average! Focus on scaling and advanced AI capabilities."
        };
    }
}

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
        const durationLabel = currentLang === 'ar' ? 'المدة:' : 'Duration:';
        const weekLabel = currentLang === 'ar' ? 'الأسبوع' : 'Week';
        const skillsLabel = currentLang === 'ar' ? 'المهارات المطلوبة:' : 'Skills to develop:';
        const stepsLabel = currentLang === 'ar' ? 'الخطوات:' : 'Steps:';
        
        // Function to convert resources text to clickable links
        const formatResources = (resourcesText) => {
            if (!resourcesText) return '';
            
            // Pattern to match URLs
            const urlPattern = /(https?:\/\/[^\s\)،,]+)/g;
            
            // Try to match "Resource Name - URL" or "Resource Name: URL" or "Resource Name، URL"
            // This regex matches: text (name) followed by separator (-, :, ،, or ,) followed by URL
            const resourcePattern = /([^-\n:،,]+?)\s*[-:،,]\s*(https?:\/\/[^\s\)،,]+)/g;
            
            let result = '';
            const matches = [];
            let match;
            
            // Find all matches
            resourcePattern.lastIndex = 0;
            while ((match = resourcePattern.exec(resourcesText)) !== null) {
                matches.push({
                    name: match[1].trim(),
                    url: match[2],
                    fullMatch: match[0],
                    index: match.index
                });
            }
            
            if (matches.length > 0) {
                // Build result with clickable links
                let lastIndex = 0;
                matches.forEach((matchItem, index) => {
                    // Add text before this match
                    if (matchItem.index > lastIndex) {
                        result += resourcesText.substring(lastIndex, matchItem.index);
                    }
                    
                    // Add the clickable link
                    result += `<a href="${matchItem.url}" target="_blank" rel="noopener noreferrer" class="resource-link">${matchItem.name}</a>`;
                    
                    // Add separator if not last
                    if (index < matches.length - 1) {
                        result += currentLang === 'ar' ? '، ' : ', ';
                    }
                    
                    lastIndex = matchItem.index + matchItem.fullMatch.length;
                });
                
                // Add remaining text
                if (lastIndex < resourcesText.length) {
                    result += resourcesText.substring(lastIndex);
                }
            } else {
                // No structured format found, just make URLs clickable
                result = resourcesText.replace(urlPattern, (url) => {
                    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="resource-link">${url}</a>`;
                });
            }
            
            return result;
        };
        
        const resultsHTML = `
        <div class="result-section">
            <h4>${curriculumTitle}</h4>
            ${data.curriculum.map((item, index) => `
                <div class="learning-path-item">
                    <h5>${index + 1}. ${item.topic}</h5>
                    <p><strong>${focusLabel}</strong> ${item.focus}</p>
                    <p><strong>${resourcesLabel}</strong> <span class="resources-content">${formatResources(item.resources || '')}</span></p>
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
                            <div class="timeline-meta">
                                ${week.projects ? `<span class="timeline-tag timeline-tag-project">${currentLang === 'ar' ? 'مشروع' : 'Project'}</span>` : ''}
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
                ${data.milestones.map(m => `<li>${m}</li>`).join('')}
            </ul>
        </div>
        
        <div class="result-section">
            <h4>${pathwaysTitle}</h4>
            ${data.careerPaths.map(path => `
                <div class="career-path">
                    <h5>${path.title}</h5>
                    <p>${path.description}</p>
                    <p><strong>${skillsLabel}</strong></p>
                    <div>
                        ${path.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
                    </div>
                    ${path.steps ? `
                        <p><strong>${stepsLabel}</strong></p>
                        <ul>
                            ${path.steps.map(step => `<li>${step}</li>`).join('')}
                        </ul>
                    ` : ''}
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
    const currentLang = document.documentElement.lang || localStorage.getItem('language') || 'en';
    
    document.getElementById('job-translator-form').style.display = 'none';
    document.getElementById('job-translator-results').style.display = 'block';
    
    // Show loading state
    document.getElementById('job-translator-content-display').innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>Analyzing your career transformation with AI-powered insights...</p>
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
        
        const data = await response.json();
        
        // Check if the response is an error
        if (!response.ok || data.error) {
            throw new Error(data.message || data.error || 'AI agent failed to generate job skills analysis');
        }
        
        // Validate that we have the required data structure
        if (!data.transformations || !Array.isArray(data.transformations)) {
            throw new Error('AI agent returned invalid response structure');
        }
        
        const resultsHTML = `
        <div class="result-section">
            <h4>AI Transformation Insights</h4>
            <p><strong>How AI will change your role:</strong></p>
            <ul>
                ${data.transformations.map(t => `<li>${t}</li>`).join('')}
            </ul>
        </div>
        
        <div class="result-section">
            <h4>Transferable Skills</h4>
            <p>These human-centric skills will remain valuable:</p>
            <div style="margin-top: 15px;">
                ${data.transferableSkills.map(skill => `<span class="skill-badge" style="background: var(--teal);">${skill}</span>`).join('')}
            </div>
        </div>
        
        <div class="result-section">
            <h4>New Skills Required</h4>
            <p><strong>Technical Skills:</strong></p>
            <div style="margin-bottom: 15px;">
                ${data.newSkills.technical.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
            </div>
            <p><strong>Soft Skills:</strong></p>
            <div>
                ${data.newSkills.soft.map(skill => `<span class="skill-badge" style="background: var(--dark-blue);">${skill}</span>`).join('')}
            </div>
        </div>
        
        <div class="result-section">
            <h4>Career Transition Options</h4>
            ${data.careerOptions.map(option => `
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
                ${data.upskillingPlan.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        ${data.opportunityAnalysis ? `
        <div class="result-section">
            <h4>Opportunity Analysis</h4>
            <p style="color: var(--text-light-on-dark);">${data.opportunityAnalysis}</p>
        </div>
        ` : ''}
    `;
    
        document.getElementById('job-translator-content-display').innerHTML = resultsHTML;
        
        // Store results for email sending
        const currentLang = document.documentElement.lang || 'en';
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

