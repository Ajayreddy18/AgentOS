import type { Tool } from "../tool/runtime/tool.interface";

export class ToolSelector {
  select(userMessage: string, tools: Tool[]): Tool[] {
    const message = userMessage.toLowerCase();

    return tools.filter((tool) => {
      if (
        tool.name === "calculator" &&
        /(\d+|\+|-|\*|\/|calculate|add|subtract|multiply|divide)/i.test(message)
      ) {
        return true;
      }

      if (
        tool.name === "datetime" &&
        /(date|time|today|day|month|year|clock)/i.test(message)
      ) {
        return true;
      }

      return false;
    });
  }
}
