interface ProgressBarProps {
  progress: number;
  className?: string;
}

export default function ProgressBar({ progress, className = "" }: ProgressBarProps) {
  const getColor = (progress: number) => {
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div 
        className={`h-2 rounded-full transition-all duration-300 ${getColor(progress)}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}