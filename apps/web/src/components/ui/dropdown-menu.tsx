import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import type { ReactNode } from "react";

export type DropdownItem = {
  label: string;
  onClick: () => void;
};

type Props = {
  trigger: ReactNode;
  items: DropdownItem[];
};

export function DropdownMenu({ trigger, items }: Props) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        {trigger}
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          sideOffset={6}
          className="rounded-lg border bg-[hsl(var(--card))] p-2 shadow-lg"
        >
          {items.map((item) => (
            <DropdownMenuPrimitive.Item
              key={item.label}
              onSelect={item.onClick}
              className="cursor-pointer rounded px-3 py-2 outline-none hover:bg-[hsl(var(--accent))]"
            >
              {item.label}
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
