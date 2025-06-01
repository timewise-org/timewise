import { forwardRef } from "react";
import { DaysHeader } from "./days-header";
import { Block } from "./block";
import { HoursHeader } from "./hours-header";
import { NUM_HOURS_PER_DAY, WEEK_DAYS } from "./constants";
import { CourseBlock } from "./course-block";
import type { ScheduleCourse } from "@/features/_shared/types";
import "./styles.css";

type CalendarProps = {
  courses: ScheduleCourse[];
  timeRange: {
    earliest: number;
    latest: number;
  };
};

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  ({ courses, timeRange }, ref) => {
    const renderHeader = () => {
      return (
        <>
          <HoursHeader timeRange={timeRange} />
          <DaysHeader />
        </>
      );
    };

    const renderBlocks = () => {
      const blocks = Array.from(
        { length: WEEK_DAYS.length * NUM_HOURS_PER_DAY },
        (_, idx) => {
          // the combination of the period start and day are unique for every classes
          const hour = (idx % NUM_HOURS_PER_DAY) + 1;
          const day = WEEK_DAYS[idx % WEEK_DAYS.length];

          const course = courses.find((c) => {
            if (!c.online) {
              return (
                c.time.start === idx % NUM_HOURS_PER_DAY &&
                c.time.days.includes(day)
              );
            }
          });

          // TODO: refactor how we calculate the hour and the timeRage
          if (hour >= timeRange.earliest && hour <= timeRange.latest) {
            return (
              <Block key={idx} idx={idx}>
                {course && <CourseBlock course={course} />}
              </Block>
            );
          }
        },
      );

      return blocks;
    };

    const renderOnlineCourses = () => {
      const onlineClasses = courses.filter((c) => c.online);

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
          {renderHeader()}
          {renderBlocks()}
        </div>

        {renderOnlineCourses()}
      </div>
    );
  },
);

export { Calendar };
