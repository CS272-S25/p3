/**
 * forum.js - Community Forum Page JavaScript
 * Handles the functionality of the community forum page including:
 * - User login status
 * - Post creation
 * - Post interaction (likes, comments, bookmarks)
 * - Feed filtering
 */

// DOM loaded event
document.addEventListener('DOMContentLoaded', function () {
    // Check login status
    checkLoginStatus();

    // Setup event listeners
    setupEventListeners();

    // Initialize forum elements
    initializeForum();

    // Setup infinite scroll
    setupInfiniteScroll();

    // Load user posts from localStorage
    loadAllVisiblePosts();
});

/**
 * Check login status and update the navigation bar accordingly
 */
function checkLoginStatus() {
    const userId = localStorage.getItem('userId');
    const nickname = localStorage.getItem('nickname');
    const email = localStorage.getItem('email')
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
            profileLink.href = 'user_file.html';
            profileLink.className = 'btn btn-outline-light me-2';

            // Add user icon and username
            const userIcon = document.createElement('i');
            userIcon.className = 'fas fa-user-circle me-1';
            profileLink.appendChild(userIcon);

            const username = document.createElement('span');
            username.textContent = nickname;
            profileLink.appendChild(username);

            // Create logout button
            const logoutBtn = document.createElement('button');
            logoutBtn.className = 'btn btn-outline-light';
            logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('userId');
                localStorage.removeItem("email");
                localStorage.removeItem("nickname");
                window.location.reload();
            });


            // Add both elements to the profile container
            userProfileEl.appendChild(profileLink);
            userProfileEl.appendChild(logoutBtn);

            // Update username in the post creation modal
            const currentUserNameEl = document.getElementById('currentUserName');
            if (currentUserNameEl) {
                currentUserNameEl.textContent = nickname;
            }
        }
    } else {
        // User is not logged in - show login/register buttons, hide user profile
        if (authButtonsEl) authButtonsEl.classList.remove('d-none');
        if (userProfileEl) userProfileEl.classList.add('d-none');
    }
}

/**
 * Check if user is logged in
 * @returns {boolean} True if user is logged in, false otherwise
 */
function isUserLoggedIn() {
    return localStorage.getItem('userId') !== null;
}

/**
 * Setup all event listeners for the forum page
 */
function setupEventListeners() {
    // Topic filter buttons
    const topicButtons = document.querySelectorAll('.topic-filters .btn');
    topicButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            topicButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Filter posts based on the selected topic
            filterPosts(this.textContent.trim());
        });
    });

    // Post interaction buttons (likes, comments, bookmarks)
    setupPostInteractions();

    // Create post modal functionality
    setupCreatePostModal();

    // Left sidebar navigation
    setupSidebarNavigation();
}

/**
 * Initialize forum elements
 */
function initializeForum() {
    // Create scroll to top button
    createScrollToTopButton();

    // Set up lazy loading for images
    setupLazyLoading();
}

/**
 * Setup event listeners for post interactions
 */
function setupPostInteractions() {
    // Like buttons
    const likeButtons = document.querySelectorAll('.post-actions button:first-child');
    likeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const likeIcon = this.querySelector('i');
            const likeCount = this.textContent.match(/\d+/)[0];

            if (likeIcon.classList.contains('far')) {
                // Like the post
                likeIcon.classList.remove('far');
                likeIcon.classList.add('fas', 'heart-beat');
                this.innerHTML = `<i class="fas fa-heart me-1"></i> ${parseInt(likeCount) + 1} likes`;
                this.style.color = 'var(--badger-red)';
            } else {
                // Unlike the post
                likeIcon.classList.remove('fas', 'heart-beat');
                likeIcon.classList.add('far');
                this.innerHTML = `<i class="far fa-heart me-1"></i> ${parseInt(likeCount) - 1} likes`;
                this.style.color = '';
            }
        });
    });

    // Bookmark buttons
    const bookmarkButtons = document.querySelectorAll('.post-actions button:last-child');
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function () {
            const bookmarkIcon = this.querySelector('i');

            if (bookmarkIcon.classList.contains('far')) {
                // Bookmark the post
                bookmarkIcon.classList.remove('far');
                bookmarkIcon.classList.add('fas');
                this.style.color = 'var(--badger-red)';
                showToast('Post saved to your bookmarks');
            } else {
                // Remove bookmark
                bookmarkIcon.classList.remove('fas');
                bookmarkIcon.classList.add('far');
                this.style.color = '';
                showToast('Post removed from bookmarks');
            }
        });
    });

    // Comment buttons
    const commentButtons = document.querySelectorAll('.post-actions button:nth-child(2)');
    commentButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Check if user is logged in before allowing commenting
            if (!isUserLoggedIn()) {
                showLoginAlert();
                return;
            }

            // Find the closest post container
            const post = this.closest('.post');

            // Find the comments section in this post
            let comments = post.querySelector('.comments');

            // If comments section doesn't exist, create it
            if (!comments) {
                comments = document.createElement('div');
                comments.className = 'comments mt-3';
                comments.innerHTML = `
                    <hr>
                    <div class="add-comment d-flex align-items-center">
                        <div class="comment-avatar-container">
    <img src="https://api.dicebear.com/9.x/pixel-art/svg?seed=user14" class="avatar-img" alt="User Avatar">
</div>                        <input type="text" class="form-control form-control-sm" placeholder="Write a comment...">
                        <button class="btn btn-sm btn-primary ms-2">Post</button>
                    </div>
                `;

                // Append comments section to post
                post.querySelector('.card-body').appendChild(comments);

                // Focus on the comment input
                comments.querySelector('input').focus();
            } else {
                // Toggle comments visibility
                if (comments.style.display === 'none') {
                    comments.style.display = 'block';
                    // Focus on the comment input
                    comments.querySelector('input').focus();
                } else {
                    comments.style.display = 'none';
                }
            }
        });
    });

    // Comment post buttons
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-primary') && e.target.closest('.add-comment')) {
            // Check if user is logged in
            if (!isUserLoggedIn()) {
                showLoginAlert();
                return;
            }

            const button = e.target;
            const commentInput = button.previousElementSibling;
            const commentText = commentInput.value.trim();

            if (commentText) {
                // Get the comments container
                const commentsContainer = button.closest('.comments');

                // Create new comment
                const newComment = document.createElement('div');
                newComment.className = 'd-flex mb-3';

                // Get user ID for the comment author
                const userId = localStorage.getItem('userId');

                newComment.innerHTML = `
                    <div class="comment-avatar-container">
    <img src="https://api.dicebear.com/9.x/pixel-art/svg?seed=user15" class="avatar-img" alt="User Avatar">
</div>                    <div class="comment-bubble">
                        <div class="comment-header d-flex justify-content-between">
                            <strong>${localStorage.getItem("nickname")}</strong>
                            <small class="text-muted">Just now</small>
                        </div>
                        <p class="mb-0">${commentText}</p>
                    </div>
                `;

                // Add the new comment before the add comment section
                commentsContainer.insertBefore(newComment, button.closest('.add-comment'));

                // Clear the input
                commentInput.value = '';

                // Update comment count
                const commentButton = button.closest('.post').querySelector('.post-actions button:nth-child(2)');
                const commentCount = commentButton.textContent.match(/\d+/)[0];
                commentButton.innerHTML = `<i class="far fa-comment me-1"></i> ${parseInt(commentCount) + 1} replies`;

                // Save comment to post data in localStorage
                const post = button.closest('.post');
                saveComment(post, commentText);
            }
        }
    });
}

/**
 * Show alert for login requirement
 */
function showLoginAlert() {
    // Create a Bootstrap alert
    const alertEl = document.createElement('div');
    alertEl.className = 'alert alert-warning alert-dismissible fade show';
    alertEl.setAttribute('role', 'alert');
    alertEl.innerHTML = `
        <strong>Login Required!</strong> Please <a href="sign-in.html" class="alert-link">sign in</a> to comment on posts.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Insert at the top of the page
    const mainContent = document.querySelector('.container.my-4');
    mainContent.insertBefore(alertEl, mainContent.firstChild);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
        const bsAlert = new bootstrap.Alert(alertEl);
        bsAlert.close();
    }, 1000);
}

/**
 * Save a comment to a post in localStorage
 * @param {HTMLElement} postElement - The post element
 * @param {string} commentText - The comment text
 */
function saveComment(postElement, commentText) {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    // Get post identifier (could be index or a generated ID)
    const postIndex = Array.from(postElement.parentNode.children).indexOf(postElement);

    // Get existing user posts from localStorage
    let userPosts = JSON.parse(localStorage.getItem('userPosts') || '{}');

    // Initialize if needed
    if (!userPosts[userId]) {
        userPosts[userId] = { posts: [], comments: {} };
    }

    // Initialize comments object for this post if needed
    if (!userPosts[userId].comments[postIndex]) {
        userPosts[userId].comments[postIndex] = [];
    }

    // Add new comment
    userPosts[userId].comments[postIndex].push({
        text: commentText,
        timestamp: new Date().toISOString()
    });

    // Save back to localStorage
    localStorage.setItem('userPosts', JSON.stringify(userPosts));
}

/**
 * Setup create post modal functionality
 */
function setupCreatePostModal() {
    const modal = document.getElementById('createPostModal');
    const publishBtn = document.getElementById('publishPost');
    const postContentTextarea = document.getElementById('postContent');

    modal.addEventListener('show.bs.modal', function (event) {
        // Check if user is logged in
        if (!isUserLoggedIn()) {
            // Prevent modal from opening
            event.preventDefault();

            // Close the modal if it's already open
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) {
                modalInstance.hide();
            }

            // Show login alert
            showLoginAlert();

            // Optionally, redirect to login page
            // setTimeout(() => {
            //   window.location.href = 'sign-in.html';
            // }, 2000);
        } else {
            // User is logged in, update the username display
            const currentUserNameEl = document.getElementById('currentUserName');
            if (currentUserNameEl) {
                const userId = localStorage.getItem('userId');
                const nickname = localStorage.getItem('nickname');
                currentUserNameEl.textContent = nickname;
            }
        }
    });

    // Add Photo button
    document.getElementById('addPhoto').addEventListener('click', function () {
        const additionalFields = document.getElementById('additionalFields');
        additionalFields.innerHTML = `
            <div class="mb-3">
                <label for="postImage" class="form-label">Upload Image</label>
                <input type="file" class="form-control" id="postImage" accept="image/*">
            </div>
        `;
        additionalFields.classList.remove('d-none');
    });

    // Add Link button
    document.getElementById('addLink').addEventListener('click', function () {
        const additionalFields = document.getElementById('additionalFields');
        additionalFields.innerHTML = `
            <div class="mb-3">
                <label for="postLink" class="form-label">Link URL</label>
                <input type="url" class="form-control" id="postLink" placeholder="https://example.com">
            </div>
            <div class="mb-3">
                <label for="postLinkTitle" class="form-label">Link Title</label>
                <input type="text" class="form-control" id="postLinkTitle" placeholder="Title of the link">
            </div>
            <div class="mb-3">
                <label for="postLinkDescription" class="form-label">Link Description</label>
                <input type="text" class="form-control" id="postLinkDescription" placeholder="Brief description">
            </div>
        `;
        additionalFields.classList.remove('d-none');
    });

    // Add Poll button
    document.getElementById('addPoll').addEventListener('click', function () {
        const additionalFields = document.getElementById('additionalFields');
        additionalFields.innerHTML = `
            <div class="mb-3">
                <label for="pollQuestion" class="form-label">Poll Question</label>
                <input type="text" class="form-control" id="pollQuestion" placeholder="Ask a question...">
            </div>
            <div id="pollOptions">
                <div class="mb-2">
                    <div class="input-group">
                        <span class="input-group-text">1</span>
                        <input type="text" class="form-control" placeholder="Option 1">
                    </div>
                </div>
                <div class="mb-2">
                    <div class="input-group">
                        <span class="input-group-text">2</span>
                        <input type="text" class="form-control" placeholder="Option 2">
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-sm btn-outline-secondary" id="addPollOption">
                Add Option
            </button>
        `;
        additionalFields.classList.remove('d-none');

        // Add poll option button
        document.getElementById('addPollOption').addEventListener('click', function () {
            const pollOptions = document.getElementById('pollOptions');
            const optionCount = pollOptions.children.length + 1;

            const newOption = document.createElement('div');
            newOption.className = 'mb-2';
            newOption.innerHTML = `
                <div class="input-group">
                    <span class="input-group-text">${optionCount}</span>
                    <input type="text" class="form-control" placeholder="Option ${optionCount}">
                </div>
            `;

            pollOptions.appendChild(newOption);
        });
    });

    // Format Markdown button
    document.getElementById('formatMarkdown').addEventListener('click', function () {
        const textarea = postContentTextarea;
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const selectedText = textarea.value.substring(startPos, endPos);

        // Create a dropdown with markdown formatting options
        const additionalFields = document.getElementById('additionalFields');
        additionalFields.innerHTML = `
            <div class="mb-3">
                <label class="form-label">Markdown Formatting</label>
                <div class="btn-group w-100">
                    <button type="button" class="btn btn-sm btn-outline-secondary" data-format="bold">Bold</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary" data-format="italic">Italic</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary" data-format="heading">Heading</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary" data-format="list">List</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary" data-format="link">Link</button>
                    <button type="button" class="btn btn-sm btn-outline-secondary" data-format="code">Code</button>
                </div>
            </div>
        `;
        additionalFields.classList.remove('d-none');

        // Add event listeners to markdown buttons
        const markdownButtons = additionalFields.querySelectorAll('[data-format]');
        markdownButtons.forEach(button => {
            button.addEventListener('click', function () {
                const format = this.dataset.format;
                let formattedText = '';

                switch (format) {
                    case 'bold':
                        formattedText = `**${selectedText}**`;
                        break;
                    case 'italic':
                        formattedText = `*${selectedText}*`;
                        break;
                    case 'heading':
                        formattedText = `## ${selectedText}`;
                        break;
                    case 'list':
                        formattedText = `- ${selectedText.split('\n').join('\n- ')}`;
                        break;
                    case 'link':
                        formattedText = `[${selectedText}](https://example.com)`;
                        break;
                    case 'code':
                        formattedText = `\`${selectedText}\``;
                        break;
                }

                // Replace the selected text with the formatted text
                textarea.value = textarea.value.substring(0, startPos) + formattedText + textarea.value.substring(endPos);

                // Update selection
                textarea.selectionStart = startPos;
                textarea.selectionEnd = startPos + formattedText.length;

                // Focus on the textarea
                textarea.focus();
            });
        });
    });

    // Add Hashtag button
    document.getElementById('addHashtag').addEventListener('click', function () {
        const textarea = postContentTextarea;
        const cursorPos = textarea.selectionStart;

        // Insert hashtag at cursor position
        textarea.value = textarea.value.substring(0, cursorPos) + '#' + textarea.value.substring(cursorPos);

        // Move cursor after the hashtag
        textarea.selectionStart = cursorPos + 1;
        textarea.selectionEnd = cursorPos + 1;

        // Focus on the textarea
        textarea.focus();
    });

    // Add Code button
    document.getElementById('addCode').addEventListener('click', function () {
        const additionalFields = document.getElementById('additionalFields');
        additionalFields.innerHTML = `
            <div class="mb-3">
                <label for="codeBlock" class="form-label">Code Block</label>
                <select class="form-select mb-2" id="codeLanguage">
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="csharp">C#</option>
                    <option value="cpp">C++</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                </select>
                <textarea class="form-control font-monospace" id="codeBlock" rows="5" placeholder="Paste your code here..."></textarea>
            </div>
        `;
        additionalFields.classList.remove('d-none');
    });

    // Publish post button
    publishBtn.addEventListener('click', function () {
        // Check if user is logged in
        if (!isUserLoggedIn()) {
            showLoginAlert();
            return;
        }

        const postContent = postContentTextarea.value.trim();

        if (postContent) {
            // Create new post
            createNewPost(postContent);

            // Close the modal
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();

            // Clear the form
            postContentTextarea.value = '';
            document.getElementById('additionalFields').innerHTML = '';
            document.getElementById('additionalFields').classList.add('d-none');

            // Show success message
            showToast('Your post has been published!');
        } else {
            alert('Please enter some content for your post.');
        }
    });
}

/**
 * Create a new post and add it to the feed
 * @param {string} content - Post content
 */
function createNewPost(content) {
    // Create post element
    const postElement = document.createElement('div');
    postElement.className = 'card shadow-sm mb-4 post';

    // Get current user ID or use default
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    // Format the content (simple markdown-like formatting)
    let formattedContent = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/## (.*?)$/gm, '<h5>$1</h5>')
        .replace(/- (.*?)$/gm, '<li>$1</li>')
        .replace(/<li>(.*?)<\/li>/gm, function (match) {
            return '<ul>' + match + '</ul>';
        })
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');

    // Replace #hashtags with styled spans
    formattedContent = formattedContent.replace(/#(\w+)/g, '<span class="badge bg-light text-dark">#$1</span>');

    postElement.innerHTML = `
        <div class="card-header bg-white border-0">
            <div class="d-flex align-items-center">
                <div class="post-avatar-container">
    <img src="https://api.dicebear.com/9.x/pixel-art/svg?seed=user16" class="avatar-img" alt="User Avatar">
</div>                <div>
                    <h6 class="mb-0">${localStorage.getItem("nickname")}</h6>
                    <small class="text-muted">Just now</small>
                </div>
                <div class="ms-auto">
                    <button class="btn btn-sm btn-link text-muted">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <p>${formattedContent}</p>
            <div class="post-actions d-flex">
                <button class="btn btn-sm btn-link text-muted me-3">
                    <i class="far fa-heart me-1"></i> 0 likes
                </button>
                <button class="btn btn-sm btn-link text-muted me-3">
                    <i class="far fa-comment me-1"></i> 0 replies
                </button>
                <button class="btn btn-sm btn-link text-muted">
                    <i class="far fa-bookmark"></i>
                </button>
            </div>
        </div>
    `;

    // Add the new post to the top of the feed
    const postsFeed = document.getElementById('postsFeed');
    postsFeed.insertBefore(postElement, postsFeed.firstChild);

    // Setup interactions for the new post
    setupPostInteractions();

    // Save post to localStorage
    saveUserPost(content);
}

/**
 * Save a user post to localStorage
 * @param {string} content - Post content
 */
function saveUserPost(content) {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    // Get post visibility setting
    const visibilitySelector = document.getElementById('postVisibility');
    const visibility = visibilitySelector ? visibilitySelector.value : 'public';

    // Get existing user posts from localStorage
    let userPosts = JSON.parse(localStorage.getItem('userPosts') || '{}');

    // Initialize if needed
    if (!userPosts[userId]) {
        userPosts[userId] = { posts: [], comments: {} };
    }

    // Add new post
    userPosts[userId].posts.push({
        content: content,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: [],
        visibility: visibility // Save visibility setting
    });

    // Save back to localStorage
    localStorage.setItem('userPosts', JSON.stringify(userPosts));

    // If post is public, also save to public posts collection
    if (visibility === 'public') {
        let publicPosts = JSON.parse(localStorage.getItem('publicPosts') || '[]');

        publicPosts.push({
            userId: userId,
            content: content,
            timestamp: new Date().toISOString(),
            likes: 0,
            comments: []
        });

        // Save back to localStorage
        localStorage.setItem('publicPosts', JSON.stringify(publicPosts));
    }
}

/**
 * Load all posts that should be visible to the current user
 */
function loadAllVisiblePosts() {
    const userId = localStorage.getItem('userId');
    const postsFeed = document.getElementById('postsFeed');

    // Clear existing posts if needed
    // postsFeed.innerHTML = '';

    // Array to store all posts that should be shown
    let allVisiblePosts = [];

    // 1. Load public posts (visible to everyone)
    const publicPosts = JSON.parse(localStorage.getItem('publicPosts') || '[]');
    allVisiblePosts = [...publicPosts];

    // 2. If user is logged in, load their personal/connections-only posts
    if (userId) {
        const userPosts = JSON.parse(localStorage.getItem('userPosts') || '{}');

        // Add personal posts if they exist
        if (userPosts[userId] && userPosts[userId].posts) {
            userPosts[userId].posts.forEach(post => {
                // Only add non-public posts here (public ones are already in the list)
                if (post.visibility !== 'public') {
                    allVisiblePosts.push({
                        userId: userId,
                        ...post
                    });
                }
            });
        }

        // Future enhancement: Add posts from connections (if visibility is 'connections')
    }

    // Sort all posts by timestamp (newest first)
    allVisiblePosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // Display all visible posts
    allVisiblePosts.forEach(post => {
        displayPost(post);
    });
}
/**
 * Display a single post in the feed
 * @param {Object} post - Post data
 */
function displayPost(post) {
    const postsFeed = document.getElementById('postsFeed');
    if (!postsFeed) return;

    // Get user ID for the post author (might be current user or another user)
    const postUserId = post.userId;

    // Format the content
    let formattedContent = post.content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/## (.*?)$/gm, '<h5>$1</h5>')
        .replace(/- (.*?)$/gm, '<li>$1</li>')
        .replace(/<li>(.*?)<\/li>/gm, function (match) {
            return '<ul>' + match + '</ul>';
        })
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');

    // Replace #hashtags with styled spans
    formattedContent = formattedContent.replace(/#(\w+)/g, '<span class="badge bg-light text-dark">#$1</span>');

    // Format date
    const postDate = new Date(post.timestamp);
    const dateString = postDate.toLocaleDateString();

    // Create post element
    const postElement = document.createElement('div');
    postElement.className = 'card shadow-sm mb-4 post';

    // Add data attribute to identify the post
    postElement.dataset.postUserId = postUserId;
    postElement.dataset.timestamp = post.timestamp;

    // Determine if this is the current user's post
    const isCurrentUserPost = localStorage.getItem('userId') === postUserId;

    postElement.innerHTML = `
        <div class="card-header bg-white border-0">
            <div class="d-flex align-items-center">
                <div class="post-avatar-container">
    <img src="https://api.dicebear.com/9.x/pixel-art/svg?seed=user17" class="avatar-img" alt="User Avatar">
</div>                <div>
                    <h6 class="mb-0">${localStorage.getItem("nickname")}</h6>
                    <small class="text-muted">${dateString}</small>
                </div>
                ${isCurrentUserPost ? `
                <div class="ms-auto">
                    <button class="btn btn-sm btn-link text-muted">
                        <i class="fas fa-ellipsis-h"></i>
                    </button>
                </div>
                ` : ''}
            </div>
        </div>
        <div class="card-body">
            <p>${formattedContent}</p>
            <div class="post-actions d-flex">
                <button class="btn btn-sm btn-link text-muted me-3">
                    <i class="far fa-heart me-1"></i> ${post.likes || 0} likes
                </button>
                <button class="btn btn-sm btn-link text-muted me-3">
                    <i class="far fa-comment me-1"></i> ${post.comments ? post.comments.length : 0} replies
                </button>
                <button class="btn btn-sm btn-link text-muted">
                    <i class="far fa-bookmark"></i>
                </button>
            </div>
        </div>
    `;

    // Add to the feed at the top
    if (postsFeed.firstChild) {
        postsFeed.insertBefore(postElement, postsFeed.firstChild);
    } else {
        postsFeed.appendChild(postElement);
    }

    // Setup interactions for the new post
    setupPostInteractions();
}

/**
 * Load user posts from localStorage
 */
function loadUserPosts() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    // Get user posts from localStorage
    const userPosts = JSON.parse(localStorage.getItem('userPosts') || '{}');

    // Check if user has any saved posts
    if (userPosts[userId] && userPosts[userId].posts && userPosts[userId].posts.length > 0) {
        // Get posts feed container
        const postsFeed = document.getElementById('postsFeed');

        // Loop through posts in reverse order (newest first)
        for (let i = userPosts[userId].posts.length - 1; i >= 0; i--) {
            const post = userPosts[userId].posts[i];

            // Format the content
            let formattedContent = post.content
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/## (.*?)$/gm, '<h5>$1</h5>')
                .replace(/- (.*?)$/gm, '<li>$1</li>')
                .replace(/<li>(.*?)<\/li>/gm, function (match) {
                    return '<ul>' + match + '</ul>';
                })
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
                .replace(/`([^`]+)`/g, '<code>$1</code>')
                .replace(/\n/g, '<br>');

            // Replace #hashtags with styled spans
            formattedContent = formattedContent.replace(/#(\w+)/g, '<span class="badge bg-light text-dark">#$1</span>');

            // Format date
            const postDate = new Date(post.timestamp);
            const dateString = postDate.toLocaleDateString();

            // Create post element
            const postElement = document.createElement('div');
            postElement.className = 'card shadow-sm mb-4 post user-saved-post';
            postElement.dataset.postId = i; // Store post ID for reference

            postElement.innerHTML = `
                <div class="card-header bg-white border-0">
                    <div class="d-flex align-items-center">
                        <div class="post-avatar-container">
    <img src="https://api.dicebear.com/9.x/pixel-art/svg?seed=user18" class="avatar-img" alt="User Avatar">
</div>                        <div>
                            <h6 class="mb-0">${localStorage.getItem("nickname")}</h6>
                            <small class="text-muted">${dateString}</small>
                        </div>
                        <div class="ms-auto">
                            <button class="btn btn-sm btn-link text-muted">
                                <i class="fas fa-ellipsis-h"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <p>${formattedContent}</p>
                    <div class="post-actions d-flex">
                        <button class="btn btn-sm btn-link text-muted me-3">
                            <i class="far fa-heart me-1"></i> ${post.likes || 0} likes
                        </button>
                        <button class="btn btn-sm btn-link text-muted me-3">
                            <i class="far fa-comment me-1"></i> ${post.comments ? post.comments.length : 0} replies
                        </button>
                        <button class="btn btn-sm btn-link text-muted">
                            <i class="far fa-bookmark"></i>
                        </button>
                    </div>
                </div>
            `;

            // Insert at the top of the feed
            if (postsFeed.firstChild) {
                postsFeed.insertBefore(postElement, postsFeed.firstChild);
            } else {
                postsFeed.appendChild(postElement);
            }

            // Load comments for this post if any exist
            if (userPosts[userId].comments && userPosts[userId].comments[i]) {
                const postComments = userPosts[userId].comments[i];
                if (postComments && postComments.length > 0) {
                    // Create comments section
                    const commentsSection = document.createElement('div');
                    commentsSection.className = 'comments mt-3';
                    commentsSection.innerHTML = '<hr>';

                    // Add each comment
                    postComments.forEach(comment => {
                        const commentDate = new Date(comment.timestamp);
                        const commentDateString = commentDate.toLocaleDateString();

                        const commentElement = document.createElement('div');
                        commentElement.className = 'd-flex mb-3';
                        commentElement.innerHTML = `
                            <div class="comment-avatar-container">
    <img src="https://api.dicebear.com/9.x/pixel-art/svg?seed=user19" class="avatar-img" alt="User Avatar">
</div>                            <div class="comment-bubble">
                                <div class="comment-header d-flex justify-content-between">
                                    <strong>${localStorage.getItem("nickname")}</strong>
                                    <small class="text-muted">${commentDateString}</small>
                                </div>
                                <p class="mb-0">${comment.text}</p>
                            </div>
                        `;
                        commentsSection.appendChild(commentElement);
                    });

                    // Add comment input
                    commentsSection.innerHTML += `
                        <div class="add-comment d-flex align-items-center">
                            <div class="comment-avatar-container">
                            <img src="https://api.dicebear.com/9.x/pixel-art/svg?seed=user20" class="avatar-img" alt="User Avatar">
                        </div>
                        <input type="text" class="form-control form-control-sm" placeholder="Write a comment...">
                            <button class="btn btn-sm btn-primary ms-2">Post</button>
                        </div>
                    `;

                    // Add comments section to post
                    postElement.querySelector('.card-body').appendChild(commentsSection);
                }
            }
        }

        // Setup interactions for the loaded posts
        setupPostInteractions();
    }
}

/**
 * Setup sidebar navigation
 */
function setupSidebarNavigation() {
    const sidebarItems = document.querySelectorAll('.list-group-item');

    sidebarItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove active class from all items
            sidebarItems.forEach(item => item.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Handle navigation logic based on clicked item
            const navText = this.textContent.trim();

            // For demonstration, just show a toast
            showToast(`Navigated to ${navText}`);
        });
    });
}

/**
 * Filter posts based on the selected topic
 * @param {string} topic - Topic to filter by
 */
function filterPosts(topic) {
    // For demonstration purposes, just show a toast
    if (topic === 'All') {
        showToast('Showing all posts');
    } else {
        showToast(`Filtering posts by: ${topic}`);
    }

    // In a real implementation, you would filter the posts based on the topic
}

/**
 * Create scroll to top button
 */
function createScrollToTopButton() {
    // Create button element
    const scrollButton = document.createElement('div');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';

    // Add to document
    document.body.appendChild(scrollButton);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    scrollButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Setup lazy loading for images
 */
function setupLazyLoading() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img');

        const imageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    // Replace src with data-src if it exists
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }

                    // Stop observing the image
                    imageObserver.unobserve(img);
                }
            });
        });

        // Observe each image
        lazyImages.forEach(function (img) {
            imageObserver.observe(img);
        });
    }
}

/**
 * Setup infinite scrolling
 */
function setupInfiniteScroll() {
    let isLoading = false;
    let page = 1;

    window.addEventListener('scroll', function () {
        // Check if we're near the bottom of the page
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            if (!isLoading) {
                isLoading = true;

                // Show loading indicator
                const loadingIndicator = document.createElement('div');
                loadingIndicator.className = 'text-center py-3';
                loadingIndicator.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';
                document.getElementById('postsFeed').appendChild(loadingIndicator);

                // Simulate API call with timeout
                setTimeout(function () {
                    // Remove loading indicator
                    loadingIndicator.remove();

                    // Load more posts
                    loadMorePosts();

                    // Reset loading flag
                    isLoading = false;
                    page++;
                }, 1500);
            }
        }
    });
}

/**
 * Load more posts for infinite scrolling
 */
function loadMorePosts() {
    // Sample post data - in a real app, this would come from an API
    const samplePosts = [
        {
            author: 'Alex Johnson',
            role: 'Computer Science • 2025',
            content: 'Just finished my first internship at a startup. The experience was incredible! Happy to answer any questions about finding internships at smaller companies.',
            likes: 15,
            comments: 3
        },
        {
            author: 'Jamie Smith',
            role: 'Software Engineering • 2024',
            content: 'Here\'s a resource that helped me ace my technical interviews: <a href="#" class="text-decoration-none">codinginterviewprep.com</a>',
            likes: 28,
            comments: 7
        },
        {
            author: 'Taylor Wong',
            role: 'Data Science • 2023',
            content: 'Anyone interested in a study group for the upcoming AWS certification? I\'m planning to take the exam next month. #AWS #CloudComputing',
            likes: 12,
            comments: 5
        }
    ];

    // Get the posts feed container
    const postsFeed = document.getElementById('postsFeed');

    // Add each sample post to the feed
    samplePosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'card shadow-sm mb-4 post';

        postElement.innerHTML = `
            <div class="card-header bg-white border-0">
                <div class="d-flex align-items-center">
                    <div class="post-avatar-container">
    <img src="https://api.dicebear.com/9.x/pixel-art/svg?seed=user13" class="avatar-img" alt="User Avatar">
</div>                    <div>
                        <h6 class="mb-0">${post.author}</h6>
                        <small class="text-muted">${post.role}</small>
                    </div>
                    <div class="ms-auto">
                        <button class="btn btn-sm btn-link text-muted">
                            <i class="fas fa-ellipsis-h"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <p>${post.content}</p>
                <div class="post-actions d-flex">
                    <button class="btn btn-sm btn-link text-muted me-3">
                        <i class="far fa-heart me-1"></i> ${post.likes} likes
                    </button>
                    <button class="btn btn-sm btn-link text-muted me-3">
                        <i class="far fa-comment me-1"></i> ${post.comments} replies
                    </button>
                    <button class="btn btn-sm btn-link text-muted">
                        <i class="far fa-bookmark"></i>
                    </button>
                </div>
            </div>
        `;

        postsFeed.appendChild(postElement);
    });

    // Setup interactions for the new posts
    setupPostInteractions();
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