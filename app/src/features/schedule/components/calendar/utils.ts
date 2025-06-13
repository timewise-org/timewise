import type { ScheduleCourse } from "@/features/_shared/types";

export const getStartingAndEndingCourseTimes = (courses: ScheduleCourse[]) => {
  if (courses.length === 0) {
    return {
      start: 0,
      end: 23,
      extraRange: 0,
    };
  }

  const extraRange = 1;
  let startingTime = Infinity;
  let endingTime = -Infinity;

  courses.forEach((course) => {
    if (course.online) {
      return;
    }

    if (course.time.start < startingTime) {
      startingTime = course.time.start;
    }

    if (course.time.end > endingTime) {
      endingTime = course.time.end;
    }
  });

  return {
    start: startingTime === 0 ? 0 : startingTime - extraRange,
    end: endingTime === 23 ? 23 : endingTime + extraRange,
    extraRange,
  };
};

export function convertMilitaryToStandard(militaryTime: number) {
  if (militaryTime < 0 || militaryTime > 23) {
    // return "Invalid time value";
    throw new Error(`Invalid military time value: ${militaryTime}`);
  }

  const period = militaryTime >= 12 ? "PM" : "AM";
  const standardHour = militaryTime % 12 || 12; // convert 0 to 12 for 12AM, and 13–23 to 1–11 PM

  return `${standardHour} ${period}`;
}
