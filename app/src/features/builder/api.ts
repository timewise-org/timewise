import type { ScheduleBlock, ScheduleCourse } from "@/types";
import { Interval } from "luxon";

/**
 * Filters a list of courses to return only those that do not conflict with excluded time blocks.
 *
 * @param courses - An array of ScheduleCourse objects to be filtered.
 * @param excludedBlocks - An array of ScheduleBlock objects representing time blocks to exclude.
 * @param excludeOnlineCourses - If true, online courses are excluded from the result. Defaults to false.
 * @returns An array of ScheduleCourse objects that do not overlap with any excluded block.
 *
 */
export function filter(
  courses: ScheduleCourse[],
  excludedBlocks: ScheduleBlock[],
  excludeOnlineCourses = false,
): ScheduleCourse[] {
  let validCourses: ScheduleCourse[] = [];

  courses.forEach((course) => {
    if (course.online) {
      excludeOnlineCourses && validCourses.push(course);
      return;
    }

    let isCourseValid = true;

    for (let i = 0; i < course.meetings.length; i++) {
      const meeting = course.meetings[i];
      const time = meeting.time;

      // Create a time interval for that course
      const courseInterval = Interval.fromDateTimes(time.start, time.end);

      for (let j = 0; j < excludedBlocks.length; j++) {
        const block = excludedBlocks[j];

        // Every block is 1 hour in length from the start hour
        const filterInterval = Interval.fromDateTimes(
          block.start,
          block.start.plus({ hour: 1 }),
        );

        /* If any part of the time of the course overlaps with the excluded blocks, the course is invalid
          note that the interval is not inclusive at the end [)

          so if the excluded block is from 8:30 AM to 9:30 AM,
          the course is invalid if it starts at 9:25 AM to 10:25 AM, 
        */
        if (courseInterval.overlaps(filterInterval)) {
          isCourseValid = false;
          break;
        }
      }

      if (!isCourseValid) break;
    }

    if (isCourseValid) {
      validCourses.push(course);
    }
  });

  return validCourses;
}

export function build(
  courses: ScheduleCourse[],
  chosenCourseCodes: string[],
): ScheduleCourse[][] {
  let validSchedules: ScheduleCourse[][] = [[]];

  // Initialize course groupings by their course codes
  const courseGroupings: Record<string, ScheduleCourse[]> = {};
  for (const code of chosenCourseCodes) {
    courseGroupings[code] = [];
  }

  // Push every course into their proper group
  for (const course of courses) {
    if (!courseGroupings[course.code]) {
      console.error(
        "There were likely an error with courses passed in to the course builder.",
      );
      continue;
    }

    courseGroupings[course.code].push(course);
  }

  // Generate all possible valid combinations of courses to make a schedule
  for (const courseGroup of Object.values(courseGroupings)) {
    let temp: ScheduleCourse[][] = [];

    for (const course of courseGroup) {
      for (const schedule of validSchedules) {
        const t = [...schedule, course];

        if (isScheduleValid(t) && satisfiesRequirements()) {
          temp.push(t);
        }
      }
    }

    validSchedules = temp;
  }

  return validSchedules;
}

function satisfiesRequirements() {}

function isScheduleValid(schedule: ScheduleCourse[]): boolean {
  for (const course of schedule) {
    // Check against every courses in the schedule to see if any time overlaps
    for (const otherCourse of schedule) {
      if (course.code === otherCourse.code) {
        continue;
      }

      if (doesCourseOverlap(course, otherCourse)) {
        return false;
      }
    }
  }

  return true;
}

function doesCourseOverlap(
  course: ScheduleCourse,
  otherCourse: ScheduleCourse,
): boolean {
  // Can online courses overlap?
  if (course.online || otherCourse.online) {
    return false;
  }

  for (const meeting of course.meetings) {
    const meetingInterval = Interval.fromDateTimes(
      meeting.time.start,
      meeting.time.end,
    );

    for (const otherMeeting of otherCourse.meetings) {
      const otherMeetingInterval = Interval.fromDateTimes(
        otherMeeting.time.start,
        otherMeeting.time.end,
      );

      if (meetingInterval.overlaps(otherMeetingInterval)) {
        return true;
      }
    }
  }

  return false;
}
