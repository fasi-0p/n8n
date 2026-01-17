import React from 'react'
import {requireAuth} from '@/lib/auth-utils'
import {prefetchWorkflow} from "@/features/workflows/server/prefetch"
import {HydrateClient} from "@/trpc/server"
import {Suspense} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {WorkflowsList} from "@/features/workflows/components/workflows";
import {WorkflowsLoading, WorkflowsError} from "@/features/workflows/components/workflows";
import {EditorLoading, EditorError, Editor} from "@/features/editor/components/editor";
import {EditorHeader} from "@/features/editor/components/editor-header";


interface PageProps{
    params: Promise<{workflowId: string}>
}

const page = async ({params} : PageProps) => {
    await requireAuth();
    const {workflowId} = await params;
    prefetchWorkflow(workflowId);
  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EditorError/>}> 
        <Suspense fallback={<EditorLoading/>}>
        <EditorHeader workflowId={workflowId}/>
        <main className='flex-1'>
          <Editor workflowId={workflowId}/>
        </main>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}

export default page