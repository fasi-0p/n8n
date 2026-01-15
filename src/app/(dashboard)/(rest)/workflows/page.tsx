import React from 'react'
import {requireAuth} from '@/lib/auth-utils'
import {prefetchWorkflows} from '@/features/workflows/server/prefetch'
import {HydrateClient} from "@/trpc/server"
import {Suspense} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {WorkflowsList, WorkflowsContainer} from "@/features/workflows/components/workflows";


const page = async () => {
  await requireAuth();

  prefetchWorkflows();

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<p>Error!</p>}>
          <Suspense fallback={<p>Loading...</p>}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
}

export default page