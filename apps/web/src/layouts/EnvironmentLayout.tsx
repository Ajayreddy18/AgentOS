import { NavLink, Outlet, useParams } from "react-router-dom";

export function EnvironmentLayout() {
  const { organizationId, projectId, environmentId } = useParams();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Environment Workspace</h1>

        <p className="text-muted-foreground">
          Manage agents inside this environment.
        </p>
      </div>

      <nav className="flex gap-2 border-b pb-4">
        <NavLink
          to={`/organizations/${organizationId}/projects/${projectId}/environments/${environmentId}/agents`}
        >
          Agents
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
