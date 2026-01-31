import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import {useExecutionsParams} from "./use-execution-params";



/**
 * Hook to fetch all execution using suspense
 */
export const useSuspenseExecutions= () => {
  const trpc = useTRPC();
  const [params] = useExecutionsParams()

  return useSuspenseQuery(trpc.executions.getMany.queryOptions(params));
};


//hook to update a single execution
export const useSuspenseExecution= (id: string)=> {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.executions.getOne.queryOptions({id}));
}