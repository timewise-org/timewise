import { NUM_HOURS_PER_DAY } from "./constants";
import { convertMilitaryToStandard } from "./utils";

export type TimeRange = {
  start: number;
  end: number;
};

type HoursHeaderProps = {
  timeRange: TimeRange;
};

const HoursHeader = ({ timeRange }: HoursHeaderProps) => {
  const hoursHeader = Array.from({ length: NUM_HOURS_PER_DAY }, (_, i) => {
    if (i >= timeRange.start && i <= timeRange.end) {
      return (
        <div
          key={i}
          className="flex items-start justify-end border-dashed border-r-1 border-calendar-border"
          style={{
            gridArea: `hour${i}`,
          }}
        >
          <span className="text-muted-foreground text-[10px] relative -left-2">
            {convertMilitaryToStandard(i)}
          </span>
        </div>
      );
    }
  });

  return hoursHeader;
};

export { HoursHeader };
