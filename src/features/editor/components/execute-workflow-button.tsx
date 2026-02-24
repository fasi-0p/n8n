import { FlaskConicalIcon } from "lucide-react";
import { useExecuteWorkflow } from "@/features/workflows/hooks/use-workflows";

export const ExecuteWorkflowButton = ({ workflowId }: { workflowId: string }) => {
  const executeWorkflow = useExecuteWorkflow();

  const handleExecute = () => {
    executeWorkflow.mutate({ id: workflowId });
  };

  return (
    <button
      onClick={handleExecute}
      disabled={executeWorkflow.isPending}
      className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium
                 bg-[rgba(0,240,255,0.1)] text-[#00f0ff]
                 border border-[rgba(0,240,255,0.4)]
                 shadow-[0_0_20px_rgba(0,240,255,0.2),0_0_40px_rgba(0,240,255,0.1)]
                 hover:bg-[rgba(0,240,255,0.18)]
                 hover:shadow-[0_0_30px_rgba(0,240,255,0.35),0_0_60px_rgba(0,240,255,0.15)]
                 hover:border-[rgba(0,240,255,0.7)]
                 disabled:opacity-40 disabled:cursor-not-allowed
                 transition-all duration-200
                 backdrop-blur-sm"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {executeWorkflow.isPending ? (
        <>
          <span className="w-4 h-4 rounded-full border-2 border-[#00f0ff] border-t-transparent animate-spin" />
          Executing…
        </>
      ) : (
        <>
          <FlaskConicalIcon className="size-4" />
          Execute
        </>
      )}
    </button>
  );
};

// import {Button} from "@/components/ui/button";
// import {FlaskConicalIcon} from "lucide-react";
// import {useExecuteWorkflow} from "@/features/workflows/hooks/use-workflows"

// export const ExecuteWorkflowButton=({workflowId}:{workflowId: string})=>{
//     const executeWorkflow=useExecuteWorkflow();
//     const handleExecute=()=>{
//         executeWorkflow.mutate({id: workflowId})
//     }

//     return (
//         <Button size='lg' onClick={handleExecute} disabled={executeWorkflow.isPending}>
//             <FlaskConicalIcon className='size-4'/>
//             Execute workflow
//         </Button>
//     )
// }