'use client' 
import { useSuspenseCredentials,  useRemoveCredential } from "../hooks/use-credentials";
import { useRouter } from "next/navigation";
import { useCredentialsParams } from "../hooks/use-credentials-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import {LoadingView, ErrorView, EmptyView} from "@/components/entity-components"
import { EntityHeader,  EntityContainer, EntitySearch, EntityPagination, EntityList, EntityItem } from "@/components/entity-components";
import type { Credential } from "@/generated/prisma"; 
import {formatDistanceToNow} from 'date-fns'
import { CredentialType } from "@/generated/prisma";
import React from "react";
import Image from "next/image";


export const CredentialsSearch= () => {
  const [params, setParams] = useCredentialsParams()
  const { searchValue, onSearchChange} = useEntitySearch({
    params, setParams
  })

  return (
    <EntitySearch value={searchValue} onChange={onSearchChange} placeholder="Search credentials" />
  )
}

export const CredentialsList = () => {
  const credentials = useSuspenseCredentials();
//   if (credentials.data.items.length===0){
//     return <WorkflowsEmpty/>
//   }

  return (
    <EntityList
      items={credentials.data.items}
      renderItem={(credential)=> <CredentialItem data={credential}/>}
      getKey={(credential)=> credential.id}
      emptyView={<CredentialsEmpty/>}
    />
  );
};

export const CredentialsHeader = ({ disabled }: { disabled?: boolean }) => {
    
  return (
      <EntityHeader
        title="Credentials"
        description="Create and manage your credentials"
        newButtonHref="/credentials/new"
        newButtonLabel="New credentials"
        disabled={disabled}
      />
  );
};

export const CredentialsPagination = () =>{
  const credentials = useSuspenseCredentials();
  const [params, setParams] = useCredentialsParams();

  return (
    <EntityPagination disabled={credentials.isFetching}
     totalPages={credentials.data.totalPage} 
     page={params.page} 
     onPageChange={(page)=> setParams({...params, page})}/>
  );
};


export const CredentialsContainer = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<CredentialsHeader />}
      search={<CredentialsSearch/>}
      pagination={<CredentialsPagination/>}
    >
      {children}
    </EntityContainer>
  );
};

//- continued from entity-components
export const CredentialsLoading = () => {
  return <LoadingView message= "Loading credentials..."/>
}

//- continued from entity-components
export const CredentialsError = () => {
  return <ErrorView message= "Error Loading credential"/>
}

export const CredentialsEmpty = () =>{
    const router = useRouter();

  const handleCreate = () =>{
    router.push(`/credentials/new`)
  }

  return (
    <EmptyView 
    onNew={handleCreate}
    message = "You haven't created any credentials yet. Get started by creating your first credential"
    /> 
  )
}

const credentialLogos: Record<CredentialType, string> = {
  [CredentialType.OPENAI]: "/logos/openai.svg",
  [CredentialType.ANTHROPIC]: "/logos/anthropic.svg",
  [CredentialType.GEMINI]: "/logos/gemini.svg",
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
export const CredentialItem = ({ data }: { data: Credential }) => {
  const removeCredential = useRemoveCredential();

  const handleRemove = () => {
    removeCredential.mutate({ id: data.id });
  };

  const logo=credentialLogos[data.type] || "/logos/openai.svg"

  return (
    <EntityItem
      href={`/credentials/${data.id}`}
      title={data.name}
      subtitle={
        <>
          Updated{" "}
          <span suppressHydrationWarning>
            {formatDistanceToNow(data.updatedAt, { addSuffix: true })}
          </span>{" "}
          &bull; Created{" "}
          <span suppressHydrationWarning>
            {formatDistanceToNow(data.createdAt, { addSuffix: true })}
          </span>
        </>
      }
      image={
        <div className="size-8 flex items-center justify-center">
          <Image src={logo} alt={data.type} width={20} height={20}/>
        </div>
      }
      onRemove={handleRemove}
      isRemoving={removeCredential.isPending}
    />
  );
};
