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
        companyLogo: "https://via.placeholder.com/48",
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
        companyLogo: "https://via.placeholder.com/48",
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
        companyLogo: "https://via.placeholder.com/48",
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
        companyLogo: "https://via.placeholder.com/48",
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
        companyLogo: "https://via.placeholder.com/48",
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
        companyLogo: "https://via.placeholder.com/48",
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
        companyLogo: "https://via.placeholder.com/48",
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
        companyLogo: "https://via.placeholder.com/48",
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
        companyLogo: "https://via.placeholder.com/48",
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

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
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
    } else {
        internshipListingsEl.innerHTML = `
            <div class="col-12 text-center py-4">
                <div class="empty-state">
                    <i class="fas fa-search empty-state-icon"></i>
                    <p class="empty-state-text">No internships found matching your criteria</p>
                    <p class="text-muted">Try adjusting your filters</p>
                </div>
            </div>
        `;
    }
    
    // Render full-time jobs
    if (fullTimeJobs.length > 0) {
        fullTimeJobs.forEach(job => {
            const jobCard = createJobCard(job);
            fullTimeListingsEl.appendChild(jobCard);
        });
    } else {
        fullTimeListingsEl.innerHTML = `
            <div class="col-12 text-center py-4">
                <div class="empty-state">
                    <i class="fas fa-search empty-state-icon"></i>
                    <p class="empty-state-text">No jobs found matching your criteria</p>
                    <p class="text-muted">Try adjusting your filters</p>
                </div>
            </div>
        `;
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
 * Check if a job is saved
 * @param {string} jobId - Job ID to check
 * @returns {boolean} - Whether job is saved
 */
function isJobSaved(jobId) {
    return savedJobs.includes(jobId);
}

/**
 * Toggle saving a job
 * @param {string} jobId - Job ID to toggle
 */
function toggleSaveJob(jobId) {
    const index = savedJobs.indexOf(jobId);
    
    if (index === -1) {
        // Job is not saved, add it
        savedJobs.push(jobId);
        showToast('Job saved to your list!');
    } else {
        // Job is already saved, remove it
        savedJobs.splice(index, 1);
        showToast('Job removed from your list.');
    }
    
    // Save to localStorage
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    
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
 * Clear all filters and reset to original data
 */
function clearFilters() {
    // Reset filter form
    document.getElementById('jobFilters').reset();
    
    // Reset current jobs to original data
    currentJobs = [...mockJobListings];
    
    // Clear search box
    searchJobsEl.value = '';
    
    // Reload job listings
    loadJobListings();
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
