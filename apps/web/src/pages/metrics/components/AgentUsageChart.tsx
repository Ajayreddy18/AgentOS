import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    agentName: string;
    messages: number;
  }[];
}

export function AgentUsageChart({ data }: Props) {
  return (
    <div
      className="
            rounded-xl
            border
            p-6
            "
    >
      <h3
        className="
                mb-4
                font-semibold
            "
      >
        Agent Usage
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="agentName" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="messages" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
