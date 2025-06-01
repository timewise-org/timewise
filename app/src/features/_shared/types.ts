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

export type ScheduleCourse = {
  id: string;
  code: string;
  online: boolean;

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

  // meetings array will be empty if class is online
  //   meetings: Meeting[];

  color: {
    bg: string;
    hover: string;
    side: string;
  };

  // the rest of the information about the course can be loaded
  // on demand if the student requests it.
};
