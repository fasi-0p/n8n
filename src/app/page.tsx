'use client'

import React from 'react'
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {requireAuth} from "@/lib/auth-utils";
import {caller} from "@/trpc/server";
import Logout from "@/app/logout"
import {useTRPC} from '@/trpc/client'
import {useQuery, useMutation} from '@tanstack/react-query'
import {useQueryClient} from '@tanstack/react-query'
import { toast } from 'sonner';


const Page = () => {

  const trpc=useTRPC ();
  const queryClient = useQueryClient()
  const {data} = useQuery(trpc.getWorkflows.queryOptions())
  const testAi=useMutation(trpc.testAi.mutationOptions({
    onSuccess:()=>{
      toast.success("AI Job queued")
    }
  }))
  const  create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess:()=>{
      toast.success("Job queued")
    }
  }))

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      protected server component
      <div>
        {JSON.stringify(data)}
      </div>
      <Button disabled={testAi.isPending} onClick={()=> testAi.mutate()}>
        test AI
      </Button>
      <Button disabled={create.isPending} onClick={()=> create.mutate()}>
        create workflow
      </Button>
      <Logout/>
    </div>
  );
};

export default Page;