export interface UserInfo {
  id: number;
  name: string;
  email: string;
  location: string;
  phone: string;
  githubProfile: string;
  linkedinProfile: string;
  resume: string;
  createdAt: Date;
  updatedAt: Date;
}

export const STRUCTURED_RESUME = {
  name: "Vasyl Boyko",
  location: "Toronto, ON, Canada",
  phone: process.env.USER_PHONE || "",
  email: "vboiko0@gmail.com",
  githubProfile: "https://github.com/vb-oiko",
  linkedinProfile: "https://www.linkedin.com/in/vasyl-boyko/",
  yearsOfExperience: "5+",
  experience: [
    {
      company: "VIV Technologies",
      description: "A small product company with a lean engineering team",
      businessDomain: "SaaS healthcare management platform",
      position: "Full Stack Developer",
      employmentType: "Full-time, hybrid",
      location: "Toronto, ON",
      startDate: "2024-09-30",
      endDate: "2025-05-15",
      resigningReason:
        "Position closed in May 2025 due to company-wide market driven layoffs",
      team: {
        size: "3 people",
        roles: ["individual contributor", "full stack developer"],
        teammates: ["team lead", "backend developer"],
      },
      applications: [
        {
          name: "Admin portal",
          techStack:
            "React, JavaScript, Node.js, Express.js, MongoDB, Mongoose, AWS",
          context:
            "mature codebase with legacy code and tech debt, ongoing migration from AngularJS to React",
        },
      ],
      projects: [
        {
          name: "Data import tool",
          applications: ["Admin portal"],
          responsibilities: [
            "Created design documents for the feature",
            "Developed collections/fields DB schema",
            "Implemented API endpoints",
            "Implemented UI pages and reusable components",
          ],
          results: [
            "Reduced client onboarding time by 5 times and significantly accelerate time-to-value.",
          ],
        },
        {
          name: "UI improvements",
          applications: ["Admin portal"],
          responsibilities: [
            "Implemented key UI/UX enhancements that streamlined workflows",
          ],
          results: [
            "Reduced user actions by 30%, improving efficiency and usability of web applications",
          ],
        },
        {
          name: "Fixing bugs",
          applications: ["Admin portal"],
          responsibilities: [
            "Investigating and eliminating root causes of the bugs and fixing them",
          ],
          results: ["improved user NPS score by 5%"],
        },
      ],
      otherResponsibilities: ["Code reviews"],
      tools: ["Figma", "Jira", "Slack", "GitHub", "Git", "CherryPick"],
    },
    {
      company: "Bolt.Eu",
      description:
        "First European mobility super-app including  including ride-hailing, shared cars, scooters, and food and grocery delivery",
      businessDomain: "mobility",
      position: "Full Stack Developer",
      employmentType: "Full-time, hybrid",
      location: "Tallinn, Estonia",
      startDate: "2021-06-07",
      endDate: "2024-09-29",
      resigningReason:
        "To move to Canada to provide better study opportunities for my son and better career opportunities for my wife",
      team: {
        name: "Courier Engagement team",
        size: "5-10 people",
        roles: [
          "individual contributor",
          "full stack developer",
          "feature owner",
        ],
        teammates: [
          "team lead",
          "backend developers",
          "mobile developers",
          "product owner",
          "product designer",
          "automation QA",
        ],
      },
      applications: [
        {
          name: "Food delivery courier mobile app",
          techStack:
            "React Native, TypeScript, Redux, Redux Toolkit, RxJS, Detox, Jest",
          context:
            "The app used by 300K food delivery couriers, feature flags, A/B testing",
        },
        {
          name: "Admin panel",
          techStack: "React, TypeScript, micro-frontend",
          context:
            "Responsible for team's scope module in the micro-frontend architecture",
        },
        {
          name: "Node.js microservices backend",
          techStack:
            "Node.js, TypeScript, SQL, MySQL, TiDB, SQS/SNS, micro-services, mono-repo, Jest, AWS, Kubernetes, Docker, Jenkins",
          context:
            "Responsible for team's scope couple of dozens of micro-services in the mono-repo architecture",
        },
        {
          name: "Courier fleet owner portal",
          techStack: "React, TypeScript",
          context:
            "The app intended to delegate courier management to fleet owners to reduce the company's operational costs for customer support and courier management",
        },
      ],
      projects: [
        {
          name: "Multiple medium- to large-scale end-to-end features for courier engagement",
          applications: [
            "Admin portal",
            "Food delivery courier mobile app",
            "Node.js microservices backend",
          ],
          responsibilities: [
            "Created design documents for the features",
            "Designed and implemented DB schema",
            "Implemented API endpoints",
            "Implemented UI pages and reusable components",
            "Implemented end-to-end tests",
            "Implemented monitoring and logging",
            "Implemented error handling and recovery",
            "Implemented security and data protection",
            "Implemented performance optimization",
          ],
          results: [
            "Delivered multiple medium- to large-scale features for web applications that boosted engagement by 10% and retention by 5% among 300K food delivery couriers, collaborating with cross-functional teams",
          ],
        },
        {
          name: "End-to-end features for Courier fleet owner portal",
          applications: ["Courier fleet owner portal"],
          responsibilities: [
            "Implemented new micro services and API endpoints for the fleet owner portal",
            "Implemented UI pages and reusable components",
            "Implemented performance optimization",
          ],
          results: [
            "Reduced the company's operational costs for fleet couriers customer support and courier management by 10%",
          ],
        },
        {
          name: "Automated testing for the courier mobile app",
          applications: ["Courier mobile app"],
          responsibilities: [
            "Introduced end-to-end tests for the courier mobile app with Detox",
          ],
          results: [
            "Increased courier app stability and reduced release cycle time by 20%",
          ],
        },
      ],
      otherResponsibilities: [
        "Code reviews",
        "Mentoring new joiners",
        "Technical design discussions",
        "Technical debt management",
        "Technical interviewer",
        "Tech exchange with other teams",
      ],
      tools: ["Figma", "Jira", "Slack", "Confluence", "GitHub", "Git"],
    },
    {
      company: "Hillel IT School",
      description:
        "Hillel IT School is a software development school that teaches people to become software developers.",
      businessDomain: "Software development",
      position: "JavaScript and React.js Teacher",
      location: "Kyiv, Ukraine",
      employmentType: "Contract Part-time, remote",
      startDate: "2022-09-01",
      endDate: "2023-02-28",
      team: {
        name: "Students",
        size: "15",
        roles: ["teacher"],
        teammates: ["students"],
      },
      projects: [
        {
          name: "JavaScript and React.js online course",
          responsibilities: [
            "Teaching JavaScript and React.js",
            "Mentoring students",
            "Reviewing homework assignments",
            "Providing constructive feedback",
          ],
          results: [
            "Helped over a dozen individuals to become proficient in JavaScript, React.js, and Redux.js",
          ],
        },
      ],
    },
    {
      company: "Wordproof.com, outstaffed by DAXX",
      description:
        "A small startup that provides times tamping solution for digital content via blockchain",
      businessDomain: "Digital content protection and verification",
      position: "Frontend Developer",
      location: "Kyiv, Ukraine",
      employmentType: "Full-time, remote, outstaffed by DAXX",
      startDate: "2021-01-01",
      endDate: "2021-05-31",
      resigningReason: "Layoff due to the company's financial situation",
      team: {
        name: "engineering team",
        size: "3 people",
        roles: ["individual contributor", "lead frontend developer"],
        teammates: ["CTO", "backend developer"],
      },
      applications: [
        {
          name: "Admin panel",
          techStack: "Vue.js, TypeScript, Inertia.js",
          context: "Web application powered by PHP Laravel and Inertia.js",
        },
        {
          name: "UI Kit",
          techStack: "TypeScript, Stencil.js, Web Components",
          context:
            "Framework agnostic reusable UI components library used in company and customers applications",
        },
      ],
      projects: [
        {
          name: "Multiple admin panel pages",
          applications: ["Admin panel"],
          responsibilities: [
            "Developed a bunch of admin panel pages in Vue.js based on Figma designs, delivering pixel-perfect UI for internal web applications and improving usability",
          ],
          results: [
            "Extended the admin panel functionality with new pages and features by 50%",
          ],
        },
        {
          name: "Multi feature time stamping certificate web component for customers' web sites",
          applications: ["UI Kit"],
          responsibilities: [
            "Implemented framework-agnostic time stamping certificate web component easily embeddable in customer websites",
          ],
          results: [
            "Reduced onboarding effort by 50% by eliminating customers dependency on specific frontend framework to embed the time stamping certificate component",
          ],
        },
      ],
      tools: ["Figma", "Jira", "Slack", "Confluence", "GitHub", "Git"],
      otherResponsibilities: ["Code reviews"],
    },
  ],
  education: [
    {
      school: 'National Technical University Of Ukraine "KPI"',
      degree: "Bachelor's Degree in Computer Science",
      startDate: "2020-10-01",
      endDate: "2024-09-01",
      fieldOfStudy: "Systems And Methods Of Artificial Intelligence",
    },
  ],
  volunteering: [
    {
      organization: "Opir.org",
      role: "Open Source Developer",
      startDate: "2022-02-01",
      endDate: "2022-03-01",
      description:
        "Implemented UI features for the web application with state management, routing, live map rendering",
    },
    {
      organization: "hospitalrun-ua",
      role: "Open Source Developer",
      startDate: "2022-02-01",
      endDate: "2022-03-01",
      description:
        "Implemented several front end features with React.js and Material UI to help charitable organizations to submit and track their requests in real-time",
    },
  ],
  skillsToLearn: ["GoLang"],
  nonJobSkills: [
    {
      name: "API integration with OpenAI, Google Docs, Google Drive",
      context: "Personal projects",
    },
    {
      name: "Prompt Engineering",
      context: "Personal AI projects",
    },
    {
      name: "GitHub Actions, CI/CD, Docker",
      context: "Personal projects",
    },
  ],
};

export const getUserInfo = async (id: number): Promise<UserInfo> => {
  return new Promise((resolve) => {
    resolve({
      id,
      name: "Vasyl Boyko",
      location: "Toronto, ON, Canada",
      phone: process.env.USER_PHONE || "",
      email: "vboiko0@gmail.com",
      githubProfile: "https://github.com/vb-oiko",
      linkedinProfile: "https://www.linkedin.com/in/vasyl-boyko/",
      resume: `
      Vasyl Boyko
    Toronto, ON • vboiko0@gmail.com • linkedin.com/in/vasyl-boyko • github.com/vb-oiko
    Software Developer
    Highly motivated Full Stack Engineer with 5+ years of experience in developing web applications using NodeJS and ReactJS, seeking to contribute to the innovative ad-tech solutions at eBay as part of the eBay Ads team. Proficient in building scalable and performant web services and applications, with a solid understanding of software architecture design and object-oriented analysis and design (OOA/D) principles. Experienced in all phases of the software development life cycle, microservices, REST APIs, and cloud concepts. Proven ability to own major projects from design to deployment, with strong analytical and problem-solving skills.
    WORK EXPERIENCE
    VIV Technologies • Toronto, ON • 09/2024 - 05/2025
    Full Stack Developer
    Joined the team of two developers on data integration team to support and build new integrations with third party services to improve end user experience.
    - Led the implementation of a critical data import project, projected to reduce client onboarding time by 5 times and significantly accelerate time-to-value.
    - Migrated legacy AngularJS components to React, resulting in a 20% reduction in JavaScript bundle size and a 10% improvement in page load speed, enhancing overall user experience for web applications.
    - Delivered key UI/UX enhancements that streamlined workflows and reduced user actions by 30%, improving efficiency and usability of web applications.
    Bolt.Eu • Tallinn, Estonia • 06/2021 - 09/2024
    Full Stack Engineer at Courier Engagement team, Food Delivery Vertical
    Join the Courier team as a full stack developer to support existing features and build new features for React Native courier mobile app, micro-frontend module in React admin panel and a dozen of Node.js microservices written with TypeScript related to the team's scope. Worked in cross-functional team context on cross-team company wide initiatives.
    - Delivered multiple medium- to large-scale features for web applications that boosted engagement by 10% and retention by 5% among 300K food delivery couriers, collaborating with cross-functional teams.
    - Engineered and maintained numerous Node.js microservices on AWS (Kubernetes), multiple React.js web apps (including a micro frontend), and a React Native mobile app, adhering to best practices for building distributed systems and clean code principles.
    - Spearheaded the introduction of end-to-end tests for the courier mobile app using Detox and contributed to automated backend test harnesses with Jest, improving test coverage and release confidence for critical web services.
    DAXX • Kyiv, Ukraine • Full-time • 01/2021 - 05/2021
    JavaScript (Vue.js) Developer at WordProof.com
    Reported to CTO as a lead frontend developer to build reusable cross-platform UI kit used by the end customers and internal team, as well as to support and build new features for Vue.js admin panel.
    - Developed a bunch of admin panel pages in Vue.js based on Figma designs, delivering pixel-perfect UI for internal web applications and improving usability.
    - Built a reusable UI kit of Web Components with Stencil.js, enabling consistent design and faster development across multiple company projects.
    - Engineered a framework-agnostic Web Component using Stencil.js to provide a blockchain-based time stamping and verification solution, embeddable in customer websites.
    EDUCATION
    Bachelor's Degree in Computer Science
    National Technical University Of Ukraine "KPI" • Kyiv, Ukraine • 10/2020 - 09/2022
    Systems And Methods Of Artificial Intelligence
    VOLUNTEERING
    Opir.org
    Open Source Developer • 02/202 - 03/2022
    Implemented UI features for the web application with state management, routing, live map rendering
    hospitalrun-ua
    Open Source Developer • 07/202 - 08/2020
    Implemented several front end features with React.js and Material UI to help charitable organizations to submit and track their requests in real-time`,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
};

const UserInfoTable = {
  getUserInfo,
};

export default UserInfoTable;
