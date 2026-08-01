import {type NextRequest, NextResponse} from "next/server";
import {inngest} from "@/inngest/client";
import {sendWorkflowExecution} from "@/inngest/utils";

export async function POST(request: NextRequest) {
    try{
        const url = new URL(request.url);
        const workflowId = url.searchParams.get('workflowId');

        if(!workflowId){
            return NextResponse.json(
            {success: false, error: 'Failed to process Newspaper webhook. WorkflowId is missing.'},
            {status: 400}
            )
        }

        const body = await request.json();
        
        const newspaperData = {
            title: body.title,
            summary: body.summary,
            url: body.url,
            source: body.source,
            raw: body
        };

        //trigger an inngest job
        await sendWorkflowExecution({
            workflowId,
            initialData: {newspaper: newspaperData},
        })
        
        return NextResponse.json({success: true},{status: 200});

    }catch(error){
        console.error('Newspaper webhook error:', error);
        return NextResponse.json(
            {success: false, error: 'Failed to process Newspaper event'},
            {status: 500}
        )
    }
}
