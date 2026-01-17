import React from 'react'
import {requireAuth} from '@/lib/auth-utils'
import {prefetchWorkflows} from '@/features/workflows/server/prefetch'
import {workflowsParamsLoader} from '@/features/workflows/server/params-loader'
import {HydrateClient} from "@/trpc/server"
import {Suspense} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {WorkflowsList, WorkflowsContainer} from "@/features/workflows/components/workflows";
import {SearchParams} from "nuqs/server"
import {WorkflowsLoading, WorkflowsError} from "@/features/workflows/components/workflows";

type Props={
  searchParams: Promise<SearchParams>;

}

const page = async ({searchParams} : Props) => {
  await requireAuth();

  const params = await workflowsParamsLoader(searchParams);
  prefetchWorkflows(params);

  return (
    <WorkflowsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<WorkflowsError/>}> 
          <Suspense fallback={<WorkflowsLoading/>}>
            <WorkflowsList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowsContainer>
  );
}

export default page