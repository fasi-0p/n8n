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
        const stripeData={
            //event metadata
            eventId: body.id,
            eventType: body.type,
            timestamp: body.created,
            livemode: body.livemode,
            raw: body.data?.object
        }

        //trigger an inngest job
        await sendWorkflowExecution({
            workflowId,
            initialData: {stripe: stripeData},
        })
        
        return NextResponse.json({success: true},{status: 200});
        

    }catch(error){
        console.error('Stripe webhook error:', error);
        return NextResponse.json(
            {success: false, error: 'Failes to process Stripe event'},
            {status: 500}
        )
    }
}