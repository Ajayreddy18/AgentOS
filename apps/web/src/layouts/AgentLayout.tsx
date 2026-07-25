import { NavLink, Outlet, useParams } from "react-router-dom";

export function AgentLayout() {
  const { organizationId, projectId, environmentId, agentId } = useParams();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Agent Workspace</h1>

        <p className="text-muted-foreground">
          Manage this agent and its resources.
        </p>
      </div>

      <nav className="flex gap-2 border-b pb-4">
        <NavLink
          to={`/organizations/${organizationId}/projects/${projectId}/environments/${environmentId}/agents/${agentId}/conversations`}
        >
          Conversations
        </NavLink>

        <NavLink
          to={`/organizations/${organizationId}/projects/${projectId}/environments/${environmentId}/agents/${agentId}/knowledge`}
        >
          Knowledge
        </NavLink>

        <NavLink
          to={`/organizations/${organizationId}/projects/${projectId}/environments/${environmentId}/agents/${agentId}/documents`}
        >
          Documents
        </NavLink>

        <NavLink
          to={`/organizations/${organizationId}/projects/${projectId}/environments/${environmentId}/agents/${agentId}/prompts`}
        >
          Prompts
        </NavLink>

        <NavLink
          to={`/organizations/${organizationId}/projects/${projectId}/environments/${environmentId}/agents/${agentId}/tools`}
        >
          Tools
        </NavLink>

        <NavLink
          to={`/organizations/${organizationId}/projects/${projectId}/environments/${environmentId}/agents/${agentId}/settings`}
        >
          Settings
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
