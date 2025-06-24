import type { DateTime } from "luxon";
import { Interval } from "luxon";
import { PhysicalCourse, OnlineCourse } from "./course";
import type { DayOfWeek, ISchedule, IScheduleBlock } from "./types";

export type Course = PhysicalCourse | OnlineCourse;

export class Schedule implements ISchedule {
  courses: Course[] = [];

  constructor(courses: Course[]) {
    this.courses = courses;
  }

  getCourses(): Course[] {
    return this.courses;
  }

  addCourse(course: Course) {
    this.courses.push(course);
  }

  deleteCourse() {}

  replaceCourse() {}

  isValid(): boolean {
    for (let i = 0; i < this.courses.length; i++) {
      const course = this.courses[i];
      if (course instanceof OnlineCourse) continue;

      for (let j = i + 1; j < this.courses.length; j++) {
        const otherCourse = this.courses[j];
        if (otherCourse instanceof OnlineCourse) continue;

        // check duplicate courses or overlapping courses
        if (course.code === otherCourse.code || course.overlaps(otherCourse)) {
          return false;
        }
      }
    }
    return true;
  }
}

export class ScheduleBlock implements IScheduleBlock {
  day: DayOfWeek;
  start: DateTime;

  constructor(data: { day: DayOfWeek; start: DateTime }) {
    this.day = data.day;
    this.start = data.start;
  }

  getTimeInterval(): Interval {
    return Interval.fromDateTimes(this.start, this.start.plus({ hour: 1 }));
  }
}
