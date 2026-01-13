import{ Suspense} from 'react'
import {Button} from "@/components/ui/button"
import prisma from "@/lib/db"
import {getQueryClient, trpc } from "@/trpc/server"
import Client from "@/app/client"
import {HydrationBoundary, dehydrate} from "@tanstack/react-query"


const page = async() => {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions())

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Loading...</p>}>
          <Client/>
        </Suspense>
      </HydrationBoundary>
    </div>
  )
}

export default page