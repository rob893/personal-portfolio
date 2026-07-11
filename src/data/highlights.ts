export interface Highlight {
  stat: string;
  label: string;
}

/**
 * Headline impact numbers for the "Principal-level impact" band.
 * Sourced from performance reviews and deliberately generalized/rounded —
 * no internal project names.
 */
export const highlights: Highlight[] = [
  { stat: '9.5K+', label: 'Monthly users on an internal AI platform I designed' },
  { stat: '6.5M+', label: 'Requests served per half at multi-region scale' },
  { stat: '5+', label: 'Engineering-years saved in a single half via AI auto-PRs' },
  { stat: '~2x', label: 'Faster p50 latency after a self-built caching SDK' },
  { stat: '15K+', label: 'Installs of a VS Code extension I built end-to-end' },
  { stat: '#1', label: 'Code throughput & review volume on the team' }
];
