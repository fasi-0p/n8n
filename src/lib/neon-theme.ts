// Centralised NeonGrid design tokens — import anywhere you need raw values
// (e.g. for inline SVG stroke colours, canvas calculations, etc.)

export const neon = {
  cyan:    '#00f0ff',
  purple:  '#bf00ff',
  magenta: '#ff003c',
  green:   '#39ff14',

  bg:     '#09090b',
  panel:  '#18181b',
  border: '#27272a',
  muted:  '#71717a',

  glow: {
    cyan:    'rgba(0,240,255,0.3)',
    purple:  'rgba(191,0,255,0.3)',
    green:   'rgba(57,255,20,0.4)',
    magenta: 'rgba(255,0,60,0.3)',
  },
} as const;

// Node category → neon accent mapping
// Matches NodeType enum from prisma schema
export const nodeAccent = {
  MANUAL_TRIGGER:     neon.cyan,
  GOOGLE_FORM_TRIGGER: neon.cyan,
  STRIPE_TRIGGER:     neon.cyan,
  HTTP_REQUEST:       '#f97316', // orange — not a neon accent, just distinct
  ANTHROPIC:          neon.purple,
  GEMINI:             neon.purple,
  OPENAI:             neon.purple,
  DISCORD:            '#5865f2',
  SLACK:              '#9c5de0',
  INITIAL:            neon.cyan,
} as const;

export type NodeAccentKey = keyof typeof nodeAccent;

// ExecutionStatus → badge CSS class mapping
// Matches ExecutionStatus enum: RUNNING | SUCCESS | FAILED
export const executionStatusClass = {
  RUNNING: 'badge-neon-running',
  SUCCESS: 'badge-neon-success',
  FAILED:  'badge-neon-error',
} as const;

// Inngest realtime status → display mapping
// Matches topic type: "loading" | "success" | "error"
export const nodeStatusLabel = {
  loading: 'Running',
  success: 'Success',
  error:   'Failed',
  initial: 'Idle',
} as const;