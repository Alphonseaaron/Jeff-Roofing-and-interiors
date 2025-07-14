import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMessages, useSendMessage } from "@/hooks/useMessages";
import { useAuth } from "@/hooks/useAuth";
import { Loading } from "@/components/ui/loading";
import { Send } from "lucide-react";

interface MessageInterfaceProps {
  projectId: string;
}

export function MessageInterface({ projectId }: MessageInterfaceProps) {
  const { user } = useAuth();
  const { data: messages, isLoading, error } = useMessages(projectId);
  const sendMessageMutation = useSendMessage();
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    try {
      await sendMessageMutation.mutateAsync({
        projectId,
        senderId: user.id,
        content: newMessage.trim()
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (isLoading) {
    return <Loading text="Loading messages..." />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-600">Error loading messages. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
          {messages && messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.id} className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {message.senderId === user?.id ? "You" : "TM"}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-sm">
                      {message.senderId === user?.id ? "You" : "Team Member"}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{message.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground">No messages yet.</p>
          )}
        </div>
        
        <form onSubmit={handleSendMessage} className="flex">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            disabled={sendMessageMutation.isPending}
          />
          <Button
            type="submit"
            disabled={!newMessage.trim() || sendMessageMutation.isPending}
            className="ml-2 bg-primary-blue hover:bg-primary-blue-hover"
          >
            <Send size={16} />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
