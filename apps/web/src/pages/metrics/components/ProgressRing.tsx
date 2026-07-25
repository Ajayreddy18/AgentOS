interface Props {
  value: number;
  size?: number;
  stroke?: number;
}

export function ProgressRing({ value, size = 110, stroke = 10 }: Props) {
  const radius = (size - stroke) / 2;

  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (Math.min(value, 100) / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          fill="transparent"
          className="stroke-muted"
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          fill="transparent"
          className="stroke-primary"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset .4s",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />

        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-foreground text-xl font-bold"
        >
          {value}%
        </text>
      </svg>
    </div>
  );
}
