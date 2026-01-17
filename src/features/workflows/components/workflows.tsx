'use client' 
import { useSuspenseWorkflows, useCreateWorkflow, useRemoveWorkflow } from "../hooks/use-workflows";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import {LoadingView, ErrorView, EmptyView} from "@/components/entity-components"
import { EntityHeader,  EntityContainer, EntitySearch, EntityPagination, EntityList, EntityItem } from "@/components/entity-components";
import type { WorkflowModel } from "@/generated/prisma/models/Workflow";
type Workflow = WorkflowModel;
import {formatDistanceToNow} from 'date-fns'


import { WorkflowIcon } from "lucide-react";


export const WorkflowsSearch= () => {
  const [params, setParams] = useWorkflowsParams()
  const { searchValue, onSearchChange} = useEntitySearch({
    params, setParams
  })

  return (
    <EntitySearch value={searchValue} onChange={onSearchChange} placeholder="Search workflows" />
  )
}

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();
  if (workflows.data.items.length===0){
    return <WorkflowsEmpty/>
  }

  return (
    <EntityList
      items={workflows.data.items}
      renderItem={(workflow)=> <WorkflowItem data={workflow}/>}
      getKey={(workflow)=> workflow.id}
      emptyView={<WorkflowsEmpty/>}
    />
  );
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
    const createWorkflow = useCreateWorkflow();
    const {handleError, modal} = useUpgradeModal();
    const router = useRouter();

    const handleCreate=()=>{
        createWorkflow.mutate(undefined, {onSuccess:(data)=> {
            router.push(`/workflows/${data.id}`)
        },
    })
    }
  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        onNew={handleCreate}
        newButtonLabel="New workflow"
        disabled={disabled}
        isCreating={createWorkflow.isPending}
      />
    </>
  );
};

export const WorkflowPagination = () =>{
  const workflows = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowsParams();

  return (
    <EntityPagination disabled={workflows.isFetching}
     totalPages={workflows.data.totalPage} 
     page={params.page} 
     onPageChange={(page)=> setParams({...params, page})}/>
  );
};


export const WorkflowsContainer = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowsSearch/>}
      pagination={<WorkflowPagination/>}
    >
      {children}
    </EntityContainer>
  );
};

//- continued from entity-components
export const WorkflowsLoading = () => {
  return <LoadingView message= "Loading workflows..."/>
}

//- continued from entity-components
export const WorkflowsError = () => {
  return <ErrorView message= "Error Loading workflows"/>
}

export const WorkflowsEmpty = () =>{
  const createWorkflow = useCreateWorkflow();
  const {handleError, modal} = useUpgradeModal();
  const router = useRouter();

  const handleCreate = () =>{
    createWorkflow.mutate(undefined, {
      onError: (error) => { 
        handleError(error);
      },
      onSuccess: (data) =>{
        router.push(`/workflows/${data.id}`)
      }
    })
  }

  return (
    <>
      {modal}
      <EmptyView 
        onNew={handleCreate}
        message = "Nope, didn't find your searched workflow. create your workflow."
      /> 
    </>
  )
}

export const WorkflowItem = ({data,}: {data:Workflow}) => {
  const removeWorkflow = useRemoveWorkflow();
  const handleRemove = () =>{
    removeWorkflow.mutate({id: data.id});
  }

  return (
    <EntityItem
      href={`/workflows/${data.id}`}
      title={data.name}
      subtitle={
        <>
          Updated {formatDistanceToNow(data.updatedAt, {addSuffix: true})} {" "}
          &bull; Created{" "}
          {formatDistanceToNow(data.updatedAt, {addSuffix: true} )}
        </>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <WorkflowIcon className="size-5 text-muted-foreground"/>
        </div>
      }
      onRemove={handleRemove}
      isRemoving={removeWorkflow.isPending}
    />
  )
}