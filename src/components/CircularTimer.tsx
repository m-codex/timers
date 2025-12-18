import { CircularProgressBar } from '@tomickigrzegorz/react-circular-progress-bar';

interface CircularTimerProps {
  repTime: number;
  currentRep: number;
  totalReps: number;
  percentage: number;
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const CircularTimer = ({ repTime, currentRep, totalReps, percentage }: CircularTimerProps) => {
  return (
    <div className="relative w-64 h-64">
      <CircularProgressBar
        percent={percentage}
        colorSlice="#ffffff"
        colorCircle="#333333"
        round
        stroke={10}
        strokeBottom={10}
        size={256}
        number={false}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-6xl font-bold mb-2">{formatTime(repTime)}</p>
          <p className="text-2xl tracking-widest">{currentRep} / {totalReps}</p>
        </div>
      </CircularProgressBar>
    </div>
  );
};

export default CircularTimer;
