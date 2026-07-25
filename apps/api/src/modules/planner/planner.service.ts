export class PlannerService {
  buildPlanningPrompt(userMessage: string): string {
    return `
        
        You are an AI planning engine.
        
        Your job is NOT to answer the user.
        
        Your job is to break the request into small executable steps.
        
        Keep the plan short.
        
        User Request:
        
        ${userMessage}`;
  }
}
