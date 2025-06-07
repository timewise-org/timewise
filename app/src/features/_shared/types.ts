export type DayOfWeek = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export type Meeting = {
  days: DayOfWeek[];
  startTime: number;
  endTime: number;

  display: string;

  location: {
    building: string;
    room: string;
  };
};

type InPersonCourse = {
  id: string;
  code: string;
  online: false;
  time: {
    days: DayOfWeek[];
    start: number;
    end: number;
    display: string;
  };
  location: {
    building: string;
    room: string;
    display: string;
  };
  color: {
    bg: string;
    hover: string;
    side: string;
  };
};

type OnlineCourse = {
  id: string;
  code: string;
  online: true;

  color: {
    bg: string;
    hover: string;
    side: string;
  };
};

export type ScheduleCourse = InPersonCourse | OnlineCourse;
