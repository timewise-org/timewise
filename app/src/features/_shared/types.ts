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

export type InPersonCourse = {
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

export type OnlineCourse = {
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

export type Course = {
  id: string;
  code: string;
  name: string;
  description: string;

  credits: {
    min: number;
    max: number;
    display: string;
  };
};

export type Semester = {
  courses: Course[];
};

export type Semesters = {
  fall: Semester;
  spring: Semester;
  summer: Semester;
};

export type YearPlan = {
  isShowing: boolean;

  semesters: Semesters;
};

export type FourYearPlan = YearPlan[];
