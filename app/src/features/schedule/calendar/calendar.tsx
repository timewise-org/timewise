import { forwardRef } from "react";
import { DaysHeader } from "./days-header";
import { Block } from "./block";
import { HoursHeader, type TimeRange } from "./hours-header";
import { NUM_HOURS_PER_DAY, WEEK_DAYS } from "./constants";
import { CourseBlock } from "./course-block";
import type { ScheduleCourse } from "@/features/_shared/types";
import { OnlineSection } from "./online-section";
import "./styles.css";

type CalendarProps = {
  courses: ScheduleCourse[];
  timeRange: TimeRange;
};

type HeaderProps = {
  timeRange: TimeRange;
};

type BlocksProps = {
  timeRange: TimeRange;
  courses: ScheduleCourse[];
};

const Header = ({ timeRange }: HeaderProps) => {
  return (
    <>
      <HoursHeader timeRange={timeRange} />
      <DaysHeader />
    </>
  );
};

const Blocks = ({ courses, timeRange }: BlocksProps) => {
  const blocks = Array.from(
    { length: WEEK_DAYS.length * NUM_HOURS_PER_DAY },
    (_, idx) => {
      // the combination of the period start and day are unique for every classes
      const hour = idx % NUM_HOURS_PER_DAY;
      const day = WEEK_DAYS[idx % WEEK_DAYS.length];

      const course = courses.find((c) => {
        if (!c.online) {
          return (
            c.time.start === idx % NUM_HOURS_PER_DAY &&
            c.time.days.includes(day)
          );
        }
      });

      if (hour >= timeRange.start && hour <= timeRange.end) {
        return (
          <Block key={idx} hour={hour} day={day}>
            {course && <CourseBlock course={course} />}
          </Block>
        );
      }
    },
  );

  return blocks;
};

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  ({ courses, timeRange }, ref) => {
    return (
      <div
        className="mx-auto"
        style={{
          maxWidth: "900px",
        }}
      >
        <div className="calendar-grid w-full text-sm" ref={ref}>
          <Header timeRange={timeRange} />
          <Blocks courses={courses} timeRange={timeRange} />
        </div>

        <OnlineSection courses={courses} />
      </div>
    );
  },
);

export { Calendar };
