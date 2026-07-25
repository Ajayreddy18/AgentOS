import { ConversationList } from "./ConversationList";

export function ConversationSidebar() {
  return (
    <aside className="w-72 border-r flex flex-col">
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">Conversations</h2>
      </div>

      <ConversationList />
    </aside>
  );
}
