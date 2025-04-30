/**
 * job-detail.js - Job Detail Page JavaScript
 * Handles the functionality of the job detail page including:
 * - Loading job details from the server
 * - Saving/bookmarking the job
 * - Sharing functionality
 * - Application tracking
 */

// Mock data for job listings (in a real app, this would come from an API)
const mockJobDetails = {
    "job1": {
        id: "job1",
        title: "Software Engineering Intern",
        company: "Tinuiti",
        companyLogo: "https://via.placeholder.com/64",
        industry: "Advertising, PR & Marketing",
        salary: "$9K/mo+",
        jobType: "Full-time job",
        location: "United States (Remote)",
        date: "1 week ago",
        postedDate: "April 10, 2025",
        experience: "Entry-Level",
        description: `<h4>About the Role</h4>
            <p>Tinuiti is seeking a talented Software Engineering Intern to join our growing development team for the summer. This is an excellent opportunity for a computer science student to gain hands-on experience in a fast-paced advertising technology environment.</p>
            
            <p>As a Software Engineering Intern, you will work closely with our engineering team to develop and maintain web applications, assist in building new features, and troubleshoot issues in our proprietary marketing platform.</p>
            
            <h4>What You'll Do</h4>
            <ul>
                <li>Collaborate with senior engineers to design and implement new features</li>
                <li>Write clean, efficient, and well-documented code</li>
                <li>Participate in code reviews and team meetings</li>
                <li>Debug and fix issues in existing applications</li>
                <li>Assist in testing and quality assurance processes</li>
                <li>Learn and apply best practices in software development</li>
            </ul>`,
        skills: [
            "Proficiency in Python, JavaScript, and/or React",
            "Knowledge of web development fundamentals (HTML, CSS)",
            "Basic understanding of databases and SQL",
            "Familiarity with version control systems (Git)",
            "Strong problem-solving abilities",
            "Excellent communication and teamwork skills"
        ],
        qualifications: [
            "Currently enrolled in a Bachelor's or Master's degree in Computer Science or related field",
            "Minimum GPA of 3.0",
            "Previous coursework in data structures, algorithms, and web development",
            "Previous internship or project experience is a plus",
            "Interest in advertising technology and marketing analytics"
        ],
        companyDescription: "Tinuiti is the largest independent performance marketing firm across Streaming TV and the Triopoly of Google, Meta, Amazon, with nearly $3 billion in digital media under management and over 1,000 employees. With industry-leading expertise in search, social, Amazon and marketplaces, addressable TV and mobile apps, CRM and email marketing, and more, Tinuiti understands that success requires both strategy and channel expertise.",
        companySize: "500-1,000 employees",
        companyWebsite: "https://www.tinuiti.com",
        employeeRating: 4.2,
        workLifeBalance: 4.0,
        careerGrowth: 4.3,
        interviewDifficulty: 3.5,
        interviewQuestions: [
            "Describe a project you've worked on that you're proud of.",
            "What is your experience with Python and JavaScript?",
            "How would you approach debugging a complex issue?",
            "Explain how you would implement a simple web application from scratch."
        ]
    },
    "job2": {
        id: "job2",
        title: "Software Engineer Intern",
        company: "Structured Labs",
        companyLogo: "https://via.placeholder.com/64",
        industry: "Internet & Software",
        salary: "$20/hr",
        jobType: "Full-time job",
        location: "Remote",
        date: "1 week ago",
        postedDate: "April 11, 2025",
        experience: "Entry-Level",
        description: `<h4>About Structured Labs</h4>
            <p>Structured Labs is an innovative software company specializing in AI-powered data analysis tools. We're looking for talented interns to join our engineering team and help build the next generation of data processing solutions.</p>
            
            <h4>Internship Overview</h4>
            <p>As a Software Engineer Intern, you will work directly with our engineering team on real projects that impact our products and customers. This is a hands-on role where you'll learn modern software development practices while contributing to our codebase.</p>
            
            <h4>Responsibilities</h4>
            <ul>
                <li>Develop and maintain backend services using Java and Spring</li>
                <li>Implement and optimize database queries</li>
                <li>Assist in designing and implementing new features</li>
                <li>Write unit and integration tests</li>
                <li>Participate in agile development processes</li>
                <li>Document code and contribute to technical documentation</li>
            </ul>`,
        skills: [
            "Java programming experience",
            "Familiarity with Spring Framework",
            "Basic SQL knowledge",
            "Understanding of RESTful APIs",
            "Experience with version control systems (Git)",
            "Problem-solving and analytical skills",
            "Good communication abilities"
        ],
        qualifications: [
            "Currently pursuing a BS/MS in Computer Science or related field",
            "GPA of 3.2 or higher",
            "Coursework in data structures, algorithms, and database systems",
            "Previous project experience (academic or personal)",
            "Ability to work 40 hours per week during the internship period"
        ],
        companyDescription: "Structured Labs is a fast-growing startup that specializes in creating advanced data processing tools using artificial intelligence and machine learning. Our flagship product helps businesses analyze and extract insights from unstructured data sources.",
        companySize: "50-200 employees",
        companyWebsite: "https://www.structuredlabs.com",
        employeeRating: 4.5,
        workLifeBalance: 4.2,
        careerGrowth: 4.7,
        interviewDifficulty: 4.0,
        interviewQuestions: [
            "What projects have you worked on that involved Java or Spring?",
            "How would you design a simple REST API for a todo list application?",
            "Explain how you would approach optimizing a slow database query.",
            "Describe a challenging programming problem you've solved."
        ]
    },
    "job3": {
        id: "job3",
        title: "Software Engineering Intern",
        company: "Telguard",
        companyLogo: "https://via.placeholder.com/64",
        industry: "Telecommunications",
        salary: "$40-45K/hr",
        jobType: "Full-time job",
        location: "Atlanta, GA (On-site)",
        date: "4 days ago",
        postedDate: "April 13, 2025",
        experience: "Entry-Level",
        description: `<h4>About the Opportunity</h4>
            <p>Telguard is seeking a Software Engineering Intern to join our development team in Atlanta. This internship offers an excellent opportunity to gain hands-on experience in telecommunications software development while working on real-world projects.</p>
            
            <h4>What You'll Be Doing</h4>
            <p>As a Software Engineering Intern, you will work with our development team on various aspects of our cellular communication and security solutions. You'll be involved in coding, testing, and debugging software applications while learning from experienced engineers.</p>
            
            <h4>Key Responsibilities</h4>
            <ul>
                <li>Assist in developing and maintaining C++ applications for our telecommunications systems</li>
                <li>Participate in backend development for cloud-based security solutions</li>
                <li>Help with code testing and quality assurance</li>
                <li>Document technical specifications and processes</li>
                <li>Collaborate with cross-functional teams to understand requirements</li>
                <li>Contribute to code reviews and improvement initiatives</li>
            </ul>`,
        skills: [
            "Proficiency in C++ programming",
            "Knowledge of cloud technologies",
            "Understanding of data structures and algorithms",
            "Familiarity with Unix/Linux operating systems",
            "Basic networking concepts",
            "Good problem-solving abilities"
        ],
        qualifications: [
            "Currently pursuing a degree in Computer Science, Software Engineering, or related field",
            "Completed coursework in programming, data structures, and computer networks",
            "Strong academic performance (GPA 3.0+)",
            "Prior project experience with C++ is a plus",
            "Ability to work on-site in Atlanta, GA",
            "Authorization to work in the United States"
        ],
        companyDescription: "Telguard is a leading provider of cellular alarm communications, remote monitoring, and control solutions for security systems and IoT applications. Our products connect thousands of homes and businesses to central monitoring stations across North America.",
        companySize: "200-500 employees",
        companyWebsite: "https://www.telguard.com",
        employeeRating: 4.0,
        workLifeBalance: 3.8,
        careerGrowth: 3.9,
        interviewDifficulty: 3.7,
        interviewQuestions: [
            "Describe your experience with C++ programming.",
            "How would you approach debugging a memory leak in a C++ application?",
            "What interests you about telecommunications and security software?",
            "Explain a challenging project you've worked on and how you overcame obstacles."
        ]
    }
};

/**
 * Show a toast notification
 * @param {string} message - Message to display
 */
function showToast(message) {
    // Create toast element
    const toastEl = document.createElement('div');
    toastEl.className = 'toast align-items-center text-white bg-dark border-0 position-fixed bottom-0 end-0 m-3';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(toastEl);
    
    // Initialize and show toast
    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();
    
    // Remove after hiding
    toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
    });
}

/**
 * Show a success alert at the top of the page
 * @param {string} message - Message to display
 */
function showSuccessAlert(message) {
    // Create alert element
    const alertEl = document.createElement('div');
    alertEl.className = 'alert alert-success alert-dismissible fade show custom-alert';
    alertEl.setAttribute('role', 'alert');
    
    alertEl.innerHTML = `
        <i class="fas fa-check-circle me-2"></i> ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Add to document
    document.body.appendChild(alertEl);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        const bsAlert = new bootstrap.Alert(alertEl);
        bsAlert.close();
    }, 5000);
    
    // Remove after hiding
    alertEl.addEventListener('closed.bs.alert', () => {
        alertEl.remove();
    });
};

// Similar jobs mock data
const mockSimilarJobs = {
    "job1": [
        {
            id: "similar1",
            title: "Software Development Intern",
            company: "AdTech Solutions",
            location: "Remote",
            date: "2 days ago"
        },
        {
            id: "similar2",
            title: "Web Development Intern",
            company: "Digital Marketing Agency",
            location: "New York, NY (Hybrid)",
            date: "3 days ago"
        },
        {
            id: "similar3",
            title: "Frontend Engineering Intern",
            company: "Media Analytics, Inc.",
            location: "San Francisco, CA (On-site)",
            date: "1 week ago"
        }
    ],
    "job2": [
        {
            id: "similar4",
            title: "Backend Engineering Intern",
            company: "DataTech Solutions",
            location: "Remote",
            date: "5 days ago"
        },
        {
            id: "similar5",
            title: "Java Developer Intern",
            company: "Enterprise Software Co.",
            location: "Boston, MA (Hybrid)",
            date: "1 week ago"
        },
        {
            id: "similar6",
            title: "Database Engineering Intern",
            company: "Cloud Systems, Inc.",
            location: "Seattle, WA (On-site)",
            date: "3 days ago"
        }
    ],
    "job3": [
        {
            id: "similar7",
            title: "C++ Programming Intern",
            company: "Security Systems, Inc.",
            location: "Atlanta, GA (On-site)",
            date: "6 days ago"
        },
        {
            id: "similar8",
            title: "Embedded Systems Intern",
            company: "IoT Solutions",
            location: "Raleigh, NC (On-site)",
            date: "1 week ago"
        },
        {
            id: "similar9",
            title: "Network Engineering Intern",
            company: "TeleComm Partners",
            location: "Dallas, TX (Hybrid)",
            date: "2 days ago"
        }
    ]
};

// DOM Elements
const jobDetailLoaderEl = document.getElementById('jobDetailLoader');
const jobDetailContentEl = document.getElementById('jobDetailContent');
const companyLogoEl = document.getElementById('companyLogo');
const jobTitleEl = document.getElementById('jobTitle');
const companyNameEl = document.getElementById('companyName');
const jobLocationEl = document.getElementById('jobLocation');
const jobSalaryEl = document.getElementById('jobSalary');
const jobTypeEl = document.getElementById('jobType');
const jobExperienceEl = document.getElementById('jobExperience');
const jobPostedDateEl = document.getElementById('jobPostedDate');
const jobDescriptionEl = document.getElementById('jobDescription');
const skillsListEl = document.getElementById('skillsList');
const qualificationsListEl = document.getElementById('qualificationsList');
const companyDescriptionEl = document.getElementById('companyDescription');
const companySizeEl = document.getElementById('companySize');
const companyIndustryEl = document.getElementById('companyIndustry');
const companyWebsiteEl = document.getElementById('companyWebsite');
const employeeRatingEl = document.getElementById('employeeRating');
const workLifeBalanceEl = document.getElementById('workLifeBalance');
const careerGrowthEl = document.getElementById('careerGrowth');
const interviewDifficultyEl = document.getElementById('interviewDifficulty');
const interviewQuestionsEl = document.getElementById('interviewQuestions');
const similarJobsListEl = document.getElementById('similarJobsList');
const shareJobLinkEl = document.getElementById('shareJobLink');
const copyLinkBtnEl = document.getElementById('copyLinkBtn');

// Action buttons
const saveJobBtnEl = document.getElementById('saveJobBtn');
const shareJobBtnEl = document.getElementById('shareJobBtn');
const applyNowBtnEl = document.getElementById('applyNowBtn');
const addToApplicationsBtnEl = document.getElementById('addToApplicationsBtn');
const saveJobTextEl = document.getElementById('saveJobText');
const applyJobTitleEl = document.getElementById('applyJobTitle');

// Modal elements
const submitApplicationEl = document.getElementById('submitApplication');
const saveToApplicationsEl = document.getElementById('saveToApplications');
const modalShareLinkEl = document.getElementById('modalShareLink');
const modalCopyBtnEl = document.getElementById('modalCopyBtn');

// Initialize variables
let currentJobId = '';
let currentJobData = null;
let savedJobs = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Get job ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    currentJobId = urlParams.get('id');
    
    if (!currentJobId) {
        // If no job ID provided, redirect to jobs page
        window.location.href = 'jobs.html';
        return;
    }
    
    // Load saved jobs from localStorage
    loadSavedJobs();
    
    // Load job details
    loadJobDetails(currentJobId);
    
    // Set up event listeners
    setupEventListeners();

    // Initialize modal links
    modalShareLinkEl.value = window.location.href;
});

/**
 * Load job details from mock data
 * @param {string} jobId - Job ID to load
 */
function loadJobDetails(jobId) {
    // Simulate API call delay
    setTimeout(() => {
        // Get job data
        const jobData = mockJobDetails[jobId];
        
        if (!jobData) {
            // If job not found, show error and redirect
            alert('Job not found. Redirecting to jobs page...');
            window.location.href = 'jobs.html';
            return;
        }
        
        // Store current job data
        currentJobData = jobData;
        
        // Populate job details
        populateJobDetails(jobData);
        
        // Load similar jobs
        loadSimilarJobs(jobId);
        
        // Update save button state
        updateSaveButtonState();
        
        // Hide loader and show content
        jobDetailLoaderEl.classList.add('d-none');
        jobDetailContentEl.classList.remove('d-none');
        
        // Show company insights with delay (simulate loading)
        setTimeout(() => {
            // Get company insights elements - with null checks
            const companyInsightsLoaderEl = document.getElementById('companyInsightsLoader');
            const companyInsightsEl = document.getElementById('companyInsights');
            
            // Only try to access these elements if they exist
            if (companyInsightsLoaderEl) {
                companyInsightsLoaderEl.classList.add('d-none');
            }
            
            if (companyInsightsEl) {
                companyInsightsEl.innerHTML = `
                    <div class="mb-3">
                        <p><strong>Employee Rating:</strong> ${jobData.employeeRating}/5</p>
                        <div class="progress mb-2" style="height: 8px;">
                            <div class="progress-bar bg-success" role="progressbar" style="width: ${jobData.employeeRating * 20}%" aria-valuenow="${jobData.employeeRating}" aria-valuemin="0" aria-valuemax="5"></div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <p><strong>Work-Life Balance:</strong> ${jobData.workLifeBalance}/5</p>
                        <div class="progress mb-2" style="height: 8px;">
                            <div class="progress-bar bg-success" role="progressbar" style="width: ${jobData.workLifeBalance * 20}%" aria-valuenow="${jobData.workLifeBalance}" aria-valuemin="0" aria-valuemax="5"></div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <p><strong>Career Growth:</strong> ${jobData.careerGrowth}/5</p>
                        <div class="progress mb-2" style="height: 8px;">
                            <div class="progress-bar bg-success" role="progressbar" style="width: ${jobData.careerGrowth * 20}%" aria-valuenow="${jobData.careerGrowth}" aria-valuemin="0" aria-valuemax="5"></div>
                        </div>
                    </div>
                    <div>
                        <p><strong>Interview Difficulty:</strong> ${jobData.interviewDifficulty}/5</p>
                        <div class="progress" style="height: 8px;">
                            <div class="progress-bar bg-warning" role="progressbar" style="width: ${jobData.interviewDifficulty * 20}%" aria-valuenow="${jobData.interviewDifficulty}" aria-valuemin="0" aria-valuemax="5"></div>
                        </div>
                    </div>
                `;
            }
        }, 800);
        
        // Update page title
        document.title = `${jobData.title} at ${jobData.company} - BadgerCS Career Nexus`;
        
        // Set share link
        if (shareJobLinkEl) {
            shareJobLinkEl.value = window.location.href;
        }
        
        // Set modal share link if it exists
        const modalShareLinkEl = document.getElementById('modalShareLink');
        if (modalShareLinkEl) {
            modalShareLinkEl.value = window.location.href;
        }
    }, 1000);
}

/**
 * Populate job details in the page
 * @param {Object} jobData - Job data object
 */
function populateJobDetails(jobData) {
    // Basic job info
    companyLogoEl.src = jobData.companyLogo;
    companyLogoEl.alt = `${jobData.company} logo`;
    jobTitleEl.textContent = jobData.title;
    companyNameEl.textContent = jobData.company;
    jobLocationEl.textContent = jobData.location;
    jobSalaryEl.textContent = jobData.salary;
    jobTypeEl.textContent = jobData.jobType;
    jobExperienceEl.textContent = jobData.experience;
    jobPostedDateEl.textContent = jobData.postedDate;
    
    // Job description
    jobDescriptionEl.innerHTML = jobData.description;
    
    // Required skills
    skillsListEl.innerHTML = '';
    jobData.skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        skillsListEl.appendChild(li);
    });
    
    // Qualifications
    qualificationsListEl.innerHTML = '';
    jobData.qualifications.forEach(qualification => {
        const li = document.createElement('li');
        li.textContent = qualification;
        qualificationsListEl.appendChild(li);
    });
    
    // Company info
    companyDescriptionEl.textContent = jobData.companyDescription;
    companySizeEl.textContent = jobData.companySize;
    companyIndustryEl.textContent = jobData.industry;
    companyWebsiteEl.textContent = jobData.companyWebsite;
    companyWebsiteEl.href = jobData.companyWebsite;
    
    // Company insights
    if (employeeRatingEl) employeeRatingEl.textContent = jobData.employeeRating;
    if (workLifeBalanceEl) workLifeBalanceEl.textContent = jobData.workLifeBalance;
    if (careerGrowthEl) careerGrowthEl.textContent = jobData.careerGrowth;
    if (interviewDifficultyEl) interviewDifficultyEl.textContent = jobData.interviewDifficulty;
    
    // Interview questions
    interviewQuestionsEl.innerHTML = '';
    jobData.interviewQuestions.forEach(question => {
        const li = document.createElement('li');
        li.textContent = question;
        interviewQuestionsEl.appendChild(li);
    });
    
    // Apply modal job title
    if (applyJobTitleEl) {
        applyJobTitleEl.textContent = jobData.title;
    }
}

/**
 * Load similar jobs
 * @param {string} jobId - Current job ID
 */
function loadSimilarJobs(jobId) {
    // Get similar jobs data
    const similarJobs = mockSimilarJobs[jobId] || [];
    
    // Clear previous content
    similarJobsListEl.innerHTML = '';
    
    // Add similar jobs
    if (similarJobs.length > 0) {
        similarJobs.forEach(job => {
            const li = document.createElement('li');
            li.className = 'list-group-item border-0 py-3';
            
            li.innerHTML = `
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h6 class="mb-1"><a href="job-detail.html?id=${job.id}" class="text-decoration-none">${job.title}</a></h6>
                        <p class="mb-1 small text-muted">${job.company}</p>
                        <div class="d-flex small text-muted mt-1">
                            <span class="me-3"><i class="fas fa-map-marker-alt me-1"></i>${job.location}</span>
                            <span><i class="far fa-clock me-1"></i>${job.date}</span>
                        </div>
                    </div>
                    <button class="btn btn-sm btn-outline-secondary border-0 similar-job-bookmark" data-job-id="${job.id}">
                        <i class="${isJobSaved(job.id) ? 'fas' : 'far'} fa-bookmark"></i>
                    </button>
                </div>
            `;
            
            similarJobsListEl.appendChild(li);
        });
    } else {
        similarJobsListEl.innerHTML = `
            <li class="list-group-item text-center py-4">
                <p class="text-muted mb-0">No similar jobs found.</p>
            </li>
        `;
    }
}

/**
 * Load saved jobs from localStorage
 */
function loadSavedJobs() {
    // Get saved jobs from localStorage
    const savedJobsData = localStorage.getItem('savedJobs');
    
    if (savedJobsData) {
        savedJobs = JSON.parse(savedJobsData);
    }
}

/**
 * Check if a job is saved
 * @param {string} jobId - Job ID to check
 * @returns {boolean} - Whether job is saved
 */
function isJobSaved(jobId) {
    return savedJobs.includes(jobId);
}

/**
 * Update save button state based on whether job is saved
 */
function updateSaveButtonState() {
    if (!saveJobBtnEl) return;
    
    if (isJobSaved(currentJobId)) {
        saveJobBtnEl.classList.add('active');
        saveJobBtnEl.innerHTML = '<i class="fas fa-bookmark me-1"></i> <span id="saveJobText">Saved</span>';
    } else {
        saveJobBtnEl.classList.remove('active');
        saveJobBtnEl.innerHTML = '<i class="far fa-bookmark me-1"></i> <span id="saveJobText">Save Job</span>';
    }
}

/**
 * Toggle saving the current job
 */
function toggleSaveJob() {
    if (isJobSaved(currentJobId)) {
        // Remove job from saved jobs
        const index = savedJobs.indexOf(currentJobId);
        savedJobs.splice(index, 1);
        showToast('Job removed from saved jobs.');
    } else {
        // Add job to saved jobs
        savedJobs.push(currentJobId);
        showToast('Job saved successfully!');
    }
    
    // Save to localStorage
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    
    // Update button state
    updateSaveButtonState();
}

/**
 * Toggle saving a similar job
 * @param {string} jobId - Job ID to toggle
 * @param {HTMLElement} button - Button element that was clicked
 */
function toggleSaveSimilarJob(jobId, button) {
    if (isJobSaved(jobId)) {
        // Remove job from saved jobs
        const index = savedJobs.indexOf(jobId);
        savedJobs.splice(index, 1);
        button.innerHTML = '<i class="far fa-bookmark"></i>';
        showToast('Job removed from saved jobs.');
    } else {
        // Add job to saved jobs
        savedJobs.push(jobId);
        button.innerHTML = '<i class="fas fa-bookmark"></i>';
        showToast('Job saved successfully!');
    }
    
    // Save to localStorage
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
}

/**
 * Share job via specified platform
 * @param {string} platform - Platform to share on
 */
function shareJob(platform) {
    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(`${currentJobData.title} at ${currentJobData.company}`);
    const shareText = encodeURIComponent(`Check out this job opportunity: ${currentJobData.title} at ${currentJobData.company}`);
    
    let shareLink = '';
    
    switch (platform) {
        case 'linkedin':
            shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
            break;
        case 'twitter':
            shareLink = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
            break;
        case 'whatsapp':
            shareLink = `https://wa.me/?text=${shareText}%20${shareUrl}`;
            break;
        case 'email':
            shareLink = `mailto:?subject=${shareTitle}&body=${shareText}%0A%0A${shareUrl}`;
            break;
    }
    
    // Open share link in new window
    if (shareLink) {
        window.open(shareLink, '_blank');
    }
}

/**
 * Copy job link to clipboard
 */
function copyJobLink() {
    // Copy link to clipboard
    shareJobLinkEl.select();
    document.execCommand('copy');
    
    // Show success message
    showToast('Link copied to clipboard!');
}

/**
 * Copy modal share link to clipboard
 */
function copyModalLink() {
    modalShareLinkEl.select();
    document.execCommand('copy');
    showToast('Link copied to clipboard!');
}

/**
 * Apply for job (mock functionality)
 */
function applyForJob() {
    // Close modal
    const applyJobModal = bootstrap.Modal.getInstance(document.getElementById('applyJobModal'));
    applyJobModal.hide();
    
    // Reset form
    document.getElementById('jobApplicationForm').reset();
    
    // Show success message
    showSuccessAlert('Your application has been submitted successfully!');
    
    // Add to applications if checkbox is checked
    if (document.getElementById('saveApplication').checked) {
        showToast('Application saved to your dashboard.');
    }
}

/**
 * Add job to applications tracking
 */
function addToApplications() {
    // Get form data
    const status = document.getElementById('applicationStatus').value;
    const date = document.getElementById('applicationDate').value;
    const notes = document.getElementById('applicationNotes').value;
    const reminder = document.getElementById('applicationReminder').value;
    
    // Validate form
    if (!status) {
        alert('Please select an application status.');
        return;
    }
    
    // Get existing applications from localStorage
    let applications = [];
    const applicationsData = localStorage.getItem('applications');
    
    if (applicationsData) {
        applications = JSON.parse(applicationsData);
    }
    
    // Create new application object
    const application = {
        id: Date.now(), // Use timestamp as ID
        jobId: currentJobId,
        jobTitle: currentJobData.title,
        company: currentJobData.company,
        status: status,
        date: date || new Date().toISOString().split('T')[0], // Default to today if not provided
        notes: notes,
        reminder: reminder,
        lastUpdated: new Date().toISOString()
    };
    
    // Add to applications array
    applications.push(application);
    
    // Save to localStorage
    localStorage.setItem('applications', JSON.stringify(applications));
    
    // Close modal
    const addToApplicationsModal = bootstrap.Modal.getInstance(document.getElementById('addToApplicationsModal'));
    addToApplicationsModal.hide();
    
    // Reset form
    document.getElementById('trackApplicationForm').reset();
    
    // Show success message
    showToast('Job added to your applications!');
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Save job button
    if (saveJobBtnEl) {
        saveJobBtnEl.addEventListener('click', toggleSaveJob);
    }
    
    // Share job button
    if (shareJobBtnEl) {
        shareJobBtnEl.addEventListener('click', () => {
            const shareModal = new bootstrap.Modal(document.getElementById('shareJobModal'));
            shareModal.show();
        });
    }
    
    // Apply now button
    if (applyNowBtnEl) {
        applyNowBtnEl.addEventListener('click', () => {
            const applyModal = new bootstrap.Modal(document.getElementById('applyJobModal'));
            applyModal.show();
        });
    }
    
    // Add to applications button
    if (addToApplicationsBtnEl) {
        addToApplicationsBtnEl.addEventListener('click', () => {
            const addToApplicationsModal = new bootstrap.Modal(document.getElementById('addToApplicationsModal'));
            addToApplicationsModal.show();
            
            // Set today's date as default
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('applicationDate').value = today;
        });
    }
    
    // Copy link button
    if (copyLinkBtnEl) {
        copyLinkBtnEl.addEventListener('click', copyJobLink);
    }
    
    // Modal copy button
    if (modalCopyBtnEl) {
        modalCopyBtnEl.addEventListener('click', copyModalLink);
    }
    
    // Share buttons
    const shareLinkedIn = document.getElementById('shareLinkedIn');
    const shareTwitter = document.getElementById('shareTwitter');
    const shareWhatsApp = document.getElementById('shareWhatsApp');
    const shareEmail = document.getElementById('shareEmail');
    
    if (shareLinkedIn) shareLinkedIn.addEventListener('click', () => shareJob('linkedin'));
    if (shareTwitter) shareTwitter.addEventListener('click', () => shareJob('twitter'));
    if (shareWhatsApp) shareWhatsApp.addEventListener('click', () => shareJob('whatsapp'));
    if (shareEmail) shareEmail.addEventListener('click', () => shareJob('email'));
    
    // Submit application button
    if (submitApplicationEl) {
        submitApplicationEl.addEventListener('click', applyForJob);
    }
    
    // Save to applications button
    if (saveToApplicationsEl) {
        saveToApplicationsEl.addEventListener('click', addToApplications);
    }
    
    // Add bookmark functionality to similar jobs
    document.addEventListener('click', (e) => {
        const bookmarkBtn = e.target.closest('.similar-job-bookmark');
        if (bookmarkBtn) {
            const jobId = bookmarkBtn.dataset.jobId;
            toggleSaveSimilarJob(jobId, bookmarkBtn);
        }
    });
}