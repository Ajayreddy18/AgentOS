import { ConversationSidebar } from "./components/ConversationSidebar";
import { ChatWindow } from "./components/ChatWindow";
import { MessageComposer } from "./components/MessageComposer";
import { RuntimeInspector } from "./components/RuntimeInspector";
export function PlaygroundPage() {
  return (
    <div className="flex h-[calc(100vh-220px)] rounded-lg border overflow-hidden">
      <ConversationSidebar />

      <div className="flex flex-1 flex-col">
        <ChatWindow />

        <MessageComposer />
      </div>

      <RuntimeInspector />
    </div>
  );
}
