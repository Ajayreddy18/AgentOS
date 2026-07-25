import type {
  GenerateTextInput,
  GenerateTextResponse,
} from "../providers/provider.types";

export interface AgentPlanner {
  plan(input: GenerateTextInput): Promise<GenerateTextResponse>;
}
