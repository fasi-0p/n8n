'use client';

import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {useParams} from "next/navigation";
import {toast} from "sonner";

interface Props{
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const GoogleFormTriggerDialog = ({
  open,
  onOpenChange
}: Props) => {
  const params = useParams();
  const workflowId = params.workflowId as string

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  const webhookUrl = `${baseUrl}/api/webhooks/google-form?workflowId=${workflowId}`;
  const copyToClipboard = async() =>{
    try{
      await navigator.clipboard.writeText(webhookUrl);
      toast.success("Webhook URL copied to clipboard");
    }catch{
      toast.error("Failed to copy webhook URL to clipboard");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Google Form Trigger</DialogTitle>
          <DialogDescription>
            Use this webhook URL in your Google Form's Apps Script to trigger
            this workflow when a form is submitted
          </DialogDescription>
        </DialogHeader>

        {/* to be continued */}
      </DialogContent>
    </Dialog>
  )
}
