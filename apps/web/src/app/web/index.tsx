import { createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "@/layouts/AuthLayout";

import { LoginPage } from "@/pages/auth/login/LoginPage";
import { RegisterPage } from "@/pages/auth/register/RegisterPage";

import { DashboardPage } from "@/pages/dashboard/DashboardPage";

import { NotFoundPage } from "@/pages/errors/NotFoundPage";
import { ServerErrorPage } from "@/pages/errors/ServerErrorPage";

import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { PublicRoute } from "@/routes/PublicRoute";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { OrganizationsPage } from "@/pages/organizations";
import { ProjectsPage } from "@/pages/projects";

import { ProjectLayout } from "@/layouts/ProjectLayout";
import { AgentLayout } from "@/layouts/AgentLayout";

import { AgentsPage } from "@/pages/agents";
import { ConversationsPage } from "@/pages/conversations";
import { KnowledgePage } from "@/pages/knowledge";
import { DocumentsPage } from "@/pages/documents";
import { PromptsPage } from "@/pages/prompts";
import { EnvironmentsPage } from "@/pages/environments";
import { EnvironmentLayout } from "@/layouts/EnvironmentLayout";
import { ToolsPage } from "@/pages/tools";
import { ModelSettingsPage } from "@/pages/model";
import { PlaygroundPage } from "@/pages/playground";
import { MetricsDashboardPage } from "@/pages/metrics/MetricsDashboardPage";
import { AuditViewerPage } from "@/pages/audit";

import { SettingsPage } from "@/pages/settings";
import { RuntimeInspectorPage } from "@/pages/runtime";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    errorElement: <ServerErrorPage />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "metrics",
        element: <MetricsDashboardPage />,
      },
      {
        path: "audit",
        element: <AuditViewerPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "organizations",
        children: [
          {
            index: true,
            element: <OrganizationsPage />,
          },

          {
            path: ":organizationId/projects",
            element: <ProjectsPage />,
          },

          {
            path: ":organizationId/projects/:projectId",
            element: <ProjectLayout />,
            children: [
              {
                index: true,
                element: <EnvironmentsPage />,
              },

              {
                path: "environments/:environmentId",
                element: <EnvironmentLayout />,
                children: [
                  {
                    index: true,
                    element: <AgentsPage />,
                  },

                  {
                    path: "agents/:agentId",
                    element: <AgentLayout />,
                    children: [
                      {
                        index: true,
                        element: <ConversationsPage />,
                      },

                      {
                        path: "conversations",
                        element: <ConversationsPage />,
                      },

                      {
                        path: "conversations/:conversationId",
                        element: <PlaygroundPage />,
                      },

                      {
                        path: "conversations/:conversationId/runtime",
                        element: <RuntimeInspectorPage />,
                      },

                      {
                        path: "knowledge",
                        element: <KnowledgePage />,
                      },

                      {
                        path: "documents",
                        element: <DocumentsPage />,
                      },
                      {
                        path: "prompts",
                        element: <PromptsPage />,
                      },
                      {
                        path: "tools",
                        element: <ToolsPage />,
                      },
                      {
                        path: "settings",
                        element: <ModelSettingsPage />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/auth",
    element: <PublicRoute />,
    errorElement: <ServerErrorPage />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
