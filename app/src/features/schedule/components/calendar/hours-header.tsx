import { NUM_HOURS_PER_DAY } from "./constants";

function formatTime(i: number) {
  if (i === 0) {
    return "12 AM";
  } else {
    if (i <= 12) {
      return `${i} AM`;
    } else {
      return `${i - 12} PM`;
    }
  }
}

type HoursHeaderProps = {
  range?: number[];
};

const HoursHeader = ({ range }: HoursHeaderProps) => {
  let earliestTime = 1;
  let latestTime = 24;

  if (range?.length === 2) {
    earliestTime = range[0] === 1 ? range[0] : range[0] - 1;
    latestTime = range[1] === 24 ? range[1] : range[1] + 1;
  }

  const hoursHeader = Array.from({ length: NUM_HOURS_PER_DAY }, (_, i) => {
    if (i + 1 >= earliestTime && i + 1 <= latestTime) {
      return (
        <div
          key={i}
          className="border-dashed border-r-1 border-calendar-border text-[10px] sm:text-xs"
          style={{
            gridArea: `hour${i + 1}`,
          }}
        >
          <span className="text-muted-foreground">{formatTime(i)}</span>
        </div>
      );
    }
  });

  return hoursHeader;
};

export { HoursHeader };
