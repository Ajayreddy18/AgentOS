import {
  Brain,
  BookOpen,
  Bot,
  CheckCircle2,
  Cpu,
  PlayCircle,
  Save,
  Wrench,
  HelpCircle,
  Database,
  Clock3,
  Search,
} from "lucide-react";

export const EVENT_CONFIG: Record<
  string,
  {
    label: string;
    icon: React.ElementType;
    color: string;
  }
> = {
  "conversation.started": {
    label: "Conversation Started",
    icon: PlayCircle,
    color: "text-blue-500",
  },

  "runtime.loaded": {
    label: "Runtime Loaded",
    icon: Cpu,
    color: "text-violet-500",
  },

  "retrieval.started": {
    label: "Knowledge Retrieval",
    icon: Search,
    color: "text-yellow-500",
  },

  "retrieval.completed": {
    label: "Knowledge Retrieved",
    icon: BookOpen,
    color: "text-green-500",
  },

  "memory.started": {
    label: "Memory Search",
    icon: Database,
    color: "text-orange-500",
  },

  "memory.completed": {
    label: "Memory Retrieved",
    icon: Brain,
    color: "text-pink-500",
  },

  "tool-selection.started": {
    label: "Tool Selection",
    icon: Wrench,
    color: "text-indigo-500",
  },

  "tool-selection.completed": {
    label: "Tools Selected",
    icon: Wrench,
    color: "text-indigo-600",
  },

  "tool-execution.completed": {
    label: "Tool Executed",
    icon: CheckCircle2,
    color: "text-green-600",
  },

  "llm.started": {
    label: "LLM Thinking",
    icon: Bot,
    color: "text-cyan-500",
  },

  "llm.completed": {
    label: "LLM Finished",
    icon: CheckCircle2,
    color: "text-emerald-500",
  },

  "response.saved": {
    label: "Response Saved",
    icon: Save,
    color: "text-slate-500",
  },

  "conversation.completed": {
    label: "Conversation Finished",
    icon: Clock3,
    color: "text-blue-600",
  },
};

export function getEventConfig(type: string) {
  return (
    EVENT_CONFIG[type] ?? {
      label: type,
      icon: HelpCircle,
      color: "text-gray-500",
    }
  );
}
