// =============================================================================
// MidnightVitals — Toggle Button Component
// =============================================================================
// The 🩺 stethoscope button that lives in the app header.
// Clicking it opens/closes the vitals panel.
// Shows a red pulse badge when any vital is in critical state.
// =============================================================================

import { Stethoscope } from 'lucide-react';
import { useVitals } from '../context';


export function VitalsToggleButton() {
  const { state, dispatch } = useVitals();

  // Check if any vital is critical — if so, show the alert badge
  const hasCritical = state.monitors.some((m) => m.status === 'critical');

  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_PANEL' })}
      className={`relative p-2 rounded-lg transition-colors ${
        state.isOpen
          ? 'bg-emerald-500/10 text-emerald-400'
          : 'hover:bg-muted text-muted-foreground hover:text-foreground'
      }`}
      aria-label="Toggle MidnightVitals diagnostic panel"
      title="MidnightVitals — Diagnostic Console"
    >
      <Stethoscope className={`w-4 h-4 ${hasCritical ? 'animate-pulse' : ''}`} />

      {/* Critical alert badge */}
      {hasCritical && (
        <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-red-500 border border-zinc-900 animate-pulse" />
      )}

      {/* "Open" dot indicator when panel is active */}
      {state.isOpen && !hasCritical && (
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400" />
      )}
    </button>
  );
}
