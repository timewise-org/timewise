import { forwardRef } from "react";
import { DaysHeader } from "./days-header";
import { Block } from "./block";
import { HoursHeader, type TimeRange } from "./hours-header";
import { NUM_HOURS_PER_DAY, WEEK_DAYS } from "./constants";
import { CourseBlock } from "./course-block";
import type { InPersonCourse, ScheduleCourse } from "@/features/_shared/types";
import { OnlineSection } from "./online-section";
import "./styles.css";
import clsx from "clsx";

type CalendarProps = {
  courses: ScheduleCourse[];
  timeRange: TimeRange;
  compact?: boolean;
  tiny?: boolean;
};

type HeaderProps = {
  timeRange: TimeRange;
  tiny?: boolean;
};

type BlocksProps = {
  timeRange: TimeRange;
  courses: ScheduleCourse[];
  compact?: boolean;
};

const Header = ({ timeRange, tiny }: HeaderProps) => {
  return (
    <>
      <HoursHeader timeRange={timeRange} />
      <DaysHeader tiny={tiny} />
    </>
  );
};

const Blocks = ({ courses, timeRange, compact = false }: BlocksProps) => {
  // TODO: refactor and make it configurable
  const courseTimes: number[] = [];

  if (compact) {
    courses.forEach((course) => {
      if (!course.online) {
        const courseLength = course.time.end - course.time.start;

        for (let i = 0; i < courseLength; i++) {
          courseTimes.push(course.time.start + i);
        }
      }
    });
  }

  const blocks = Array.from(
    { length: WEEK_DAYS.length * NUM_HOURS_PER_DAY },
    (_, idx) => {
      // the combination of the period start and day are unique for every classes
      const hour = idx % NUM_HOURS_PER_DAY;
      const day = WEEK_DAYS[idx % WEEK_DAYS.length];

      const course = courses.find(
        (c): c is InPersonCourse =>
          !c.online && c.time.start === hour && c.time.days.includes(day),
      );

      if (hour >= timeRange.start && hour <= timeRange.end) {
        return (
          <Block
            key={idx}
            hour={hour}
            day={day}
            collapsed={compact && courseTimes.indexOf(hour) === -1}
          >
            {course && <CourseBlock course={course} />}
          </Block>
        );
      }
    },
  );

  return blocks;
};

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  ({ courses, timeRange, compact, tiny }, ref) => {
    return (
      <div
        // className="mx-auto"
        style={{
          maxWidth: compact ? "600px" : "900px",
        }}
      >
        <div
          className={clsx("calendar-grid w-full text-sm", tiny && "tiny")}
          ref={ref}
        >
          <Header timeRange={timeRange} tiny={tiny} />
          <Blocks courses={courses} timeRange={timeRange} compact={compact} />
        </div>

        <OnlineSection courses={courses} />
      </div>
    );
  },
);

export { Calendar };
