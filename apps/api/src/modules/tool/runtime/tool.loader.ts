import { ToolRegistry } from "../registry/tool.registry";

import { CalculatorTool } from "../implementations/calculator.tool";
import { DateTimeTool } from "../implementations/datetime.tool";

export class ToolLoader {
  static load(): ToolRegistry {
    const registry = new ToolRegistry();

    registry.register(new CalculatorTool());
    registry.register(new DateTimeTool());

    return registry;
  }
}
