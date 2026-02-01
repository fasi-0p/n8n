'use client' 
import { useSuspenseExecutions } from "../hooks/use-executions";
import { useRouter } from "next/navigation";
import { useExecutionsParams } from "../hooks/use-executions-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import {LoadingView, ErrorView, EmptyView} from "@/components/entity-components"
import { EntityHeader,  EntityContainer, EntitySearch, EntityPagination, EntityList, EntityItem } from "@/components/entity-components";
import type { Execution } from "@/generated/prisma"; //or client idk
import {formatDistanceToNow} from 'date-fns'
import { ExecutionStatus } from "@/generated/prisma";
import React from "react";
import { CheckCircle2Icon, XCircleIcon, Loader2Icon, ClockIcon } from "lucide-react";
import Image from "next/image";


export const ExecutionsList = () => {
  const executions = useSuspenseExecutions();

  return (
    <EntityList
      items={executions.data.items}
      renderItem={(credential)=> <ExecutionItem data={credential}/>}
      getKey={(credential)=> credential.id}
      emptyView={<ExecutionsEmpty/>}
    />
  );
};

export const ExecutionsHeader = ({ disabled }: { disabled?: boolean }) => {
    
  return (
      <EntityHeader
        title="Executions"
        description="View your workflow execution history."
      />
  );
};

export const ExecutionsPagination = () =>{
  const executions = useSuspenseExecutions();
  const [params, setParams] = useExecutionsParams();

  return (
    <EntityPagination disabled={executions.isFetching}
     totalPages={executions.data.totalPage} 
     page={executions.data.page} 
     onPageChange={(page)=> setParams({...params, page})}/>
  );
};


export const ExecutionsContainer = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<ExecutionsHeader />}
      pagination={<ExecutionsPagination/>}
    >
      {children}
    </EntityContainer>
  );
};

//- continued from entity-components
export const ExecutionsLoading = () => {
  return <LoadingView message= "Loading executions..."/>
}

//- continued from entity-components
export const ExecutionsError = () => {
  return <ErrorView message= "Error Loading executions"/>
}

export const ExecutionsEmpty = () =>{
  return (
    <EmptyView 
    message = "You haven't created any executions yet. Get started by running your first workflow"
    /> 
  )
}

const getStatusIcon = (status: ExecutionStatus)=>{
  switch(status){
    case ExecutionStatus.SUCCESS:
      return <CheckCircle2Icon className="size-5 text-green-600"/>
    case ExecutionStatus.FAILED:
      return <XCircleIcon className="size-5 text-red-600"/>
    case ExecutionStatus.RUNNING:
      return <Loader2Icon className="size-5 text-blue-600 animate-spin"/>  
    default:
      return <ClockIcon className="size=5 text-muted-foreground"/>
  }
}
// export const WorkflowItem = ({data,}: {data:Workflow}) => {
//   const removeWorkflow = useRemoveWorkflow();
//   const handleRemove = () =>{
//     removeWorkflow.mutate({id: data.id});
//   }

//   return (
//     <EntityItem
//       href={`/workflows/${data.id}`}
//       title={data.name}
//       subtitle={
//         <>
//           Updated {formatDistanceToNow(data.updatedAt, {addSuffix: true})} {" "}
//           &bull; Created{" "}
//           {formatDistanceToNow(data.updatedAt, {addSuffix: true} )}
//         </>
//       }
//       image={
//         <div className="size-8 flex items-center justify-center">
//           <WorkflowIcon className="size-5 text-muted-foreground"/>
//         </div>
//       }
//       onRemove={handleRemove}
//       isRemoving={removeWorkflow.isPending}
//     />
//   )
// }
const formatStatus = (status: ExecutionStatus)=>{
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export const ExecutionItem = ({ data }: { data: Execution & {
  workflow:{
    id: string;
    name: string;
  }
}}) => {
  const duration = data.completedAt? Math.round(new Date(data.completedAt).getTime() - new Date(data.startedAt).getTime())/1000  :  null;
  const subtitle =  (
    <>
      {data.workflow.name} &bull; Started{" "}
      {formatDistanceToNow(data.startedAt, {addSuffix: true})}
      {duration !==null && <> &bull; Took {duration}s </>}
    </>
  )

  return (
    <EntityItem
      href={`/executions/${data.id}`}
      title={formatStatus(data.status)}
      subtitle={ subtitle }
      image={
        <div className="size-8 flex items-center justify-center">
          {getStatusIcon(data.status)}
        </div>
      }
    />
  );
}; 