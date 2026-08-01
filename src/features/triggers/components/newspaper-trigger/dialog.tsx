'use client';

import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewspaperTriggerDialog = ({ open, onOpenChange }: Props) => {
  const params = useParams();
  const workflowId = params.workflowId as string;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const webhookUrl = `${baseUrl}/api/webhooks/newspaper?workflowId=${workflowId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(webhookUrl);
      toast.success("Webhook URL copied to clipboard");
    } catch {
      toast.error("Failed to copy webhook URL to clipboard");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Financial News Trigger Configuration</DialogTitle>
          <DialogDescription>
            Configure this webhook URL in a financial news API (like Finnhub) to trigger this workflow.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Webhook URL */}
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>

            <div className="flex gap-2">
              <Input
                id="webhook-url"
                value={webhookUrl}
                readOnly
                className="font-mono text-sm"
              />

              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={copyToClipboard}
              >
                <CopyIcon className="size-4" />
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="rounded-lg bg-muted p-4 space-y-2">
            <h4 className="font-medium text-sm">Setup instructions:</h4>

            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Sign up for a free financial news API (e.g., Finnhub or AlphaVantage)</li>
              <li>Go to the Webhook configuration on their dashboard</li>
              <li>Paste the webhook URL above</li>
              <li>Save and wait for news alerts!</li>
            </ol>
          </div>


            <div className="rounded-lg bg-muted p-4 space-y-2">
              <h4 className="font-medium text-sm">Available Variables</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><code className="bg-background px-1 py-0.5 rounded">{"{{newspaper.title}}"}</code> - News Title
                </li>
                <li><code className="bg-background px-1 py-0.5 rounded">{"{{newspaper.summary}}"}</code> - News Summary
                </li>
                <li><code className="bg-background px-1 py-0.5 rounded">{"{{newspaper.url}}"}</code> - News Link
                </li>
                <li><code className="bg-background px-1 py-0.5 rounded">{"{{json newspaper}}"}</code> - Full event data as JSON
                </li>
              </ul>
            </div>

        </div>
      </DialogContent>
    </Dialog>
  );
};
