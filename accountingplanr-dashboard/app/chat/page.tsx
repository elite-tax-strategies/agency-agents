import { Suspense } from "react";
import { ChatWindow } from "@/components/chat-window";

export default function ChatPage() {
  return (
    <div className="h-[calc(100vh-1px)]">
      <Suspense fallback={null}>
        <ChatWindow />
      </Suspense>
    </div>
  );
}
