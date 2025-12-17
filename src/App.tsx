import { useState, useEffect } from 'react';

function App() {
  const [reps, setReps] = useState(1);
  const [time, setTime] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [totalTimeRemaining, setTotalTimeRemaining] = useState(0);
  const [repTime, setRepTime] = useState(0);
  const [showSettings, setShowSettings] = useState(true);

  useEffect(() => {
    let timer: number;
    if (isRunning && totalTimeRemaining > 0) {
      timer = setInterval(() => {
        setTotalTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && totalTimeRemaining <= 0) {
      setIsRunning(false);
      setShowSettings(true);
    }
    return () => clearInterval(timer);
  }, [isRunning, totalTimeRemaining]);

  const handleStart = () => {
    const totalSeconds = time * 60;
    setTotalTimeRemaining(totalSeconds);
    setRepTime(totalSeconds / reps);
    setIsRunning(true);
    setShowSettings(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setShowSettings(true);
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentRepTimeRemaining = repTime > 0 ? totalTimeRemaining % repTime : 0;
  const correctedRepTime = currentRepTimeRemaining === 0 && totalTimeRemaining > 0 && isRunning ? repTime : currentRepTimeRemaining;
  const currentRep = repTime > 0 ? Math.min(reps, Math.floor((time * 60 - totalTimeRemaining) / repTime) + 1) : 1;

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center font-mono">
      <div className="w-full max-w-xs p-4">
        {showSettings ? (
          <>
            <h1 className="text-4xl font-bold text-center mb-8 tracking-widest">TIMER</h1>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                 <label htmlFor="reps" className="text-sm font-medium tracking-widest">REPS</label>
                 <span className="text-lg font-bold">{reps}</span>
              </div>
              <input
                id="reps"
                type="range"
                min="1"
                max="300"
                value={reps}
                onChange={(e) => setReps(Number(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-gray-500"
              />
            </div>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="time" className="text-sm font-medium tracking-widest">TIME (MIN)</label>
                <span className="text-lg font-bold">{time}</span>
              </div>
              <input
                id="time"
                type="range"
                min="1"
                max="60"
                value={time}
                onChange={(e) => setTime(Number(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-gray-500"
              />
            </div>
            <button onClick={handleStart} className="w-full bg-gray-200 text-black font-bold py-3 px-4 rounded text-lg tracking-widest">
              START
            </button>
          </>
        ) : (
          <div className="text-center">
            {reps > 0 && (
            <div className="mb-12">
              <p className="text-2xl tracking-widest">{currentRep} / {reps}</p>
            </div>
            )}
            <div className="mb-12">
              <p className="text-lg tracking-widest">TOTAL TIME</p>
              <p className="text-6xl font-bold">{formatTime(totalTimeRemaining)}</p>
            </div>
            <div className="mb-12">
              <p className="text-lg tracking-widest">REP TIME</p>
              <p className="text-6xl font-bold">{formatTime(correctedRepTime)}</p>
            </div>
            <button onClick={handleReset} className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded text-lg tracking-widest">
              RESET
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
