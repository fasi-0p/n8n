import React from 'react'
import {requireAuth} from '@/lib/auth-utils'
import {SearchParams} from 'nuqs'
import {credentialsParamsLoader} from "@/features/credentials/server/params-loader"
import {prefetchCredentials} from "@/features/credentials/server/prefetch"
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HydrateClient } from "@/trpc/server";
import { CredentialsContainer, CredentialsList, CredentialsError, CredentialsLoading } from "@/features/credentials/components/credentials";


type Props={
  searchParams: Promise<SearchParams>;
}

const page = async ({searchParams}: Props) => {
  await requireAuth();

  const params = await credentialsParamsLoader(searchParams)
  prefetchCredentials(params)

  return (
    <CredentialsContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<CredentialsError/>}>
          <Suspense fallback={<CredentialsLoading/>}>
            <CredentialsList/>
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </CredentialsContainer>
  )
}

export default page