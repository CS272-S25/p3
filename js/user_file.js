/**
 * user_file.js - User Profile Page JavaScript
 * Handles the functionality of the user profile page including:
 * - Loading user profile information
 * - Displaying saved jobs
 * - Managing user settings
 */

// Mock data for job listings (same as in jobs.js)
const mockJobListings = [
    {
        id: "job1",
        title: "Software Engineering Intern",
        company: "Tinuiti",
        companyLogo: "https://logowik.com/content/uploads/images/tinuiti6085.jpg",
        industry: "Advertising, PR & Marketing",
        salary: "$9K/mo+",
        jobType: "Full-time job",
        location: "United States (Remote)",
        date: "1 week ago",
        isNew: false,
        tags: ["Python", "JavaScript", "React"],
        experience: "Entry-Level"
    },
    {
        id: "job2",
        title: "Software Engineer Intern",
        company: "Structured Labs",
        companyLogo: "https://structuredlabs.com/logo.svg",
        industry: "Internet & Software",
        salary: "$20/hr",
        jobType: "Full-time job",
        location: "Remote",
        date: "1 week ago",
        isNew: false,
        tags: ["Java", "Spring", "SQL"],
        experience: "Entry-Level"
    },
    {
        id: "job3",
        title: "Software Engineering Intern",
        company: "Telguard",
        companyLogo: "https://img.securityinfowatch.com/files/base/cygnus/siw/image/2017/03/TelguardLogoVertical_2.58bebda68720b.png?auto=format%2Ccompress&w=250&width=250",
        industry: "Telecommunications",
        salary: "$40-45K/hr",
        jobType: "Full-time job",
        location: "Atlanta, GA (On-site)",
        date: "4 days ago",
        isNew: true,
        tags: ["C++", "Backend", "Cloud"],
        experience: "Entry-Level"
    },
    {
        id: "job4",
        title: "Software Development Internship",
        company: "C-Motive Technologies",
        companyLogo: "https://www.nailmags.com/userAssets/members/4109/logo/cmotive_icon_color.png",
        industry: "Other Industries",
        salary: "$15/hr",
        jobType: "Part-time job",
        location: "Middleton, WI (On-site)",
        date: "5 days ago",
        isNew: true,
        tags: ["Web Development", "JavaScript", "Node.js"],
        experience: "Entry-Level"
    },
    {
        id: "job5",
        title: "Software Engineer (Intern)",
        company: "comma.ai",
        companyLogo: "https://images.seeklogo.com/logo-png/48/1/comma-ai-logo-png_seeklogo-483230.png",
        industry: "Internet & Software",
        salary: "$6-7K/mo",
        jobType: "Full-time job",
        location: "San Diego, CA (On-site)",
        date: "2 weeks ago",
        isNew: false,
        tags: ["Machine Learning", "Python", "Computer Vision"],
        experience: "Entry-Level"
    },
    {
        id: "job6",
        title: "Software Engineer - Summer",
        company: "Lazarus",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/8/80/Lazarus_Logo_%28new%29.png",
        industry: "Internet & Software",
        salary: "$30/hr",
        jobType: "Full-time job",
        location: "United States (Remote)",
        date: "1 month ago",
        isNew: false,
        tags: ["Full Stack", "JavaScript", "React"],
        experience: "Entry-Level"
    },
    {
        id: "job7",
        title: "Full Stack Software Engineer",
        company: "Epic Systems",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Epic_Systems.svg",
        industry: "Healthcare",
        salary: "$85-110K/year",
        jobType: "Full-time job",
        location: "Madison, WI (On-site)",
        date: "2 days ago",
        isNew: true,
        tags: ["JavaScript", "React", "Node.js", "SQL"],
        experience: "Mid-Level"
    },
    {
        id: "job8",
        title: "Backend Engineer",
        company: "Microsoft",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        industry: "Internet & Software",
        salary: "$120-140K/year",
        jobType: "Full-time job",
        location: "Redmond, WA (Hybrid)",
        date: "3 days ago",
        isNew: true,
        tags: ["Java", "Spring", "AWS", "Microservices"],
        experience: "Mid-Level"
    },
    {
        id: "job9",
        title: "Senior Frontend Developer",
        company: "Google",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
        industry: "Internet & Software",
        salary: "$150-180K/year",
        jobType: "Full-time job",
        location: "Remote",
        date: "1 week ago",
        isNew: false,
        tags: ["JavaScript", "React", "TypeScript", "UI/UX"],
        experience: "Senior-Level"
    }
];

// DOM Elements
const userProfileEl = document.getElementById('userProfile');
const profileUsernameEl = document.getElementById('profileUsername');
const profileEmailEl = document.getElementById('profileEmail');
const profileAvatarEl = document.getElementById('profileAvatar');
const savedJobsContainerEl = document.getElementById('savedJobsContainer');
const noSavedJobsMessageEl = document.getElementById('noSavedJobsMessage');
const savedJobsCountEl = document.getElementById('savedJobsCount');
const applicationsCountEl = document.getElementById('applicationsCount');
const activityContainerEl = document.getElementById('activityContainer');
const savedJobCardTemplate = document.getElementById('savedJobCardTemplate');
const clearAllSavedJobsBtn = document.getElementById('clearAllSavedJobs');
const logoutBtn = document.getElementById('logoutBtn');

// Initialize user data
let userData = {
    userId: null,
    email: 'user@example.com',
    username: 'User',
    savedJobs: [],
    applications: []
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    checkLoginStatus();
    
    // Load saved jobs data
    loadSavedJobs();
    
    // Set up event listeners
    setupEventListeners();
});

/**
 * Check if user is logged in and update UI accordingly
 */
function checkLoginStatus() {
    const userId = localStorage.getItem('userId');
    const nickname = localStorage.getItem('nickname');
    const email = localStorage.getItem('email');
    
    if (!userId) {
        // Redirect to login page if not logged in
        window.location.href = 'sign-in.html';
        return;
    }
    
    // Set user ID in userData
    userData.userId = userId;
    userData.username = nickname; 
    userData.email = email; 
    
    // Update profile information
    updateProfileInfo();
    
    // Update navigation bar
    updateNavbar();
}

/**
 * Update profile information in the UI
 */
function updateProfileInfo() {
    // Update profile header
    profileUsernameEl.textContent = userData.username;
    profileEmailEl.textContent = userData.email;
    
    // Update profile avatar with user initials
    profileAvatarEl.src = `https://api.dicebear.com/6.x/initials/svg?seed=${userData.username}`;
    
    // Update profile form
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.value = userData.email;
    }
    
    const fullNameInput = document.getElementById('fullName');
    if (fullNameInput) {
        fullNameInput.value = userData.username;
    }
}

/**
 * Update navigation bar with user info
 */
function updateNavbar() {
    if (userProfileEl) {
        userProfileEl.innerHTML = '';
        
        // Create profile link
        const profileLink = document.createElement('a');
        profileLink.href = 'user_file.html';
        profileLink.className = 'btn btn-outline-light me-2';
        
        // Add user icon and username
        const userIcon = document.createElement('i');
        userIcon.className = 'fas fa-user-circle me-1';
        profileLink.appendChild(userIcon);
        
        const username = document.createElement('span');
        username.textContent = userData.username;
        profileLink.appendChild(username);
        
        // Create logout button
        const logoutButton = document.createElement('button');
        logoutButton.className = 'btn btn-outline-light';
        logoutButton.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
        logoutButton.addEventListener('click', handleLogout);
        
        // Add both elements to the profile container
        userProfileEl.appendChild(profileLink);
        userProfileEl.appendChild(logoutButton);
    }
}

/**
 * Load saved jobs for the current user
 */
function loadSavedJobs() {
    // Get user-specific saved jobs key
    const userSavedJobsKey = `savedJobs_${userData.userId}`;
    
    // Get saved jobs from localStorage
    const savedJobsData = localStorage.getItem(userSavedJobsKey);
    
    if (savedJobsData) {
        // Parse saved jobs data
        userData.savedJobs = JSON.parse(savedJobsData);
        
        // Update saved jobs count
        if (savedJobsCountEl) {
            savedJobsCountEl.textContent = userData.savedJobs.length;
        }
        
        // Display saved jobs
        displaySavedJobs();
        
        // Update activity
        updateRecentActivity();
    } else {
        // No saved jobs found
        userData.savedJobs = [];
        
        // Update saved jobs count
        if (savedJobsCountEl) {
            savedJobsCountEl.textContent = '0';
        }
        
        // Show no saved jobs message
        if (savedJobsContainerEl && noSavedJobsMessageEl) {
            savedJobsContainerEl.innerHTML = '';
            noSavedJobsMessageEl.style.display = 'block';
        }
    }
}

/**
 * Display saved jobs in the saved jobs container
 */
function displaySavedJobs() {
    if (!savedJobsContainerEl) return;
    
    // Clear container
    savedJobsContainerEl.innerHTML = '';
    
    if (userData.savedJobs.length === 0) {
        // Show no saved jobs message
        if (noSavedJobsMessageEl) {
            noSavedJobsMessageEl.style.display = 'block';
        }
        return;
    }
    
    // Hide no saved jobs message
    if (noSavedJobsMessageEl) {
        noSavedJobsMessageEl.style.display = 'none';
    }
    
    // Create job cards for each saved job
    userData.savedJobs.forEach(jobId => {
        const jobData = mockJobListings.find(job => job.id === jobId);
        
        if (jobData) {
            const jobCard = createSavedJobCard(jobData);
            savedJobsContainerEl.appendChild(jobCard);
        }
    });
}

/**
 * Create a saved job card from the template
 * @param {Object} job - Job data
 * @returns {HTMLElement} - Job card element
 */
function createSavedJobCard(job) {
    if (!savedJobCardTemplate) return document.createElement('div');
    
    const jobCardClone = document.importNode(savedJobCardTemplate.content, true);
    
    // Fill in job details
    const companyLogoEl = jobCardClone.querySelector('.company-logo img');
    companyLogoEl.src = job.companyLogo;
    companyLogoEl.alt = `${job.company} logo`;
    
    jobCardClone.querySelector('.company-name').textContent = job.company;
    jobCardClone.querySelector('.company-industry').textContent = job.industry;
    jobCardClone.querySelector('.job-title').textContent = job.title;
    jobCardClone.querySelector('.job-salary').textContent = job.salary;
    jobCardClone.querySelector('.job-type').textContent = job.jobType;
    jobCardClone.querySelector('.job-location').textContent = job.location;
    jobCardClone.querySelector('.job-date').textContent = job.date;
    
    // Set up job detail link
    const jobLink = jobCardClone.querySelector('.view-job-link');
    jobLink.href = `job-detail.html?id=${job.id}`;
    
    // Set up remove button
    const removeButton = jobCardClone.querySelector('.remove-job-btn');
    removeButton.dataset.jobId = job.id;
    
    return jobCardClone;
}

/**
 * Update recent activity section
 */
function updateRecentActivity() {
    if (!activityContainerEl) return;
    
    // Check if there are any saved jobs or applications
    if (userData.savedJobs.length === 0 && (!userData.applications || userData.applications.length === 0)) {
        activityContainerEl.innerHTML = `
            <div class="text-center py-4 text-muted">
                <i class="fas fa-history fa-3x mb-3"></i>
                <p>No recent activity yet.</p>
            </div>
        `;
        return;
    }
    
    // Clear container
    activityContainerEl.innerHTML = '';
    
    // Add saved jobs activity
    userData.savedJobs.slice(0, 3).forEach(jobId => {
        const jobData = mockJobListings.find(job => job.id === jobId);
        
        if (jobData) {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            
            const date = new Date();
            date.setMinutes(date.getMinutes() - Math.floor(Math.random() * 60));
            
            activityItem.innerHTML = `
                <p class="mb-1"><strong>Saved a job</strong></p>
                <p class="mb-1">You saved "${jobData.title}" at ${jobData.company}</p>
                <p class="activity-date mb-0">${formatTimeAgo(date)}</p>
            `;
            
            activityContainerEl.appendChild(activityItem);
        }
    });
}

/**
 * Format a date as time ago
 * @param {Date} date - Date to format
 * @returns {string} - Formatted time ago
 */
function formatTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInDays < 30) {
        return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    
    return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'} ago`;
}

/**
 * Remove a job from saved jobs
 * @param {string} jobId - Job ID to remove
 */
function removeJob(jobId) {
    // Find job index
    const index = userData.savedJobs.indexOf(jobId);
    
    if (index !== -1) {
        // Remove job from saved jobs
        userData.savedJobs.splice(index, 1);
        
        // Save to localStorage
        const userSavedJobsKey = `savedJobs_${userData.userId}`;
        localStorage.setItem(userSavedJobsKey, JSON.stringify(userData.savedJobs));
        
        // Reload saved jobs
        loadSavedJobs();
        
        // Show toast notification
        showToast('Job removed from saved jobs.');
    }
}

/**
 * Clear all saved jobs
 */
function clearAllSavedJobs() {
    if (confirm('Are you sure you want to clear all saved jobs?')) {
        // Clear saved jobs
        userData.savedJobs = [];
        
        // Save to localStorage
        const userSavedJobsKey = `savedJobs_${userData.userId}`;
        localStorage.setItem(userSavedJobsKey, JSON.stringify(userData.savedJobs));
        
        // Reload saved jobs
        loadSavedJobs();
        
        // Show toast notification
        showToast('All saved jobs have been cleared.');
    }
}

/**
 * Handle user logout
 */
function handleLogout() {
    // Clear userId from localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem("email");
    localStorage.removeItem("nickname");
    
    // Redirect to login page
    window.location.href = 'sign-in.html';
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Saved job card remove buttons
    document.addEventListener('click', (event) => {
        const removeButton = event.target.closest('.remove-job-btn');
        if (removeButton) {
            const jobId = removeButton.dataset.jobId;
            removeJob(jobId);
        }
    });
    
    // Clear all saved jobs button
    if (clearAllSavedJobsBtn) {
        clearAllSavedJobsBtn.addEventListener('click', clearAllSavedJobs);
    }
    
    // Logout button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Profile form submission
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', (event) => {
            event.preventDefault();
            showToast('Profile updated successfully!');
        });
    }
    
    // Password form submission
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', (event) => {
            event.preventDefault();
            showToast('Password updated successfully!');
        });
    }
}

/**
 * Show a toast notification
 * @param {string} message - Message to display
 */
function showToast(message) {
    // Create toast element
    const toastEl = document.createElement('div');
    toastEl.className = 'toast align-items-center text-white bg-dark border-0';
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
    
    // Add to toast container
    const toastContainer = document.querySelector('.toast-container');
    toastContainer.appendChild(toastEl);
    
    // Initialize and show toast
    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();
    
    // Remove after hiding
    toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
    });
}