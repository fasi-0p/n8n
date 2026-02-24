import { PlusIcon, SearchIcon, Loader2Icon, AlertTriangleIcon, PackageOpenIcon, TrashIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// ─── EntityHeader ─────────────────────────────────────────────────────────────

type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel?: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
  | { onNew: () => void; newButtonHref?: never }
  | { newButtonHref: string; onNew?: never }
  | { onNew?: never; newButtonHref?: never }
);

const NeonButton = ({
  onClick,
  href,
  disabled,
  children,
}: {
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  children: React.ReactNode;
}) => {
  const cls =
    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium " +
    "bg-[rgba(0,240,255,0.1)] text-[#00f0ff] border border-[rgba(0,240,255,0.4)] " +
    "shadow-[0_0_12px_rgba(0,240,255,0.15)] " +
    "hover:bg-[rgba(0,240,255,0.2)] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] " +
    "disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200";

  if (href) {
    return (
      <Link href={href} prefetch className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
};

export const EntityHeader = ({
  title,
  description,
  onNew,
  newButtonHref,
  newButtonLabel,
  disabled,
  isCreating,
}: EntityHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4">
      <div className="flex flex-col gap-0.5">
        <h1 className="text-lg md:text-xl font-semibold text-white">{title}</h1>
        {description && (
          <p className="text-xs md:text-sm text-zinc-500">{description}</p>
        )}
      </div>

      {onNew && !newButtonHref && (
        <NeonButton onClick={onNew} disabled={isCreating || disabled}>
          <PlusIcon className="size-4" />
          {isCreating ? "Creating…" : newButtonLabel}
        </NeonButton>
      )}

      {newButtonHref && !onNew && (
        <NeonButton href={newButtonHref} disabled={disabled}>
          <PlusIcon className="size-4" />
          {newButtonLabel}
        </NeonButton>
      )}
    </div>
  );
};

// ─── EntityContainer ──────────────────────────────────────────────────────────

type EntityContainerProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
};

export const EntityContainer = ({
  children,
  header,
  search,
  pagination,
}: EntityContainerProps) => {
  return (
    <div className="p-4 md:px-10 md:py-6 h-full">
      <div className="mx-auto max-w-screen-xl w-full flex flex-col gap-y-8 h-full">
        {header}
        <div className="flex flex-col gap-y-4 h-full">
          {search}
          {children}
        </div>
        {pagination}
      </div>
    </div>
  );
};

// ─── EntitySearch ─────────────────────────────────────────────────────────────

interface EntitySearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const EntitySearch = ({
  value,
  onChange,
  placeholder = "Search",
}: EntitySearchProps) => {
  return (
    <div className="relative ml-auto">
      <SearchIcon className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
      <input
        className="w-[200px] bg-black border border-zinc-800 rounded-lg pl-8 pr-3 py-2
                   text-sm text-white placeholder:text-zinc-600 outline-none
                   focus:border-[#00f0ff] focus:ring-1 focus:ring-[rgba(0,240,255,0.3)]
                   focus:shadow-[0_0_12px_rgba(0,240,255,0.1)] transition-all"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

// ─── EntityPagination ─────────────────────────────────────────────────────────

interface EntityPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

const PaginationBtn = ({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="px-3 py-1.5 rounded-lg text-sm border border-zinc-800 bg-zinc-900
               text-zinc-400 hover:text-white hover:border-zinc-600 hover:bg-zinc-800
               disabled:opacity-30 disabled:cursor-not-allowed transition-all"
  >
    {children}
  </button>
);

export const EntityPagination = ({
  page,
  totalPages,
  onPageChange,
  disabled,
}: EntityPaginationProps) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full py-2">
      <div className="flex-1 text-sm text-zinc-500 font-mono">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center gap-2">
        <PaginationBtn
          disabled={page === 1 || disabled}
          onClick={() => onPageChange(Math.max(1, page - 1))}
        >
          ← Previous
        </PaginationBtn>
        <PaginationBtn
          disabled={page === totalPages || totalPages === 0 || disabled}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        >
          Next →
        </PaginationBtn>
      </div>
    </div>
  );
};

// ─── LoadingView ──────────────────────────────────────────────────────────────

interface StateViewProps {
  message?: string;
}

interface LoadingViewProps extends StateViewProps {
  entity?: string;
}

export const LoadingView = ({ entity = "items", message }: LoadingViewProps) => {
  return (
    <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
      <Loader2Icon className="size-6 animate-spin text-[#00f0ff]" />
      {!!message && <p className="text-sm text-zinc-500">{message}</p>}
    </div>
  );
};

// ─── ErrorView ────────────────────────────────────────────────────────────────

export const ErrorView = ({ message }: StateViewProps) => {
  return (
    <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
      <AlertTriangleIcon className="size-6 text-[#ff003c]" />
      {!!message && <p className="text-sm text-zinc-500">{message}</p>}
    </div>
  );
};

// ─── EmptyView ────────────────────────────────────────────────────────────────

interface EmptyViewProps extends StateViewProps {
  onNew?: () => void;
}

export const EmptyView = ({ message, onNew }: EmptyViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-12 rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30">
      <PackageOpenIcon className="size-10 text-zinc-600" />
      <div className="text-center">
        <p className="text-sm font-medium text-zinc-400">No items found</p>
        {!!message && <p className="text-xs text-zinc-600 mt-1 max-w-xs">{message}</p>}
      </div>
      {!!onNew && (
        <NeonButton onClick={onNew}>
          <PlusIcon className="size-4" />
          Add item
        </NeonButton>
      )}
    </div>
  );
};

// ─── EntityList ───────────────────────────────────────────────────────────────

interface EntityListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
  emptyView?: React.ReactNode;
  className?: string;
}

export function EntityList<T>({
  items,
  renderItem,
  getKey,
  emptyView,
  className,
}: EntityListProps<T>) {
  if (items.length === 0 && emptyView) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="max-w-sm mx-auto w-full">{emptyView}</div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-y-3", className)}>
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>{renderItem(item, index)}</div>
      ))}
    </div>
  );
}

// ─── EntityItem ───────────────────────────────────────────────────────────────

interface EntityItemProps {
  href: string;
  title: string;
  subtitle?: React.ReactNode;
  image?: React.ReactNode;
  actions?: React.ReactNode;
  onRemove?: () => void | Promise<void>;
  isRemoving?: boolean;
  className?: string;
}

export const EntityItem = ({
  href,
  title,
  subtitle,
  image,
  actions,
  onRemove,
  isRemoving,
  className,
}: EntityItemProps) => {
  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRemoving || !onRemove) return;
    await onRemove();
  };

  return (
    <Link href={href} prefetch>
      <div
        className={cn(
          "group flex flex-row items-center justify-between px-5 py-4 rounded-xl",
          "border border-zinc-800 bg-zinc-900/60",
          "hover:border-zinc-700 hover:bg-zinc-900",
          "transition-all duration-150 cursor-pointer",
          isRemoving && "opacity-40 cursor-not-allowed pointer-events-none",
          className
        )}
      >
        {/* Left: icon + text */}
        <div className="flex items-center gap-4 overflow-hidden">
          {/* Icon slot — dim by default, brighten on group hover */}
          <div className="text-zinc-500 group-hover:text-zinc-300 transition-colors shrink-0">
            {image}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{title}</p>
            {!!subtitle && (
              <p className="text-xs text-zinc-500 mt-0.5 truncate">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Right: custom actions + kebab menu */}
        {(actions || onRemove) && (
          <div
            className="flex items-center gap-3 ml-4 shrink-0"
            onClick={(e) => e.preventDefault()}
          >
            {actions}

            {onRemove && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="p-1.5 rounded-md text-zinc-600 hover:text-zinc-300
                               hover:bg-zinc-800 transition-all opacity-0 group-hover:opacity-100"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVerticalIcon className="size-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-zinc-900 border-zinc-800 text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropdownMenuItem
                    onClick={handleRemove}
                    className="text-[#ff003c] focus:text-[#ff003c] focus:bg-[rgba(255,0,60,0.08)] cursor-pointer"
                  >
                    <TrashIcon className="size-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

// import { PlusIcon, SearchIcon, Loader2Icon, AlertTriangleIcon, PackageOpenIcon, TrashIcon, MoreVerticalIcon} from "lucide-react";
// import { Button} from "@/components/ui/button";
// import Link from "next/link";
// import React from "react";
// import { Input } from "@/components/ui/input";
// import {Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "./ui/empty";
// import {cn} from "@/lib/utils"
// import {Card, CardContent, CardDescription, CardTitle} from "@/components/ui/card";
// import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "./ui/dropdown-menu";


// type EntityHeaderProps = {
//   title: string;
//   description?: string;
//   newButtonLabel?: string;
//   disabled?: boolean;
//   isCreating?: boolean;
// } & (
//   | { onNew: () => void; newButtonHref?: never }
//   | { newButtonHref: string; onNew?: never }
//   | { onNew?: never; newButtonHref?: never }
// );

// export const EntityHeader = ({
//   title,
//   description,
//   onNew,
//   newButtonHref,
//   newButtonLabel,
//   disabled,
//   isCreating,
// }: EntityHeaderProps) => {
//   return (
//     <div className="flex flex-row items-center justify-between gap-x-4">
//       <div className="flex flex-col">
//         <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
//         {description && (
//           <p className="text-xs md:text-sm text-muted-foreground">{description}</p>
//         )}
//       </div>

//       {/* onClick button */}
//       {onNew && !newButtonHref && (
//         <Button disabled={isCreating || disabled} size="sm" onClick={onNew}>
//           {newButtonLabel}
//         </Button>
//       )}

//       {/* Link button */}
//       {newButtonHref && !onNew && (
//         <Button disabled={isCreating || disabled} size="sm" asChild>
//           <Link href={newButtonHref} prefetch className="flex items-center gap-2">
//             <PlusIcon className="size-4" />
//             {newButtonLabel}
//           </Link>
//         </Button>
//       )}
//     </div>
//   );
// };



// type EntityContainerProps = {
//   children: React.ReactNode;
//   header?: React.ReactNode;
//   search?: React.ReactNode;
//   pagination?: React.ReactNode;
// };

// export const EntityContainer = ({
//   children,
//   header,
//   search,
//   pagination,
// }: EntityContainerProps) => {
//   return (
//     <div className="p-4 md:px-10 md:py-6 h-full">
//       <div className="mx-auto max-w-screen-xl w-full flex flex-col gap-y-8 h-full">
//         {header}
//         <div className='flex flex-col gap-y-4 h-full'>
//             {search}
//             {children}
//         </div>
//         {pagination}
//       </div>
//     </div>
//   );
// };


// interface EntitySearchProps{
//   value: string;
//   onChange: (value: string) => void;
//   placeholder: string;
// }

// export const EntitySearch = ({
//   value,
//   onChange,
//   placeholder = "Search",
// }: EntitySearchProps) => {
//   return (
//     <div className="relative ml-auto">
//       <SearchIcon className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
//       <Input
//         className="max-w-[200px] bg-background shadow-none border-border pl-8"
//         placeholder={placeholder}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       />
//     </div>
//   );
// };


// interface EntityPaginationProps {
//   page: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
//   disabled? : boolean;
// }

// export const EntityPagination = ({
//   page,
//   totalPages,
//   onPageChange,
//   disabled,
// }: EntityPaginationProps) => {
//   return (
//     <div className="flex items-center justify-between gap-x-2 w-full">
//       <div className="flex-1 text-sm text-muted-foreground">
//         Page {page} of {totalPages || 1}
//       </div>

//       <div className="flex items-center justify-end space-x-2 py-4">
//         <Button
//           disabled={page === 1 || disabled}
//           variant="outline"
//           size="sm"
//           onClick={() => onPageChange(Math.max(1, page-1))}
//         >
//           Previous
//         </Button>

//         <Button
//           disabled={page === totalPages || totalPages === 0 || disabled}
//           variant="outline"
//           size="sm"
//           onClick={() => onPageChange(Math.min(totalPages, page+1))}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// };

// interface StateViewProps{
//   message? : string;
// }

// //LOADING - continued in workflows.tsx
// interface LoadingViewProps extends StateViewProps{
//   entity? : string;

// }

// export const LoadingView = ({entity='items', message} : LoadingViewProps) =>{
//   return (
//     <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
//       <Loader2Icon className="size-6 animate-spin text-primary" />
//       {!!(message) && (<p className="text-sm text-muted-foreground"> {message || `Loading ${entity}...`} </p>)}
//     </div>
//   );
// }

// //ERROR- continued in workflows.tsx
// export const ErrorView = ({message} : StateViewProps) =>{
//   return (
//     <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
//       <AlertTriangleIcon className="size-6 text-primary" />
//       {!!(message) && (<p className="text-sm text-muted-foreground"> {message} </p>)}
//     </div>
//   );
// }

// //EMPTY
// interface EmptyViewProps extends StateViewProps{
//   onNew?: ()=>void;
// }

// export const EmptyView = ({message, onNew} : EmptyViewProps)=>{
//   return (
//     <Empty className="border border-dashed bg-white">
//       <EmptyHeader>
//         <EmptyMedia variant="icon">
//           <PackageOpenIcon />
//         </EmptyMedia>
//       </EmptyHeader>

//       <EmptyTitle>No items</EmptyTitle>

//       {!!message && (
//         <EmptyDescription>
//           {message}
//         </EmptyDescription>
//       )}

//       {!!onNew && (
//         <EmptyContent>
//           <Button onClick={onNew}>
//             Add item
//           </Button>
//         </EmptyContent>
//       )}
//     </Empty>
//   );
// }


// //LIST
// interface EntityListProps<T> {
//   items: T[];
//   renderItem: (item: T, index: number) => React.ReactNode;
//   getKey?: (item: T, index: number) => string | number;
//   emptyView?: React.ReactNode;
//   className?: string;
// };

// export function EntityList<T>({
//   items,
//   renderItem,
//   getKey,
//   emptyView,
//   className,
// }: EntityListProps<T>) {
//   if (items.length === 0 && emptyView) {
//     return (
//       <div className="flex-1 flex justify-center items-center">
//         <div className="max-w-sm mx-auto">{emptyView}</div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={cn(
//         "flex flex-col gap-y-4",
//         className,
//       )}
//     >
//       {items.map((item, index) => (
//         <div key={getKey ? getKey(item, index) : index}>
//           {renderItem(item, index)}
//         </div>
//       ))}
//     </div>
//   );
// }


// //ITEM
// interface EntityItemProps{
//   href: string;
//   title: string;
//   subtitle? : React.ReactNode;
//   image?: React.ReactNode;
//   actions?: React.ReactNode;
//   onRemove?: ()=> void | Promise<void>;
//   isRemoving?: boolean;
//   className?: string;
// }

// export const EntityItem = ({
//   href,
//   title,
//   subtitle,
//   image,
//   actions,
//   onRemove,
//   isRemoving,
//   className,
// } : EntityItemProps) => {
//   const handleRemove = async(e: React.MouseEvent) =>{
//     e.preventDefault();
//     e.stopPropagation();
//     if (isRemoving){
//       return;
//     }
//     if (onRemove){
//       await onRemove();
//     }
//   }

//   return (
//     <Link href={href} prefetch>
//       <Card
//         className={cn(
//           "p-4 shadow-none hover:shadow cursor-pointer",
//           isRemoving && "opacity-50 cursor-not-allowed",
//           className,
//         )}
//       >
//         <CardContent className="flex flex-row items-center justify-between p-0">
//           <div className="flex items-center gap-3">
//             {image}
//             <div>
//               <CardTitle className="text-base font-medium">
//                 {title}
//               </CardTitle>

//               {!!subtitle && (
//                 <CardDescription className="text-xs">
//                   {subtitle}
//                 </CardDescription>
//               )}
//             </div>
//           </div>

//           {(actions || onRemove) && (
//             <div className="flex gap-x-4 items-center">
//               {actions}

//               {onRemove && (
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button
//                       size="icon"
//                       variant="ghost"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       <MoreVerticalIcon className="size-4" />
//                     </Button>
//                   </DropdownMenuTrigger>

//                   <DropdownMenuContent
//                     align="end"
//                     onClick={(e) => e.stopPropagation()}
//                   >
//                     <DropdownMenuItem onClick={handleRemove}>
//                       <TrashIcon className="size-4" />
//                       Delete
//                     </DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               )}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </Link>
//   );

// }