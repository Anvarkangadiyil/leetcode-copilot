import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const SidePanel = () => {
  const AiPromptMessage = [
    {
      name: "user",
      message: "hello",
    },
    {
      name: "ai",
      message: "hello",
    },
    {
      name: "user",
      message: "hello",
    },
    {
      name: "ai",
      message: "hello",
    },
  ];
  return (
    <Card className="h-full bg-fuchsia-400" >
      <CardHeader>Ask me anything</CardHeader>
      <CardContent>
        <ScrollArea>
          {AiPromptMessage.map((message) => (
            <div key={message.name}>
              <p className="text-sm text-muted-foreground">{message.name}</p>
              <p className="text-sm">{message.message}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-2">
          <Input placeholder="Ask me anything" className="flex-10/12" />
          <Button variant="secondary" size="icon" className="size-8 flex-1">
            💡
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SidePanel;
