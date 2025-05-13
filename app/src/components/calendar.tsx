import { forwardRef, useState } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const NUM_HOURS_PER_DAY = 24;
// TODO: store this in the backend
const COLORS = [
  {
    color: "#fff7ed",
    hoverColor: "#ffedd4",
    sideColor: "#ffb86a",
  },
  {
    bg: "#fff1f2",
    hover: "#ffe4e6",
    side: "#ffa1ad",
  },
  {
    color: "#f0fdf4",
    hoverColor: "#dcfce7",
    sideColor: "#7bf1a8",
  },
  {
    color: "#ecfeff",
    hoverColor: "#cefafe",
    sideColor: "#53eafd",
  },
  {
    color: "#f5f3ff",
    hoverColor: "#ede9fe",
    sideColor: "#c4b4ff",
  },
  {
    color: "#eef2ff",
    hoverColor: "#e0e7ff",
    sideColor: "#a3b3ff",
  },
];

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

const CalendarDaysHeader = () => {
  return WEEK_DAYS.map((day) => (
    <div
      key={day}
      className="day-header border-dashed border-b-1 border-calendar-border text-muted-foreground"
      style={{
        gridArea: day,
      }}
    >
      {day}
    </div>
  ));
};

type CalendarHoursHeaderProps = {
  range?: number[];
};

const CalendarHoursHeader = ({ range }: CalendarHoursHeaderProps) => {
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
          className="period border-dashed border-r-1 border-calendar-border text-[10px] sm:text-xs"
          style={{
            gridArea: `period${i + 1}`,
          }}
        >
          <span className="text-muted-foreground">{formatTime(i)}</span>
        </div>
      );
    }
  });

  return hoursHeader;
};

type CalendarBlockProps = {
  idx: number;
  classBlock?: any;
};

const CalendarBlock = ({ idx, classBlock }: CalendarBlockProps) => {
  return (
    <div
      className="relative min-h-19 border-dashed border-r-1 border-b-1 border-calendar-border hover:bg-calendar-block-hover"
      style={{
        gridArea: `period${(idx % NUM_HOURS_PER_DAY) + 1} / ${WEEK_DAYS[idx % WEEK_DAYS.length]}`,
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
              <span className="hidden px-1 sm:block text-xs">
                {/* <ClockIcon /> */}⏰
              </span>
              <span className="text-[10px] pl-1 sm:pl-0 sm:text-xs">
                {classBlock.time}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-destructive hidden px-1 sm:block text-xs">
                {/* <LocationIcon /> */}📍
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

type CalendarProps = {
  classes: any[];
};

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  ({ classes }, ref) => {
    const getEarliestAndLatestClassTimes = () => {
      let earliestTimeSoFar = 1;
      let latestTimeSoFar = 1;

      classes.forEach((c) => {
        if (!c.online) {
          // @ts-ignore
          if (c.periodStartNum < earliestTimeSoFar) {
            // @ts-ignore
            earliestTimeSoFar = c.periodStartNum;
            // @ts-ignore
          } else if (c.periodStartNum > latestTimeSoFar) {
            // @ts-ignore
            latestTimeSoFar = c.periodStartNum;
          }
        }
      });

      return [earliestTimeSoFar, latestTimeSoFar];
    };

    const getOnlineClasses = () => {
      // @ts-ignore
      return classes.filter((c) => c.online);
    };

    const timeRangeToRender = getEarliestAndLatestClassTimes();
    const onlineClasses = getOnlineClasses();

    const renderCalendarBlocks = () => {
      const blocks = Array.from(
        { length: WEEK_DAYS.length * NUM_HOURS_PER_DAY },
        (_, idx) => {
          // the combination of the period start and day are unique for every classes
          const hour = (idx % NUM_HOURS_PER_DAY) + 1;
          const period = `period${hour}`;
          const day = `${WEEK_DAYS[idx % WEEK_DAYS.length]}`;

          let earliestTime = 1;
          let latestTime = 24;

          if (timeRangeToRender?.length === 2) {
            earliestTime =
              timeRangeToRender[0] === 1
                ? timeRangeToRender[0]
                : timeRangeToRender[0] - 1;
            latestTime =
              timeRangeToRender[1] === 24
                ? timeRangeToRender[1]
                : timeRangeToRender[1] + 1;
          }

          const c = classes.find(
            (c) => c.periodStart === period && c.day === day
          );

          if (hour >= earliestTime && hour <= latestTime) {
            return <CalendarBlock key={idx} idx={idx} classBlock={c} />;
          }
        }
      );

      return blocks;
    };

    const renderOnlineClasses = () => {
      return onlineClasses.map((c) => {
        return (
          <div
            key={c.id}
            className="relative min-h-18 border-dashed border-r-1 border-b-1 border-outline"
          >
            <div
              className="flex absolute w-full h-full cursor-pointer z-50"
              style={{
                backgroundColor: c.color.bg,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = c.color.hover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = c.color.bg;
              }}
            >
              <div
                className="w-1 h-full"
                style={{
                  backgroundColor: c.color.side,
                }}
              ></div>
              <div className="px-1 text-[11px] sm:text-sm">
                <p className="py-1 font-medium">{c.code}</p>
                <p className="text-muted-foreground">💻 Online</p>
              </div>
            </div>
          </div>
        );
      });
    };

    return (
      <div
        className="mx-auto"
        style={{
          maxWidth: "900px",
        }}
      >
        <div className="calendar-grid w-full text-sm" ref={ref}>
          {renderCalendarBlocks()}

          <CalendarHoursHeader range={timeRangeToRender} />
          <CalendarDaysHeader />
        </div>
        {onlineClasses.length > 0 && (
          <div className="flex w-full text-sm">
            <div
              className="text-[10px] sm:text-xs text-muted-foreground"
              style={{
                width: "39px",
              }}
            >
              Online
            </div>
            <div className="grow-1">{renderOnlineClasses()}</div>
          </div>
        )}
      </div>
    );
  }
);

export { Calendar };
