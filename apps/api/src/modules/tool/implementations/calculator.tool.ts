import {
  Tool,
  ToolExecutionResult,
  ToolParameterSchema,
} from "../runtime/tool.interface";

export class CalculatorTool implements Tool {
  readonly name = "calculator";

  readonly description =
    "Performs basic arithmetic operations: add, subtract, multiply and divide.";

  readonly schema: ToolParameterSchema = {
    type: "object",

    properties: {
      operation: {
        type: "string",
        description:
          "Arithmetic operation to perform (add, subtract, multiply, divide)",
      },

      a: {
        type: "number",
        description: "First number",
      },

      b: {
        type: "number",
        description: "Second number",
      },
    },

    required: ["operation", "a", "b"],
  };

  async execute(input: Record<string, unknown>): Promise<ToolExecutionResult> {
    const operation = input.operation;
    const a = input.a;
    const b = input.b;

    if (
      typeof operation !== "string" ||
      typeof a !== "number" ||
      typeof b !== "number"
    ) {
      return {
        success: false,
        error: "Invalid input. Expected { operation, a, b}.",
      };
    }

    switch (operation) {
      case "add":
        return {
          success: true,
          result: a + b,
        };

      case "subtract":
        return {
          success: true,
          result: a - b,
        };

      case "multiply":
        return {
          success: true,
          result: a * b,
        };

      case "divide":
        if (b == 0) {
          return {
            success: false,
            error: "Division by zero is not allowed.",
          };
        }

        return {
          success: true,
          result: a / b,
        };

      default:
        return {
          success: false,
          error: `Unsupported operation "${operation}".`,
        };
    }
  }
}
