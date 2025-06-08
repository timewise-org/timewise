import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "@/features/schedule/components/calendar";
import type { ScheduleCourse } from "@/features/_shared/types";
import { getStartingAndEndingCourseTimes } from "@/features/schedule/components/calendar/utils";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  // const classes = [
  //   {
  //     id: 1,
  //     code: "MAC2313",
  //     location: "LIT 100",
  //     periodStart: "hour2",
  //     periodStartNum: 2,
  //     day: "Mon",
  //     periodLength: 2,
  //     time: "9AM - 11AM",
  //     color: {
  //       bg: "#fff7ed",
  //       hover: "#ffedd4",
  //       side: "#ffb86a",
  //     },
  //   },
  //   {
  //     id: 2,
  //     code: "COP3503",
  //     location: "CAR 100",
  //     periodStart: "hour2",
  //     periodStartNum: 8,
  //     day: "Wed",
  //     periodLength: 1,
  //     time: "7AM - 8AM",
  //     color: {
  //       bg: "#fff1f2",
  //       hover: "#ffe4e6",
  //       side: "#ffa1ad",
  //     },
  //   },
  //   {
  //     id: 3,
  //     code: "ENT3003",
  //     online: true,
  //     color: {
  //       bg: "#f0fdf4",
  //       hover: "#dcfce7",
  //       side: "#7bf1a8",
  //     },
  //   },
  //   {
  //     id: 4,
  //     code: "EGN3032",
  //     online: true,
  //     color: {
  //       bg: "#f5f3ff",
  //       hover: "#ede9fe",
  //       side: "#c4b4ff",
  //     },
  //   },
  // ];
  const courses: ScheduleCourse[] = [
    {
      id: "1",
      code: "MAC2313",
      online: false,

      time: {
        days: ["Mon", "Wed"],
        start: 3,
        end: 4,
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

  return (
    <div>
      <Calendar
        courses={courses}
        timeRange={getStartingAndEndingCourseTimes(courses)}
      />
    </div>
  );
}
