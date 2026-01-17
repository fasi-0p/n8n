import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {useWorkflowsParams} from "./use-workflows-params";

/**
 * Hook to fetch all workflows using suspense
 */
export const useSuspenseWorkflows = () => {
  const trpc = useTRPC();
  const [params] = useWorkflowsParams()

  return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
};

export const useCreateWorkflow = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow "${data.name}" created`);
        queryClient.invalidateQueries(
          trpc.workflows.getMany.queryOptions({}),
        );
      },
      onError: (error) => {
        toast.error(`Failed to create workflow: ${error.message}`);
      },
    }),
  );
};

/**
 * Hook to remove all workflows
 */

// export const useRemoveWorkflow = () =>{
//   const trpc = useTRPC();
//   const queryClient = useQueryClient();

//   return useMutation(
//     trpc.workflows.remove.mutationOptions({
//       onSuccess: (data) => {
//         toast.success(`Workflow "${data.name}" removed`);
//         queryClient.invalidateQueries(
//           trpc.workflows.getOne.queryFilter({id: data.id})
//         )
//       }
//     })
//   )
// }
export const useRemoveWorkflow = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.workflows.remove.mutationOptions({
      onSuccess: (data, variables) => {
        toast.success(`Removed workflow`);

        queryClient.invalidateQueries(
          trpc.workflows.getMany.queryOptions({}),
        );

        queryClient.invalidateQueries(
          trpc.workflows.getOne.queryFilter({ id: variables.id }),
        );
      },
      onError: (error) => {
        toast.error(`Failed to remove workflow: ${error.message}`);
      },
    }),
  );
};