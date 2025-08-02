// import { PROMPTS } from "@/utils/prompts";

// export default {
//   async analyzeProblem(problemStatement: string) {
//     const systemPrompt = PROMPTS.PROBLEM_ANALYSIS;

//     const prompt = `${systemPrompt}\n\nProblem: ${problemStatement}`;

//     return prompt;
//   },

//   async generateSolution(problemStatement: string, language = "javascript") {

//     const systemPrompt = PROMPTS.SOLUTION_GENERATION + `\n\nLanguage: ${language}`;

//     const prompt = `${systemPrompt}\n${problemStatement}`;
//     return prompt;
//   },

//   async reviewCode(code: string, problemStatement: string) {
//     const systemPrompt = PROMPTS.CODE_REVIEW;

//     const prompt = `${systemPrompt}\nProblem: ${problemStatement}\n\nCode to review:\n${code}`;
//     return prompt;
//   }
// }