/**
 * jobs.js - Job Listings Page JavaScript
 * Handles the functionality of the jobs listing page including:
 * - Loading job listings from the server
 * - Filtering and searching jobs
 * - Bookmarking/saving jobs using localStorage
 * - UI interactions
 */

// Mock data for job listings (in a real app, this would come from an API)
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
const internshipListingsEl = document.getElementById('internshipListings');
const fullTimeListingsEl = document.getElementById('fullTimeListings');
const savedJobsListingsEl = document.getElementById('savedJobsListings');
const savedJobsSectionEl = document.getElementById('savedJobsSection');
const noSavedJobsEl = document.getElementById('noSavedJobs');
const jobCardTemplate = document.getElementById('jobCardTemplate');
const searchJobsEl = document.getElementById('searchJobs');
const searchButtonEl = document.getElementById('searchButton');
const applyFiltersBtn = document.getElementById('applyFilters');
const clearFiltersBtn = document.getElementById('clearFilters');
const clearSavedJobsBtn = document.getElementById('clearSavedJobs');

// Current state variables
let currentJobs = [...mockJobListings];
let savedJobs = [];


function checkLoginStatus() {
    const userId = localStorage.getItem('userId');
    const authButtonsEl = document.getElementById('authButtons');
    const userProfileEl = document.getElementById('userProfile');
    
    if (userId) {
        // User is logged in - hide login/register buttons, show user profile section
        if (authButtonsEl) authButtonsEl.classList.add('d-none');
        
        // Replace the user profile dropdown with direct links
        if (userProfileEl) {
            // Clear existing content
            userProfileEl.innerHTML = '';
            userProfileEl.classList.remove('d-none');
            userProfileEl.classList.remove('dropdown');
            
            // Create profile button that links directly to user_file.html
            const profileLink = document.createElement('a');
            profileLink.href = 'user_file.html';  // Link to the user profile page
            profileLink.className = 'btn btn-outline-light me-2';
            
            // Add user icon and username
            const userIcon = document.createElement('i');
            userIcon.className = 'fas fa-user-circle me-1';
            profileLink.appendChild(userIcon);
            
            const username = document.createElement('span');
            username.textContent = `User_${userId.substring(0, 4)}`;
            profileLink.appendChild(username);
            
            // Create logout button
            const logoutBtn = document.createElement('button');
            logoutBtn.className = 'btn btn-outline-light';
            logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('userId');
                window.location.reload();
            });
            
            // Add both elements to the profile container
            userProfileEl.appendChild(profileLink);
            userProfileEl.appendChild(logoutBtn);
        }
    } else {
        // User is not logged in - show login/register buttons, hide user profile
        if (authButtonsEl) authButtonsEl.classList.remove('d-none');
        if (userProfileEl) userProfileEl.classList.add('d-none');
    }
}



// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Check login status
    checkLoginStatus();

    // Load job listings
    loadJobListings();

    // Load saved jobs from localStorage
    loadSavedJobs();

    // Set up event listeners
    setupEventListeners();
});




/**
 * Load job listings into their respective sections
 */
function loadJobListings() {
    // Clear existing content
    internshipListingsEl.innerHTML = '';
    fullTimeListingsEl.innerHTML = '';

    // Filter for internships and full-time positions
    const internships = currentJobs.filter(job =>
        job.title.toLowerCase().includes('intern') ||
        job.title.toLowerCase().includes('internship')
    );

    const fullTimeJobs = currentJobs.filter(job =>
        !job.title.toLowerCase().includes('intern') &&
        !job.title.toLowerCase().includes('internship')
    );

    // Render internships
    if (internships.length > 0) {
        internships.forEach(job => {
            const jobCard = createJobCard(job);
            internshipListingsEl.appendChild(jobCard);
        });
    }
    else {
        const noInternEl = document.createElement('div');
        noInternEl.className = 'col-12 text-center py-4';

        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';

        const icon = document.createElement('i');
        icon.className = 'fas fa-search empty-state-icon';

        const mainText = document.createElement('p');
        mainText.className = 'empty-state-text';
        mainText.textContent = 'No internships found matching your criteria';

        const subText = document.createElement('p');
        subText.className = 'text-muted';
        subText.textContent = 'Try adjusting your filters';

        emptyState.appendChild(icon);
        emptyState.appendChild(mainText);
        emptyState.appendChild(subText);
        noInternEl.appendChild(emptyState);
        internshipListingsEl.appendChild(noInternEl);
    }

    // Render full-time jobs
    if (fullTimeJobs.length > 0) {
        fullTimeJobs.forEach(job => {
            const jobCard = createJobCard(job);
            fullTimeListingsEl.appendChild(jobCard);
        });
    }
    else {
        const noInternEl = document.createElement('div');
        noInternEl.className = 'col-12 text-center py-4';

        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';

        const icon = document.createElement('i');
        icon.className = 'fas fa-search empty-state-icon';

        const mainText = document.createElement('p');
        mainText.className = 'empty-state-text';
        mainText.textContent = 'No internships found matching your criteria';

        const subText = document.createElement('p');
        subText.className = 'text-muted';
        subText.textContent = 'Try adjusting your filters';

        emptyState.appendChild(icon);
        emptyState.appendChild(mainText);
        emptyState.appendChild(subText);
        noInternEl.appendChild(emptyState);
        internshipListingsEl.appendChild(noInternEl);
    }
}

/**
 * Create a job card from the template
 * @param {Object} job - Job data
 * @returns {HTMLElement} - Job card element
 */
function createJobCard(job) {
    const jobCardClone = document.importNode(jobCardTemplate.content, true);

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

    // Set up bookmark button
    const bookmarkBtn = jobCardClone.querySelector('.bookmark-btn');
    bookmarkBtn.dataset.jobId = job.id;

    // Check if job is already saved
    if (isJobSaved(job.id)) {
        bookmarkBtn.classList.add('active');
        bookmarkBtn.innerHTML = '<i class="fas fa-bookmark"></i>';
    } else {
        bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';
    }

    // Set up job detail link
    const jobLink = jobCardClone.querySelector('.view-job-link');
    jobLink.href = `job-detail.html?id=${job.id}`;
    jobLink.textContent = 'View Details';

    // Add "New" badge if job is new
    if (job.isNew) {
        const cardDiv = jobCardClone.querySelector('.card');
        const newBadge = document.createElement('span');
        newBadge.className = 'badge bg-success position-absolute';
        newBadge.style.top = '10px';
        newBadge.style.left = '10px';
        newBadge.textContent = 'New';
        cardDiv.appendChild(newBadge);
    }

    return jobCardClone;
}

/**
 * Load saved jobs from localStorage
 */
function loadSavedJobs() {
    // Get saved jobs from localStorage
    const savedJobsData = localStorage.getItem('savedJobs');

    if (savedJobsData) {
        savedJobs = JSON.parse(savedJobsData);

        // Display saved jobs section if there are saved jobs
        if (savedJobs.length > 0) {
            savedJobsSectionEl.style.display = 'block';
            noSavedJobsEl.style.display = 'none';

            // Clear existing content
            savedJobsListingsEl.innerHTML = '';

            // Find the job data for each saved job ID
            savedJobs.forEach(jobId => {
                const jobData = mockJobListings.find(job => job.id === jobId);

                if (jobData) {
                    const jobCard = createJobCard(jobData);
                    savedJobsListingsEl.appendChild(jobCard);
                }
            });
        } else {
            savedJobsSectionEl.style.display = 'block';
            noSavedJobsEl.style.display = 'block';
        }
    }
}

/**
 * Check if a job is saved - MODIFIED FUNCTION
 * @param {string} jobId - Job ID to check
 * @returns {boolean} - Whether job is saved
 */
function isJobSaved(jobId) {
    // If user is not logged in, job cannot be saved
    const userId = localStorage.getItem('userId');
    if (!userId) {
        return false;
    }
    
    // Check user-specific saved jobs
    const userSavedJobsKey = `savedJobs_${userId}`;
    const savedJobsData = localStorage.getItem(userSavedJobsKey);
    
    if (savedJobsData) {
        const userSavedJobs = JSON.parse(savedJobsData);
        return userSavedJobs.includes(jobId);
    }
    
    return false;
}

/**
 * Load saved jobs from localStorage - MODIFIED FUNCTION
 */
function loadSavedJobs() {
    // Clear saved jobs array
    savedJobs = [];
    
    // Get user ID
    const userId = localStorage.getItem('userId');
    
    // If user is not logged in, hide saved jobs section
    if (!userId) {
        if (savedJobsSectionEl) {
            savedJobsSectionEl.style.display = 'none';
        }
        return;
    }
    
    // Get user-specific saved jobs
    const userSavedJobsKey = `savedJobs_${userId}`;
    const savedJobsData = localStorage.getItem(userSavedJobsKey);

    if (savedJobsData) {
        savedJobs = JSON.parse(savedJobsData);

        // Display saved jobs section if there are saved jobs
        if (savedJobs.length > 0 && savedJobsSectionEl) {
            savedJobsSectionEl.style.display = 'block';
            if (noSavedJobsEl) {
                noSavedJobsEl.style.display = 'none';
            }

            // Clear existing content
            if (savedJobsListingsEl) {
                savedJobsListingsEl.innerHTML = '';

                // Find the job data for each saved job ID
                savedJobs.forEach(jobId => {
                    const jobData = mockJobListings.find(job => job.id === jobId);

                    if (jobData) {
                        const jobCard = createJobCard(jobData);
                        savedJobsListingsEl.appendChild(jobCard);
                    }
                });
            }
        } else if (savedJobsSectionEl) {
            savedJobsSectionEl.style.display = 'block';
            if (noSavedJobsEl) {
                noSavedJobsEl.style.display = 'block';
            }
        }
    } else if (savedJobsSectionEl) {
        savedJobsSectionEl.style.display = 'block';
        if (noSavedJobsEl) {
            noSavedJobsEl.style.display = 'block';
        }
    }
}

/**
 * Toggle saving a job - MODIFIED FUNCTION
 * @param {string} jobId - Job ID to toggle
 */
function toggleSaveJob(jobId) {
    // Check if user is logged in
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
        // User is not logged in, show alert
        alert('You need to be logged in to save jobs. Please sign in or register.');
        return;
    }

    // Use a unique key for each user's saved jobs
    const userSavedJobsKey = `savedJobs_${userId}`;
    
    // Get user's saved jobs
    let userSavedJobs = [];
    const savedJobsData = localStorage.getItem(userSavedJobsKey);
    
    if (savedJobsData) {
        userSavedJobs = JSON.parse(savedJobsData);
    }
    
    const index = userSavedJobs.indexOf(jobId);

    if (index === -1) {
        // Job is not saved, add it
        userSavedJobs.push(jobId);
        showToast('Job saved to your list!');
    } else {
        // Job is already saved, remove it
        userSavedJobs.splice(index, 1);
        showToast('Job removed from your list.');
    }

    // Save to localStorage with user-specific key
    localStorage.setItem(userSavedJobsKey, JSON.stringify(userSavedJobs));

    // Update savedJobs array for the current session
    savedJobs = userSavedJobs;
    
    // Reload saved jobs section
    loadSavedJobs();

    // Update bookmark buttons for this job ID
    updateBookmarkButtons(jobId);
}

/**
 * Update all bookmark buttons for a specific job ID
 * @param {string} jobId - Job ID to update
 */
function updateBookmarkButtons(jobId) {
    const bookmarkBtns = document.querySelectorAll(`.bookmark-btn[data-job-id="${jobId}"]`);

    bookmarkBtns.forEach(btn => {
        if (isJobSaved(jobId)) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="fas fa-bookmark"></i>';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '<i class="far fa-bookmark"></i>';
        }
    });
}

/**
 * Filter jobs based on current filter values
 */
function filterJobs() {
    // Get filter values
    const jobTypeFilter = document.getElementById('jobType').value;
    const locationFilter = document.getElementById('location').value;
    const companyFilter = document.getElementById('companyName').value.toLowerCase();

    const experienceFilters = [];
    if (document.getElementById('entryLevel').checked) experienceFilters.push('Entry-Level');
    if (document.getElementById('midLevel').checked) experienceFilters.push('Mid-Level');
    if (document.getElementById('seniorLevel').checked) experienceFilters.push('Senior-Level');

    // Apply filters
    currentJobs = mockJobListings.filter(job => {
        // Filter by job type
        if (jobTypeFilter && !job.jobType.includes(jobTypeFilter)) {
            return false;
        }

        // Filter by location
        if (locationFilter) {
            const locationLower = job.location.toLowerCase();
            if (locationFilter === 'Remote' && !locationLower.includes('remote')) {
                return false;
            } else if (locationFilter === 'On-site' && !locationLower.includes('on-site')) {
                return false;
            } else if (locationFilter === 'Hybrid' && !locationLower.includes('hybrid')) {
                return false;
            }
        }

        // Filter by company name
        if (companyFilter && !job.company.toLowerCase().includes(companyFilter)) {
            return false;
        }

        // Filter by experience level
        if (experienceFilters.length > 0 && !experienceFilters.includes(job.experience)) {
            return false;
        }

        return true;
    });

    // Reload job listings with filtered data
    loadJobListings();
}

/**
 * Search jobs by keyword
 */
function searchJobs() {
    const searchTerm = searchJobsEl.value.toLowerCase();

    if (searchTerm.trim() === '') {
        // If search is empty, reset to all jobs
        currentJobs = [...mockJobListings];
    } else {
        // Filter jobs by search term
        currentJobs = mockJobListings.filter(job =>
            job.title.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }

    // Reload job listings with search results
    loadJobListings();
}

/**
 * Clear all saved jobs - MODIFIED FUNCTION
 */
function clearAllSavedJobs() {
    const userId = localStorage.getItem('userId');
    
    // Only allow logged in users to clear saved jobs
    if (!userId) {
        alert('You need to be logged in to manage saved jobs.');
        return;
    }
    
    if (confirm('Are you sure you want to clear all saved jobs?')) {
        // Clear saved jobs
        savedJobs = [];

        // Save to localStorage with user-specific key
        const userSavedJobsKey = `savedJobs_${userId}`;
        localStorage.setItem(userSavedJobsKey, JSON.stringify(savedJobs));

        // Reload saved jobs section
        loadSavedJobs();

        // Update all bookmark buttons
        const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
        bookmarkBtns.forEach(btn => {
            btn.classList.remove('active');
            btn.innerHTML = '<i class="far fa-bookmark"></i>';
        });

        showToast('All saved jobs have been cleared.');
    }
}

/**
 * Clear all saved jobs
 */
function clearAllSavedJobs() {
    if (confirm('Are you sure you want to clear all saved jobs?')) {
        // Clear saved jobs
        savedJobs = [];

        // Save to localStorage
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));

        // Reload saved jobs section
        loadSavedJobs();

        // Update all bookmark buttons
        const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
        bookmarkBtns.forEach(btn => {
            btn.classList.remove('active');
            btn.innerHTML = '<i class="far fa-bookmark"></i>';
        });

        showToast('All saved jobs have been cleared.');
    }
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Bookmark button clicks
    document.addEventListener('click', event => {
        const bookmarkBtn = event.target.closest('.bookmark-btn');
        if (bookmarkBtn) {
            event.preventDefault();
            const jobId = bookmarkBtn.dataset.jobId;
            toggleSaveJob(jobId);
        }
    });

    // Search button click
    searchButtonEl.addEventListener('click', () => {
        searchJobs();
    });

    // Search on Enter key
    searchJobsEl.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchJobs();
        }
    });

    // Apply filters button
    applyFiltersBtn.addEventListener('click', () => {
        filterJobs();
    });

    // Clear filters button
    clearFiltersBtn.addEventListener('click', () => {
        clearFilters();
    });

    // Clear saved jobs button
    clearSavedJobsBtn.addEventListener('click', () => {
        clearAllSavedJobs();
    });
}

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

// Add to window object to make accessible from other scripts
window.JobsPage = {
    toggleSaveJob,
    isJobSaved
};
