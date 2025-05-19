export interface UserInfo {
  id: number;
  name: string;
  email: string;
  location: string;
  githubProfile: string;
  linkedinProfile: string;
  resume: string;
  createdAt: Date;
  updatedAt: Date;
}

export const getUserInfo = async (id: number): Promise<UserInfo> => {
  return new Promise((resolve) => {
    resolve({
      id,
      name: "Vasyl Boyko",
      location: "Toronto, ON, Canada",
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
    Led the implementation of a critical data import project, projected to reduce client onboarding time and significantly accelerate time-to-value.
    Migrated legacy AngularJS components to React, resulting in a 20% reduction in JavaScript bundle size and a 10% improvement in page load speed, enhancing overall user experience for web applications.
    Delivered key UI/UX enhancements that streamlined workflows and reduced user actions by 30%, improving efficiency and usability of web applications.
    Bolt.Eu • Tallinn, Harjumaa, Estonia • 06/2020 - 09/2024
    Full Stack Engineer at Courier Engagement team, Food Delivery Vertical
    Delivered multiple medium- to large-scale features for web applications that boosted engagement by 10% and retention by 5% among 300K food delivery couriers, collaborating with cross-functional teams.
    Engineered and maintained numerous Node.js microservices on AWS (Kubernetes), multiple React.js web apps (including a micro frontend), and a React Native mobile app, adhering to best practices for building distributed systems and clean code principles.
    Spearheaded the introduction of end-to-end tests for the courier mobile app using Detox and contributed to automated backend test harnesses with Jest, improving test coverage and release confidence for critical web services.
    DAXX • Kyiv, Ukraine • Full-time • 01/2021 - 05/2021
    JavaSсript (Vue.js) Developer at WordProof.com
    Developed 6 custom admin panel pages in Vue.js based on Figma designs, delivering pixel-perfect UI for internal web applications and improving usability.
    Built a reusable UI kit of Web Components with Stencil.js, enabling consistent design and faster development across multiple company projects.
    Engineered a framework-agnostic Web Component using Stencil.js to provide a blockchain-based timestamping and verification solution, embeddable in customer websites.
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
