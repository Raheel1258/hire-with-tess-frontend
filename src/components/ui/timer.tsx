interface TimerProps {
  seconds: number;
}

export const Timer = ({ seconds }: TimerProps) => {
  const percentage = (seconds / 60) * 100;

  return (
    <div className="relative w-16 h-16">
      <div className="absolute w-full h-full rounded-full border-4 border-gray-100"></div>

      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="#1E40AF"
          strokeWidth="8"
          strokeDasharray={`${percentage * 2.4} 1000`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
        {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
      </div>
    </div>
  );
};
