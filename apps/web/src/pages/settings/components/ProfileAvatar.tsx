interface Props {
  name: string;
}

export function ProfileAvatar({ name }: Props) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center gap-4">
      <div
        className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-primary
                    text-xl
                    font-bold
                    text-primary-foreground
                "
      >
        {initials}
      </div>

      <div>
        <p className="text-lg font-semibold">{name}</p>

        <p className="text-sm text-muted-foreground">AgentOS Workspace</p>
      </div>
    </div>
  );
}
