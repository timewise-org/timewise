import { DateTime, Interval } from "luxon";
import type {
  BuilderFilters,
  DayOfWeek,
  IBaseScheduleCourse,
  IMeeting,
  IOnlineCourse,
  IPhysicalCourse,
} from "./types";

abstract class BaseScheduleCourse implements IBaseScheduleCourse {
  id: string;
  code: string;
  courseId: string;
  online: boolean;

  constructor(data: IBaseScheduleCourse) {
    this.id = data.id;
    this.code = data.code;
    this.courseId = data.courseId;
    this.online = data.online;
  }

  abstract meetsUserFilters(filters: BuilderFilters): boolean;
}

export class OnlineCourse extends BaseScheduleCourse implements IOnlineCourse {
  meetsUserFilters(filters: BuilderFilters): boolean {
    return !filters.excludeOnlineCourses;
  }
}

export class PhysicalCourse
  extends BaseScheduleCourse
  implements IPhysicalCourse
{
  meetings: IMeeting[];

  constructor(data: IPhysicalCourse) {
    super(data);
    this.meetings = data.meetings;
  }

  meetsUserFilters(filters: BuilderFilters): boolean {
    for (let i = 0; i < this.meetings.length; i++) {
      const meetingInterval = this.meetings[i].getTimeInterval();

      for (let j = 0; j < filters.excludedBlocks.length; j++) {
        const blockInterval = filters.excludedBlocks[j].getTimeInterval();

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

    return true;
  }

  overlaps(otherCourse: IPhysicalCourse): boolean {
    for (const meeting of this.meetings) {
      const meetingInterval = meeting.getTimeInterval();

      for (const otherMeeting of otherCourse.meetings) {
        const otherMeetingInterval = otherMeeting.getTimeInterval();

        if (meetingInterval.overlaps(otherMeetingInterval)) {
          return true;
        }
      }
    }

    return false;
  }
}

export class Meeting implements IMeeting {
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
      start: DateTime.fromFormat(data.time.start, "H:mm a", { zone: "utc" }),
      end: DateTime.fromFormat(data.time.end, "H:mm a", { zone: "utc" }),
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
}
