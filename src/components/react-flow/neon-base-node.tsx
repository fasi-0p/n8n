'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { type NodeStatus } from './node-status-indicator';
import { neon, nodeAccent, type NodeAccentKey } from '@/lib/neon-theme';
import { XCircleIcon, CheckCircle2Icon, Loader2Icon } from 'lucide-react';

interface NeonBaseNodeProps extends HTMLAttributes<HTMLDivElement> {
  status?: NodeStatus;
  nodeType?: NodeAccentKey;
  selected?: boolean;
}

export const NeonBaseNode = forwardRef<HTMLDivElement, NeonBaseNodeProps>(
  ({ className, status, nodeType, selected, style, ...props }, ref) => {

    // Determine glow colour based on node type
    const isAI = nodeType && ['ANTHROPIC', 'GEMINI', 'OPENAI'].includes(nodeType);
    const accentColor = nodeType ? nodeAccent[nodeType] : neon.cyan;

    const selectedStyle = selected ? {
      borderColor: accentColor,
      boxShadow: `0 0 0 1px ${accentColor}, 0 0 20px ${accentColor}55, 0 8px 32px rgba(0,0,0,0.5)`,
    } : {};

    return (
      <div
        ref={ref}
        className={cn(
          // Base neon node card
          'relative rounded-xl border bg-zinc-900 text-white',
          'border-zinc-800 shadow-2xl',
          'transition-all duration-200',
          // Hover state
          'hover:border-zinc-600',
          // AI node class for handle colour override
          isAI && 'ai-node',
          className,
        )}
        style={{ ...selectedStyle, ...style }}
        tabIndex={0}
        {...props}
      >
        {props.children}

        {/* Status indicator icons (bottom-right corner) */}
        {status === 'error' && (
          <XCircleIcon className="absolute right-1 bottom-1 size-3 text-red-500 stroke-2" />
        )}
        {status === 'success' && (
          <CheckCircle2Icon className="absolute right-1 bottom-1 size-3 text-green-400 stroke-2" />
        )}
        {status === 'loading' && (
          <Loader2Icon className="absolute right-1 bottom-1 size-3 text-cyan-400 stroke-2 animate-spin" />
        )}
      </div>
    );
  }
);

NeonBaseNode.displayName = 'NeonBaseNode';

// ─── Sub-components ───────────────────────────────────────────────────────────

interface NeonNodeHeaderProps extends HTMLAttributes<HTMLElement> {
  nodeType?: NodeAccentKey;
  shimmer?: boolean;
}

export function NeonNodeHeader({ className, nodeType, shimmer, style, ...props }: NeonNodeHeaderProps) {
  const isAI = nodeType && ['ANTHROPIC', 'GEMINI', 'OPENAI'].includes(nodeType);
  const accentColor = nodeType ? nodeAccent[nodeType] : neon.cyan;

  const shimmerStyle = shimmer ? {
    background: `linear-gradient(90deg, transparent 30%, ${accentColor}0D 50%, transparent 70%)`,
    backgroundSize: '200% auto',
    animation: 'neon-shimmer 3s linear infinite',
  } : {};

  return (
    <header
      {...props}
      className={cn(
        'flex items-center gap-2.5 px-3 py-2.5 border-b border-zinc-800',
        className,
      )}
      style={{ ...shimmerStyle, ...style }}
    />
  );
}

interface NeonNodeIconProps extends HTMLAttributes<HTMLDivElement> {
  nodeType?: NodeAccentKey;
}

export function NeonNodeIcon({ className, nodeType, children, ...props }: NeonNodeIconProps) {
  const accentColor = nodeType ? nodeAccent[nodeType] : neon.cyan;
  const isAI = nodeType && ['ANTHROPIC', 'GEMINI', 'OPENAI'].includes(nodeType);

  return (
    <div
      {...props}
      className={cn('w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0', className)}
      style={{ background: `${accentColor}1A`, boxShadow: `0 0 10px ${accentColor}33` }}
    >
      {children}
    </div>
  );
}

export function NeonNodeTitle({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn('text-[13px] font-semibold text-white truncate', className)}
    />
  );
}

export function NeonNodeSubtitle({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn('text-[9px] font-mono-jetbrains uppercase tracking-wider text-zinc-500 mt-0.5', className)}
    />
  );
}

interface NeonStatusDotProps {
  status?: NodeStatus | 'idle';
}

export function NeonStatusDot({ status }: NeonStatusDotProps) {
  const styles: Record<string, string> = {
    loading: `bg-cyan-400 shadow-[0_0_6px_#00f0ff] animate-[neon-pulse_1s_infinite]`,
    success: `bg-[#39ff14] shadow-[0_0_6px_#39ff14]`,
    error:   `bg-[#ff003c] shadow-[0_0_6px_#ff003c]`,
    initial: `bg-zinc-600`,
    idle:    `bg-zinc-600`,
  };
  return (
    <div className={cn('w-2 h-2 rounded-full flex-shrink-0', styles[status ?? 'idle'])} />
  );
}

export function NeonNodeBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={cn('px-3 py-2.5', className)} />;
}

interface NeonFieldProps {
  label: string;
  value: string;
  valueClassName?: string;
}

export function NeonField({ label, value, valueClassName }: NeonFieldProps) {
  return (
    <div className="flex flex-col gap-1 mb-2 last:mb-0">
      <div className="text-[10px] font-mono-jetbrains uppercase tracking-wider text-zinc-500">{label}</div>
      <div
        className={cn(
          'text-[11px] font-mono-jetbrains text-white bg-black/40 border border-zinc-800 px-2 py-1.5 rounded-md truncate',
          valueClassName,
        )}
      >
        {value}
      </div>
    </div>
  );
}