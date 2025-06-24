import type { DateTime, Interval } from "luxon";

export interface IBaseScheduleCourse {
  id: string;
  code: string;
  courseId: string;
  online: boolean;

  meetsUserFilters: (filters: BuilderFilters) => boolean;
}

export type BuilderFilters = {
  excludedBlocks: IScheduleBlock[];
  excludeOnlineCourses: boolean;
};

export interface IOnlineCourse extends IBaseScheduleCourse {}

export interface IPhysicalCourse extends IBaseScheduleCourse {
  meetings: IMeeting[];
  overlaps: (otherCourse: IPhysicalCourse) => boolean;
}

export interface IMeeting {
  time: {
    days: DayOfWeek[];
    start: DateTime;
    end: DateTime;
  };

  location: {
    building: string;
    room: string;
  };

  getTimeInterval: () => Interval;
  getTimeDisplay: () => string;
  getLocationDisplay: () => string;
}

export interface ISchedule {
  courses: (IPhysicalCourse | IOnlineCourse)[];

  getCourses: () => ISchedule["courses"];
  addCourse: (course: IPhysicalCourse | IOnlineCourse) => void;
  deleteCourse: () => void;
  replaceCourse: () => void;
  isValid: () => boolean;
}

export interface IScheduleBlock {
  day: DayOfWeek;
  start: DateTime;

  getTimeInterval: () => Interval;
}

export type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
