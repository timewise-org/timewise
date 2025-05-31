import { NUM_HOURS_PER_DAY, WEEK_DAYS } from "./constants";

type BlockProps = {
  idx: number;
  classBlock?: any;
};

const Block = ({ idx, classBlock }: BlockProps) => {
  return (
    <div
      className="relative min-h-19 border-dashed border-r-1 border-b-1 border-calendar-border hover:bg-calendar-block-hover"
      style={{
        gridArea: `hour${(idx % NUM_HOURS_PER_DAY) + 1} / ${WEEK_DAYS[idx % WEEK_DAYS.length]}`,
      }}
    >
      {classBlock && (
        <div
          className="flex absolute w-full cursor-pointer z-2"
          style={{
            height: `${75 * classBlock.periodLength}px`,
            backgroundColor: classBlock.color.bg,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = classBlock.color.hover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = classBlock.color.bg;
          }}
        >
          <div
            className="w-1 h-full"
            style={{
              backgroundColor: classBlock.color.side,
            }}
          ></div>
          <div className="w-full">
            <p className="px-1 pt-1 font-medium truncate w-full text-[11px] sm:text-sm">
              {classBlock.code}
            </p>
            <div className="flex items-center py-1 sm:py-2">
              <span className="hidden px-1 sm:block text-xs">⏰</span>
              <span className="text-[10px] pl-1 sm:pl-0 sm:text-xs">
                {classBlock.time}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-destructive hidden px-1 sm:block text-xs">
                📍
              </span>
              <span className="text-[10px] pl-1 sm:pl-0 sm:text-xs">
                {classBlock.location}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { Block };
