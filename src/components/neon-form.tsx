import { cn } from '@/lib/utils';
import { type ComponentProps } from 'react';

// Neon-styled input — use instead of shadcn <Input> in node dialogs
export function NeonInput({ className, ...props }: ComponentProps<'input'>) {
  return (
    <input
      {...props}
      className={cn(
        'w-full bg-black border border-zinc-800 rounded-md px-3 py-2',
        'font-mono-jetbrains text-xs text-white outline-none',
        'transition-all duration-150',
        'focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/30 focus:shadow-[0_0_12px_rgba(0,240,255,0.1)]',
        'placeholder:text-zinc-600',
        'disabled:opacity-50',
        className,
      )}
    />
  );
}

// Neon-styled textarea
export function NeonTextarea({ className, ...props }: ComponentProps<'textarea'>) {
  return (
    <textarea
      {...props}
      className={cn(
        'w-full bg-black border border-zinc-800 rounded-md px-3 py-2',
        'font-mono-jetbrains text-xs text-white outline-none resize-y min-h-[80px]',
        'transition-all duration-150',
        'focus:border-[#00f0ff] focus:ring-1 focus:ring-[#00f0ff]/30 focus:shadow-[0_0_12px_rgba(0,240,255,0.1)]',
        'placeholder:text-zinc-600',
        className,
      )}
    />
  );
}

// Neon-styled select
export function NeonSelect({ className, ...props }: ComponentProps<'select'>) {
  return (
    <select
      {...props}
      className={cn(
        'w-full bg-black border border-zinc-800 rounded-md px-3 py-2',
        'font-mono-jetbrains text-xs text-white outline-none cursor-pointer appearance-none',
        'transition-all duration-150',
        'focus:border-[#00f0ff]',
        className,
      )}
    />
  );
}

// Neon form field label
export function NeonLabel({ className, required, children, ...props }: ComponentProps<'label'> & { required?: boolean }) {
  return (
    <label
      {...props}
      className={cn('block text-[11px] font-mono-jetbrains text-zinc-500 mb-1.5 uppercase tracking-wider', className)}
    >
      {children}
      {required && <span className="text-[#ff003c] ml-1">*</span>}
    </label>
  );
}

// Hint text below a field
export function NeonHint({ className, children, ...props }: ComponentProps<'p'>) {
  return (
    <p {...props} className={cn('text-[10px] font-mono-jetbrains text-zinc-600 mt-1', className)}>
      {children}
    </p>
  );
}

// Section divider with label
export function NeonSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-3 mt-5 first:mt-0">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 font-mono-jetbrains whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-zinc-800" />
    </div>
  );
}