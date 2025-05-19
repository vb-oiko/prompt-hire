import { flattenObject } from "./flattenObject";

describe("flattenObject with resume data", () => {
  const resumeData = {
    name: "Vasyl Boyko",
    email: "vboiko0@gmail.com",
    github: "vb-oiko",
    linkedin: "linkedin.com/in/vasyl-boyko",
    summary:
      "Experienced Full Stack Engineer with expertise in JavaScript, Node.js, and React.js, skilled in developing scalable web applications and keen on enhancing software security and quality frameworks.",
    experience: [
      {
        company: "VIV Technologies",
        title: "Full Stack Developer",
        period: "09/2024 - 05/2025",
        bullets: [
          "Led implementation of a critical data import project to reduce client onboarding time.",
          "Migrated legacy AngularJS components to React, improving performance and user experience.",
          "Enhanced UI/UX to streamline workflows, reducing user actions by 30%.",
        ],
      },
      {
        company: "Bolt.Eu",
        title: "Full Stack Engineer, Courier Engagement Team",
        period: "06/2020 - 09/2024",
        bullets: [
          "Developed features to boost engagement and retention among 300K couriers.",
          "Engineered microservices on AWS, and maintained React.js web apps.",
          "Introduced end-to-end tests for mobile apps, enhancing test coverage and release confidence.",
        ],
      },
    ],
    education: [
      {
        school: 'National Technical University Of Ukraine "KPI"',
        degree: "Bachelor's Degree",
        period: "10/2020 - 09/2022",
        fieldOfStudy: "Systems And Methods Of Artificial Intelligence",
      },
    ],
    additionalSkills: [
      "Software security",
      "Static and dynamic analysis",
      "Software supply chain security",
      "Machine learning for code understanding",
      "CI/CD systems integration",
      "Distributed systems",
      "Cloud infrastructure (AWS)",
    ],
  };

  it("should flatten resume data correctly", () => {
    const flattened = flattenObject(resumeData);

    // Test basic fields
    expect(flattened["name"]).toBe("Vasyl Boyko");
    expect(flattened["email"]).toBe("vboiko0@gmail.com");
    expect(flattened["github"]).toBe("vb-oiko");
    expect(flattened["linkedin"]).toBe("linkedin.com/in/vasyl-boyko");

    // Test experience array
    expect(flattened["experience[0].company"]).toBe("VIV Technologies");
    expect(flattened["experience[0].title"]).toBe("Full Stack Developer");
    expect(flattened["experience[0].period"]).toBe("09/2024 - 05/2025");
    expect(flattened["experience[0].bullets[0]"]).toBe(
      "Led implementation of a critical data import project to reduce client onboarding time."
    );

    expect(flattened["experience[1].company"]).toBe("Bolt.Eu");
    expect(flattened["experience[1].title"]).toBe(
      "Full Stack Engineer, Courier Engagement Team"
    );
    expect(flattened["experience[1].period"]).toBe("06/2020 - 09/2024");

    // Test education array
    expect(flattened["education[0].school"]).toBe(
      'National Technical University Of Ukraine "KPI"'
    );
    expect(flattened["education[0].degree"]).toBe("Bachelor's Degree");
    expect(flattened["education[0].period"]).toBe("10/2020 - 09/2022");
    expect(flattened["education[0].fieldOfStudy"]).toBe(
      "Systems And Methods Of Artificial Intelligence"
    );

    // Test additionalSkills array
    expect(flattened["additionalSkills[0]"]).toBe("Software security");
    expect(flattened["additionalSkills[1]"]).toBe(
      "Static and dynamic analysis"
    );
    expect(flattened["additionalSkills[2]"]).toBe(
      "Software supply chain security"
    );
    expect(flattened["additionalSkills[3]"]).toBe(
      "Machine learning for code understanding"
    );
    expect(flattened["additionalSkills[4]"]).toBe("CI/CD systems integration");
    expect(flattened["additionalSkills[5]"]).toBe("Distributed systems");
    expect(flattened["additionalSkills[6]"]).toBe("Cloud infrastructure (AWS)");
  });

  it("should maintain data integrity when flattening resume data", () => {
    const flattened = flattenObject(resumeData);

    // Verify the total number of flattened fields
    const expectedFieldCount = 28;
    expect(Object.keys(flattened).length).toBe(expectedFieldCount);

    // Verify that all array items are properly indexed
    const arrayKeys = Object.keys(flattened).filter((key) => key.includes("["));
    expect(arrayKeys.every((key) => /\[\d+\]/.test(key))).toBe(true);
  });

  it("should handle nested arrays in resume data", () => {
    const flattened = flattenObject(resumeData);

    // Test nested array structure in experience bullets
    expect(flattened["experience[0].bullets[0]"]).toBe(
      "Led implementation of a critical data import project to reduce client onboarding time."
    );
    expect(flattened["experience[0].bullets[1]"]).toBe(
      "Migrated legacy AngularJS components to React, improving performance and user experience."
    );
    expect(flattened["experience[0].bullets[2]"]).toBe(
      "Enhanced UI/UX to streamline workflows, reducing user actions by 30%."
    );

    expect(flattened["experience[1].bullets[0]"]).toBe(
      "Developed features to boost engagement and retention among 300K couriers."
    );
    expect(flattened["experience[1].bullets[1]"]).toBe(
      "Engineered microservices on AWS, and maintained React.js web apps."
    );
    expect(flattened["experience[1].bullets[2]"]).toBe(
      "Introduced end-to-end tests for mobile apps, enhancing test coverage and release confidence."
    );
  });
});
