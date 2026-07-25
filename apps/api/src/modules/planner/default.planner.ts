import type {
  GenerateTextInput,
  GenerateTextResponse,
} from "../providers/provider.types";

import type { AgentPlanner } from "./planner.interface";
import { PlanningStateManager } from "./planning.state";

import { ProviderService } from "../providers/provider.service";
import { ToolExecutor } from "../tool/runtime/tool.executor";
import { OrchestratorService } from "../orchestrator/orchestrator.service";
import { ReflectionEngine } from "./reflection.engine";
import { PlannerLogger } from "./planner.logger";
import { ExecutionService } from "../execution/execution.service";
import { RateLimitError } from "../../common/errors/rate-limit-error";

export class DefaultPlanner implements AgentPlanner {
  private planningState = new PlanningStateManager();

  private reflection = new ReflectionEngine();

  private logger = new PlannerLogger();

  private execution = new ExecutionService();

  constructor(
    private provider: ProviderService,
    private orchestrator: OrchestratorService,
    private toolExecutor: ToolExecutor,
  ) {}

  async plan(input: GenerateTextInput): Promise<GenerateTextResponse> {
    const conversation = [...input.messages];

    const state = this.planningState.create(
      input.messages[input.messages.length - 1]?.content ?? "",
    );

    const execution = this.execution.start(state.goal);

    this.logger.log({
      type: "planning_started",
      goal: state.goal,
    });

    while (state.status === "running" && state.currentStep < state.maxSteps) {
      state.currentStep++;

      this.logger.log({
        type: "planning_step",
        step: state.currentStep,
      });

      const result = await this.provider.generateText({
        ...input,
        messages: conversation,
      });

      state.steps.push({
        step: state.currentStep,

        llmResponse: result,

        toolCalls: result.toolCalls ?? [],

        observations: [],

        completed: false,
      });

      this.execution.addStep(execution.id, {
        step: state.currentStep,
        action: "LLM Planning",
        completed: false,
        createdAt: new Date(),
      });

      if (!result.toolCalls?.length) {
        state.status = "completed";
        state.finalReply = result.reply;
        state.steps[state.steps.length - 1].completed = true;
        this.logger.log({
          type: "planning_finished",
        });
        this.execution.complete(execution.id);
        return result;
      }

      for (const tool of result.toolCalls) {
        this.logger.log({
          type: "tool_called",
          tool: tool.name,
        });
      }

      const toolResults = await this.orchestrator.executeToolCalls(
        result.toolCalls,
        this.toolExecutor,
      );

      for (const tool of result.toolCalls) {
        this.logger.log({
          type: "tool_finished",
          tool: tool.name,
          success: true,
        });
      }

      const currentStep = state.steps[state.steps.length - 1];

      const reflection = this.reflection.reflect(result, toolResults);

      currentStep.observations.push(JSON.stringify(toolResults));
      currentStep.observations.push(reflection.reason);
      this.logger.log({
        type: "reflection",
        reason: reflection.reason,
      });

      if (!reflection.shouldContinue) {
        currentStep.completed = true;

        state.status = "completed";
        state.finalReply = result.reply;

        this.logger.log({
          type: "planning_finished",
        });

        this.execution.complete(execution.id);

        return result;
      }

      currentStep.completed = true;

      const toolMessages = this.orchestrator.buildToolMessages(
        result.assistantToolCalls ?? [],
        toolResults,
      );

      conversation.push(...toolMessages);
    }

    state.status = "failed";

    this.execution.fail(execution.id);

    throw new RateLimitError(`Planner exceeded ${state.maxSteps} steps.`);
  }
}
