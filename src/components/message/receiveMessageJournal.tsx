"use client";
import { CONTRACT } from "@/server/contracts/message";
import { useReadContract } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ReceiveMessageJournal() {
  const activeAccount = useActiveAccount();
  const walletAddress = activeAccount?.address;
  console.log("walletAddress: ", walletAddress);

  const {
    data: messages,
    isLoading: loadingMessages,
    refetch,
    isFetching,
  } = useReadContract({
    contract: CONTRACT,
    method: "receiveMessagesContentWithSender",
    params: [walletAddress as string],
  });

  console.log("message:", messages);

  return (
    <div className="flex flex-col items-center mt-8 w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">Received Messages</h1>
      <Button
        onClick={() => refetch()}
        className="mb-4"
        disabled={isFetching}
        variant="default"
      >
        {isFetching ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" />
            Refreshing...
          </div>
        ) : (
          "Refresh Messages"
        )}
      </Button>

      {loadingMessages || isFetching ? (
        <Alert className="mt-4" variant="default">
          <Loader2 className="animate-spin mr-2" />
          <AlertDescription>Loading messages...</AlertDescription>
        </Alert>
      ) : messages && messages[0].length > 0 ? (
        <Accordion type="single" collapsible className="w-full mt-4">
          {[...messages[0]].reverse().map((content: string, index: number) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <AccordionTrigger className="text-left">
                Message {index + 1}
              </AccordionTrigger>
              <AccordionContent>{content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <Alert className="mt-4">
          <AlertTitle>No messages received</AlertTitle>
          <AlertDescription>
            You have not received any messages yet. Please check back later.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}