import { z } from "zod";
import { getParseTextToJsonFunction } from "../prompts/ParseTextToJsonPrompt";

export const ResumeSchema = z.object({
  name: z.string().describe("The name of the person"),
  location: z
    .string()
    .describe("The city and country where the person is currently located."),
  title: z
    .string()
    .describe("The title of the possition the person is applying for"),
  email: z.string().email().describe("The email of the person"),
  github: z.string().describe("The github url of the person"),
  linkedin: z.string().describe("The linkedin url of the person"),
  summary: z.string().describe("A short summary of the person"),
  experience: z.array(
    z.object({
      company: z.string().describe("The company name"),
      location: z.string().describe("The location of the company"),
      title: z.string().describe("The title of the person"),
      period: z
        .string()
        .describe(
          "The month and year when the candidate began and finished the job."
        ),
      overview: z
        .string()
        .describe(
          "A short overview of the person's job. It should be a single sentence that captures the essence of the job."
        ),
      bullets: z
        .array(z.string())
        .describe(
          "The bullet points describing the person's responsibilities and achievements"
        ),
    })
  ),
  education: z.array(
    z.object({
      degreeLevel: z
        .string()
        .describe("The academic level of the degree earned by the candidate."),
      fieldOfStudy: z
        .string()
        .describe(
          "The primary academic subject or major of the candidate’s degree."
        ),
      university: z
        .string()
        .describe(
          "The full name of the educational institution that awarded the degree."
        ),
      location: z
        .string()
        .describe("The city and country where the university is located."),
      period: z
        .string()
        .describe(
          "The month and year when the candidate began and completed the degree program."
        ),
      specializationOrFocus: z
        .string()
        .describe(
          "A specific concentration or area of focus within the degree program."
        ),
    })
  ),
  skills: z
    .array(z.string())
    .describe(
      "Nine skills that the person has that are not listed in the experience, education, or volunteering. Three words long or less each"
    ),
  volunteering: z.array(
    z.object({
      organization: z.string().describe("The organization name"),
      role: z.string().describe("The role of the person"),
      period: z.string().describe("The period of the person"),
      bullets: z
        .array(z.string())
        .describe(
          "The bullet points describing the person's responsibilities and achievements"
        ),
    })
  ),
});

export type Resume = z.infer<typeof ResumeSchema>;

export const parseResume = getParseTextToJsonFunction(ResumeSchema);
