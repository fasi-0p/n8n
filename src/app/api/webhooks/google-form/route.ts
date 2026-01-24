import {type NextRequest, NextResponse} from "next/server";
import {inngest} from "@/inngest/client";
import {googleFormTriggerChannel} from "@/inngest/channels/google-form-trigger";
import {sendWorkflowExecution} from "@/inngest/utils";

export async function POST(request: NextRequest) {
    try{
        const url = new URL(request.url);
        const workflowId = url.searchParams.get('workflowId');

        if(!workflowId){
            return NextResponse.json(
            {success: false, error: 'Failes to proces Google Form submission'},
            {status: 400}
            )
        }

        const body=await request.json();
        const formData={
            formId: body.formId,
            formTitle: body.formTitle,
            responseId: body.responseId,
            timestamp: body.timestamp,
            respondentEmail: body.respondentEmail,
            responses: body.responses,
            raw: body
        }

        //trigger an inngest job
        await sendWorkflowExecution({
            workflowId,
            initialData: {googleForm: formData},
        })
        

    }catch(error){
        console.error('Google form webhook error:', error);
        return NextResponse.json(
            {success: false, error: 'Failes to proces Google Form submission'},
            {status: 500}
        )
    }
}