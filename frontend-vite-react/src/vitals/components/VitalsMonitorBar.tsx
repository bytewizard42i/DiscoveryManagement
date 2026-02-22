// =============================================================================
// MidnightVitals — Monitor Bar Component
// =============================================================================
// Horizontal row of time wheels at the top of the vitals panel.
// Shows all 4 vital monitors side by side with their countdown timers.
// =============================================================================

import { useVitals } from '../context';
import { VitalsTimeWheel } from './VitalsTimeWheel';


export function VitalsMonitorBar() {
  const { state, refreshVital } = useVitals();

  return (
    <div className="flex items-stretch gap-2 px-3 py-2.5 border-b border-zinc-800/80 overflow-x-auto">
      {state.monitors.map((monitor) => (
        <VitalsTimeWheel
          key={monitor.id}
          label={monitor.label}
          status={monitor.status}
          detailLine={monitor.detailLine}
          lastCheckTimestamp={monitor.lastCheckTimestamp}
          checkIntervalSeconds={monitor.checkIntervalSeconds}
          onRefresh={() => refreshVital(monitor.id)}
        />
      ))}
    </div>
  );
}
