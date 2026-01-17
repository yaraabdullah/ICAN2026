// Tab Navigation
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const toolSections = document.querySelectorAll('.tool-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const toolId = button.getAttribute('data-tool');
            
            // Remove active class from all tabs and sections
            tabButtons.forEach(btn => btn.classList.remove('active'));
            toolSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding section
            button.classList.add('active');
            document.getElementById(toolId).classList.add('active');
        });
    });
});

// ============================================
// TOOL 1: AI Skills Gap Analyzer
// ============================================

const skillsGapQuestions = [
    {
        question: "What is your organization's current level of AI adoption?",
        options: [
            { text: "No AI initiatives yet", value: 10 },
            { text: "Exploring AI possibilities", value: 25 },
            { text: "Pilot projects in progress", value: 50 },
            { text: "AI integrated in some processes", value: 75 },
            { text: "AI is core to our operations", value: 100 }
        ]
    },
    {
        question: "How would you rate your organization's data quality and availability?",
        options: [
            { text: "Poor - Data is scattered and unreliable", value: 10 },
            { text: "Fair - Some data available but needs cleaning", value: 30 },
            { text: "Good - Most data is accessible and clean", value: 60 },
            { text: "Excellent - Comprehensive, clean, and accessible data", value: 100 }
        ]
    },
    {
        question: "What is the level of AI/ML expertise in your organization?",
        options: [
            { text: "No AI/ML expertise", value: 10 },
            { text: "Few individuals with basic knowledge", value: 30 },
            { text: "Several team members with intermediate skills", value: 60 },
            { text: "Dedicated AI team with advanced expertise", value: 100 }
        ]
    },
    {
        question: "How mature is your organization's data infrastructure?",
        options: [
            { text: "Basic - Limited data storage and processing", value: 15 },
            { text: "Developing - Some cloud infrastructure", value: 40 },
            { text: "Advanced - Robust cloud and data pipelines", value: 70 },
            { text: "Enterprise-grade - Fully automated data infrastructure", value: 100 }
        ]
    },
    {
        question: "What is your leadership's commitment to AI transformation?",
        options: [
            { text: "No clear commitment or strategy", value: 10 },
            { text: "Some interest but no formal strategy", value: 30 },
            { text: "Clear strategy with moderate investment", value: 60 },
            { text: "Strong commitment with significant investment", value: 100 }
        ]
    },
    {
        question: "How well does your organization handle change management?",
        options: [
            { text: "Struggles with change", value: 20 },
            { text: "Moderate change management capabilities", value: 50 },
            { text: "Good at managing organizational change", value: 80 },
            { text: "Excellent change management culture", value: 100 }
        ]
    },
    {
        question: "What is your organization's budget allocation for AI initiatives?",
        options: [
            { text: "No dedicated budget", value: 10 },
            { text: "Limited budget (< 5% of IT budget)", value: 30 },
            { text: "Moderate budget (5-15% of IT budget)", value: 60 },
            { text: "Significant budget (> 15% of IT budget)", value: 100 }
        ]
    },
    {
        question: "How would you rate your organization's understanding of AI use cases?",
        options: [
            { text: "Limited understanding of AI applications", value: 15 },
            { text: "Basic understanding of potential use cases", value: 40 },
            { text: "Good understanding with identified opportunities", value: 70 },
            { text: "Deep understanding with clear implementation roadmap", value: 100 }
        ]
    }
];

let currentQuestionIndex = 0;
let skillsGapAnswers = [];

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
    
    document.getElementById('skills-gap-progress').style.width = progress + '%';
    
    container.innerHTML = `
        <div class="question-card">
            <h3>Question ${currentQuestionIndex + 1} of ${skillsGapQuestions.length}</h3>
            <h3>${question.question}</h3>
            <div class="answer-options">
                ${question.options.map((option, index) => `
                    <div class="answer-option" onclick="selectAnswer(${index})">
                        ${option.text}
                    </div>
                `).join('')}
            </div>
            <div class="question-nav">
                ${currentQuestionIndex > 0 ? '<button class="btn-secondary" onclick="previousQuestion()">Previous</button>' : '<div></div>'}
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
    
    // Show loading state
    document.getElementById('results-content').innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>Analyzing your organization's AI readiness with AI-powered insights...</p>
        </div>
    `;
    
    try {
        // Call AI-powered API
        const response = await fetch('http://localhost:3000/api/analyze-skills-gap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                answers: skillsGapAnswers,
                organizationInfo: null // Can be enhanced to collect this
            })
        });
        
        const data = await response.json();
        
        // Animate score
        animateScore('readiness-score', data.readinessScore);
        
        const resultsHTML = `
            <div class="result-section">
                <h4>Priority Gaps</h4>
                <ul>
                    ${data.priorityGaps.map(gap => `<li>${gap}</li>`).join('')}
                </ul>
            </div>
            
            <div class="result-section">
                <h4>Action Roadmap</h4>
                <p>Based on your assessment, here's where to start:</p>
                <ul>
                    ${data.roadmap.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="result-section">
                <h4>Industry Benchmark</h4>
                <div class="benchmark-comparison">
                    <div class="benchmark-item">
                        <strong>Your Score</strong>
                        <div>${data.readinessScore}/100</div>
                    </div>
                    <div class="benchmark-item">
                        <strong>Industry Avg</strong>
                        <div>${data.benchmark.industryAvg}/100</div>
                    </div>
                    <div class="benchmark-item">
                        <strong>Top Performers</strong>
                        <div>${data.benchmark.topPerformers}/100</div>
                    </div>
                </div>
                <p style="margin-top: 20px; color: var(--text-muted-on-dark);">
                    ${data.benchmark.message}
                </p>
            </div>
            ${data.insights ? `
            <div class="result-section">
                <h4>Strategic Insights</h4>
                <p style="color: var(--text-light-on-dark);">${data.insights}</p>
            </div>
            ` : ''}
        `;
        
        document.getElementById('results-content').innerHTML = resultsHTML;
    } catch (error) {
        console.error('Error fetching analysis:', error);
        // Fallback to client-side analysis
        const totalScore = skillsGapAnswers.reduce((sum, score) => sum + score, 0);
        const readinessScore = Math.round(totalScore / skillsGapQuestions.length);
        animateScore('readiness-score', readinessScore);
        
        const gaps = identifyGaps(skillsGapAnswers);
        const benchmark = getBenchmark(readinessScore);
        
        document.getElementById('results-content').innerHTML = `
            <div class="result-section">
                <h4>Priority Gaps</h4>
                <ul>
                    ${gaps.map(gap => `<li>${gap}</li>`).join('')}
                </ul>
            </div>
            
            <div class="result-section">
                <h4>Action Roadmap</h4>
                <p>Based on your assessment, here's where to start:</p>
                <ul>
                    ${getRoadmap(readinessScore).map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
            
            <div class="result-section">
                <h4>Industry Benchmark</h4>
                <div class="benchmark-comparison">
                    <div class="benchmark-item">
                        <strong>Your Score</strong>
                        <div>${readinessScore}/100</div>
                    </div>
                    <div class="benchmark-item">
                        <strong>Industry Avg</strong>
                        <div>${benchmark.industryAvg}/100</div>
                    </div>
                    <div class="benchmark-item">
                        <strong>Top Performers</strong>
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
    document.getElementById('skills-gap-intro').style.display = 'flex';
    currentQuestionIndex = 0;
    skillsGapAnswers = [];
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
    
    document.getElementById('learning-path-form').style.display = 'none';
    document.getElementById('learning-path-results').style.display = 'block';
    
    // Show loading state
    document.getElementById('learning-path-content-display').innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>Generating your personalized AI learning path...</p>
        </div>
    `;
    
    try {
        // Call AI-powered API
        const response = await fetch('http://localhost:3000/api/generate-learning-path', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                role,
                experience,
                goals,
                timePerWeek,
                industry: null
            })
        });
        
        const data = await response.json();
        
        const resultsHTML = `
        <div class="result-section">
            <h4>Custom Curriculum</h4>
            ${data.curriculum.map((item, index) => `
                <div class="learning-path-item">
                    <h5>${index + 1}. ${item.topic}</h5>
                    <p><strong>Focus:</strong> ${item.focus}</p>
                    <p><strong>Resources:</strong> ${item.resources}</p>
                </div>
            `).join('')}
        </div>
        
        <div class="result-section">
            <h4>Learning Timeline</h4>
            <div class="timeline">
                ${data.timeline.map(week => `
                    <div class="timeline-item">
                        <div class="timeline-week">Week ${week.week}</div>
                        <div class="timeline-content">
                            <strong>${week.topic}</strong>
                            <p>${week.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="result-section">
            <h4>Key Milestones</h4>
            <ul>
                ${data.milestones.map(m => `<li>${m}</li>`).join('')}
            </ul>
        </div>
        
        <div class="result-section">
            <h4>Career Pathways</h4>
            ${data.careerPaths.map(path => `
                <div class="career-path">
                    <h5>${path.title}</h5>
                    <p>${path.description}</p>
                    <p><strong>Skills to develop:</strong></p>
                    <div>
                        ${path.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
        document.getElementById('learning-path-content-display').innerHTML = resultsHTML;
    } catch (error) {
        console.error('Error generating learning path:', error);
        // Fallback to client-side generation
        const curriculum = generateCurriculum(role, experience, goals, timePerWeek);
        const timeline = generateTimeline(curriculum, timePerWeek);
        const milestones = generateMilestones(curriculum);
        const careerPaths = generateCareerPaths(role, experience);
        
        document.getElementById('learning-path-content-display').innerHTML = `
        <div class="result-section">
            <h4>Custom Curriculum</h4>
            ${curriculum.map((item, index) => `
                <div class="learning-path-item">
                    <h5>${index + 1}. ${item.topic}</h5>
                    <p><strong>Focus:</strong> ${item.focus}</p>
                    <p><strong>Resources:</strong> ${item.resources}</p>
                </div>
            `).join('')}
        </div>
        
        <div class="result-section">
            <h4>Learning Timeline</h4>
            <div class="timeline">
                ${timeline.map(week => `
                    <div class="timeline-item">
                        <div class="timeline-week">Week ${week.week}</div>
                        <div class="timeline-content">
                            <strong>${week.topic}</strong>
                            <p>${week.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="result-section">
            <h4>Key Milestones</h4>
            <ul>
                ${milestones.map(m => `<li>${m}</li>`).join('')}
            </ul>
        </div>
        
        <div class="result-section">
            <h4>Career Pathways</h4>
            ${careerPaths.map(path => `
                <div class="career-path">
                    <h5>${path.title}</h5>
                    <p>${path.description}</p>
                    <p><strong>Skills to develop:</strong></p>
                    <div>
                        ${path.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
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
}

// ============================================
// TOOL 3: Job Skills Translator
// ============================================

async function analyzeJobSkills(event) {
    event.preventDefault();
    
    const jobTitle = document.getElementById('job-title').value;
    const responsibilities = document.getElementById('job-responsibilities').value;
    const industry = document.getElementById('industry').value;
    
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
        const response = await fetch('http://localhost:3000/api/analyze-job-skills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jobTitle,
                responsibilities,
                industry
            })
        });
        
        const data = await response.json();
        
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
}

