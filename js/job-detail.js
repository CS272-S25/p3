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
        companyLogo: "https://logowik.com/content/uploads/images/tinuiti6085.jpg",
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
        companyLogo: "https://structuredlabs.com/logo.svg",
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
        companyLogo: "https://img.securityinfowatch.com/files/base/cygnus/siw/image/2017/03/TelguardLogoVertical_2.58bebda68720b.png?auto=format%2Ccompress&w=250&width=250",
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
    },
    // Add these entries to your mockJobDetails object in job-detail.js

    "job4": {
        id: "job4",
        title: "Software Development Internship",
        company: "C-Motive Technologies",
        companyLogo: "https://www.nailmags.com/userAssets/members/4109/logo/cmotive_icon_color.png",
        industry: "Other Industries",
        salary: "$15/hr",
        jobType: "Part-time job",
        location: "Middleton, WI (On-site)",
        date: "5 days ago",
        postedDate: "April 12, 2025",
        experience: "Entry-Level",
        description: `<h4>About C-Motive Technologies</h4>
        <p>C-Motive Technologies is pioneering the future of electric motors and generators with our patented electrostatic motor technology. We're looking for talented software development interns to join our team and help build software solutions that support our innovative hardware.</p>
        
        <h4>Internship Overview</h4>
        <p>As a Software Development Intern, you will work with our engineering team to develop and maintain software tools that assist in the design, testing, and monitoring of our electrostatic motor systems. This is a hands-on role where you'll gain experience in both embedded systems and web-based applications.</p>
        
        <h4>Key Responsibilities</h4>
        <ul>
            <li>Assist in developing software interfaces for motor control systems</li>
            <li>Create data visualization tools for performance monitoring</li>
            <li>Support the development of embedded firmware for motor controllers</li>
            <li>Help build internal web applications for data analysis</li>
            <li>Participate in testing and quality assurance processes</li>
            <li>Document code and technical specifications</li>
        </ul>`,
        skills: [
            "JavaScript, HTML, CSS",
            "Node.js experience",
            "Basic knowledge of embedded systems",
            "Experience with data visualization libraries",
            "Understanding of software development lifecycle",
            "Ability to work in a team environment"
        ],
        qualifications: [
            "Currently pursuing a degree in Computer Science, Software Engineering, or related field",
            "Completed coursework in programming and web development",
            "Familiarity with version control systems (Git)",
            "Interest in clean energy technology and electromechanical systems",
            "Strong problem-solving and analytical skills",
            "Ability to work 10-20 hours per week"
        ],
        companyDescription: "C-Motive Technologies is revolutionizing electric motor technology with our capacitive motor design that eliminates the need for rare earth materials while providing superior efficiency and performance. Our technology has applications in transportation, renewable energy, and industrial automation.",
        companySize: "10-50 employees",
        companyWebsite: "https://www.c-motive.com",
        employeeRating: 4.5,
        workLifeBalance: 4.7,
        careerGrowth: 4.3,
        interviewDifficulty: 3.2,
        interviewQuestions: [
            "Describe your experience with JavaScript and web development.",
            "How would you design a simple interface to display real-time sensor data?",
            "What interests you about working with motor control systems?",
            "Tell us about a project where you had to learn a new technology quickly."
        ]
    },

    "job5": {
        id: "job5",
        title: "Software Engineer (Intern)",
        company: "comma.ai",
        companyLogo: "https://images.seeklogo.com/logo-png/48/1/comma-ai-logo-png_seeklogo-483230.png",
        industry: "Internet & Software",
        salary: "$6-7K/mo",
        jobType: "Full-time job",
        location: "San Diego, CA (On-site)",
        date: "2 weeks ago",
        postedDate: "April 2, 2025",
        experience: "Entry-Level",
        description: `<h4>What is comma.ai?</h4>
        <p>comma.ai is building the future of transportation through AI-powered autonomous driving technology. Our open-source driver assistance system, openpilot, is already one of the best in the world, running on over 200 supported car makes and models.</p>
        
        <h4>The Internship</h4>
        <p>As a Software Engineer Intern at comma.ai, you'll work directly on our core technologies alongside some of the brightest minds in autonomous driving. You'll tackle real problems, push code to production, and potentially impact thousands of users who rely on our technology every day.</p>
        
        <h4>What You'll Be Doing</h4>
        <ul>
            <li>Working on computer vision algorithms for our driver monitoring system</li>
            <li>Building and improving tools for our machine learning pipeline</li>
            <li>Developing features for our mobile application</li>
            <li>Optimizing performance of critical systems</li>
            <li>Analyzing real-world driving data to improve system safety</li>
            <li>Contributing to our open-source codebase</li>
        </ul>`,
        skills: [
            "Strong Python programming skills",
            "Machine learning experience",
            "Computer vision knowledge",
            "C++ programming",
            "Experience with PyTorch or TensorFlow",
            "Linux/Unix system knowledge"
        ],
        qualifications: [
            "Currently pursuing a degree in Computer Science, Machine Learning, or related field",
            "Previous internship or project experience in ML/computer vision",
            "Experience with real-time systems a plus",
            "Strong communication and collaboration skills",
            "Passion for autonomous vehicle technology",
            "Ability to relocate to San Diego for the internship duration"
        ],
        companyDescription: "comma.ai's mission is to solve self-driving cars while delivering shippable intermediaries. Our first product, openpilot, is an open source driver assistance system that offers adaptive cruise control, automated lane centering, and more for over 200 supported car makes and models.",
        companySize: "50-200 employees",
        companyWebsite: "https://comma.ai",
        employeeRating: 4.6,
        workLifeBalance: 3.8,
        careerGrowth: 4.7,
        interviewDifficulty: 4.5,
        interviewQuestions: [
            "What is the difference between a convolutional neural network and a recurrent neural network?",
            "How would you optimize a computer vision algorithm for real-time performance?",
            "Describe a challenging machine learning project you've worked on.",
            "How would you detect if a driver is distracted using a camera feed?"
        ]
    },

    "job6": {
        id: "job6",
        title: "Software Engineer - Summer",
        company: "Lazarus",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/8/80/Lazarus_Logo_%28new%29.png",
        industry: "Internet & Software",
        salary: "$30/hr",
        jobType: "Full-time job",
        location: "United States (Remote)",
        date: "1 month ago",
        postedDate: "March 15, 2025",
        experience: "Entry-Level",
        description: `<h4>About Lazarus</h4>
        <p>Lazarus is a fast-growing startup that specializes in data recovery and digital security solutions. Our mission is to help companies and individuals protect and recover their most valuable digital assets in an increasingly vulnerable digital world.</p>
        
        <h4>Summer Engineering Program</h4>
        <p>As a Summer Software Engineer at Lazarus, you'll be an integral part of our development team, working on real projects that impact our core products and services. This is not a coffee-fetching internship – you'll be treated as a full team member with meaningful responsibilities.</p>
        
        <h4>Responsibilities</h4>
        <ul>
            <li>Develop and implement new features for our data recovery platform</li>
            <li>Build and improve frontend components for our web applications</li>
            <li>Assist in the creation of APIs and backend services</li>
            <li>Participate in code reviews and engineering discussions</li>
            <li>Collaborate with product and design teams</li>
            <li>Test and debug code to ensure reliability</li>
        </ul>`,
        skills: [
            "JavaScript, React, and modern frontend frameworks",
            "Experience with Node.js or similar backend technologies",
            "Understanding of RESTful APIs",
            "Knowledge of database systems (SQL or NoSQL)",
            "Familiarity with Git and collaborative development",
            "Basic understanding of cybersecurity principles"
        ],
        qualifications: [
            "Currently pursuing a degree in Computer Science or related field",
            "Strong fundamentals in data structures and algorithms",
            "Previous internship or project experience preferred",
            "Ability to work independently and as part of a team",
            "Excellent problem-solving and communication skills",
            "Interest in data security and recovery technologies"
        ],
        companyDescription: "Lazarus is a leader in data recovery and digital security solutions. We provide cutting-edge tools that help businesses and individuals recover lost data, secure their digital assets, and maintain business continuity in the face of cyber threats.",
        companySize: "50-200 employees",
        companyWebsite: "https://www.lazarustech.com",
        employeeRating: 4.4,
        workLifeBalance: 4.2,
        careerGrowth: 4.5,
        interviewDifficulty: 3.8,
        interviewQuestions: [
            "How would you design a system to securely store and recover sensitive user data?",
            "Explain how you would implement a feature that allows users to restore files from different backup points.",
            "Describe your experience with React and component-based architecture.",
            "How would you approach debugging a complex issue in a full-stack application?"
        ]
    },

    "job7": {
        id: "job7",
        title: "Full Stack Software Engineer",
        company: "Epic Systems",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Epic_Systems.svg",
        industry: "Healthcare",
        salary: "$85-110K/year",
        jobType: "Full-time job",
        location: "Madison, WI (On-site)",
        date: "2 days ago",
        postedDate: "April 15, 2025",
        experience: "Mid-Level",
        description: `<h4>About Epic Systems</h4>
        <p>Epic Systems is a leading provider of healthcare software used by hospitals, healthcare organizations, and patients worldwide. Our integrated software spans clinical, access, revenue, and analytics functions to help healthcare professionals provide better care for their patients.</p>
        
        <h4>The Role</h4>
        <p>As a Full Stack Software Engineer at Epic, you'll build and enhance the applications that power some of the world's largest healthcare organizations. You'll have the opportunity to see your work directly impact patient care and healthcare operations on a massive scale.</p>
        
        <h4>What You'll Do</h4>
        <ul>
            <li>Design, develop, and maintain web and desktop applications used by healthcare professionals</li>
            <li>Build robust backend services that handle complex medical data</li>
            <li>Create intuitive user interfaces that enable efficient healthcare delivery</li>
            <li>Collaborate with teams across the organization to integrate various systems</li>
            <li>Test and debug applications to ensure reliability in critical healthcare environments</li>
            <li>Help implement new features based on customer feedback and industry needs</li>
        </ul>`,
        skills: [
            "Proficiency in C#, JavaScript, and TypeScript",
            "Experience with modern frontend frameworks (React, Angular)",
            "Knowledge of database design and SQL",
            "Understanding of software architecture principles",
            "Experience with automated testing frameworks",
            "Strong problem-solving abilities"
        ],
        qualifications: [
            "Bachelor's degree in Computer Science, Software Engineering, or related field",
            "2-4 years of professional software development experience",
            "Strong understanding of data structures and algorithms",
            "Experience building responsive web applications",
            "Excellent communication and teamwork skills",
            "Interest in healthcare technology and improving patient outcomes"
        ],
        companyDescription: "Epic Systems develops integrated healthcare software that spans clinical, access, revenue, and analytics functions. Used by top hospitals and healthcare organizations worldwide, our software helps healthcare professionals provide better care for over 250 million patients.",
        companySize: "10,000+ employees",
        companyWebsite: "https://www.epic.com",
        employeeRating: 3.9,
        workLifeBalance: 3.2,
        careerGrowth: 4.3,
        interviewDifficulty: 4.2,
        interviewQuestions: [
            "Describe a complex software system you've built from start to finish.",
            "How would you design a system to handle sensitive patient data securely?",
            "What approaches do you take to ensure your code is maintainable and scalable?",
            "How would you optimize database queries in an application that processes large volumes of data?"
        ]
    },

    "job8": {
        id: "job8",
        title: "Backend Engineer",
        company: "Microsoft",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        industry: "Internet & Software",
        salary: "$120-140K/year",
        jobType: "Full-time job",
        location: "Redmond, WA (Hybrid)",
        date: "3 days ago",
        postedDate: "April 14, 2025",
        experience: "Mid-Level",
        description: `<h4>Position Overview</h4>
        <p>Microsoft is seeking a talented Backend Engineer to join our Cloud Services team. In this role, you will design, develop, and maintain high-performance, reliable backend services that power Microsoft's cloud products used by millions of customers worldwide.</p>
        
        <h4>Team Information</h4>
        <p>You'll be joining the Azure Cloud Infrastructure team, responsible for building and scaling the core services that our customers rely on for their business-critical applications. Our team values innovation, reliability, and a customer-focused approach to software development.</p>
        
        <h4>Responsibilities</h4>
        <ul>
            <li>Design and implement scalable microservices in a cloud environment</li>
            <li>Build and maintain APIs that serve both internal and external clients</li>
            <li>Optimize system performance and resource utilization</li>
            <li>Implement automated testing and continuous integration/deployment practices</li>
            <li>Collaborate with front-end engineers to integrate services with user interfaces</li>
            <li>Troubleshoot and resolve complex production issues</li>
            <li>Participate in on-call rotations for service reliability</li>
        </ul>`,
        skills: [
            "Strong proficiency in Java, C#, or Go",
            "Experience with distributed systems and microservice architecture",
            "Knowledge of cloud platforms (preferably Azure)",
            "Experience with container technologies (Docker, Kubernetes)",
            "Understanding of database systems (SQL and NoSQL)",
            "Familiarity with monitoring and observability tools"
        ],
        qualifications: [
            "Bachelor's degree in Computer Science, Engineering, or related field",
            "3+ years of professional software development experience",
            "Strong understanding of system design principles",
            "Experience with CI/CD pipelines and DevOps practices",
            "Excellent problem-solving and analytical skills",
            "Good communication and collaboration abilities"
        ],
        companyDescription: "Microsoft is a global technology leader that develops and supports software, services, devices, and solutions that empower people and organizations around the world to achieve more. Our mission is to empower every person and every organization on the planet to achieve more.",
        companySize: "10,000+ employees",
        companyWebsite: "https://www.microsoft.com",
        employeeRating: 4.3,
        workLifeBalance: 4.1,
        careerGrowth: 4.5,
        interviewDifficulty: 4.6,
        interviewQuestions: [
            "Design a scalable microservice architecture for a social media platform.",
            "How would you ensure high availability for a critical service with global users?",
            "Describe a time you had to optimize a slow-performing API or service.",
            "How would you design a rate-limiting system for a public API?"
        ]
    },

    "job9": {
        id: "job9",
        title: "Senior Frontend Developer",
        company: "Google",
        companyLogo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
        industry: "Internet & Software",
        salary: "$150-180K/year",
        jobType: "Full-time job",
        location: "Remote",
        date: "1 week ago",
        postedDate: "April 10, 2025",
        experience: "Senior-Level",
        description: `<h4>About the Team</h4>
        <p>Google's User Experience Engineering team is looking for a Senior Frontend Developer to help build the next generation of web applications that power Google's suite of products. You'll be working on projects that impact millions of users daily, creating intuitive and accessible interfaces that define the Google experience.</p>
        
        <h4>What You'll Do</h4>
        <p>As a Senior Frontend Developer, you'll be a technical leader responsible for building high-quality, performant, and accessible web applications. You'll collaborate with designers, product managers, and backend engineers to deliver exceptional user experiences.</p>
        
        <h4>Key Responsibilities</h4>
        <ul>
            <li>Architect and implement complex frontend applications using modern JavaScript frameworks</li>
            <li>Lead the technical direction for frontend development on your team</li>
            <li>Create reusable components and libraries for use across multiple projects</li>
            <li>Optimize web applications for maximum speed and scalability</li>
            <li>Ensure cross-browser compatibility and responsive design</li>
            <li>Implement and maintain high standards for code quality and performance</li>
            <li>Mentor junior developers and provide technical guidance</li>
            <li>Collaborate with UX designers to translate designs into functional interfaces</li>
        </ul>`,
        skills: [
            "Expert-level JavaScript, TypeScript, HTML, and CSS",
            "Deep experience with React and state management libraries",
            "Strong understanding of web performance optimization",
            "Experience with frontend testing methodologies",
            "Knowledge of accessibility standards and practices",
            "Familiarity with build tools and module bundlers",
            "Understanding of CI/CD pipelines for frontend applications"
        ],
        qualifications: [
            "Bachelor's degree in Computer Science or equivalent practical experience",
            "5+ years of professional frontend development experience",
            "Proven track record of building complex web applications",
            "Experience leading technical projects and mentoring other developers",
            "Strong communication and collaboration skills",
            "Experience with RESTful APIs and GraphQL",
            "Portfolio demonstrating your frontend development expertise"
        ],
        companyDescription: "Google's mission is to organize the world's information and make it universally accessible and useful. Since our founding in 1998, Google has grown to serve billions of people around the world with products that help them find information, connect with others, and get things done.",
        companySize: "10,000+ employees",
        companyWebsite: "https://www.google.com",
        employeeRating: 4.5,
        workLifeBalance: 4.3,
        careerGrowth: 4.7,
        interviewDifficulty: 4.8,
        interviewQuestions: [
            "How would you architect a large-scale React application with multiple teams contributing?",
            "Explain your approach to optimizing the performance of a slow-loading web application.",
            "How do you ensure your frontend code is maintainable and scalable?",
            "Describe a situation where you had to make a difficult technical decision and how you approached it."
        ]
    },

    "job10": {
        id: "job10",
        title: "Data Science Engineer",
        company: "Spotify",
        companyLogo: "https://via.placeholder.com/64",
        industry: "Internet & Software",
        salary: "$130-160K/year",
        jobType: "Full-time job",
        location: "New York, NY (Hybrid)",
        date: "5 days ago",
        postedDate: "April 12, 2025",
        experience: "Mid-Level",
        description: `<h4>About the Role</h4>
        <p>Spotify is looking for a Data Science Engineer to join our Personalization team. In this role, you'll work at the intersection of data science and engineering to build and deploy machine learning models that power our recommendation systems, helping millions of users discover music and podcasts they'll love.</p>
        
        <h4>What You'll Do</h4>
        <p>As a Data Science Engineer at Spotify, you'll collaborate with data scientists, product managers, and engineers to turn experimental models into production systems that scale to Spotify's global user base. You'll help bridge the gap between data science research and production engineering.</p>
        
        <h4>Key Responsibilities</h4>
        <ul>
            <li>Implement, optimize, and deploy machine learning models for music and podcast recommendations</li>
            <li>Build data pipelines to process and transform large datasets</li>
            <li>Design and implement A/B tests to evaluate recommendation algorithms</li>
            <li>Collaborate with data scientists to translate research into production code</li>
            <li>Monitor and improve the performance of recommendation systems</li>
            <li>Create tools and frameworks to accelerate ML experimentation and deployment</li>
            <li>Work with engineering teams to integrate ML models into Spotify's products</li>
        </ul>`,
        skills: [
            "Strong programming skills in Python",
            "Experience with ML frameworks like PyTorch, TensorFlow, or scikit-learn",
            "Knowledge of data processing tools (Spark, Kafka, Airflow)",
            "Experience building and deploying ML models in production",
            "Understanding of software engineering best practices",
            "Familiarity with cloud computing platforms (AWS, GCP)",
            "Experience with SQL and NoSQL databases"
        ],
        qualifications: [
            "Bachelor's or Master's degree in Computer Science, Statistics, or related field",
            "3+ years of experience in data science, machine learning, or related role",
            "Strong understanding of recommendation systems and personalization algorithms",
            "Experience working with large datasets and distributed computing",
            "Knowledge of ML model evaluation and A/B testing methodologies",
            "Excellent problem-solving and analytical skills",
            "Good communication abilities and team collaboration"
        ],
        companyDescription: "Spotify is a digital music, podcast, and video streaming service that gives you access to millions of songs and other content from artists all over the world. Our mission is to unlock the potential of human creativity by giving a million creative artists the opportunity to live off their art and billions of fans the opportunity to enjoy and be inspired by it.",
        companySize: "5,000-10,000 employees",
        companyWebsite: "https://www.spotify.com",
        employeeRating: 4.4,
        workLifeBalance: 4.2,
        careerGrowth: 4.3,
        interviewDifficulty: 4.5,
        interviewQuestions: [
            "How would you design a recommendation system for podcasts?",
            "Explain how you would evaluate the effectiveness of a music recommendation algorithm.",
            "Describe a challenging data pipeline you've built and how you ensured its reliability.",
            "How would you handle collaborative filtering at Spotify's scale?"
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
            id: "job2", // Changed from similar1 to job2
            title: "Software Engineer Intern",
            company: "Structured Labs",
            location: "Remote",
            date: "2 days ago"
        },
        {
            id: "job3", // Changed from similar2 to job3
            title: "Software Engineering Intern",
            company: "Telguard",
            location: "Atlanta, GA (On-site)",
            date: "3 days ago"
        },
        {
            id: "job4", // Changed from similar3 to job4
            title: "Software Development Internship",
            company: "C-Motive Technologies",
            location: "Middleton, WI (On-site)",
            date: "1 week ago"
        }
    ],
    "job2": [
        {
            id: "job1", // Changed from similar4 to job1
            title: "Software Engineering Intern",
            company: "Tinuiti",
            location: "United States (Remote)",
            date: "5 days ago"
        },
        {
            id: "job5", // Changed from similar5 to job5
            title: "Software Engineer (Intern)",
            company: "comma.ai",
            location: "San Diego, CA (On-site)",
            date: "1 week ago"
        },
        {
            id: "job6", // Changed from similar6 to job6
            title: "Software Engineer - Summer",
            company: "Lazarus",
            location: "United States (Remote)",
            date: "3 days ago"
        }
    ],
    "job3": [
        {
            id: "job1", // Changed from similar7 to job1
            title: "Software Engineering Intern",
            company: "Tinuiti",
            location: "United States (Remote)",
            date: "6 days ago"
        },
        {
            id: "job2", // Changed from similar8 to job2
            title: "Software Engineer Intern",
            company: "Structured Labs",
            location: "Remote",
            date: "1 week ago"
        },
        {
            id: "job4", // Changed from similar9 to job4
            title: "Software Development Internship",
            company: "C-Motive Technologies",
            location: "Middleton, WI (On-site)",
            date: "2 days ago"
        }
    ],
    "job4": [
        {
            id: "job1", // Changed from similar10 to job1
            title: "Software Engineering Intern",
            company: "Tinuiti",
            location: "United States (Remote)",
            date: "3 days ago"
        },
        {
            id: "job2", // Changed from similar11 to job2
            title: "Software Engineer Intern",
            company: "Structured Labs",
            location: "Remote",
            date: "1 week ago"
        },
        {
            id: "job3", // Changed from similar12 to job3
            title: "Software Engineering Intern",
            company: "Telguard",
            location: "Atlanta, GA (On-site)",
            date: "4 days ago"
        }
    ],
    "job5": [
        {
            id: "job6", // Changed from similar13 to job6
            title: "Software Engineer - Summer",
            company: "Lazarus",
            location: "United States (Remote)",
            date: "2 days ago"
        },
        {
            id: "job7", // Changed from similar14 to job7
            title: "Full Stack Software Engineer",
            company: "Epic Systems",
            location: "Madison, WI (On-site)",
            date: "1 week ago"
        },
        {
            id: "job10", // Changed from similar15 to job10
            title: "Data Science Engineer",
            company: "Spotify",
            location: "New York, NY (Hybrid)",
            date: "5 days ago"
        }
    ],
    "job6": [
        {
            id: "job2", // Changed from similar16 to job2
            title: "Software Engineer Intern",
            company: "Structured Labs",
            location: "Remote",
            date: "3 days ago"
        },
        {
            id: "job5", // Changed from similar17 to job5
            title: "Software Engineer (Intern)",
            company: "comma.ai",
            location: "San Diego, CA (On-site)",
            date: "1 week ago"
        },
        {
            id: "job8", // Changed from similar18 to job8
            title: "Backend Engineer",
            company: "Microsoft",
            location: "Redmond, WA (Hybrid)",
            date: "2 days ago"
        }
    ],
    "job7": [
        {
            id: "job8", // Changed from similar19 to job8
            title: "Backend Engineer",
            company: "Microsoft",
            location: "Redmond, WA (Hybrid)",
            date: "3 days ago"
        },
        {
            id: "job9", // Changed from similar20 to job9
            title: "Senior Frontend Developer",
            company: "Google",
            location: "Remote",
            date: "1 week ago"
        },
        {
            id: "job10", // Changed from similar21 to job10
            title: "Data Science Engineer",
            company: "Spotify",
            location: "New York, NY (Hybrid)",
            date: "5 days ago"
        }
    ],
    "job8": [
        {
            id: "job7", // Changed from similar22 to job7
            title: "Full Stack Software Engineer",
            company: "Epic Systems",
            location: "Madison, WI (On-site)",
            date: "2 days ago"
        },
        {
            id: "job9", // Changed from similar23 to job9
            title: "Senior Frontend Developer",
            company: "Google",
            location: "Remote",
            date: "6 days ago"
        },
        {
            id: "job10", // Changed from similar24 to job10
            title: "Data Science Engineer",
            company: "Spotify",
            location: "New York, NY (Hybrid)",
            date: "1 week ago"
        }
    ],
    "job9": [
        {
            id: "job7", // Changed from similar25 to job7
            title: "Full Stack Software Engineer",
            company: "Epic Systems",
            location: "Madison, WI (On-site)",
            date: "4 days ago"
        },
        {
            id: "job8", // Changed from similar26 to job8
            title: "Backend Engineer",
            company: "Microsoft",
            location: "Redmond, WA (Hybrid)",
            date: "1 week ago"
        },
        {
            id: "job10", // Changed from similar27 to job10
            title: "Data Science Engineer",
            company: "Spotify",
            location: "New York, NY (Hybrid)",
            date: "3 days ago"
        }
    ],
    "job10": [
        {
            id: "job7", // Changed from similar28 to job7
            title: "Full Stack Software Engineer",
            company: "Epic Systems",
            location: "Madison, WI (On-site)",
            date: "2 days ago"
        },
        {
            id: "job8", // Changed from similar29 to job8
            title: "Backend Engineer",
            company: "Microsoft",
            location: "Redmond, WA (Hybrid)",
            date: "1 week ago"
        },
        {
            id: "job9", // Changed from similar30 to job9
            title: "Senior Frontend Developer",
            company: "Google",
            location: "Remote",
            date: "4 days ago"
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
            
            // Create profile button that links directly to user_file.html
            const profileLink = document.createElement('a');
            profileLink.href = 'user_file.html';  // Link to the user profile page
            profileLink.className = 'btn btn-outline-light me-2';
            
            // Add user icon and username
            const userIcon = document.createElement('i');
            userIcon.className = 'fas fa-user-circle me-1';
            profileLink.appendChild(userIcon);
            
            const username = document.createElement('span');
            username.textContent = `${localStorage.getItem("nickname")}`;
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
            // Get the actual job data from mockJobDetails to display accurate information
            const actualJobData = mockJobDetails[job.id];
            
            if (actualJobData) {
                const li = document.createElement('li');
                li.className = 'list-group-item border-0 py-3';
                
                li.innerHTML = `
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h6 class="mb-1"><a href="job-detail.html?id=${job.id}" class="text-decoration-none">${actualJobData.title}</a></h6>
                            <p class="mb-1 small text-muted">${actualJobData.company}</p>
                            <div class="d-flex small text-muted mt-1">
                                <span class="me-3"><i class="fas fa-map-marker-alt me-1"></i>${actualJobData.location}</span>
                                <span><i class="far fa-clock me-1"></i>${job.date}</span>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-outline-secondary border-0 similar-job-bookmark" data-job-id="${job.id}">
                            <i class="${isJobSaved(job.id) ? 'fas' : 'far'} fa-bookmark"></i>
                        </button>
                    </div>
                `;
                
                similarJobsListEl.appendChild(li);
            }
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
 * Load saved jobs from localStorage - MODIFIED FUNCTION
 */
function loadSavedJobs() {
    // Clear saved jobs array
    savedJobs = [];
    
    // Get user ID
    const userId = localStorage.getItem('userId');
    
    // If user is not logged in, don't load saved jobs
    if (!userId) {
        return;
    }
    
    // Get user-specific saved jobs
    const userSavedJobsKey = `savedJobs_${userId}`;
    const savedJobsData = localStorage.getItem(userSavedJobsKey);

    if (savedJobsData) {
        savedJobs = JSON.parse(savedJobsData);
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
 * Toggle saving the current job - MODIFIED FUNCTION
 */
function toggleSaveJob() {
    // Check if user is logged in
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
        // User is not logged in, show alert
        alert('You need to be logged in to save jobs. Please sign in or register.');
        return;
    }
    
    // Use a unique key for each user's saved jobs
    const userSavedJobsKey = `savedJobs_${userId}`;
    
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

    // Save to localStorage with user-specific key
    localStorage.setItem(userSavedJobsKey, JSON.stringify(savedJobs));

    // Update button state
    updateSaveButtonState();
}

/**
 * Toggle saving a similar job - MODIFIED FUNCTION
 * @param {string} jobId - Job ID to toggle
 * @param {HTMLElement} button - Button element that was clicked
 */
function toggleSaveSimilarJob(jobId, button) {
    // Check if user is logged in
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
        // User is not logged in, show alert
        alert('You need to be logged in to save jobs. Please sign in or register.');
        return;
    }
    
    // Use a unique key for each user's saved jobs
    const userSavedJobsKey = `savedJobs_${userId}`;
    
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

    // Save to localStorage with user-specific key
    localStorage.setItem(userSavedJobsKey, JSON.stringify(savedJobs));
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