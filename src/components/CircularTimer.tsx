import { CircularProgressBar } from '@tomickigrzegorz/react-circular-progress-bar';

interface CircularTimerProps {
  repTime: number;
  totalRepTime: number;
  currentRep: number;
  totalReps: number;
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const CircularTimer = ({ repTime, totalRepTime, currentRep, totalReps }: CircularTimerProps) => {
  const percentage = totalRepTime > 0 ? ((totalRepTime - repTime) / totalRepTime) * 100 : 0;

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
          <p className="text-6xl font-bold">{formatTime(repTime)}</p>
          <p className="text-2xl tracking-widest">{currentRep} / {totalReps}</p>
        </div>
      </CircularProgressBar>
    </div>
  );
};

export default CircularTimer;
