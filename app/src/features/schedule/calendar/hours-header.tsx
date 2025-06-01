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
  timeRange: {
    earliest: number;
    latest: number;
  };
};

const HoursHeader = ({ timeRange }: HoursHeaderProps) => {
  const hoursHeader = Array.from({ length: NUM_HOURS_PER_DAY }, (_, i) => {
    if (i + 1 >= timeRange.earliest && i + 1 <= timeRange.latest) {
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
