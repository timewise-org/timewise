import { DateTime, Interval } from "luxon";
import type { BuilderFilters, DayOfWeek } from "./types";

abstract class BaseScheduleCourse {
  id: string;
  code: string;
  courseId: string;
  online: boolean;

  constructor(data: {
    id: string;
    code: string;
    courseId: string;
    online: boolean;
  }) {
    this.id = data.id;
    this.code = data.code;
    this.courseId = data.courseId;
    this.online = data.online;
  }

  abstract meetsUserFilters(filters: BuilderFilters): boolean;
  abstract equals(otherCourse: BaseScheduleCourse): boolean;
}

export class OnlineCourse extends BaseScheduleCourse {
  constructor(data: { id: string; code: string; courseId: string }) {
    super({ ...data, online: true });
  }

  meetsUserFilters(filters: BuilderFilters): boolean {
    return !filters.excludeOnlineCourses;
  }

  equals(otherCourse: OnlineCourse): boolean {
    return (
      this.courseId === otherCourse.courseId && this.code === otherCourse.code
    );
  }
}

export class PhysicalCourse extends BaseScheduleCourse {
  meetings: Meeting[];

  constructor(data: {
    id: string;
    code: string;
    courseId: string;
    meetings: Meeting[];
  }) {
    super({ ...data, online: false });
    this.meetings = data.meetings;
  }

  meetsUserFilters(filters: BuilderFilters): boolean {
    for (let i = 0; i < this.meetings.length; i++) {
      const meetingInterval = this.meetings[i].getTimeInterval();

      for (let j = 0; j < filters.excludedBlocks.length; j++) {
        const blockInterval = filters.excludedBlocks[j].getTimeInterval();

        for (const day of this.meetings[i].time.days) {
          if (day === filters.excludedBlocks[j].day) {
            /* If any part of the time of the course overlaps with the excluded blocks, the course is invalid
              note that the interval is not inclusive at the end [)

              so if the excluded block is from 8:30 AM to 9:30 AM,
              the course is invalid if it starts at 9:25 AM to 10:25 AM, 
            */
            if (meetingInterval.overlaps(blockInterval)) {
              return false;
            }
          }
        }
      }
    }

    return true;
  }

  overlaps(otherCourse: PhysicalCourse): boolean {
    for (const meeting of this.meetings) {
      const meetingInterval = meeting.getTimeInterval();

      for (const otherMeeting of otherCourse.meetings) {
        const otherMeetingInterval = otherMeeting.getTimeInterval();

        for (const day of meeting.time.days) {
          if (
            otherMeeting.time.days.indexOf(day) !== -1 &&
            meetingInterval.overlaps(otherMeetingInterval)
          ) {
            return true;
          }
        }
      }
    }

    return false;
  }

  equals(otherCourse: PhysicalCourse): boolean {
    if (this.meetings.length !== otherCourse.meetings.length) {
      return false;
    }

    for (const meeting of this.meetings) {
      let found = false;

      for (const otherMeeting of otherCourse.meetings) {
        if (meeting.equals(otherMeeting)) {
          found = true;
          break;
        }
      }

      if (!found) return false;
    }

    return (
      this.code === otherCourse.code && this.courseId === otherCourse.courseId
    );
  }
}

export class Meeting {
  time: {
    days: DayOfWeek[];
    start: DateTime;
    end: DateTime;
  };

  location: {
    building: string;
    room: string;
  };

  constructor(data: {
    time: {
      days: DayOfWeek[];
      start: string;
      end: string;
    };

    location: {
      building: string;
      room: string;
    };
  }) {
    this.time = {
      ...data.time,
      start: DateTime.fromFormat(data.time.start, "h:mm a", { zone: "utc" }),
      end: DateTime.fromFormat(data.time.end, "h:mm a", { zone: "utc" }),
    };

    this.location = data.location;
  }

  getTimeInterval(): Interval {
    return Interval.fromDateTimes(this.time.start, this.time.end);
  }

  getTimeDisplay(): string {
    return "";
  }

  getLocationDisplay(): string {
    return "";
  }

  equals(otherMeeting: Meeting): boolean {
    if (this.time.days.length !== otherMeeting.time.days.length) {
      return false;
    }

    for (const day of this.time.days) {
      let found = false;

      for (const otherDay of otherMeeting.time.days) {
        if (day === otherDay) {
          found = true;
          break;
        }
      }

      if (!found) return false;
    }

    return (
      this.time.start.toLocaleString(DateTime.TIME_24_SIMPLE) ===
        otherMeeting.time.start.toLocaleString(DateTime.TIME_24_SIMPLE) &&
      this.time.end.toLocaleString(DateTime.TIME_24_SIMPLE) ===
        otherMeeting.time.end.toLocaleString(DateTime.TIME_24_SIMPLE) &&
      this.location.building === otherMeeting.location.building &&
      this.location.room === otherMeeting.location.room
    );
  }
}
