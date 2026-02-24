import { cn } from '@/lib/utils';

type NeonBadgeVariant = 'success' | 'error' | 'running' | 'ai' | 'trigger' | 'action';

interface NeonBadgeProps {
  variant: NeonBadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantMap: Record<NeonBadgeVariant, string> = {
  success: 'badge-neon-success',
  error:   'badge-neon-error',
  running: 'badge-neon-running',
  ai:      'badge-neon-ai',
  trigger: 'badge-neon-running',
  action:  'badge-neon-running',
};

export function NeonBadge({ variant, children, className }: NeonBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-mono-jetbrains text-[10px] px-2 py-0.5 rounded-full',
        variantMap[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

// Convenience: maps ExecutionStatus enum directly
// ExecutionStatus: RUNNING | SUCCESS | FAILED
export function ExecutionStatusBadge({ status }: { status: 'RUNNING' | 'SUCCESS' | 'FAILED' }) {
  const map = {
    RUNNING: { variant: 'running' as const, label: '⟳ RUNNING' },
    SUCCESS: { variant: 'success' as const, label: '✓ SUCCESS' },
    FAILED:  { variant: 'error'   as const, label: '✗ FAILED'  },
  };
  const { variant, label } = map[status];
  return <NeonBadge variant={variant}>{label}</NeonBadge>;
}

// Maps inngest realtime status (loading | success | error)
export function NodeStatusBadge({ status }: { status: 'loading' | 'success' | 'error' | 'initial' }) {
  const map = {
    loading: { variant: 'running' as const, label: '⟳ Running'  },
    success: { variant: 'success' as const, label: '✓ Success'  },
    error:   { variant: 'error'   as const, label: '✗ Error'    },
    initial: { variant: 'action'  as const, label: '○ Idle'     },
  };
  const { variant, label } = map[status];
  return <NeonBadge variant={variant}>{label}</NeonBadge>;
}