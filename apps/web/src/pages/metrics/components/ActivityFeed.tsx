import { SectionCard } from "./SectionCard";

const activities = [
  {
    title: "Conversation created",
    description: "New AI session started",
  },

  {
    title: "Knowledge indexed",
    description: "AgentOS documentation added",
  },

  {
    title: "Tool executed",
    description: "Calculator tool completed",
  },
];

export function ActivityFeed() {
  return (
    <SectionCard title="Recent Activity">
      <div className="space-y-4">
        {activities.map((item, index) => (
          <div
            key={index}
            className="
border-b
pb-3
last:border-none
"
          >
            <p className="font-medium">{item.title}</p>

            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
