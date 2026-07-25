import {
  LayoutDashboard,
  Building2,
  FolderKanban,
  Bot,
  MessageSquare,
  Database,
  Wrench,
  BarChart3,
  Settings,
  ClipboardList,
} from "lucide-react";

export const navigation = [
  {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Organizations",
    href: "/organizations",
    icon: Building2,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    label: "Agents",
    href: "/agents",
    icon: Bot,
  },
  {
    label: "Conversations",
    href: "/conversations",
    icon: MessageSquare,
  },
  {
    label: "Knowledge",
    href: "/knowledge",
    icon: Database,
  },
  {
    label: "Tools",
    href: "/tools",
    icon: Wrench,
  },
  {
    label: "Metrics",
    href: "/metrics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    label: "Audit",
    href: "/audit",
    icon: ClipboardList,
  },
] as const;
