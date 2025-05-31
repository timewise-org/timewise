import { forwardRef } from "react";
import { DaysHeader } from "./days-header";
import { Block } from "./block";
import { HoursHeader } from "./hours-header";
import { NUM_HOURS_PER_DAY, WEEK_DAYS } from "./constants";
import "./styles.css";

type BaseScheduleClass = {
  id: number;
  code: string;
  name: string;
  credits: number;
  instructors: string[];
  isOnline: boolean;

  // TODO: add class locations, meeting times, exam dates?, startDate, endDate
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

    const renderBlocks = () => {
      const blocks = Array.from(
        { length: WEEK_DAYS.length * NUM_HOURS_PER_DAY },
        (_, idx) => {
          // the combination of the period start and day are unique for every classes
          const hour = (idx % NUM_HOURS_PER_DAY) + 1;
          const period = `hour${hour}`;
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
            return <Block key={idx} idx={idx} classBlock={c} />;
          }
        }
      );

      return blocks;
    };

    const renderOnlineClasses = () => {
      return (
        onlineClasses.length > 0 && (
          <div className="flex w-full text-sm">
            <div
              className="text-[10px] sm:text-xs text-muted-foreground"
              style={{
                width: "39px",
              }}
            >
              Online
            </div>
            <div className="grow-1">
              {onlineClasses.map((c) => {
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
              })}
            </div>
          </div>
        )
      );
    };

    return (
      <div
        className="mx-auto"
        style={{
          maxWidth: "900px",
        }}
      >
        <div className="calendar-grid w-full text-sm" ref={ref}>
          {renderBlocks()}

          <HoursHeader range={timeRangeToRender} />
          <DaysHeader />
        </div>

        {renderOnlineClasses()}
      </div>
    );
  }
);

export { Calendar };
