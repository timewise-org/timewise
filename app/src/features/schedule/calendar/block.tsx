import { NUM_HOURS_PER_DAY, WEEK_DAYS } from "./constants";

type BlockProps = {
  idx: number;
  children: React.ReactNode;
};

const Block = ({ idx, children }: BlockProps) => {
  return (
    <div
      className="relative min-h-19 border-dashed border-r-1 border-b-1 border-calendar-border hover:bg-calendar-block-hover"
      style={{
        gridArea: `hour${(idx % NUM_HOURS_PER_DAY) + 1} / ${WEEK_DAYS[idx % WEEK_DAYS.length]}`,
      }}
    >
      {children}
    </div>
  );
};

export { Block };
