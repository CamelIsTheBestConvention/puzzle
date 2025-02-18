type TimerProps = {
  seconds: number;
};

const Timer = ({ seconds }: TimerProps) => {
  const minutes = Math.floor(seconds / 60);
  const formattedSeconds = seconds % 60;

  return (
    <p className="text-lg font-semibold">
      {String(minutes).padStart(2, "0")}분{" "}
      {String(formattedSeconds).padStart(2, "0")}초
    </p>
  );
};

export default Timer;
