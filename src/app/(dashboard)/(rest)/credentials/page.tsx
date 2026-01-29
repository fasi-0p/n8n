import React from 'react'
import {requireAuth} from '@/lib/auth-utils'
import {SearchParams} from 'nuqs'
import {credentialsParamsLoader} from "@/features/credentials/server/params-loader"
import {prefetchCredentials} from "@/features/credentials/server/prefetch"
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HydrateClient } from "@/trpc/server";
type Props={
  searchParams: Promise<SearchParams>;
}

const page = async ({searchParams}: Props) => {
  await requireAuth();

  const params = await credentialsParamsLoader(searchParams)
  prefetchCredentials(params)

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<p>Error</p>}>
        <Suspense fallback={<p>Loading...</p>}>
          <p>TODO: Credentials list</p>
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}

export default page