import { DateTime } from "luxon";
import { Interval } from "luxon";
import { PhysicalCourse, OnlineCourse } from "./course";
import type { DayOfWeek } from "./types";

export type Course = PhysicalCourse | OnlineCourse;

export class Schedule {
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

  equals(otherSchedule: Schedule): boolean {
    const courses = this.getCourses();
    const otherCourses = otherSchedule.getCourses();

    if (courses.length !== otherCourses.length) return false;

    for (const course of courses) {
      let found = false;

      for (const otherCourse of otherCourses) {
        if (this.coursesAreEqual(course, otherCourse)) {
          found = true;
          break;
        }
      }

      if (!found) return false;
    }

    return true;
  }

  private coursesAreEqual(a: Course, b: Course): boolean {
    if (a instanceof PhysicalCourse && b instanceof PhysicalCourse) {
      return a.equals(b);
    }
    if (a instanceof OnlineCourse && b instanceof OnlineCourse) {
      return a.equals(b);
    }
    return false;
  }
}

export class ScheduleBlock {
  day: DayOfWeek;
  start: DateTime;

  constructor(data: { day: DayOfWeek; start: DateTime | string }) {
    this.day = data.day;
    this.start =
      typeof data.start === "string"
        ? DateTime.fromFormat(data.start, "h:mm a", { zone: "utc" })
        : data.start;
  }

  getTimeInterval(): Interval {
    return Interval.fromDateTimes(this.start, this.start.plus({ hour: 1 }));
  }
}
