/**
 * Generate a list of users.
 * Schema for each user:
 * {
 *   id: number,           // Unique integer ID for the user
 *   userType: string      // "student" or "org"
 * }
 */
function generateUsers() {
    return [
        { id: 1, userType: "student" },
        { id: 2, userType: "student" },
        { id: 3, userType: "org" }
    ];
}


/**
 * Generate a list of job applications.
 * Schema for each application:
 * {
 *   id: number,            // Unique integer ID for the application
 *   userId: number,        // Foreign key to user.id
 *   companyName: string,   // Name of the company applied to
 *   jobTitle: string,      // Job title applied for
 *   status: string         // One of "applied", "interview", "offer"
 * }
 * 
 * @param {Array} users - User list to assign applications to
 */
function generateApplications(users) {
    return [
        {
            id: 1,
            userId: users[0].id,
            companyName: "Google",
            jobTitle: "Software Engineer Intern",
            status: "applied"
        },
        {
            id: 2,
            userId: users[0].id,
            companyName: "Meta",
            jobTitle: "Backend Intern",
            status: "interview"
        },
        {
            id: 3,
            userId: users[1].id,
            companyName: "Amazon",
            jobTitle: "SDE Intern",
            status: "offer"
        }
    ];
}


/**
 * Generate a list of posts.
 * Schema for each post:
 * {
 *   id: number,          // Unique integer ID for the post
 *   userId: number,      // Foreign key to user.id
 *   title: string,       // Title of the post
 *   content: string      // Main content body of the post
 * }
 * 
 * @param {Array} users - User list to assign posts to
 */
function generatePosts(users) {
    return [
        {
            id: 1,
            userId: users[0].id,
            title: "Google Internship Interview",
            content: "It was a three-round process focusing on algorithms and system design."
        },
        {
            id: 2,
            userId: users[1].id,
            title: "Internship Preparation Tips",
            content: "Start early with resume prep, Leetcode, and mock interviews."
        }
    ];
}

/**
* Generate a list of resources.
* Schema for each resource:
* {
*   id: number,          // Unique integer ID for the resource
*   userId: number,      // Foreign key to user.id
*   title: string,       // Resource title
*   content: string,     // Resource description or content
*   type: string         // One of "intern", "full time", "research"
* }
* 
* @param {Array} users - User list to assign resources to
*/
function generateResources(users) {
    return [
        {
            id: 1,
            userId: users[0].id,
            title: "2025 Internship Tracker",
            content: "A spreadsheet with application links, deadlines, and notes.",
            type: "intern"
        },
        {
            id: 2,
            userId: users[2].id,
            title: "Research Application Guide",
            content: "Step-by-step guide to apply for research positions.",
            type: "research"
        }
    ];
}


/**
 * Generate all mock data: users, applications, posts, and resources.
 * Returns an object containing lists for each table.
 */
function generateMockData() {
    const users = generateUsers();
    const applications = generateApplications(users);
    const posts = generatePosts(users);
    const resources = generateResources(users);
  
    return {
      userData: users,
      applicationData: applications,
      postData: posts,
      resData: resources
    };
  }
