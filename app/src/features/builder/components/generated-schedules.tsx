import { getStartingAndEndingCourseTimes } from "@/features/schedule/components/calendar/utils";
import { Calendar } from "../../schedule/components/calendar";
import type { ScheduleCourse } from "@/features/_shared/types";

const courses: ScheduleCourse[] = [
  {
    id: "1",
    code: "MAC2313",
    online: false,

    time: {
      days: ["Mon", "Wed"],
      start: 3,
      end: 5,
      display: "9AM - 10AM",
    },

    location: {
      building: "LIT",
      room: "100",
      display: "LIT 100",
    },

    color: {
      bg: "#fff7ed",
      hover: "#ffedd4",
      side: "#ffb86a",
    },
  },
  {
    id: "2",
    code: "COP3503",
    online: false,

    time: {
      days: ["Tue", "Thu"],
      start: 15,
      end: 17,
      display: "3PM - 5PM",
    },

    location: {
      building: "CAR",
      room: "100",
      display: "CAR 100",
    },

    color: {
      bg: "#fff1f2",
      hover: "#ffe4e6",
      side: "#ffa1ad",
    },
  },
  {
    id: "3",
    code: "ENT3003",
    online: true,

    color: {
      bg: "#f0fdf4",
      hover: "#dcfce7",
      side: "#7bf1a8",
    },
  },

  {
    id: "4",
    code: "EGN3032",
    online: true,
    color: {
      bg: "#f5f3ff",
      hover: "#ede9fe",
      side: "#c4b4ff",
    },
  },
];

const GeneratedSchedules = () => {
  return (
    <div>
      <Calendar
        courses={courses}
        timeRange={getStartingAndEndingCourseTimes(courses)}
        compact
      />
      {/* <div className="mb-15 flex flex-col items-start w-[600px] mx-auto"> */}
      {/* <p className="mb-2 text-lg font-semibold ml-[40px]">Schedule #1</p>
        <div className="min-w-[80%] sm:min-w-[600px]">
 
        </div>
      </div>
      <div className="mb-15 flex flex-col items-start w-[600px] mx-auto">
        <p className="mb-2 text-lg font-semibold ml-[40px]">Schedule #2</p>
        <div className="min-w-[600px]">
          <Calendar
            courses={courses}
            timeRange={getStartingAndEndingCourseTimes(courses)}
            compact
          />
        </div>
      </div> */}
    </div>
  );
};

export { GeneratedSchedules };
