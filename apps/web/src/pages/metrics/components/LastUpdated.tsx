import { Clock3 } from "lucide-react";

import { useEffect, useState } from "react";

export function LastUpdated() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Clock3 className="h-4 w-4" />
      Last Updated:
      <span className="font-medium text-foreground">
        {time.toLocaleTimeString()}
      </span>
    </div>
  );
}
