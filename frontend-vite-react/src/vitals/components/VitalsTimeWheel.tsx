// =============================================================================
// MidnightVitals — Time Wheel Component
// =============================================================================
// A circular SVG countdown timer that shows seconds since last health check.
// The arc depletes clockwise from 100% to 0% over the check interval,
// then refills when a new check completes.
// =============================================================================

import { useState, useEffect } from 'react';
import { RotateCw } from 'lucide-react';
import type { VitalStatus } from '../types';


// ---------------------------------------------------------------------------
// Color mapping for vital status
// ---------------------------------------------------------------------------

const STATUS_COLORS: Record<VitalStatus, { stroke: string; bg: string; text: string; dot: string }> = {
  healthy:  { stroke: 'stroke-emerald-400', bg: 'bg-emerald-400', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  warning:  { stroke: 'stroke-amber-400',   bg: 'bg-amber-400',   text: 'text-amber-400',   dot: 'bg-amber-400' },
  critical: { stroke: 'stroke-red-400',      bg: 'bg-red-400',      text: 'text-red-400',      dot: 'bg-red-400' },
  unknown:  { stroke: 'stroke-zinc-500',     bg: 'bg-zinc-500',     text: 'text-zinc-500',     dot: 'bg-zinc-500' },
};

const STATUS_LABELS: Record<VitalStatus, string> = {
  healthy: 'Healthy',
  warning: 'Degraded',
  critical: 'Down',
  unknown: 'Checking...',
};


// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface VitalsTimeWheelProps {
  label: string;                      // e.g., "Proof Server"
  status: VitalStatus;
  detailLine: string;                 // e.g., "Response: 52ms"
  lastCheckTimestamp: number | null;
  checkIntervalSeconds: number;
  onRefresh: () => void;              // Called when user clicks the refresh button
}


// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function VitalsTimeWheel({
  label,
  status,
  detailLine,
  lastCheckTimestamp,
  checkIntervalSeconds,
  onRefresh,
}: VitalsTimeWheelProps) {

  // Track seconds elapsed since last check for the countdown display
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Update the elapsed time every second
  useEffect(() => {
    const tick = () => {
      if (lastCheckTimestamp) {
        const elapsed = Math.floor((Date.now() - lastCheckTimestamp) / 1000);
        setSecondsElapsed(Math.min(elapsed, checkIntervalSeconds));
      } else {
        setSecondsElapsed(0);
      }
    };

    tick(); // Run immediately
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, [lastCheckTimestamp, checkIntervalSeconds]);

  // Calculate the SVG arc progress (1.0 = full, 0.0 = empty)
  // The arc DEPLETES over time: starts full after a check, empties before next check
  const progress = lastCheckTimestamp
    ? Math.max(0, 1 - (secondsElapsed / checkIntervalSeconds))
    : 0;

  // SVG circle math
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  // Seconds until next check
  const secondsRemaining = Math.max(0, checkIntervalSeconds - secondsElapsed);

  // Handle refresh click with brief spin animation
  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const colors = STATUS_COLORS[status];

  return (
    <div className="flex flex-col items-center gap-1.5 px-3 py-2.5 bg-zinc-900/80 border border-zinc-800 rounded-xl min-w-[120px] hover:bg-zinc-800/80 transition-colors">

      {/* Circular Timer */}
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
          {/* Background track */}
          <circle
            cx="32" cy="32" r={radius}
            fill="none"
            strokeWidth="3"
            className="stroke-zinc-800"
          />
          {/* Progress arc */}
          <circle
            cx="32" cy="32" r={radius}
            fill="none"
            strokeWidth="3"
            className={`${colors.stroke} transition-all duration-1000 ease-linear`}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* Center: seconds remaining */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-mono text-sm font-bold ${colors.text}`}>
            {lastCheckTimestamp ? `${secondsRemaining}s` : '--'}
          </span>
        </div>
      </div>

      {/* Label */}
      <span className="text-xs font-medium text-zinc-300 text-center leading-tight">
        {label}
      </span>

      {/* Status dot + label */}
      <div className="flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${colors.dot} ${
          status === 'critical' ? 'animate-pulse' : ''
        }`} />
        <span className={`text-[10px] font-medium ${colors.text}`}>
          {STATUS_LABELS[status]}
        </span>
      </div>

      {/* Detail line (latency, count, etc.) */}
      <span className="text-[10px] text-zinc-500 text-center">
        {detailLine}
      </span>

      {/* Refresh button */}
      <button
        onClick={handleRefresh}
        className="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-zinc-200 transition-colors mt-0.5 px-2 py-0.5 rounded hover:bg-zinc-700/50"
        aria-label={`Refresh ${label} health check`}
      >
        <RotateCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
        <span>Check</span>
      </button>
    </div>
  );
}
