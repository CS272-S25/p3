# CS472 Group Project: BadgerCS Career Nexus

**BadgerCS Career Nexus** is a specialized web platform designed to support the career development of Computer Science students at the University of Wisconsin–Madison. Built as a course project for CS/LIS472: Introduction to Web Development (Spring 2025), the platform integrates front-end technologies to deliver a modern, responsive, and student-focused experience.

## Project Purpose

The main objective of this website is to provide a centralized hub for UW–Madison CS students to:
- Discover internships and job opportunities relevant to their field.
- Prepare for technical and behavioral interviews.
- Connect and share advice through an interactive community forum.
- Organize their job applications and track career progress.

The platform is designed for CS students, recent graduates, and university career advisors seeking accessible tools and peer-to-peer knowledge exchange.

## Technologies Used

- **HTML5** – Semantic structure and accessibility
- **CSS3 + Bootstrap 5** – Responsive and consistent styling across devices
- **JavaScript (ES6)** – Dynamic interactions and DOM manipulation
- **RESTful Architecture** – Frontend-backend communication using JSON
- **Docker** – Containerized deployment for environment parity

## Key Features

- **Job Listings Page**: Filterable listings by job type, location, and experience. Each listing links to a detailed job view.
- **Job Detail Page**: Includes company info, salary, job type, required skills, and application tracking features.
- **Community Forum**: Users can post updates, share resources, like and comment, and view trending career topics.
- **User Dashboard(TO-DO)**: Personalized overview with saved jobs, applications, and uploaded resumes.
- **Authentication Pages(TO DO)**: Registration and login forms with plans to support university SSO (OAuth2 + JWT).
- **Interview Preparation(TO-DO)**: Tips, practice questions, and resources curated for CS students.

## Development Practices

- **Git Branching Strategy**: Feature-based branching with pull requests and code reviews.
- **Modular Codebase**: HTML, CSS, and JS are separated and reusable across pages.
- **Responsive Design**: Grid system and media queries ensure usability on mobile and desktop.
- **Accessibility**: Proper alt tags, keyboard focus states, and ARIA attributes used where applicable.

## Future Improvements

- Add persistent backend database (e.g., Firebase, Supabase)
- Implement SSO with university credentials using OAuth2
- Real-time updates for forum posts and application tracking
- Integrate UW Career Center APIs
- Enhanced analytics and resume parsing in user dashboards

## Presentation Summary

In our final presentation, we demonstrated key workflows including job browsing, forum interactions, and the user dashboard. We discussed challenges such as ensuring cross-browser compatibility and managing user authentication, and reflected on lessons learned in modular design, responsive UI, and real-world deployment planning.

## 👥 Team Members

- **Jierui (Jerry) Xu**
- **Yixi Zhou**
- **Chenxi (Sherry) Xia**

> Course: CS/LIS472 — Introduction to Web Development  
> Semester: Spring 2025  
> Instructor: Cole Nelson

---

**🔗 Live Demo**: [https://cs272-s25.github.io/p3](https://cs272-s25.github.io/p3)

## Git Collaboration Guide
- There are multiple branches in this repository. 
    - `main` branch: This is the main branch where the stable version of the code resides.
    - `dev` branch: This is the development branch where new features and changes are made and merged before publishing it to `main` branch.
    - `frontend/feature-xxx` branches: These branches are used for developing specific features in the frontend.
    - `backend/feature-xxx` branches: These branches are used for developing specific features in the backend.
- Steps to follow:
    1. At the beginning, `git clone` the repository to your local machine.
    2. Check the branches you'll work on:
        ```bash
        git branch -r
        git checkout xxx
        ```
    3. Always `git pull origin xxx` before starting to work on the `xxx` branch.
    4. Use `git push origin xxx` to push your changes to the `xxx` branch.

- Reference Links
    - Update Git branches from master: https://stackoverflow.com/questions/3876977/update-git-branches-from-master 


